import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { CircleCheck, Maximize2 } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import type { RoomType } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type RoomTypeCardProps = {
  room: RoomType;
  selected: boolean;
  onSelect: () => void;
};

export function RoomTypeCard({ room, selected, onSelect }: RoomTypeCardProps) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-2xl border bg-background',
        selected ? 'border-foreground' : 'border-border'
      )}>
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
          <Pressable
            onPress={onSelect}
            className={cn(
              'rounded-full px-5 py-2.5',
              selected ? 'bg-primary' : 'border-foreground border'
            )}>
            <Text
              className={cn(
                'font-montserrat text-[11px] font-semibold uppercase tracking-[1.5px]',
                selected ? 'text-primary-foreground' : 'text-foreground'
              )}>
              {selected ? 'Selected' : 'Select Room'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
