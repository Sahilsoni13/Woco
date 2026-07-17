import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

type PlaceholderScreenProps = {
  title: string;
  description?: string;
};

export function PlaceholderScreen({ title, description = 'Coming soon' }: PlaceholderScreenProps) {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="bg-background flex-1 items-center justify-center gap-2 p-4">
      <Text variant="h3">{title}</Text>
      <Text variant="muted">{description}</Text>
    </SafeAreaView>
  );
}
