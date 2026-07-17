import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import type { LegalSectionContent } from './content';

// RN's Text preserves literal `\n` as real line breaks (unlike HTML, which
// collapses whitespace and needs `whitespace-pre-line`) — so multi-paragraph
// bodies with `\n\n` render correctly with no special handling needed.
export function LegalSection({ title, body }: LegalSectionContent) {
  return (
    <View className="gap-2.5">
      <Text className="font-noto-serif text-foreground text-[18px]">{title}</Text>
      <Text className="font-montserrat text-muted-foreground text-[13px] leading-[22px]">{body}</Text>
    </View>
  );
}
