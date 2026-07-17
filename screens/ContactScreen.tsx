import { ContactForm } from '@/components/contact/ContactForm';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfoSection } from '@/components/contact/ContactInfoSection';
import { View } from 'react-native';
import { PublicPageLayout } from './PublicPageLayout';

export function ContactScreen() {
  return (
    <PublicPageLayout>
      <ContactHero />
      <ContactInfoSection />
      <View className="px-5 pb-10">
        <ContactForm />
      </View>
    </PublicPageLayout>
  );
}
