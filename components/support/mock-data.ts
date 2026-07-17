// Placeholder data — web's `LTX/src/app/member/support/page.tsx` fetches
// this from `memberApi.getTickets()`, which has no equivalent in WocoApp
// yet. Ticket creation is mocked (no attachment upload backend either).

export type TicketCategory = 'BOOKING' | 'POINTS' | 'ACCOUNT' | 'BILLING' | 'OTHER';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'CLOSED';

export const CATEGORIES: { value: TicketCategory; label: string }[] = [
  { value: 'BOOKING', label: 'Travel / Booking' },
  { value: 'POINTS', label: 'Points & Rewards' },
  { value: 'ACCOUNT', label: 'Account' },
  { value: 'BILLING', label: 'Experience & Lifestyle' },
  { value: 'OTHER', label: 'Other' },
];

export const CATEGORY_BADGE: Record<TicketCategory, string> = {
  BOOKING: 'TRAVEL',
  POINTS: 'POINTS',
  ACCOUNT: 'ACCOUNT',
  BILLING: 'EXPERIENCE',
  OTHER: 'OTHER',
};

export const STATUS_CONFIG: Record<TicketStatus, { label: string; className: string; textClassName: string }> = {
  OPEN: { label: 'PENDING', className: 'bg-amber-50 border-amber-200', textClassName: 'text-amber-700' },
  IN_PROGRESS: { label: 'IN PROGRESS', className: 'bg-blue-50 border-blue-200', textClassName: 'text-blue-700' },
  RESOLVED: { label: 'RESOLVED', className: 'bg-secondary border-border', textClassName: 'text-muted-foreground' },
  ESCALATED: { label: 'ESCALATED', className: 'bg-red-50 border-red-200', textClassName: 'text-red-700' },
  CLOSED: { label: 'CLOSED', className: 'bg-secondary border-border', textClassName: 'text-muted-foreground/70' },
};

export type Ticket = {
  id: string;
  ticketNumber: string;
  subject: string;
  message: string;
  category: TicketCategory;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  // `uri` is set for a real photo picked via expo-image-picker (camera or
  // gallery) in CreateTicketSheet — lets the detail screen show an actual
  // thumbnail instead of just a file-name row.
  attachments?: { fileName: string; fileSizeKb: number; uri?: string }[];
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'LT-8231',
    subject: 'Unable to confirm Kyoto booking dates',
    message:
      'I tried requesting the Sakura Pavilion for 10–14 Feb but the request failed. Could you check availability and confirm manually?',
    category: 'BOOKING',
    status: 'RESOLVED',
    createdAt: '2026-02-11T09:20:00Z',
    updatedAt: '2026-02-13T15:00:00Z',
  },
  {
    id: '2',
    ticketNumber: 'LT-8309',
    subject: 'Points balance looks incorrect after cancellation',
    message:
      'I cancelled my Alpine Reverie booking and expected a refund of 1,760 points, but my balance doesn\'t reflect it yet.',
    category: 'POINTS',
    status: 'IN_PROGRESS',
    createdAt: '2026-06-30T12:10:00Z',
    updatedAt: '2026-07-02T10:45:00Z',
    attachments: [{ fileName: 'cancellation-confirmation.pdf', fileSizeKb: 184 }],
  },
  {
    id: '3',
    ticketNumber: 'LT-8412',
    subject: 'Update phone number on file',
    message: 'I recently changed my mobile number and would like it updated on my membership profile.',
    category: 'ACCOUNT',
    status: 'CLOSED',
    createdAt: '2026-07-05T08:00:00Z',
    updatedAt: '2026-07-05T17:30:00Z',
  },
  {
    id: '4',
    ticketNumber: 'LT-8477',
    subject: 'Request for private chef during Maldives stay',
    message: 'Ahead of our Casa Solmare trip in September, could the concierge arrange a private chef for one evening?',
    category: 'BILLING',
    status: 'OPEN',
    createdAt: '2026-07-12T14:15:00Z',
    updatedAt: '2026-07-12T14:15:00Z',
  },
  {
    id: '5',
    ticketNumber: 'LT-8501',
    subject: 'Delay in Villa Aurelia confirmation',
    message: 'It has been a few days since my booking request for Villa Aurelia — wanted to check on the status.',
    category: 'BOOKING',
    status: 'ESCALATED',
    createdAt: '2026-07-14T11:00:00Z',
    updatedAt: '2026-07-15T09:00:00Z',
  },
];

export const TICKETS_PER_PAGE = 4;

export const TICKET_TIMELINE_STEPS = ['Ticket\nRaised', 'In\nProgress', 'Resolved'];

export function getTicketTimelineStep(status: TicketStatus): number {
  switch (status) {
    case 'OPEN':
      return 1;
    case 'IN_PROGRESS':
    case 'ESCALATED':
      return 2;
    case 'RESOLVED':
    case 'CLOSED':
      return 3;
    default:
      return 1;
  }
}
