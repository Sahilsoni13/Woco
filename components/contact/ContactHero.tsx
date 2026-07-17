import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ContactHero() {
  return (
    <View className="border-border items-center gap-3 border-b bg-background px-6 py-16">
      <Text className="font-montserrat text-muted-foreground text-[11px] uppercase tracking-[3px]">
        Get in touch
      </Text>
      <Text className="font-noto-serif text-foreground text-center text-[36px] leading-[42px]">Contact Us</Text>
      <Text className="font-montserrat text-muted-foreground max-w-[320px] text-center text-[14px] leading-[22px]">
        Whether you're a member seeking assistance, a prospective guest, or a property partner — we're here.
      </Text>
    </View>
  );
}
