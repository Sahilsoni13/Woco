// Placeholder data — web's `LTX/src/app/member/points/page.tsx` fetches this
// from `memberApi.getPointsHistory()`, which has no equivalent in WocoApp
// yet. Point values reuse the real bookings/membership numbers already
// seeded in components/booking/mock-data.ts and components/dashboard/
// mock-data.ts for continuity (e.g. the Alpine Reverie refund below is
// exactly that booking's `refundedPoints`) — but this ledger computes its
// own independent running balance and does NOT reconcile to
// MOCK_MEMBERSHIP.pointsBalance on the dashboard. Same "two separate mock
// datasets, no shared store" limitation as everywhere else in this app.

export type TransactionType =
  | 'POINTS_ALLOCATED'
  | 'CARRY_FORWARD'
  | 'BOOKING_DEBIT'
  | 'BOOKING_RESERVATION'
  | 'CANCELLATION_REFUND'
  | 'ADMIN_ADJUSTMENT';

export const TYPE_CONFIG: Record<TransactionType, { label: string; badgeClassName: string; badgeTextClassName: string }> = {
  POINTS_ALLOCATED: { label: 'CREDIT', badgeClassName: 'bg-emerald-50 border-emerald-200', badgeTextClassName: 'text-emerald-700' },
  CARRY_FORWARD: { label: 'CREDIT', badgeClassName: 'bg-emerald-50 border-emerald-200', badgeTextClassName: 'text-emerald-700' },
  CANCELLATION_REFUND: { label: 'REFUND', badgeClassName: 'bg-blue-50 border-blue-200', badgeTextClassName: 'text-blue-700' },
  BOOKING_DEBIT: { label: 'DEBIT', badgeClassName: 'bg-secondary border-border', badgeTextClassName: 'text-muted-foreground' },
  BOOKING_RESERVATION: { label: 'HOLD', badgeClassName: 'bg-amber-50 border-amber-200', badgeTextClassName: 'text-amber-700' },
  ADMIN_ADJUSTMENT: { label: 'ADJUST', badgeClassName: 'bg-purple-50 border-purple-200', badgeTextClassName: 'text-purple-700' },
};

export const CREDIT_TYPES: TransactionType[] = ['POINTS_ALLOCATED', 'CARRY_FORWARD', 'CANCELLATION_REFUND', 'ADMIN_ADJUSTMENT'];
export const HOLD_TYPES: TransactionType[] = ['BOOKING_RESERVATION'];

export type Transaction = {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  notes?: string;
  points: number;
  balanceAfter: number;
};

const RAW: { date: string; type: TransactionType; description: string; notes?: string; points: number }[] = [
  { date: '2026-02-14', type: 'POINTS_ALLOCATED', description: 'Membership Points Allocated', points: 15000 },
  { date: '2026-02-14', type: 'CARRY_FORWARD', description: 'Carry Forward from Previous Term', points: 2480 },
  { date: '2026-02-18', type: 'BOOKING_DEBIT', description: 'Booking Confirmed', notes: 'Alpine Reverie, Zermatt', points: -2200 },
  { date: '2026-02-24', type: 'CANCELLATION_REFUND', description: 'Cancellation Refund', notes: 'Alpine Reverie, Zermatt', points: 1760 },
  { date: '2026-04-14', type: 'BOOKING_DEBIT', description: 'Booking Confirmed', notes: 'Tirta Retreat, Bali', points: -3600 },
  { date: '2026-06-01', type: 'BOOKING_DEBIT', description: 'Booking Confirmed', notes: 'Cliffside Sanctuary, Santorini', points: -2800 },
  { date: '2026-07-01', type: 'BOOKING_DEBIT', description: 'Booking Confirmed', notes: 'Villa Aurelia, Paris', points: -3200 },
  { date: '2026-07-10', type: 'BOOKING_RESERVATION', description: 'Reservation Hold', notes: 'Casa Solmare, Maldives', points: -4100 },
  { date: '2026-07-12', type: 'ADMIN_ADJUSTMENT', description: 'Service Recovery Credit', points: 100 },
];

let runningBalance = 0;
export const MOCK_TRANSACTIONS: Transaction[] = RAW.map((tx, index) => {
  runningBalance += tx.points;
  return { id: String(index + 1), balanceAfter: runningBalance, ...tx };
}).reverse(); // newest first, matching web's default sort

export const TRANSACTIONS_PER_PAGE = 5;
