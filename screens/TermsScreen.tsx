import { LegalContactFooter } from '@/components/legal/LegalContactFooter';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalIntroCard } from '@/components/legal/LegalIntroCard';
import { LegalSection } from '@/components/legal/LegalSection';
import { LAST_UPDATED, TERMS_INTRO, TERMS_SECTIONS } from '@/components/legal/content';
import { View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';

export function TermsScreen() {
  return (
    <PublicPageLayout>
      <LegalHero title="Terms of Service" lastUpdated={LAST_UPDATED} />
      <View className="gap-8 px-5 py-10">
        <LegalIntroCard>{TERMS_INTRO}</LegalIntroCard>
        {TERMS_SECTIONS.map((section) => (
          <LegalSection key={section.title} title={section.title} body={section.body} />
        ))}
        <LegalContactFooter label="For questions about these Terms, contact us at" email="legal@ltxtravel.com" />
      </View>
    </PublicPageLayout>
  );
}
