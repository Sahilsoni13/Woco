// Ported from `LTX/src/app/login/page.tsx`. WocoApp has no auth system at
// all yet (see project_wocoapp_member_flow_scope memory) — every field here
// is mocked: "Sign In" accepts any non-empty email/password, the OTP step
// accepts any 6 digits (same latitude as EditProfileForm's mocked phone-OTP
// flow), and "success" just routes into the existing, currently-unguarded
// tab flow rather than setting any real session.

export type LoginStep = 'login' | 'signup' | 'forgot' | 'verify' | 'reset' | 'success';

export type JoinStep = 'validating' | 'form' | 'success';

// Ported from `LTX/src/app/join/page.tsx`. Web's version is a real
// invitation-only gate — it reads a `?token=` from an emailed link and calls
// `publicApi.validateInvitation(token)` before showing the form. WocoApp has
// no email/invitation infrastructure to generate or deep-link that token
// into the app at all, so this mock skips straight to "already validated":
// tapping "Join Now" is treated as if the (non-existent) invitation link was
// already opened, and this fixed preview is what that link would have
// resolved to.
export const MOCK_INVITATION = {
  email: 'aarav.mehta@example.com',
  fullName: 'Aarav Mehta',
  packageName: 'Founders Circle',
  points: 25000,
};

export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#eab308', '#22c55e', '#16a34a'];
  return { score, label: labels[score] ?? '', color: colors[score] ?? '#e5e7eb' };
}

export const PASSWORD_REQUIREMENTS: { text: string; test: (password: string) => boolean }[] = [
  { text: 'At least 8 characters', test: (p) => p.length >= 8 },
  { text: 'At least one uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { text: 'At least one number', test: (p) => /[0-9]/.test(p) },
];

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
