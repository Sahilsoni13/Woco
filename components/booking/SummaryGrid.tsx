import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BedDouble, CalendarDays, Coins, Users } from 'lucide-react-native';
import { View } from 'react-native';
import type { Booking } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function occupancyLabel(booking: Booking): string {
  const parts = [`${booking.guests} Adult${booking.guests > 1 ? 's' : ''}`];
  if (booking.children > 0) parts.push(`${booking.children} Child${booking.children > 1 ? 'ren' : ''}`);
  return parts.join(', ');
}

export function SummaryGrid({ booking }: { booking: Booking }) {
  const items = [
    { icon: CalendarDays, label: 'Dates', value: `${booking.checkIn} — ${booking.checkOut}`, sub: `${booking.nights} nights` },
    { icon: Users, label: 'Occupancy', value: occupancyLabel(booking), sub: `${booking.rooms} room${booking.rooms > 1 ? 's' : ''}` },
    { icon: BedDouble, label: 'Room Type', value: booking.roomType, sub: null },
    {
      icon: Coins,
      label: 'Points Utilized',
      value: booking.points > 0 ? `${formatWithCommas(booking.points)} pts` : '—',
      sub: null,
    },
  ];

  return (
    <View className="flex-row flex-wrap gap-3">
      {items.map((item) => (
        <View key={item.label} className="border-border min-w-[47%] flex-1 gap-2 rounded-2xl border p-4">
          <View className="bg-secondary h-8 w-8 items-center justify-center rounded-full">
            <Icon as={item.icon} size={15} className="text-ltx-gold" />
          </View>
          <Text className="font-montserrat text-muted-foreground text-[10px] font-semibold uppercase tracking-[1px]">
            {item.label}
          </Text>
          <Text className="font-montserrat-medium text-foreground text-[13px] leading-[17px]">{item.value}</Text>
          {item.sub ? <Text className="font-montserrat text-muted-foreground text-[11px]">{item.sub}</Text> : null}
        </View>
      ))}
    </View>
  );
}
