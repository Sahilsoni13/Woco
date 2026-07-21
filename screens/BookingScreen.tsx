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
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookingScreen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const tab = BOOKING_TABS[activeTab];

  // Tabs previously just changed color on tap with no scroll behavior at
  // all — selecting one near the trailing edge could leave it half-cut-off
  // if the row hadn't already been scrolled that far. `tabLayouts` caches
  // each Pressable's own x/width (each is a direct child of the ScrollView,
  // so `onLayout`'s x is already relative to the scrollable content — same
  // space `scrollTo({x})` expects, unlike the mistake made with a *nested*
  // child in HotelReviewsSection's onLayout bug) so the selected tab can be
  // scrolled to the horizontal center of the visible row.
  const scrollRef = React.useRef<ScrollView>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const tabLayouts = React.useRef<Record<number, { x: number; width: number }>>({});

  function handleSelectTab(index: number) {
    setActiveTab(index);
    const layout = tabLayouts.current[index];
    if (!layout || !viewportWidth) return;
    const targetX = layout.x + layout.width / 2 - viewportWidth / 2;
    scrollRef.current?.scrollTo({ x: Math.max(targetX, 0), animated: true });
  }

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
          ref={scrollRef}
          onLayout={(e) => setViewportWidth(e.nativeEvent.layout.width)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pr-5">
          {BOOKING_TABS.map((t, index) => {
            const active = index === activeTab;
            return (
              <Pressable
                key={t.label}
                onPress={() => handleSelectTab(index)}
                onLayout={(e) => {
                  tabLayouts.current[index] = { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width };
                }}
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

      <KeyboardAwareScrollView
        contentContainerClassName="gap-4 px-5 pb-8"
        keyboardShouldPersistTaps="handled"
        // bottomOffset={20}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <BookingsEmptyState tabLabel={tab.label} isSearching={!!query.trim()} />
        ) : (
          filtered.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
