import { POPULAR_DESTINATIONS } from '@/components/search/destinations';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { ArrowRight, MapPin, Star } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';

const PHOTOS = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
];

const HOTEL_NAMES = [
  'Villa Aurelia',
  'Cliffside Sanctuary',
  'Tirta Retreat',
  'Desert Rose Estate',
  'Casa Solmare',
  'Alpine Reverie',
  'Sakura Pavilion',
  'Kasbah Al Noor',
  'Coastal Horizon Villa',
];

const RATINGS = [5, 5, 5, 4, 5, 5, 4, 4, 5];

// Placeholder data — web fetches this section from a real hotels API
// (`publicHotelsApi.getAll()`) that doesn't exist in this app yet. Same
// reasoning as components/search/destinations.ts: UI-only for now, reusing
// the same destination list for a consistent world across the app.
const MOCK_HOTELS = POPULAR_DESTINATIONS.map((destination, index) => ({
  id: String(index),
  name: HOTEL_NAMES[index],
  city: destination.city,
  country: destination.country,
  rating: RATINGS[index],
  photo: PHOTOS[index % PHOTOS.length],
}));

export function Hotels() {
  const [activeCountry, setActiveCountry] = React.useState('All');

  const filters = React.useMemo(
    () => ['All', ...Array.from(new Set(MOCK_HOTELS.map((h) => h.country)))],
    []
  );
  const filtered =
    activeCountry === 'All' ? MOCK_HOTELS : MOCK_HOTELS.filter((h) => h.country === activeCountry);

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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 pr-5">
        {filters.map((filter) => {
          const active = filter === activeCountry;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveCountry(filter)}
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
              <Pressable className="overflow-hidden rounded-2xl border border-border active:border-foreground/30">
                <View className="aspect-[4/3]">
                  <Image source={{ uri: hotel.photo }} resizeMode="cover" style={{ flex: 1 }} />
                </View>
                <View className="gap-1.5 p-3">
                  <View className="flex-row items-center gap-1">
                    <Icon as={MapPin} size={11} className="text-muted-foreground" />
                    <Text
                      numberOfLines={1}
                      className="flex-1 font-montserrat text-[11px] text-muted-foreground">
                      {hotel.city}, {hotel.country}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    className="font-montserrat-medium text-[14px] text-foreground">
                    {hotel.name}
                  </Text>
                  <View className="flex-row items-center justify-between border-t border-border pt-2">
                    <View className="flex-row gap-0.5">
                      {Array.from({ length: hotel.rating }).map((_, i) => (
                        <Icon key={i} as={Star} size={10} color="#f59e0b" fill="#f59e0b" />
                      ))}
                    </View>
                    <Text className="font-montserrat text-[10px] text-muted-foreground">
                      Members only
                    </Text>
                  </View>
                </View>
              </Pressable>
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
