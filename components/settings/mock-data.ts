// Placeholder data — web's `LTX/src/app/member/settings/page.tsx` fetches/
// saves notification prefs via `memberApi`, which has no equivalent in
// WocoApp yet. Password change is mocked too (no auth system exists at all
// in this app — see project_wocoapp_member_flow_scope memory).

export type NotificationPrefs = {
  bookingUpdates: boolean;
  conciergeReminders: boolean;
  exclusiveOffers: boolean;
};

export const MOCK_NOTIFICATION_PREFS: NotificationPrefs = {
  bookingUpdates: true,
  conciergeReminders: true,
  exclusiveOffers: false,
};

export const NOTIFICATION_ITEMS: { key: keyof NotificationPrefs; title: string; description: string }[] = [
  {
    key: 'bookingUpdates',
    title: 'Booking Updates',
    description: 'Real-time status of your hotel and travel reservations.',
  },
  {
    key: 'conciergeReminders',
    title: 'Concierge Reminders',
    description: 'Direct alerts from your lifestyle manager regarding itineraries.',
  },
  {
    key: 'exclusiveOffers',
    title: 'Exclusive Offers',
    description: 'Priority access to seasonal retreats and partner events.',
  },
];
