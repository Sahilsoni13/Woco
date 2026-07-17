import { MOCK_MEMBERSHIP } from '@/components/dashboard/mock-data';
import { AddFamilyMemberSheet } from '@/components/family/AddFamilyMemberSheet';
import { EditFamilyMemberDialog } from '@/components/family/EditFamilyMemberDialog';
import { FamilyEmptyState } from '@/components/family/FamilyEmptyState';
import { FamilyMemberCard } from '@/components/family/FamilyMemberCard';
import { MOCK_FAMILY_MEMBERS, type FamilyMember } from '@/components/family/mock-data';
import { RemoveFamilyMemberDialog } from '@/components/family/RemoveFamilyMemberDialog';
import { FamilyStatsRow } from '@/components/family/FamilyStatsRow';
import { MOCK_PROFILE } from '@/components/profile/mock-data';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let nextId = 100;

export function FamilyScreen() {
  const [members, setMembers] = React.useState<FamilyMember[]>(MOCK_FAMILY_MEMBERS);
  const [addSheetOpen, setAddSheetOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<FamilyMember | null>(null);
  const [removingMember, setRemovingMember] = React.useState<FamilyMember | null>(null);

  const atLimit = MOCK_PROFILE.maxFamilyMembers != null && members.length >= MOCK_PROFILE.maxFamilyMembers;

  function handleAdd(data: Omit<FamilyMember, 'id'>) {
    setMembers((prev) => [...prev, { ...data, id: String(nextId++) }]);
    setAddSheetOpen(false);
  }

  function handleSaveEdit(data: Omit<FamilyMember, 'id' | 'allocatedPoints'>) {
    if (!editingMember) return;
    setMembers((prev) => prev.map((m) => (m.id === editingMember.id ? { ...m, ...data } : m)));
    setEditingMember(null);
  }

  function handleConfirmRemove() {
    if (!removingMember) return;
    setMembers((prev) => prev.filter((m) => m.id !== removingMember.id));
    setRemovingMember(null);
  }

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border flex-row items-center gap-3 border-b px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <Icon as={ChevronLeft} size={22} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[15px]">Family Members</Text>
          <Text className="font-montserrat text-muted-foreground text-[11px]">
            Extend your privileges to your loved ones
          </Text>
        </View>
        <Pressable
          onPress={() => setAddSheetOpen(true)}
          disabled={atLimit}
          className="bg-ltx-gold active:opacity-90 h-9 w-9 items-center justify-center rounded-full disabled:opacity-40">
          <Icon as={Plus} size={16} className="text-white" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="gap-5 px-5 py-6" showsVerticalScrollIndicator={false}>
        <FamilyStatsRow
          availablePoints={MOCK_MEMBERSHIP.pointsBalance}
          memberCount={members.length}
          maxFamilyMembers={MOCK_PROFILE.maxFamilyMembers}
        />

        {members.length === 0 ? (
          <FamilyEmptyState onAdd={() => setAddSheetOpen(true)} />
        ) : (
          <View className="gap-3">
            {members.map((member) => (
              <FamilyMemberCard
                key={member.id}
                member={member}
                onEdit={() => setEditingMember(member)}
                onRemove={() => setRemovingMember(member)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <AddFamilyMemberSheet
        open={addSheetOpen}
        onOpenChange={setAddSheetOpen}
        memberCount={members.length}
        maxFamilyMembers={MOCK_PROFILE.maxFamilyMembers}
        pointAllocationEnabled={MOCK_PROFILE.pointAllocationEnabled}
        availablePoints={MOCK_MEMBERSHIP.pointsBalance}
        onSubmit={handleAdd}
      />

      <EditFamilyMemberDialog
        member={editingMember}
        onOpenChange={(open) => {
          if (!open) setEditingMember(null);
        }}
        onSave={handleSaveEdit}
      />

      <RemoveFamilyMemberDialog
        member={removingMember}
        onOpenChange={(open) => {
          if (!open) setRemovingMember(null);
        }}
        onConfirm={handleConfirmRemove}
      />
    </SafeAreaView>
  );
}
