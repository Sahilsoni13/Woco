import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Phone } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';

// Placeholder — no real concierge line exists yet, same "no backend" caveat as the rest of mock-data.ts.
const CONCIERGE_PHONE = '+44 20 7946 0958';

export function ConciergeCard() {
  return (
    <View className="bg-primary gap-4 rounded-2xl p-5">
      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Icon as={Phone} size={16} className="text-ltx-gold" />
        </View>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-[13px] text-white">Concierge Support</Text>
          <Text className="font-montserrat text-[11px] text-white/50">Available 24/7 for this stay</Text>
        </View>
      </View>

      <Text className="font-eb-garamond text-[22px] text-white">{CONCIERGE_PHONE}</Text>

      <Pressable
        onPress={() => Linking.openURL(`tel:${CONCIERGE_PHONE.replace(/\s/g, '')}`)}
        className="bg-ltx-gold active:opacity-90 items-center rounded-full py-3">
        <Text className="font-montserrat text-primary text-[11px] font-semibold uppercase tracking-[1.5px]">
          Call Concierge
        </Text>
      </Pressable>
    </View>
  );
}
