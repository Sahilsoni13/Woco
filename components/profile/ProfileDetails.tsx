import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Mail, Pencil, Phone, ShieldCheck } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import type { MOCK_PROFILE } from './mock-data';

function formatMemberSince(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

type ProfileDetailsProps = {
  profile: typeof MOCK_PROFILE;
  onEdit: () => void;
};

export function ProfileDetails({ profile, onEdit }: ProfileDetailsProps) {
  return (
    <View className="border-border gap-4 rounded-2xl border p-5">
      <View className="flex-row items-center justify-between">
        <Text className="font-montserrat-medium text-ltx-gold text-[12px] uppercase tracking-[1.5px]">
          Personal Details
        </Text>
        <Pressable onPress={onEdit} hitSlop={8} className="flex-row items-center gap-1.5 p-1">
          <Icon as={Pencil} size={12} className="text-muted-foreground" />
          <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[0.5px]">
            Edit
          </Text>
        </Pressable>
      </View>

      <View className="gap-3.5">
        <View className="flex-row items-center gap-3">
          <View className="bg-secondary h-8 w-8 items-center justify-center rounded-full">
            <Icon as={Mail} size={14} className="text-muted-foreground" />
          </View>
          <View className="flex-1">
            <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
              Email Address
            </Text>
            <Text className="font-montserrat text-foreground text-[13px]">{profile.email}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="bg-secondary h-8 w-8 items-center justify-center rounded-full">
            <Icon as={Phone} size={14} className="text-muted-foreground" />
          </View>
          <View className="flex-1">
            <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
              Mobile Contact
            </Text>
            <Text className="font-montserrat text-foreground text-[13px]">{profile.phone}</Text>
          </View>
        </View>

        <View className="border-border flex-row items-center justify-between border-t pt-3.5">
          <View>
            <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
              Member Since
            </Text>
            <Text className="font-montserrat text-foreground mt-0.5 text-[13px]">
              {formatMemberSince(profile.memberSince)}
            </Text>
          </View>
          <View className="items-end">
            <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
              KYC Status
            </Text>
            {profile.kycVerified ? (
              <View className="mt-0.5 flex-row items-center gap-1">
                <Icon as={ShieldCheck} size={12} className="text-emerald-600" />
                <Text className="font-montserrat text-[13px] text-emerald-600">Verified</Text>
              </View>
            ) : (
              <Text className="font-montserrat text-amber-600 mt-0.5 text-[13px]">Pending</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
