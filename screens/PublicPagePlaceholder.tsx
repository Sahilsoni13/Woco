import { Text } from '@/components/ui/text';
import { View } from 'react-native';

type PublicPagePlaceholderProps = {
  title: string;
  description?: string;
};

export function PublicPagePlaceholder({
  title,
  description = 'Coming soon',
}: PublicPagePlaceholderProps) {
  return (
    <View className="flex-1 items-center justify-center gap-2 px-6 py-24">
      <Text variant="h3">{title}</Text>
      <Text variant="muted">{description}</Text>
    </View>
  );
}
