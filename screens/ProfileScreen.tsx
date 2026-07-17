import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { FamilyPreviewCard } from '@/components/profile/FamilyPreviewCard';
import { MOCK_PROFILE } from '@/components/profile/mock-data';
import { ProfileDetails } from '@/components/profile/ProfileDetails';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ChevronRight, LifeBuoy } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const [mode, setMode] = React.useState<'view' | 'edit'>('view');
  // Mutable local copy so an "Update" actually reflects on this screen —
  // MOCK_PROFILE itself is a static module constant, same pattern already
  // used by components/dashboard/NotificationsList.tsx's local state.
  const [profile, setProfile] = React.useState(MOCK_PROFILE);

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border border-b px-5 py-4">
        <Text className="text-foreground text-[22px] font-semibold">Profile</Text>
      </View>

      <ScrollView contentContainerClassName="gap-5 px-5 py-6" showsVerticalScrollIndicator={false}>
        {mode === 'view' ? (
          <>
            <ProfileHeader profile={profile} />
            <ProfileDetails profile={profile} onEdit={() => setMode('edit')} />
            <FamilyPreviewCard profile={profile} />

            <Link href="/support" asChild>
              <Pressable className="border-border active:bg-secondary flex-row items-center gap-3 rounded-2xl border p-4">
                <View className="bg-secondary h-9 w-9 items-center justify-center rounded-full">
                  <Icon as={LifeBuoy} size={16} className="text-ltx-gold" />
                </View>
                <Text className="font-montserrat-medium text-foreground flex-1 text-[13px]">Support</Text>
                <Icon as={ChevronRight} size={16} className="text-muted-foreground" />
              </Pressable>
            </Link>
          </>
        ) : (
          <EditProfileForm
            profile={profile}
            onCancel={() => setMode('view')}
            onSave={(data) => {
              setProfile((prev) => ({ ...prev, ...data }));
              setMode('view');
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
