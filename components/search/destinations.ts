export type Destination = {
  city: string;
  country: string;
};

// Placeholder destination list for the UI-only location picker — mirrors LTX
// web's popular-destinations grid (src/components/landing/header.tsx), which
// there is populated from a real API. No backend search exists yet, so this
// is just static content to make the picker feel real.
export const POPULAR_DESTINATIONS: Destination[] = [
  { city: 'Paris', country: 'France' },
  { city: 'Santorini', country: 'Greece' },
  { city: 'Bali', country: 'Indonesia' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Maldives', country: 'Maldives' },
  { city: 'Zermatt', country: 'Switzerland' },
  { city: 'Kyoto', country: 'Japan' },
  { city: 'Marrakech', country: 'Morocco' },
  { city: 'Amalfi Coast', country: 'Italy' },
];
