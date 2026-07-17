import { Text } from '@/components/ui/text';
import { Linking, Pressable, View } from 'react-native';

type LegalContactFooterProps = {
  label: string;
  email: string;
};

export function LegalContactFooter({ label, email }: LegalContactFooterProps) {
  return (
    <View className="border-border items-center gap-1.5 border-t pt-6">
      <Text className="font-montserrat text-muted-foreground text-center text-[12px]">{label}</Text>
      <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
        <Text className="font-montserrat text-ltx-gold text-[13px] font-semibold">{email}</Text>
      </Pressable>
    </View>
  );
}
