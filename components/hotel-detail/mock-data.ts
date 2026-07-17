import { MOCK_HOTELS, type Hotel } from '@/components/hotels/mock-data';

// Placeholder data — web's `/hotels/[id]` fetches this hotel-by-hotel from a
// real API, plus a live TBO room-availability search. No backend exists
// here, so detail fields are templated from the shared `MOCK_HOTELS` catalog
// (same 14 hotels as the listing page) rather than hand-authored per hotel —
// reviews/ratings/amenities/perks are shared static content across every
// hotel, matching how web's own HotelReviews/HotelAmenities components
// render the same content regardless of which hotel you're viewing.

export type RoomType = {
  id: string;
  name: string;
  description: string;
  roomSize: string;
  photo: string;
  pointsPerNight: number;
  amenities: string[];
};

export type HotelDetail = Hotel & {
  address: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  images: string[];
  roomTypes: RoomType[];
};

const GALLERY_PHOTOS = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
];

const ROOM_TEMPLATES: { name: string; size: string; amenities: string[]; multiplier: number }[] = [
  { name: 'Deluxe Room', size: '38 m²', amenities: ['King Bed', 'City View', 'Free WiFi', 'Minibar'], multiplier: 1 },
  {
    name: 'Premier Suite',
    size: '62 m²',
    amenities: ['King Bed', 'Private Balcony', 'Soaking Tub', 'Lounge Access'],
    multiplier: 1.35,
  },
  {
    name: 'Signature Villa',
    size: '110 m²',
    amenities: ['Private Pool', 'Butler Service', 'Ocean View', 'Outdoor Shower'],
    multiplier: 1.75,
  },
];

function buildRoomTypes(hotel: Hotel): RoomType[] {
  return ROOM_TEMPLATES.map((template, index) => ({
    id: `${hotel.id}-room-${index + 1}`,
    name: template.name,
    description: `A refined retreat at ${hotel.name}, thoughtfully appointed for discerning members.`,
    roomSize: template.size,
    photo: GALLERY_PHOTOS[index % GALLERY_PHOTOS.length],
    pointsPerNight: Math.round(hotel.pointsPerNight * template.multiplier),
    amenities: template.amenities,
  }));
}

export function getHotelDetail(id: string): HotelDetail | null {
  const hotel = MOCK_HOTELS.find((h) => h.id === id);
  if (!hotel) return null;

  return {
    ...hotel,
    address: `${hotel.city}, ${hotel.country}`,
    description: `Set amid the ${hotel.country} landscape, ${hotel.name} pairs absolute privacy with uncompromising service — a sanctuary reserved exclusively for members seeking quiet luxury. Every detail, from arrival to departure, is arranged by a dedicated lifestyle manager.`,
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    images: [hotel.photo, ...GALLERY_PHOTOS],
    roomTypes: buildRoomTypes(hotel),
  };
}

export const RATING_CATEGORIES: { label: string; score: number }[] = [
  { label: 'Service', score: 4.8 },
  { label: 'Location', score: 4.8 },
  { label: 'Gastronomy', score: 4.8 },
  { label: 'Wellness', score: 4.8 },
];

export const MEMBER_REVIEW = {
  rating: 4.8,
  quote:
    'The level of discretion and service at this property is unparalleled. The Michelin restaurant overlooking the coast is worth the trip alone. A true sanctuary for those who value quiet luxury.',
  author: 'Sophia Laurent',
  memberSince: 'Member since 2023',
};

export const CURATED_AMENITIES: { label: string; icon: 'pool' | 'dining' | 'spa' | 'yacht' }[] = [
  { label: 'Infinity Pool', icon: 'pool' },
  { label: 'Michelin Dining', icon: 'dining' },
  { label: 'Private SPA', icon: 'spa' },
  { label: 'Yacht Charter', icon: 'yacht' },
];

export const PRIVILEGED_PERKS: { title: string; description: string; icon: 'concierge' | 'transfer' | 'wine' | 'upgrade' }[] = [
  {
    title: 'Concierge Access',
    description: 'Priority table bookings and event access through your dedicated lifestyle manager.',
    icon: 'concierge',
  },
  {
    title: 'VIP Airport Transfer',
    description: 'Complimentary private jet terminal pickup in our chauffeured electric fleet.',
    icon: 'transfer',
  },
  {
    title: 'Exclusive Wine Cellar',
    description: 'Private tasting sessions of rare vintages led by our resident Sommelier.',
    icon: 'wine',
  },
  {
    title: 'Priority Upgrades',
    description: 'Guaranteed suite upgrades upon availability for Elite Tier members.',
    icon: 'upgrade',
  },
];

export const GOOD_TO_KNOW = {
  childPolicy:
    "Children over 12 years are welcome. Our Kids' Elite Club offers curated cultural experiences during peak summer months.",
  finePrint: 'Smart casual dress code for dining. Advance spa bookings recommended 72 hours prior to arrival.',
};
