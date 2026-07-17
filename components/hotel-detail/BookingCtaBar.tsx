import { Text } from '@/components/ui/text';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RoomType } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type BookingCtaBarProps = {
  room: RoomType;
  onPress: () => void;
};

// Only rendered once a room is selected — each RoomTypeCard's own "Select
// Room" button is the primary action before that, so this bar isn't shown
// in a non-actionable "nothing picked yet" state (unlike web's version,
// which is always visible with 3 different states).
export function BookingCtaBar({ room, onPress }: BookingCtaBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-border bg-background absolute bottom-0 left-0 right-0 flex-row items-center gap-3 border-t px-5 pt-3 shadow-lg shadow-black/10"
      style={{ paddingBottom: insets.bottom + 12 }}>
      <View className="flex-1">
        <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
          Selected
        </Text>
        <Text numberOfLines={1} className="font-montserrat-medium text-foreground text-[13px]">
          {room.name} · {formatWithCommas(room.pointsPerNight)} pts/night
        </Text>
      </View>
      <Pressable onPress={onPress} className="bg-primary active:opacity-90 rounded-full px-6 py-3">
        <Text className="font-montserrat text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
          Request to Book
        </Text>
      </Pressable>
    </View>
  );
}
