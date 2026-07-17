import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function LegalIntroCard({ children }: { children: React.ReactNode }) {
  return (
    <View className="border-border rounded-2xl border p-5">
      <Text className="font-montserrat text-muted-foreground text-[13px] leading-[21px]">{children}</Text>
    </View>
  );
}
