import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { RoomTypeCard } from './RoomTypeCard';
import type { HotelDetail } from './mock-data';

type RoomCollectionSectionProps = {
  hotel: HotelDetail;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
};

// Web's `RoomCollection` shows either a live TBO search result grid or a
// static "Use Check Availability to see live pricing" placeholder — there's
// no live search here, so this always shows the real catalog room types
// directly, tappable to select rather than requiring a separate search step.
export function RoomCollectionSection({ hotel, selectedRoomId, onSelectRoom }: RoomCollectionSectionProps) {
  return (
    <View className="border-border gap-4 border-t px-5 py-8">
      <View>
        <Text className="text-[24px] leading-[28px]">
          <Text className="font-montserrat text-foreground text-[24px]">Suite &amp; Room </Text>
          <Text className="font-playfair text-foreground text-[24px] italic">Collection</Text>
        </Text>
        <Text className="font-montserrat text-muted-foreground mt-1 text-[13px]">
          Select a room to request your stay
        </Text>
      </View>

      <View className="gap-4">
        {hotel.roomTypes.map((room) => (
          <RoomTypeCard
            key={room.id}
            room={room}
            selected={selectedRoomId === room.id}
            onSelect={() => onSelectRoom(room.id)}
          />
        ))}
      </View>
    </View>
  );
}
