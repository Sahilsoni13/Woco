// Placeholder data — web's `LTX/src/app/hotels/page.tsx` fetches this from a
// real hotels API (`publicHotelsApi.getAll()`, live TBO search, destinations,
// points config) that doesn't exist in this app yet. UI-only, reusing the
// same hotel names/photos already seeded in components/landing/Hotels.tsx
// and components/booking/mock-data.ts for a consistent world across the app.

export type Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  rating: number;
  photo: string;
  pointsPerNight: number;
  /** Fake ordering fields so "Most Popular" / "Newest" sorts aren't no-ops. */
  mockPopularityRank: number;
  mockNewestRank: number;
};

const PHOTOS = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
];

// name, city, country, countryCode, rating, pointsPerNight
const RAW: [string, string, string, string, number, number][] = [
  ['Villa Aurelia', 'Paris', 'France', 'FR', 5, 3200],
  ['Cliffside Sanctuary', 'Santorini', 'Greece', 'GR', 5, 2800],
  ['Tirta Retreat', 'Bali', 'Indonesia', 'ID', 4, 1800],
  ['Desert Rose Estate', 'Dubai', 'UAE', 'AE', 5, 4200],
  ['Casa Solmare', 'Maldives', 'Maldives', 'MV', 5, 4600],
  ['Alpine Reverie', 'Zermatt', 'Switzerland', 'CH', 5, 3600],
  ['Sakura Pavilion', 'Kyoto', 'Japan', 'JP', 4, 2400],
  ['Kasbah Al Noor', 'Marrakech', 'Morocco', 'MA', 4, 1400],
  ['Coastal Horizon Villa', 'Amalfi Coast', 'Italy', 'IT', 5, 3400],
  ['Lakeside Serenity Lodge', 'Zermatt', 'Switzerland', 'CH', 4, 2100],
  ['Golden Dune Palace', 'Dubai', 'UAE', 'AE', 5, 3900],
  ['Riviera Blue Villa', 'Amalfi Coast', 'Italy', 'IT', 4, 2600],
  ['Jasmine Court Riad', 'Marrakech', 'Morocco', 'MA', 3, 1200],
  ['Emerald Bay Retreat', 'Bali', 'Indonesia', 'ID', 5, 3100],
];

export const MOCK_HOTELS: Hotel[] = RAW.map(([name, city, country, countryCode, rating, pointsPerNight], index) => ({
  id: String(index + 1),
  name,
  city,
  country,
  countryCode,
  rating,
  photo: PHOTOS[index % PHOTOS.length],
  pointsPerNight,
  mockPopularityRank: (index * 7) % RAW.length,
  // Ascending = older to newer, so sorting "Newest" first means descending
  // by this rank — deliberately the reverse of catalog/"Recommended" order.
  mockNewestRank: index,
}));

export const HOTELS_STATS = [
  { value: '2,500+', label: 'Curated Estates' },
  { value: '48', label: 'Countries' },
  { value: 'Members Only', label: 'Access' },
];

export type FilterOption = { label: string; value: string };

export const POINTS_FILTER_OPTIONS: (FilterOption & { min: number; max: number })[] = [
  { label: 'Under 1,500 pts', value: '0-1500', min: 0, max: 1500 },
  { label: '1,500 – 2,000', value: '1500-2000', min: 1500, max: 2000 },
  { label: '2,000 – 3,000', value: '2000-3000', min: 2000, max: 3000 },
  { label: '3,000 – 4,000', value: '3000-4000', min: 3000, max: 4000 },
  { label: '4,000+', value: '4000+', min: 4000, max: Infinity },
];

// Web always shows all 5 star options regardless of data (its comment: the
// group is intentionally static) — mirrored here.
export const STAR_FILTER_OPTIONS: FilterOption[] = [5, 4, 3, 2, 1].map((n) => ({
  label: `${n} Star${n > 1 ? 's' : ''}`,
  value: String(n),
}));

// Only destinations that actually have a hotel are shown, same as web.
export const DESTINATION_FILTER_OPTIONS: FilterOption[] = Array.from(
  new Map(MOCK_HOTELS.map((h) => [h.countryCode, h.country])).entries()
).map(([value, label]) => ({ label, value }));

export const SORT_OPTIONS: FilterOption[] = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
  { label: 'Star Rating', value: 'starRating' },
];

export const HOTELS_PER_PAGE = 6;
