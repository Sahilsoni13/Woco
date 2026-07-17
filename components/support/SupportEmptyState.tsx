import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { FileText } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function SupportEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <View className="items-center gap-3 py-16">
      <View className="bg-secondary h-14 w-14 items-center justify-center rounded-full">
        <Icon as={FileText} size={24} className="text-muted-foreground" />
      </View>
      <Text className="font-montserrat-medium text-foreground text-[14px]">No support tickets yet.</Text>
      <Pressable onPress={onCreate}>
        <Text className="font-montserrat text-ltx-gold text-[12px] font-semibold">Raise your first ticket →</Text>
      </Pressable>
    </View>
  );
}
