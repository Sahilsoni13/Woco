import { MOCK_FAMILY_MEMBERS, RELATION_LABELS } from '@/components/family/mock-data';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ChevronRight, Coins } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { MOCK_PROFILE } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type FamilyPreviewCardProps = {
  profile: typeof MOCK_PROFILE;
};

export function FamilyPreviewCard({ profile }: FamilyPreviewCardProps) {
  if (!profile.showFamilySection) return null;

  return (
    <View className="border-border gap-4 rounded-2xl border p-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-montserrat-medium text-ltx-gold text-[12px] uppercase tracking-[1.5px]">
            Family Members
          </Text>
          <Text className="font-montserrat text-muted-foreground mt-0.5 text-[11px]">
            {MOCK_FAMILY_MEMBERS.length} of {profile.maxFamilyMembers} added
          </Text>
        </View>
        <Link href="/family" asChild>
          <Pressable className="flex-row items-center gap-1 p-1" hitSlop={8}>
            <Text className="font-montserrat text-foreground text-[11px] font-semibold uppercase tracking-[0.5px]">
              Manage
            </Text>
            <Icon as={ChevronRight} size={13} className="text-foreground" />
          </Pressable>
        </Link>
      </View>

      {MOCK_FAMILY_MEMBERS.length === 0 ? (
        <Text className="font-montserrat text-muted-foreground text-[12px]">No family members added yet.</Text>
      ) : (
        <View className="gap-3">
          {MOCK_FAMILY_MEMBERS.map((member) => (
            <View key={member.id} className="flex-row items-center gap-3">
              <View className="bg-secondary h-9 w-9 items-center justify-center rounded-full">
                <Text className="font-montserrat-medium text-muted-foreground text-[12px]">
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="font-montserrat-medium text-foreground text-[13px]">
                  {member.firstName} {member.lastName}
                </Text>
                <Text className="font-montserrat text-muted-foreground text-[11px]">
                  {RELATION_LABELS[member.relation]}
                </Text>
              </View>
              {member.allocatedPoints > 0 ? (
                <View className="flex-row items-center gap-1">
                  <Icon as={Coins} size={12} className="text-ltx-gold" />
                  <Text className="font-montserrat-medium text-ltx-gold text-[12px]">
                    {formatWithCommas(member.allocatedPoints)}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
