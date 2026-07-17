import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Plus, Users } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function FamilyEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View className="items-center gap-3 px-6 py-16">
      <View className="bg-secondary h-16 w-16 items-center justify-center rounded-full">
        <Icon as={Users} size={26} className="text-muted-foreground" />
      </View>
      <Text className="font-playfair text-foreground text-center text-[20px]">No Family Members Yet</Text>
      <Text className="font-montserrat text-muted-foreground max-w-[260px] text-center text-[13px] leading-[19px]">
        Share your membership privileges with your loved ones.
      </Text>
      <Pressable
        onPress={onAdd}
        className="bg-ltx-gold active:opacity-90 mt-2 flex-row items-center gap-1.5 rounded-full px-6 py-3">
        <Icon as={Plus} size={14} className="text-white" />
        <Text className="font-montserrat text-[12px] font-semibold uppercase tracking-[1.5px] text-white">
          Add First Member
        </Text>
      </Pressable>
    </View>
  );
}
