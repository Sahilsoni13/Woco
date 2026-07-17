// Placeholder data — web's dashboard (`LTX/src/app/member/dashboard/page.tsx`)
// fetches all of this from `memberApi`, which has no equivalent in WocoApp
// yet. UI-only for now, same reasoning as components/search/destinations.ts
// and components/landing/Hotels.tsx (reuses the same photo URLs/hotel names
// for a consistent world across the app).

export const MOCK_MEMBER = {
  firstName: 'Alexandra',
};

// Mirrors the fields `PackageCard` actually takes on web
// (LTX/src/components/member/package-card.tsx) — the first pass here only
// carried a tier label + points balance + renewal countdown, missing package
// name, type, the 4-stat grid, rollover, and the since/expiry timeline.
export const MOCK_MEMBERSHIP = {
  tier: 'ELITE' as 'ELITE' | 'PREMIUM' | 'ENTRY',
  packageName: 'Elite Annual Membership',
  packageType: 'INDIVIDUAL' as 'INDIVIDUAL' | 'CORPORATE',
  memberNumber: 'WC-204817',
  pointsBalance: 12480, // currently available to spend
  totalPoints: 15000, // allocated this term
  pointsPerYear: 15000,
  packageValue: 450000, // in rupees
  validityYears: 1,
  carryForward: true,
  carryForwardPoints: 2480,
  // `daysUntilExpiry` is deliberately NOT stored separately — it's derived
  // from these two dates at render time, so it can never drift out of sync
  // with them (a hardcoded number here almost was wrong relative to today).
  startDate: '2026-02-14',
  endDate: '2027-02-14',
};

export type BookingStatus = 'CONFIRMED' | 'PENDING_APPROVAL' | 'CANCELLED';

export const STATUS_STYLES: Record<BookingStatus, { label: string; className: string }> = {
  CONFIRMED: { label: 'Confirmed', className: 'bg-emerald-500' },
  PENDING_APPROVAL: { label: 'Pending', className: 'bg-amber-500' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-500' },
};

// Matches the per-status sentence web shows under each booking
// (LTX/src/app/member/dashboard/page.tsx's inline ternary).
export const STATUS_DESCRIPTIONS: Record<BookingStatus, string> = {
  CONFIRMED: 'Reservation confirmed. Your dedicated host is awaiting your arrival.',
  PENDING_APPROVAL: 'Request sent. Awaiting concierge confirmation.',
  CANCELLED: 'This booking was cancelled.',
};

export const MOCK_BOOKINGS = [
  {
    id: '1',
    hotelName: 'Villa Aurelia',
    city: 'Paris, France',
    photo: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
    status: 'CONFIRMED' as BookingStatus,
    checkIn: 'Aug 12',
    checkOut: 'Aug 18',
    nights: 6,
    points: 3200,
  },
  {
    id: '2',
    hotelName: 'Casa Solmare',
    city: 'North Malé Atoll, Maldives',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    status: 'PENDING_APPROVAL' as BookingStatus,
    checkIn: 'Sep 3',
    checkOut: 'Sep 9',
    nights: 6,
    points: 4100,
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your reservation at Villa Aurelia has been confirmed.',
    time: '2 HOURS AGO',
    unread: true,
  },
  {
    id: '2',
    title: 'Points Added',
    message: '850 points were added to your balance from your last stay.',
    time: '1 DAY AGO',
    unread: true,
  },
  {
    id: '3',
    title: 'Concierge Message',
    message: 'Your host at Casa Solmare has shared arrival instructions.',
    time: '3 DAYS AGO',
    unread: false,
  },
];
