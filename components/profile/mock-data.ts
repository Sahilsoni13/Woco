// Placeholder data — web's `LTX/src/app/member/profile/page.tsx` fetches all
// of this from `memberApi`, which has no equivalent in WocoApp yet. Reuses
// the same "Alexandra Moreau" identity already seeded into
// components/booking/mock-data.ts's guest lists, for a consistent world.
// Family member types/data live in components/family/mock-data.ts — that's
// the canonical source now that /family has its own full CRUD screen.

export const MOCK_PROFILE = {
  firstName: 'Alexandra',
  lastName: 'Moreau',
  email: 'alexandra.moreau@example.com',
  phone: '+919876543210',
  kycVerified: true,
  packageType: 'INDIVIDUAL' as 'INDIVIDUAL' | 'CORPORATE',
  memberSince: '2026-02-14',
  // Mirrors web's `isMasterMember && (isCorporate || allowFamilyMembers)` gate
  // that decides whether the Family Members section renders at all.
  showFamilySection: true,
  maxFamilyMembers: 4,
  // Mirrors web's `dashboard.pointAllocationEnabled` — gates whether
  // Employee/Friend family members can be invited with a points allocation.
  pointAllocationEnabled: true,
};
