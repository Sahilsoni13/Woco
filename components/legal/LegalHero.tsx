import { Text } from '@/components/ui/text';
import { View } from 'react-native';

type LegalHeroProps = {
  title: string;
  lastUpdated: string;
};

export function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <View className="border-border items-center gap-3 border-b bg-background px-6 py-16">
      <Text className="font-montserrat text-muted-foreground text-[11px] uppercase tracking-[3px]">Legal</Text>
      <Text className="font-noto-serif text-foreground text-center text-[34px] leading-[40px]">{title}</Text>
      <Text className="font-montserrat text-muted-foreground text-[12px]">Last updated: {lastUpdated}</Text>
    </View>
  );
}
