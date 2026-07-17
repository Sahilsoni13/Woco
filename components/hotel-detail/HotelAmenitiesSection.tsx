import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Anchor, PlaneTakeoff, ShieldCheck, Sparkles, TrendingUp, Utensils, WavesHorizontal, Wine } from 'lucide-react-native';
import { View } from 'react-native';
import { CURATED_AMENITIES, PRIVILEGED_PERKS } from './mock-data';

const AMENITY_ICONS = {
  pool: WavesHorizontal,
  dining: Utensils,
  spa: Sparkles,
  yacht: Anchor,
};

const PERK_ICONS = {
  concierge: ShieldCheck,
  transfer: PlaneTakeoff,
  wine: Wine,
  upgrade: TrendingUp,
};

export function HotelAmenitiesSection() {
  return (
    <View className="border-border gap-8 border-t px-5 py-8 pb-12">
      <View className="gap-5">
        <Text className="text-[22px] leading-[26px]">
          <Text className="font-montserrat text-foreground text-[22px]">Curated </Text>
          <Text className="font-playfair text-foreground text-[22px] italic">Amenities</Text>
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {CURATED_AMENITIES.map((amenity) => (
            <View key={amenity.label} className="border-border w-[47%] items-center gap-3 rounded-2xl border p-5">
              <View className="bg-secondary h-12 w-12 items-center justify-center rounded-2xl">
                <Icon as={AMENITY_ICONS[amenity.icon]} size={22} className="text-foreground" />
              </View>
              <Text className="font-montserrat-medium text-foreground text-center text-[13px]">
                {amenity.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="bg-primary gap-8 rounded-3xl p-6">
        <View>
          <Text className="font-montserrat text-[11px] uppercase tracking-[3px] text-white/50">
            Member Exclusive
          </Text>
          <Text className="mt-2 text-[24px] leading-[28px]">
            <Text className="font-montserrat text-white">Privileged </Text>
            <Text className="font-playfair italic text-white">Access</Text>
          </Text>
        </View>

        <View className="gap-6">
          {PRIVILEGED_PERKS.map((perk) => (
            <View key={perk.title} className="flex-row items-start gap-4">
              <View className="h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon as={PERK_ICONS[perk.icon]} size={18} className="text-white" />
              </View>
              <View className="flex-1 gap-1">
                <Text className="font-montserrat-medium text-[15px] text-white">{perk.title}</Text>
                <Text className="font-montserrat text-[13px] leading-[19px] text-white/65">{perk.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
