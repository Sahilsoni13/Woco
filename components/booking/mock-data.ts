// Placeholder data — web's `LTX/src/app/member/bookings/page.tsx` +
// `[id]/page.tsx` fetch this from `memberApi`, which has no equivalent in
// WocoApp yet. UI-only, same reasoning as components/dashboard/mock-data.ts —
// reuses the same hotel names/photos as components/landing/Hotels.tsx
// (matching its exact name→photo assignment) for a consistent world.

export type BookingStatus = 'CONFIRMED' | 'PENDING_APPROVAL' | 'COMPLETED' | 'CANCELLED' | 'FAILED';

export const STATUS_BADGES: Record<BookingStatus, { label: string; className: string; textClassName: string }> = {
  PENDING_APPROVAL: {
    label: 'Pending',
    className: 'bg-amber-50 border-amber-200',
    textClassName: 'text-amber-700',
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-emerald-50 border-emerald-200',
    textClassName: 'text-emerald-700',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-secondary border-border',
    textClassName: 'text-muted-foreground',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-50 border-red-200',
    textClassName: 'text-red-700',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-50 border-red-200',
    textClassName: 'text-red-700',
  },
};

// Bookings that can still be cancelled from the detail screen.
export const CANCELLABLE_STATUSES: BookingStatus[] = ['CONFIRMED', 'PENDING_APPROVAL'];

export type Guest = {
  name: string;
  isLead: boolean;
  type: 'Adult' | 'Child';
  phone?: string;
  email?: string;
};

export type Booking = {
  id: string;
  bookingNumber: string;
  hotelName: string;
  city: string;
  country: string;
  address: string;
  photo: string;
  starRating: number;
  status: BookingStatus;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  children: number;
  roomType: string;
  rooms: number;
  points: number;
  createdYear: number;
  guestList: Guest[];
  /** Shown in the failed/cancelled info banner; falls back to a generic message if unset. */
  notes?: string;
  /** Only meaningful for CANCELLED bookings. */
  refundedPoints?: number;
  /** Only meaningful for COMPLETED bookings that already have a review. */
  review?: { rating: number; text: string };
};

export const MOCK_ALL_BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingNumber: 'WC-B10234',
    hotelName: 'Villa Aurelia',
    city: 'Paris',
    country: 'France',
    address: '14 Rue de Rivoli, 75004',
    photo: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    starRating: 5,
    status: 'CONFIRMED',
    checkIn: '12 Aug 2026',
    checkOut: '18 Aug 2026',
    nights: 6,
    guests: 2,
    children: 0,
    roomType: 'Panoramic Suite',
    rooms: 1,
    points: 3200,
    createdYear: 2026,
    guestList: [
      { name: 'Alexandra Moreau', isLead: true, type: 'Adult', phone: '+44 7700 900123', email: 'alexandra@example.com' },
      { name: 'Julien Moreau', isLead: false, type: 'Adult' },
    ],
  },
  {
    id: '2',
    bookingNumber: 'WC-B10235',
    hotelName: 'Casa Solmare',
    city: 'North Malé Atoll',
    country: 'Maldives',
    address: 'Private Island, North Malé Atoll',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    starRating: 5,
    status: 'PENDING_APPROVAL',
    checkIn: '3 Sep 2026',
    checkOut: '9 Sep 2026',
    nights: 6,
    guests: 2,
    children: 0,
    roomType: 'Overwater Villa',
    rooms: 1,
    points: 4100,
    createdYear: 2026,
    guestList: [{ name: 'Alexandra Moreau', isLead: true, type: 'Adult', phone: '+44 7700 900123' }],
  },
  {
    id: '3',
    bookingNumber: 'WC-B10198',
    hotelName: 'Cliffside Sanctuary',
    city: 'Santorini',
    country: 'Greece',
    address: 'Oia Cliffside, Santorini 84702',
    photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    starRating: 5,
    status: 'COMPLETED',
    checkIn: '5 Jun 2026',
    checkOut: '10 Jun 2026',
    nights: 5,
    guests: 2,
    children: 0,
    roomType: 'Caldera View Suite',
    rooms: 1,
    points: 2800,
    createdYear: 2026,
    guestList: [{ name: 'Alexandra Moreau', isLead: true, type: 'Adult' }],
    review: {
      rating: 5,
      text: 'An unforgettable stay — the caldera view alone was worth the trip. Impeccable, quiet service throughout.',
    },
  },
  {
    id: '4',
    bookingNumber: 'WC-B10156',
    hotelName: 'Tirta Retreat',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Jl. Raya Ubud, Gianyar',
    photo: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    starRating: 4,
    status: 'COMPLETED',
    checkIn: '14 Apr 2026',
    checkOut: '20 Apr 2026',
    nights: 6,
    guests: 4,
    children: 2,
    roomType: 'Family Pool Villa',
    rooms: 2,
    points: 3600,
    createdYear: 2026,
    guestList: [
      { name: 'Alexandra Moreau', isLead: true, type: 'Adult' },
      { name: 'Julien Moreau', isLead: false, type: 'Adult' },
    ],
    // No `review` — this one still needs the "Add Review" prompt.
  },
  {
    id: '5',
    bookingNumber: 'WC-B10102',
    hotelName: 'Alpine Reverie',
    city: 'Zermatt',
    country: 'Switzerland',
    address: 'Bahnhofstrasse 12, 3920 Zermatt',
    photo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    starRating: 5,
    status: 'CANCELLED',
    checkIn: '1 Mar 2026',
    checkOut: '5 Mar 2026',
    nights: 4,
    guests: 2,
    children: 0,
    roomType: 'Matterhorn Suite',
    rooms: 1,
    points: 2200,
    createdYear: 2026,
    guestList: [{ name: 'Alexandra Moreau', isLead: true, type: 'Adult' }],
    notes: 'Cancelled 5 days before check-in, within the standard notice window.',
    refundedPoints: 1760,
  },
  {
    id: '6',
    bookingNumber: 'WC-B10087',
    hotelName: 'Sakura Pavilion',
    city: 'Kyoto',
    country: 'Japan',
    address: 'Higashiyama Ward, Kyoto 605-0862',
    photo: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    starRating: 4,
    status: 'FAILED',
    checkIn: '10 Feb 2026',
    checkOut: '14 Feb 2026',
    nights: 4,
    guests: 2,
    children: 0,
    roomType: 'Ryokan Suite',
    rooms: 1,
    points: 0,
    createdYear: 2026,
    guestList: [{ name: 'Alexandra Moreau', isLead: true, type: 'Adult' }],
    notes: 'We were unable to confirm this booking with the hotel. Any points held for this request have been released back to your balance.',
  },
];

export const BOOKING_TABS: { label: string; statuses: BookingStatus[] | null }[] = [
  { label: 'All', statuses: null },
  { label: 'Upcoming', statuses: ['CONFIRMED', 'PENDING_APPROVAL'] },
  { label: 'Completed', statuses: ['COMPLETED'] },
  { label: 'Cancelled', statuses: ['CANCELLED'] },
  { label: 'Failed', statuses: ['FAILED'] },
];

export const TIMELINE_STEPS = ['Request\nSubmitted', 'Under Admin\nReview', 'Points\nHeld', 'Booking\nConfirmed'];

export function getTimelineStep(status: BookingStatus): number {
  switch (status) {
    case 'PENDING_APPROVAL':
      return 1;
    case 'CONFIRMED':
    case 'COMPLETED':
      return 4;
    case 'CANCELLED':
    case 'FAILED':
    default:
      return 1;
  }
}

export const CANCEL_REASONS = ['Change in Plans', 'Scheduling Conflict', 'Medical Emergency', 'Other'];

// Points deducted as a cancellation fee, per the membership terms shown inline in CancelSheet.
export const CANCELLATION_DEDUCTION_RATE = 0.2;
