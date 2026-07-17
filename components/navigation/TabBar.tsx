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

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = React.useState(0);
  const tabWidth = barWidth / state.routes.length;

  const indicatorStyle = useAnimatedStyle(() => {
    if (!tabWidth) return { opacity: 0 };
    return {
      opacity: 1,
      transform: [
        {
          translateX: withSpring(state.index * tabWidth, {
            damping: 22,
            stiffness: 180,
            mass: 1,
            overshootClamping: true,
          }),
        },
      ],
    };
  }, [state.index, tabWidth]);

  return (
    <View
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      className="bg-background px-4 pt-2">
      <View
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        className="border-border bg-background native:shadow-xl web:shadow-lg web:shadow-black/10 flex-row overflow-hidden rounded-2xl border">
        {tabWidth > 0 ? (
          // `className` on reanimated's Animated.View isn't NativeWind-interop'd
          // like plain View is, so it silently dropped `absolute`/inset/padding —
          // the indicator was rendering as an extra in-flow flex item, stealing
          // width from the 5 real tabs (the label cropping) and animating with a
          // broken position baseline (the "escapes its parent" bounce). Plain
          // style objects for the layout-critical bits fix it; keep className only
          // on the plain inner View, where it does work.
          <Animated.View
            style={[
              { position: 'absolute', left: 0, top: 8, bottom: 8, width: tabWidth, paddingHorizontal: 6 },
              indicatorStyle,
            ]}>
            <View className="bg-primary h-full flex-1 rounded-lg" />
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
              className={cn('z-10 flex-1 items-center justify-center gap-1 py-3', 'active:opacity-70')}>
              <Icon
                as={IconComponent}
                size={20}
                className={isFocused ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <Text
                numberOfLines={1}
                className={cn(
                  'font-montserrat-medium text-[9px]',
                  isFocused ? 'text-primary-foreground' : 'text-muted-foreground'
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
