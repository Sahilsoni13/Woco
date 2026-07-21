import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RoomType } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type BookingCtaBarProps = {
  room: RoomType | null;
  onPress: () => void;
};

// Rendered unconditionally now (the parent used to conditionally mount this
// on `selectedRoom`) so it can animate BOTH ways — React unmounting it the
// instant a room is deselected left zero time for an exit animation to ever
// play, only the entrance (added when RequestBookingSheet, which this bar
// opens, got its own slide-up-from-bottom in FilterSheet.tsx) could animate.
// `lastRoom` caches the most recently selected room so the bar keeps
// rendering its content while sliding/fading out even after `room` goes
// null; `pointerEvents` is turned off immediately on deselect so the
// fading-out bar can't still be tapped. Before any room is ever selected,
// `lastRoom` is null and this renders nothing, matching the original
// "not shown in a non-actionable state" behavior.
export function BookingCtaBar({ room, onPress }: BookingCtaBarProps) {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const [lastRoom, setLastRoom] = React.useState(room);

  React.useEffect(() => {
    if (room) setLastRoom(room);
  }, [room]);

  React.useEffect(() => {
    progress.value = withTiming(room ? 1 : 0, { duration: 280 });
  }, [room, progress]);

  const barStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 32 }],
  }));

  if (!lastRoom) return null;

  return (
    <Animated.View
      pointerEvents={room ? 'auto' : 'none'}
      style={[{ position: 'absolute', bottom: 0, left: 0, right: 0 }, barStyle]}>
      <View
        className="border-border bg-background flex-row items-center gap-3 border-t px-5 pt-3 shadow-lg shadow-black/10"
        style={{ paddingBottom: insets.bottom + 12 }}>
        <View className="flex-1">
          <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
            Selected
          </Text>
          <Text numberOfLines={1} className="font-montserrat-medium text-foreground text-[13px]">
            {lastRoom.name} · {formatWithCommas(lastRoom.pointsPerNight)} pts/night
          </Text>
        </View>
        <Pressable onPress={onPress} className="bg-primary active:opacity-90 rounded-full px-6 py-3">
          <Text className="font-montserrat text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
            Request to Book
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
