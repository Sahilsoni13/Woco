import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Mail, Pencil, Phone, Trash2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { RELATION_LABELS, type FamilyMember } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type FamilyMemberCardProps = {
  member: FamilyMember;
  onEdit: () => void;
  onRemove: () => void;
};

export function FamilyMemberCard({ member, onEdit, onRemove }: FamilyMemberCardProps) {
  return (
    <View className="border-border flex-row items-start gap-3 rounded-2xl border p-4">
      <View className="bg-primary h-11 w-11 items-center justify-center rounded-full">
        <Text className="font-montserrat-medium text-[13px] text-white">
          {member.firstName.charAt(0)}
          {member.lastName.charAt(0)}
        </Text>
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="font-montserrat-medium text-foreground text-[14px]">
            {member.firstName} {member.lastName}
          </Text>
          <View className="bg-secondary rounded-full px-2 py-0.5">
            <Text className="font-montserrat text-ltx-gold text-[9px] font-semibold uppercase tracking-[1px]">
              {RELATION_LABELS[member.relation]}
            </Text>
          </View>
        </View>

        {member.email ? (
          <View className="flex-row items-center gap-1.5">
            <Icon as={Mail} size={11} className="text-muted-foreground" />
            <Text className="font-montserrat text-muted-foreground text-[11px]">{member.email}</Text>
          </View>
        ) : null}
        {member.phone ? (
          <View className="flex-row items-center gap-1.5">
            <Icon as={Phone} size={11} className="text-muted-foreground" />
            <Text className="font-montserrat text-muted-foreground text-[11px]">{member.phone}</Text>
          </View>
        ) : null}
        {member.allocatedPoints > 0 ? (
          <Text className="font-montserrat text-ltx-gold mt-0.5 text-[11px] font-semibold">
            {formatWithCommas(member.allocatedPoints)} pts allocated
          </Text>
        ) : null}
      </View>

      <View className="flex-row items-center gap-1">
        <Pressable onPress={onEdit} hitSlop={8} className="p-1.5">
          <Icon as={Pencil} size={14} className="text-muted-foreground" />
        </Pressable>
        <Pressable onPress={onRemove} hitSlop={8} className="p-1.5">
          <Icon as={Trash2} size={14} className="text-red-500" />
        </Pressable>
      </View>
    </View>
  );
}
