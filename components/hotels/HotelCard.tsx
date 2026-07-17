import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import type { Hotel } from './mock-data';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link href={`/hotels/${hotel.id}` as Href} asChild>
      <Pressable className="active:border-foreground/30 overflow-hidden rounded-2xl border border-border">
        <View className="aspect-[4/3]">
          <Image source={{ uri: hotel.photo }} resizeMode="cover" style={{ flex: 1 }} />
        </View>
        <View className="gap-1.5 p-4">
          <View className="flex-row items-center gap-1">
            <Icon as={MapPin} size={11} className="text-muted-foreground" />
            <Text numberOfLines={1} className="font-montserrat flex-1 text-[11px] text-muted-foreground">
              {hotel.city}, {hotel.country}
            </Text>
          </View>
          <Text numberOfLines={1} className="font-montserrat-medium text-foreground text-[14px]">
            {hotel.name}
          </Text>
          <View className="border-border flex-row items-center justify-between border-t pt-2.5">
            <View className="flex-row gap-0.5">
              {Array.from({ length: hotel.rating }).map((_, index) => (
                <Icon key={index} as={Star} size={10} className="fill-amber-500 text-amber-500" />
              ))}
            </View>
            <Text className="font-montserrat text-muted-foreground text-[10px]">Members only</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
