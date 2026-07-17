import { COOKIE_TYPES, COOKIES_INTRO_SECTIONS, COOKIES_LATER_SECTIONS, LAST_UPDATED } from '@/components/legal/content';
import { CookieTypeCard } from '@/components/legal/CookieTypeCard';
import { LegalContactFooter } from '@/components/legal/LegalContactFooter';
import { LegalHero } from '@/components/legal/LegalHero';
import { LegalIntroCard } from '@/components/legal/LegalIntroCard';
import { LegalSection } from '@/components/legal/LegalSection';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';

export function CookiesScreen() {
  return (
    <PublicPageLayout>
      <LegalHero title="Cookie Policy" lastUpdated={LAST_UPDATED} />
      <View className="gap-8 px-5 py-10">
        <LegalIntroCard>
          This Cookie Policy explains how WOCO Verdant Estates Pvt. Ltd. uses cookies and similar tracking
          technologies when you visit and interact with the WOCO Travel platform. It should be read alongside our{' '}
          <Text className="text-ltx-gold font-semibold" onPress={() => router.push('/privacy')}>
            Privacy Policy
          </Text>
          .
        </LegalIntroCard>

        {COOKIES_INTRO_SECTIONS.map((section) => (
          <LegalSection key={section.title} title={section.title} body={section.body} />
        ))}

        <View className="gap-4">
          <Text className="font-noto-serif text-foreground text-[18px]">Types of Cookies We Use</Text>
          <View className="gap-4">
            {COOKIE_TYPES.map((type) => (
              <CookieTypeCard key={type.name} type={type} />
            ))}
          </View>
        </View>

        {COOKIES_LATER_SECTIONS.map((section) => (
          <LegalSection key={section.title} title={section.title} body={section.body} />
        ))}

        <LegalContactFooter label="Cookie questions? Contact us at" email="privacy@ltxtravel.com" />
      </View>
    </PublicPageLayout>
  );
}
