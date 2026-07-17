import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Coins, Users } from 'lucide-react-native';
import { View } from 'react-native';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type FamilyStatsRowProps = {
  availablePoints: number;
  memberCount: number;
  maxFamilyMembers: number | null;
};

export function FamilyStatsRow({ availablePoints, memberCount, maxFamilyMembers }: FamilyStatsRowProps) {
  const limitLabel =
    maxFamilyMembers != null ? `${memberCount} / ${Math.max(maxFamilyMembers, memberCount)}` : `${memberCount}`;

  return (
    <View className="flex-row gap-3">
      <View className="border-ltx-gold/25 bg-secondary flex-1 gap-2 rounded-2xl border p-4">
        <View className="bg-ltx-gold/20 h-8 w-8 items-center justify-center rounded-full">
          <Icon as={Coins} size={14} className="text-ltx-gold" />
        </View>
        <Text className="font-montserrat text-muted-foreground text-[9px] font-semibold uppercase tracking-[1px]">
          Available Points
        </Text>
        <Text className="font-montserrat-medium text-ltx-gold text-[17px]">{formatWithCommas(availablePoints)}</Text>
      </View>

      <View className="border-border flex-1 gap-2 rounded-2xl border p-4">
        <View className="bg-secondary h-8 w-8 items-center justify-center rounded-full">
          <Icon as={Users} size={14} className="text-muted-foreground" />
        </View>
        <Text className="font-montserrat text-muted-foreground text-[9px] font-semibold uppercase tracking-[1px]">
          Family Limit
        </Text>
        <Text className="font-montserrat-medium text-foreground text-[17px]">{limitLabel}</Text>
      </View>
    </View>
  );
}
