// Placeholder data — web's `LTX/src/app/member/family/page.tsx` fetches all
// of this from `memberApi`, which has no equivalent in WocoApp yet. Canonical
// source for family members; components/profile/FamilyPreviewCard.tsx reads
// from here too rather than keeping its own separate copy.

export type FamilyRelation = 'SPOUSE' | 'CHILD' | 'PARENT' | 'SIBLING' | 'EMPLOYEE' | 'OTHER';

export const RELATIONS: { value: FamilyRelation; label: string }[] = [
  { value: 'SPOUSE', label: 'Spouse' },
  { value: 'CHILD', label: 'Child' },
  { value: 'PARENT', label: 'Parent' },
  { value: 'SIBLING', label: 'Sibling' },
  { value: 'EMPLOYEE', label: 'Employee' },
  { value: 'OTHER', label: 'Friend' },
];

export const RELATION_LABELS: Record<FamilyRelation, string> = RELATIONS.reduce(
  (acc, r) => ({ ...acc, [r.value]: r.label }),
  {} as Record<FamilyRelation, string>
);

// Matches web's `POINT_ALLOCATION_RELATIONS` — only these relations can be
// invited with a points allocation (they get their own account + login).
export const POINT_ALLOCATION_RELATIONS: FamilyRelation[] = ['EMPLOYEE', 'OTHER'];

export type FamilyMember = {
  id: string;
  firstName: string;
  lastName: string;
  relation: FamilyRelation;
  email?: string;
  phone?: string;
  /** ISO date string (YYYY-MM-DD), same optional field web's modals collect. */
  dateOfBirth?: string;
  allocatedPoints: number;
};

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    firstName: 'Julien',
    lastName: 'Moreau',
    relation: 'SPOUSE',
    email: 'julien.moreau@example.com',
    phone: '+919876500001',
    dateOfBirth: '1988-03-22',
    allocatedPoints: 0,
  },
  {
    id: '2',
    firstName: 'Camille',
    lastName: 'Moreau',
    relation: 'CHILD',
    dateOfBirth: '2016-11-05',
    allocatedPoints: 0,
  },
];
