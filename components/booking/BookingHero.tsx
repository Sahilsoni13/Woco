import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { MapPin, Star } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { STATUS_BADGES, type Booking } from './mock-data';

export function BookingHero({ booking }: { booking: Booking }) {
  const badge = STATUS_BADGES[booking.status];

  return (
    <View className="h-64 w-full overflow-hidden rounded-b-3xl">
      <Image source={{ uri: booking.photo }} resizeMode="cover" style={{ flex: 1 }} />

      {/* Scrim instead of a gradient lib (none installed) — flat opacity is
          enough contrast for the overlaid text at this darkness level. */}
      <View className="absolute inset-0 bg-black/25" />

      <View className={cn('absolute right-4 top-4 rounded-full border px-3 py-1', badge.className)}>
        <Text className={cn('font-montserrat text-[10px] font-semibold uppercase tracking-[1px]', badge.textClassName)}>
          {badge.label}
        </Text>
      </View>

      <View className="absolute bottom-0 left-0 right-0 gap-1.5 p-5">
        <View className="flex-row items-center gap-1">
          {Array.from({ length: booking.starRating }).map((_, index) => (
            <Icon key={index} as={Star} size={12} className="fill-ltx-gold text-ltx-gold" />
          ))}
        </View>
        <Text className="font-playfair text-[24px] leading-[28px] text-white">{booking.hotelName}</Text>
        <View className="flex-row items-center gap-1.5">
          <Icon as={MapPin} size={12} className="text-white/80" />
          <Text className="font-montserrat text-[12px] text-white/80">{booking.address}</Text>
        </View>
      </View>
    </View>
  );
}
