import { Cta } from '@/components/landing/Cta';
import { Trust } from '@/components/landing/Trust';
import Testimonial from '@/components/landing/Testimonial';
import { HotelCard } from '@/components/hotels/HotelCard';
import { HotelsEmptyState } from '@/components/hotels/HotelsEmptyState';
import {
  emptyHotelFilterSelection,
  HotelsFiltersSheet,
  type HotelFilterSelection,
} from '@/components/hotels/HotelsFiltersSheet';
import { HotelsHero } from '@/components/hotels/HotelsHero';
import { HotelsPagination } from '@/components/hotels/HotelsPagination';
import { HOTELS_PER_PAGE, MOCK_HOTELS, SORT_OPTIONS, type Hotel } from '@/components/hotels/mock-data';
import { SortSheet } from '@/components/hotels/SortSheet';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ChevronDown, SlidersHorizontal } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';

function matchesFilters(hotel: Hotel, filters: HotelFilterSelection): boolean {
  if (filters.destination.size > 0 && !filters.destination.has(hotel.countryCode)) return false;
  if (filters.stars.size > 0 && !filters.stars.has(String(hotel.rating))) return false;
  if (filters.points.size > 0) {
    const inRange = [...filters.points].some((value) => {
      if (value === '4000+') return hotel.pointsPerNight >= 4000;
      const [min, max] = value.split('-').map(Number);
      return hotel.pointsPerNight >= min && hotel.pointsPerNight < max;
    });
    if (!inRange) return false;
  }
  return true;
}

function sortHotels(hotels: Hotel[], sort: string): Hotel[] {
  const sorted = [...hotels];
  switch (sort) {
    case 'popular':
      return sorted.sort((a, b) => a.mockPopularityRank - b.mockPopularityRank);
    case 'newest':
      return sorted.sort((a, b) => b.mockNewestRank - a.mockNewestRank);
    case 'starRating':
      return sorted.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function HotelsScreen() {
  const [filters, setFilters] = React.useState<HotelFilterSelection>(emptyHotelFilterSelection());
  const [sort, setSort] = React.useState('recommended');
  const [page, setPage] = React.useState(1);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);

  const filtered = React.useMemo(
    () => sortHotels(MOCK_HOTELS.filter((hotel) => matchesFilters(hotel, filters)), sort),
    [filters, sort]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / HOTELS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * HOTELS_PER_PAGE, page * HOTELS_PER_PAGE);
  const totalSelected = Object.values(filters).reduce((sum, set) => sum + set.size, 0);
  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Recommended';

  return (
    <PublicPageLayout>
      <HotelsHero />

      <View className="gap-5 bg-secondary px-5 py-10">
        <View className="flex-row items-center justify-between gap-3">
          <Pressable
            onPress={() => setFiltersOpen(true)}
            className={cn(
              'flex-row items-center gap-2 rounded-full border px-4 py-2.5',
              totalSelected > 0 ? 'bg-primary border-primary' : 'border-border bg-background'
            )}>
            <Icon
              as={SlidersHorizontal}
              size={14}
              className={totalSelected > 0 ? 'text-primary-foreground' : 'text-foreground'}
            />
            <Text
              className={cn(
                'font-montserrat text-[13px] font-medium',
                totalSelected > 0 ? 'text-primary-foreground' : 'text-foreground'
              )}>
              Filters
            </Text>
            {totalSelected > 0 ? (
              <View className="bg-primary-foreground h-5 w-5 items-center justify-center rounded-full">
                <Text className="font-montserrat text-primary text-[10px] font-bold">{totalSelected}</Text>
              </View>
            ) : null}
          </Pressable>

          <Pressable
            onPress={() => setSortOpen(true)}
            className="border-border bg-background flex-row items-center gap-2 rounded-full border px-4 py-2.5">
            <Text className="font-montserrat text-foreground text-[12px] font-medium">Sort: {sortLabel}</Text>
            <Icon as={ChevronDown} size={14} className="text-foreground" />
          </Pressable>
        </View>

        <Text className="font-montserrat text-muted-foreground text-[13px]">
          Showing <Text className="text-foreground font-semibold">{filtered.length}</Text> estate
          {filtered.length !== 1 ? 's' : ''}
        </Text>

        {paginated.length === 0 ? (
          <HotelsEmptyState
            onClearFilters={() => {
              setFilters(emptyHotelFilterSelection());
              setPage(1);
            }}
          />
        ) : (
          <View className="flex-row flex-wrap gap-4">
            {paginated.map((hotel) => (
              <View key={hotel.id} className="w-[47%]">
                <HotelCard hotel={hotel} />
              </View>
            ))}
          </View>
        )}

        <HotelsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </View>

      <Testimonial />
      <Trust />
      <Cta />

      <HotelsFiltersSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        selection={filters}
        onApply={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      <SortSheet
        open={sortOpen}
        onOpenChange={setSortOpen}
        sort={sort}
        onChange={(value) => {
          setSort(value);
          setPage(1);
        }}
      />
    </PublicPageLayout>
  );
}
