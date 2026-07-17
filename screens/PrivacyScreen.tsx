import { LegalContactFooter } from '@/components/legal/LegalContactFooter';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalIntroCard } from '@/components/legal/LegalIntroCard';
import { LegalSection } from '@/components/legal/LegalSection';
import { LAST_UPDATED, PRIVACY_INTRO, PRIVACY_SECTIONS } from '@/components/legal/content';
import { View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';

export function PrivacyScreen() {
  return (
    <PublicPageLayout>
      <LegalHero title="Privacy Policy" lastUpdated={LAST_UPDATED} />
      <View className="gap-8 px-5 py-10">
        <LegalIntroCard>{PRIVACY_INTRO}</LegalIntroCard>
        {PRIVACY_SECTIONS.map((section) => (
          <LegalSection key={section.title} title={section.title} body={section.body} />
        ))}
        <LegalContactFooter label="Privacy questions? Contact us at" email="privacy@ltxtravel.com" />
      </View>
    </PublicPageLayout>
  );
}
