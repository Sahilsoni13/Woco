import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { SearchX } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function HotelsEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <View className="items-center gap-2 py-16">
      <View className="bg-secondary h-14 w-14 items-center justify-center rounded-full">
        <Icon as={SearchX} size={24} className="text-muted-foreground" />
      </View>
      <Text className="font-montserrat-medium text-foreground mt-2 text-[15px]">No estates found</Text>
      <Text className="font-montserrat text-muted-foreground text-[13px]">Try adjusting your filters</Text>
      <Pressable onPress={onClearFilters} className="mt-2 p-2">
        <Text className="font-montserrat text-foreground text-[13px] underline">Clear filters</Text>
      </Pressable>
    </View>
  );
}
