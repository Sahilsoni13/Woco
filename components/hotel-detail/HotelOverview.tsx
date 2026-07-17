import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { MapPin, Star } from 'lucide-react-native';
import { View } from 'react-native';
import type { HotelDetail } from './mock-data';

export function HotelOverview({ hotel }: { hotel: HotelDetail }) {
  const words = hotel.name.trim().split(' ');
  const lastWord = words[words.length - 1];
  const rest = words.slice(0, -1).join(' ');

  return (
    <View className="gap-4 px-5 py-6">
      <Text className="text-[30px] leading-[34px]">
        {rest ? <Text className="font-montserrat text-foreground text-[30px]">{rest} </Text> : null}
        <Text className="font-playfair text-foreground text-[30px] italic">{lastWord}</Text>
      </Text>

      <View className="flex-row flex-wrap items-center gap-3">
        <View className="flex-row items-center gap-1">
          {Array.from({ length: hotel.rating }).map((_, index) => (
            <Icon key={index} as={Star} size={13} className="fill-amber-500 text-amber-500" />
          ))}
        </View>
        <View className="bg-border h-4 w-px" />
        <View className="flex-row items-center gap-1.5">
          <Icon as={MapPin} size={13} className="text-muted-foreground" />
          <Text className="font-montserrat text-muted-foreground text-[13px]">{hotel.address}</Text>
        </View>
        <View className="bg-border h-4 w-px" />
        <Text className="font-montserrat text-muted-foreground text-[12px]">
          Check-in {hotel.checkInTime} · Check-out {hotel.checkOutTime}
        </Text>
      </View>

      <Text className="font-montserrat text-muted-foreground text-[13px] leading-[21px]">{hotel.description}</Text>
    </View>
  );
}
