import { Building2, CircleCheck, Image as ImageIcon, MapPin, Phone, Star } from 'lucide-react-native';

// Ported from `LTX/src/app/become-a-partner/page.tsx` — a public hotel-
// partner application form (6-step wizard). This is a lead-gen form, not
// the authenticated /partner/* dashboard (a separate role flow this app
// deliberately doesn't reimplement, see project_wocoapp_member_flow_scope) —
// submitting it here is mocked the same way Contact/Support already mock
// their own backend calls, but the wizard mechanics themselves are real.

export type PartnerStep = 1 | 2 | 3 | 4 | 5 | 6;

export const TOTAL_STEPS = 6;

export const STEP_META: { title: string; icon: typeof Building2 }[] = [
  { title: 'Basic Info', icon: Building2 },
  { title: 'Location', icon: MapPin },
  { title: 'Amenities', icon: Star },
  { title: 'Photos', icon: ImageIcon },
  { title: 'Contact', icon: Phone },
  { title: 'Review', icon: CircleCheck },
];

export const AMENITIES_LIST = [
  'Free WiFi',
  'Swimming Pool',
  'Fitness Centre',
  'Spa & Wellness',
  'Restaurant',
  'Bar / Lounge',
  'Parking',
  'Airport Shuttle',
  'Room Service',
  'Conference Room',
  'Kids Club',
  'Laundry Service',
  'Business Centre',
  'Pet Friendly',
  'Beach Access',
  'Concierge',
];

export const COUNTRIES = [
  'India',
  'United Arab Emirates',
  'United States',
  'United Kingdom',
  'Singapore',
  'Australia',
  'Saudi Arabia',
  'Malaysia',
  'Thailand',
  'Maldives',
  'France',
  'Italy',
  'Spain',
  'Germany',
  'Japan',
  'Other',
];

export const COUNTRY_DIAL_CODES = [
  { dial: '+91', flag: '🇮🇳', hint: '10-digit mobile', maxLen: 10, test: (d: string) => /^[6-9]\d{9}$/.test(d) },
  { dial: '+1', flag: '🇺🇸', hint: '10-digit number', maxLen: 10, test: (d: string) => /^\d{10}$/.test(d) },
  { dial: '+44', flag: '🇬🇧', hint: '7–10 digit number', maxLen: 10, test: (d: string) => /^\d{7,10}$/.test(d) },
  { dial: '+971', flag: '🇦🇪', hint: '9-digit number', maxLen: 9, test: (d: string) => /^\d{9}$/.test(d) },
  { dial: '+65', flag: '🇸🇬', hint: '8-digit number', maxLen: 8, test: (d: string) => /^\d{8}$/.test(d) },
  { dial: '+61', flag: '🇦🇺', hint: '9-digit number', maxLen: 9, test: (d: string) => /^\d{9}$/.test(d) },
  { dial: '+966', flag: '🇸🇦', hint: '9-digit number', maxLen: 9, test: (d: string) => /^\d{9}$/.test(d) },
  { dial: '+60', flag: '🇲🇾', hint: '9–10 digit number', maxLen: 10, test: (d: string) => /^\d{9,10}$/.test(d) },
];

export const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
