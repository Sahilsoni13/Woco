import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleCheck, Maximize2 } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { RoomType } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// hsl(...) values from lib/theme.ts, converted to hex — Reanimated's
// interpolateColor needs concrete color strings to animate between, not
// theme className tokens.
const BORDER_OFF = '#ede9e4'; // border
const FOREGROUND = '#1a1a1a'; // foreground / primary (same value in this theme)
const WHITE = '#ffffff'; // primary-foreground

type RoomTypeCardProps = {
  room: RoomType;
  selected: boolean;
  onSelect: () => void;
};

// The `selected` toggle used to be a plain `transition-all duration-200`
// className — that's a real CSS transition on web, but a total no-op on
// native (NativeWind classNames become static style objects there, no CSS
// engine to animate them), so the card border, button fill, and text color
// all used to snap instantly on native. Animated here instead, same
// `useSharedValue` + `withTiming` + `interpolateColor` pattern already
// established in ToggleSwitch.tsx.
export function RoomTypeCard({ room, selected, onSelect }: RoomTypeCardProps) {
  const progress = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 200 });
  }, [selected, progress]);

  const cardStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(progress.value, [0, 1], [BORDER_OFF, FOREGROUND]),
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', FOREGROUND]),
    borderWidth: 1 - progress.value,
    borderColor: FOREGROUND,
  }));

  const buttonTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [FOREGROUND, WHITE]),
  }));

  return (
    // Animated.View doesn't reliably take `className` (NativeWind's
    // class-to-style interop isn't wired up for Reanimated's components —
    // see the note in components/splash/CustomSplashScreen.tsx), so the
    // static shape/background is plain inline style here, matching
    // ToggleSwitch.tsx's convention; only `cardStyle`'s animated
    // `borderColor` needs to come through `useAnimatedStyle`.
    <Animated.View
      style={[
        { borderWidth: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: '#ffffff' },
        cardStyle,
      ]}>
      <View className="h-44 w-full">
        <Image source={{ uri: room.photo }} resizeMode="cover" style={{ flex: 1 }} />
      </View>

      <View className="gap-3 p-4">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="font-montserrat-medium text-foreground flex-1 text-[15px]">{room.name}</Text>
          {selected ? (
            <View className="bg-primary flex-row items-center gap-1 rounded-full px-2.5 py-1">
              <Icon as={CircleCheck} size={11} className="text-primary-foreground" />
              <Text className="font-montserrat text-primary-foreground text-[9px] font-semibold uppercase tracking-[1px]">
                Selected
              </Text>
            </View>
          ) : null}
        </View>

        <View className="flex-row items-center gap-1.5">
          <Icon as={Maximize2} size={12} className="text-muted-foreground" />
          <Text className="font-montserrat text-muted-foreground text-[12px]">{room.roomSize}</Text>
        </View>

        <Text className="font-montserrat text-muted-foreground text-[12px] leading-[18px]">{room.description}</Text>

        <View className="flex-row flex-wrap gap-1.5">
          {room.amenities.map((amenity) => (
            <View key={amenity} className="bg-secondary rounded-lg px-2.5 py-1">
              <Text className="font-montserrat text-muted-foreground text-[10.5px]">{amenity}</Text>
            </View>
          ))}
        </View>

        <View className="border-border flex-row items-end justify-between border-t pt-3">
          <View>
            <Text className="font-montserrat-medium text-foreground text-[18px]">
              {formatWithCommas(room.pointsPerNight)}
            </Text>
            <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
              pts / night
            </Text>
          </View>
          <Pressable onPress={onSelect}>
            <Animated.View style={[{ borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10 }, buttonStyle]}>
              <Animated.Text
                style={[
                  {
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 11,
                    fontWeight: '600',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                  },
                  buttonTextStyle,
                ]}>
                {selected ? 'Selected' : 'Select Room'}
              </Animated.Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
