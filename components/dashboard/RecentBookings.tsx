import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { CalendarDays } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';
import { MOCK_BOOKINGS, STATUS_DESCRIPTIONS, STATUS_STYLES } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function RecentBookings() {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground text-base font-semibold">Recent Bookings</Text>
        <Link href="/booking" asChild>
          <Pressable>
            <Text className="font-montserrat-medium text-ltx-gold text-[13px]">View All</Text>
          </Pressable>
        </Link>
      </View>

      {MOCK_BOOKINGS.length === 0 ? (
        <View className="border-border items-center rounded-2xl border px-6 py-10">
          <Text variant="muted" className="text-sm">
            No booking requests yet.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {MOCK_BOOKINGS.map((booking) => {
            const status = STATUS_STYLES[booking.status];
            return (
              <Pressable
                key={booking.id}
                className="border-border active:border-foreground/30 gap-3 rounded-2xl border p-3">
                <View className="flex-row gap-3">
                  <View className="h-20 w-24 overflow-hidden rounded-xl">
                    <Image source={{ uri: booking.photo }} resizeMode="cover" style={{ flex: 1 }} />
                  </View>
                  <View className="flex-1 justify-center gap-1">
                    <Text numberOfLines={1} className="font-montserrat text-muted-foreground text-[11px]">
                      {booking.city}
                    </Text>
                    <Text numberOfLines={1} className="font-montserrat-medium text-foreground text-[14px]">
                      {booking.hotelName}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <View className={cn('rounded-full px-2 py-0.5', status.className)}>
                        <Text className="font-montserrat text-[9px] font-medium uppercase text-white">
                          {status.label}
                        </Text>
                      </View>
                    </View>
                    <Text numberOfLines={2} className="font-montserrat text-muted-foreground text-[10px] leading-[14px]">
                      {STATUS_DESCRIPTIONS[booking.status]}
                    </Text>
                  </View>
                </View>

                <View className="border-border flex-row items-center justify-between border-t pt-2.5">
                  <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center gap-1">
                      <Icon as={CalendarDays} size={11} className="text-muted-foreground" />
                      <Text className="font-montserrat text-muted-foreground text-[11px]">
                        {booking.checkIn} – {booking.checkOut}
                      </Text>
                    </View>
                    <Text className="font-montserrat text-muted-foreground text-[11px]">
                      {booking.nights} Nights
                    </Text>
                  </View>
                  <Text className="font-montserrat-medium text-foreground text-[11px]">
                    {formatWithCommas(booking.points)} pts used
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
