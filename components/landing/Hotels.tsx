import { HotelCard } from '@/components/hotels/HotelCard';
import { MOCK_HOTELS } from '@/components/hotels/mock-data';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

// Was its own separate mock catalog (ids '0'-'8', built from
// components/search/destinations.ts's POPULAR_DESTINATIONS) with a
// hand-duplicated copy of components/hotels/HotelCard.tsx's markup inline —
// its cards didn't link anywhere at all, and even a Link would have pointed
// at ids that don't exist in components/hotels/mock-data.ts's real catalog
// (ids '1'-'14'), the one /hotels and /hotels/[id] actually read from. Now
// reuses that same catalog + the same HotelCard component directly, so
// tapping a card here lands on the exact same hotel a user would reach from
// the full /hotels listing — one shared source of hotel data and one shared
// card, not two of each.

export function Hotels() {
  const [activeCountry, setActiveCountry] = React.useState('All');

  const filters = React.useMemo(
    () => ['All', ...Array.from(new Set(MOCK_HOTELS.map((h) => h.country)))],
    []
  );
  const filtered =
    activeCountry === 'All' ? MOCK_HOTELS : MOCK_HOTELS.filter((h) => h.country === activeCountry);

  // Same scroll-to-center-on-select fix as BookingScreen.tsx's status tabs —
  // see that memory note for why each Pressable's onLayout.x is safe to use
  // directly here (a direct child of the ScrollView, not a nested one).
  const scrollRef = React.useRef<ScrollView>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const filterLayouts = React.useRef<Record<string, { x: number; width: number }>>({});

  function handleSelectFilter(filter: string) {
    setActiveCountry(filter);
    const layout = filterLayouts.current[filter];
    if (!layout || !viewportWidth) return;
    const targetX = layout.x + layout.width / 2 - viewportWidth / 2;
    scrollRef.current?.scrollTo({ x: Math.max(targetX, 0), animated: true });
  }

  return (
    <View className="gap-6 bg-background px-5 py-12">
      <View>
        <View className="flex-row items-center justify-center gap-4 mb-3">
          <View className="h-px w-10 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
            Curated Estates
          </Text>
          <View className="h-px w-10 bg-foreground" />
        </View>
        <Text className="text-[28px] leading-[32px]">
          <Text className="text-center font-montserrat text-[24px] text-foreground">
            Explore popular{' '}
          </Text>
          <Text className="text-center font-playfair text-[24px] text-foreground">
            destinations
          </Text>
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        onLayout={(e) => setViewportWidth(e.nativeEvent.layout.width)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 pr-5">
        {filters.map((filter) => {
          const active = filter === activeCountry;
          return (
            <Pressable
              key={filter}
              onPress={() => handleSelectFilter(filter)}
              onLayout={(e) => {
                filterLayouts.current[filter] = { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width };
              }}
              className={cn(
                'rounded-full px-5 py-2',
                active ? 'bg-primary' : 'border border-border'
              )}>
              <Text
                className={cn(
                  'font-montserrat-medium text-[13px]',
                  active ? 'text-primary-foreground' : 'text-muted-foreground'
                )}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {filtered.length === 0 ? (
        <View className="items-center py-16">
          <Text variant="muted" className="text-sm">
            No estates found
          </Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap gap-4">
          {filtered.map((hotel) => (
            <View key={hotel.id} className="w-[47%]">
              <HotelCard hotel={hotel} />
            </View>
          ))}
        </View>
      )}

      <Link href="/hotels" asChild>
        <Pressable className="flex-row items-center gap-2 self-center active:opacity-70">
          <Text className="font-montserrat-medium text-[13px] text-foreground underline">
            Explore all estates
          </Text>
          <Icon as={ArrowRight} size={14} className="text-foreground" />
        </Pressable>
      </Link>
    </View>
  );
}
