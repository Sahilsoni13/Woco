import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { CalendarDays, Home, LayoutDashboard, LucideIcon, Settings, User } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Kept local (rather than importing `BottomTabBarProps` from expo-router's
// internal react-navigation re-export) so this doesn't depend on an
// unofficial deep import path — this is the minimal shape we actually use.
type TabBarRoute = { key: string; name: string };
type TabBarProps = {
  state: { index: number; routes: TabBarRoute[] };
  navigation: {
    // Loosely typed on purpose: the real navigator's `emit` is generic over a
    // specific event-name union we don't want this component coupled to.
    emit: (event: any) => any;
    navigate: (name: string) => void;
  };
};

const TAB_ICONS: Record<string, LucideIcon> = {
  index: Home,
  dashboard: LayoutDashboard,
  booking: CalendarDays,
  profile: User,
  settings: Settings,
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  dashboard: 'Dashboard',
  booking: 'Booking',
  profile: 'Profile',
  settings: 'Settings',
};

const INDICATOR_WIDTH = 28;

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = React.useState(0);
  // One entry per tab, each the tab's own measured horizontal center — NOT
  // derived by dividing the bar's total width by the tab count. Yoga rounds
  // each flex-1 item's width independently, so at most screen widths the 5
  // tabs aren't pixel-identical (e.g. 75/75/75/75/76) and a single averaged
  // `tabWidth` put the indicator a couple of px off-center on whichever tab
  // absorbed the rounding remainder.
  //
  // Plain React state with a functional updater, NOT a Reanimated shared
  // value mutated by read-modify-write — all 5 Pressables' onLayout fire in
  // quick succession on mount, and a shared value read back inside each of
  // those independent JS callbacks (`const next = [...tabCentersX.value]`)
  // isn't guaranteed to see the others' writes yet, so whichever handler ran
  // last would win and clobber the rest down to a single surviving entry
  // (observed: only the last tab, Settings, ever got a value — every other
  // tab's write was lost, so the indicator stayed hidden everywhere else).
  // `setState(prev => ...)` is the one update form React guarantees queues
  // correctly regardless of firing order.
  const [tabCenters, setTabCenters] = React.useState<number[]>([]);
  const activeCenterX = tabCenters[state.index];

  const indicatorStyle = useAnimatedStyle(() => {
    if (activeCenterX === undefined) return { opacity: 0 };
    return {
      opacity: 1,
      transform: [
        {
          translateX: withSpring(activeCenterX - INDICATOR_WIDTH / 2, {
            damping: 22,
            stiffness: 180,
            mass: 1,
            overshootClamping: true,
          }),
        },
      ],
    };
  }, [activeCenterX]);

  return (
    <View
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      className="bg-background px-4 pt-2">
      <View
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        className="border-border bg-background native:shadow-xl web:shadow-lg web:shadow-black/10 flex-row overflow-hidden rounded-2xl border">
        {barWidth > 0 ? (
          // `className` on reanimated's Animated.View isn't NativeWind-interop'd
          // like plain View is, so it silently dropped `absolute`/inset/padding —
          // the indicator was rendering as an extra in-flow flex item, stealing
          // width from the 5 real tabs (the label cropping) and animating with a
          // broken position baseline (the "escapes its parent" bounce). Plain
          // style objects for the layout-critical bits fix it; keep className only
          // on the plain inner View, where it does work.
          //
          // A short bottom-center bar, not a full box behind the tab — width
          // is fixed (INDICATOR_WIDTH), centered on each tab's own measured
          // center (tabCenters) rather than spanning the whole tab.
          <Animated.View
            style={[{ position: 'absolute', left: 0, bottom: 6, width: INDICATOR_WIDTH, height: 3 }, indicatorStyle]}>
            <View className="bg-primary h-full w-full rounded-full" />
          </Animated.View>
        ) : null}

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const IconComponent = TAB_ICONS[route.name] ?? Home;
          const label = TAB_LABELS[route.name] ?? route.name;

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                const centerX = x + width / 2;
                setTabCenters((prev) => {
                  if (prev[index] === centerX) return prev;
                  const next = [...prev];
                  next[index] = centerX;
                  return next;
                });
              }}
              className={cn('z-10 flex-1 items-center justify-center gap-1 py-3', 'active:opacity-70')}>
              <Icon
                as={IconComponent}
                size={20}
                className={isFocused ? 'text-primary' : 'text-muted-foreground'}
              />
              <Text
                numberOfLines={1}
                className={cn(
                  'font-montserrat-medium text-[9px]',
                  isFocused ? 'text-primary' : 'text-muted-foreground'
                )}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
