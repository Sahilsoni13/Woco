import { BookingCard } from '@/components/booking/BookingCard';
import { BookingsEmptyState } from '@/components/booking/BookingsEmptyState';
import { BOOKING_TABS, MOCK_ALL_BOOKINGS } from '@/components/booking/mock-data';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingScreen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const tab = BOOKING_TABS[activeTab];

  const filtered = MOCK_ALL_BOOKINGS.filter((booking) => {
    if (tab.statuses && !tab.statuses.includes(booking.status)) return false;
    if (query.trim()) {
      const haystack = `${booking.hotelName} ${booking.city} ${booking.country} ${booking.bookingNumber}`.toLowerCase();
      if (!haystack.includes(query.trim().toLowerCase())) return false;
    }
    return true;
  });

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="gap-4 px-5 pb-3 pt-4">
        <Text className="text-foreground text-[22px] font-semibold">Bookings</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pr-5">
          {BOOKING_TABS.map((t, index) => {
            const active = index === activeTab;
            return (
              <Pressable
                key={t.label}
                onPress={() => setActiveTab(index)}
                className={cn('rounded-full px-4 py-2', active ? 'bg-primary' : 'border-border border')}>
                <Text
                  className={cn(
                    'font-montserrat-medium text-[13px]',
                    active ? 'text-primary-foreground' : 'text-muted-foreground'
                  )}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="border-border flex-row items-center gap-2 rounded-full border px-4">
          <Icon as={Search} size={15} className="text-muted-foreground" />
          <Input
            value={query}
            onChangeText={setQuery}
            placeholder="Search by hotel, city, or booking ref..."
            className="native:h-auto text-sm flex-1 border-0 bg-transparent p-0 shadow-none"
          />
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-4 px-5 pb-8" showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <BookingsEmptyState tabLabel={tab.label} isSearching={!!query.trim()} />
        ) : (
          filtered.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
