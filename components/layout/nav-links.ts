export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  title: string;
  links: NavLink[];
};

// Mirrors LTX web's public footer nav (src/components/landing/footer.tsx).
export const FOOTER_NAV_SECTIONS: NavSection[] = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/' },
      { label: 'Destinations', href: '/' },
      { label: 'Membership', href: '/membership' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Become a Partner', href: '/become-a-partner' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

// Mirrors LTX web's mobile nav drawer accordion (src/components/landing/nav-drawer.tsx).
export const DRAWER_NAV_SECTIONS: NavSection[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Destinations', href: '/' },
      { label: 'Featured Estates', href: '/' },
      { label: 'How It Works', href: '/' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    title: 'Membership',
    links: [
      { label: 'Explorer Plan', href: '/membership' },
      { label: 'Elite Plan', href: '/membership' },
      { label: 'Prestige Plan', href: '/membership' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About WOCO', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];
