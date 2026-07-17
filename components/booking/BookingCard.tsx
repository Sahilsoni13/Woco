import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { CalendarDays, MapPin, Users } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import { STATUS_BADGES, type Booking } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function BookingCard({ booking }: { booking: Booking }) {
  const badge = STATUS_BADGES[booking.status];

  return (
    <View className="border-border overflow-hidden rounded-2xl border">
      <View className="h-36 w-full">
        <Image source={{ uri: booking.photo }} resizeMode="cover" style={{ flex: 1 }} />
      </View>

      <View className="gap-3 p-4">
        <View className="flex-row items-start justify-between gap-2">
          <View className={cn('rounded border px-2 py-0.5', badge.className)}>
            <Text className={cn('font-montserrat text-[10px] font-semibold uppercase tracking-[1px]', badge.textClassName)}>
              {badge.label}
            </Text>
          </View>
          <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[0.5px]">
            Ref: {booking.bookingNumber}
          </Text>
        </View>

        <Text className="font-playfair text-foreground text-[19px]">{booking.hotelName}</Text>

        <View className="gap-1.5">
          <View className="flex-row items-center gap-2">
            <Icon as={MapPin} size={12} className="text-muted-foreground" />
            <Text className="font-montserrat text-muted-foreground text-[12px]">
              {booking.city}, {booking.country}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon as={CalendarDays} size={12} className="text-muted-foreground" />
            <Text className="font-montserrat text-muted-foreground text-[12px]">
              {booking.checkIn} — {booking.checkOut}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon as={Users} size={12} className="text-muted-foreground" />
            <Text className="font-montserrat text-muted-foreground text-[12px]">
              {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {booking.points > 0 ? (
          <View className="border-border flex-row items-center justify-between border-t pt-3">
            <Text className="font-montserrat text-muted-foreground text-[11px]">Points used</Text>
            <Text className="font-montserrat-medium text-foreground text-[12px]">
              {formatWithCommas(booking.points)} pts
            </Text>
          </View>
        ) : null}

        <Link href={`/booking/${booking.id}`} asChild>
          <Pressable className="bg-primary active:bg-primary/90 items-center rounded-full py-2.5">
            <Text className="font-montserrat text-primary-foreground text-[11px] font-semibold uppercase tracking-[1.5px]">
              View Details
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
