import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function PointsEmptyState() {
  return (
    <View className="items-center py-16">
      <Text className="font-montserrat text-muted-foreground text-[13px]">No transactions yet.</Text>
    </View>
  );
}
