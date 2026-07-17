import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

export function SettingsToast({ message }: { message: string }) {
  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutDown.duration(200)}
      style={{ position: 'absolute', left: 20, right: 20, bottom: 24 }}>
      <View className="bg-background flex-row items-start gap-3 rounded-2xl border border-l-4 border-border border-l-emerald-500 p-4 shadow-lg shadow-black/10">
        <Icon as={CircleCheck} size={16} className="mt-0.5 text-emerald-500" />
        <View className="flex-1">
          <Text className="font-montserrat text-[10px] font-bold uppercase tracking-[2px] text-emerald-600">
            Notification
          </Text>
          <Text className="font-montserrat text-foreground mt-0.5 text-[13px]">{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
}
