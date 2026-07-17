// Content ported from `LTX/src/app/contact/page.tsx`. Unlike most of this
// app's other screens, this one needs no mock backend at all — web's "form"
// is a plain `mailto:` link (no API call), and `Linking.openURL('mailto:...')`
// is the exact native equivalent, so ContactForm.tsx's submission is real,
// not simulated.

export type ContactMethod = 'mail' | 'phone' | 'partner';

export const CONTACT_ITEMS: { method: ContactMethod; label: string; value: string; sub: string }[] = [
  {
    method: 'mail',
    label: 'General Enquiries',
    // Matches the same real address already used in Footer.tsx/NavDrawer.tsx
    // — web's contact page uses a different (likely stale) domain here.
    value: 'hello@ltxtravel.com',
    sub: 'We respond within one business day.',
  },
  {
    method: 'phone',
    label: 'Member Concierge',
    value: '+1 (888) 598-0012',
    sub: 'Available 9 am – 9 pm, Mon–Sat.',
  },
  {
    method: 'partner',
    label: 'Partner Relations',
    value: 'partners@ltxtravel.com',
    sub: 'For hotel and property enquiries.',
  },
];

export const REGISTERED_ADDRESS = {
  name: 'WOCO Verdant Estates Pvt. Ltd.',
  lines: ['14th Floor, Oberoi Commerz II', 'International Business Park, Oberoi Garden City', 'Goregaon East, Mumbai — 400 063'],
};

export const SUBJECT_OPTIONS: { value: string; label: string }[] = [
  { value: 'membership', label: 'Membership Enquiry' },
  { value: 'booking', label: 'Booking Assistance' },
  { value: 'partner', label: 'Partner / Property' },
  { value: 'concierge', label: 'Concierge Request' },
  { value: 'billing', label: 'Billing & Points' },
  { value: 'other', label: 'Other' },
];
