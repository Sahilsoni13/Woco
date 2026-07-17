import { Cta } from '@/components/landing/Cta';
import { ExploreSearchCard } from '@/components/landing/ExploreSearchCard';
import { Faq } from '@/components/landing/Faq';
import { Features } from '@/components/landing/Features';
import { Hero } from '@/components/landing/Hero';
import { Hotels } from '@/components/landing/Hotels';
import { Stats } from '@/components/landing/Stats';
import { Trust } from '@/components/landing/Trust';
import { PublicPageLayout } from './PublicPageLayout';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonial from '@/components/landing/Testimonial';

export function HomeScreen() {
  return (
    <PublicPageLayout>
      <Hero />
      <ExploreSearchCard />
      <Trust />
      <Features />
      <Stats />
      <Hotels />
      <HowItWorks />
      <Testimonial />
      <Faq />
      <Cta />
    </PublicPageLayout>
  );
}
