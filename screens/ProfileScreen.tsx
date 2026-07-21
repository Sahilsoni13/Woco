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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const [mode, setMode] = React.useState<'view' | 'edit'>('view');
  // Mutable local copy so an "Update" actually reflects on this screen —
  // MOCK_PROFILE itself is a static module constant, same pattern already
  // used by components/dashboard/NotificationsList.tsx's local state.
  const [profile, setProfile] = React.useState(MOCK_PROFILE);

  // View <-> Edit used to be a plain ternary swap — instant, no transition.
  // A sequential fade (out, then swap content, then in) rather than a
  // crossfade — the two content blocks have different heights, so never
  // rendering both at once avoids any layout/measurement complication.
  // Opacity-only animation on a plain View with no other styling, so this
  // carries none of the flex/height collapse risk documented in
  // project_wocoapp_search_filter_bar's FilterSheet fix.
  const contentOpacity = useSharedValue(1);

  function switchMode(next: 'view' | 'edit') {
    contentOpacity.value = withTiming(0, { duration: 150 }, (finished) => {
      // withTiming's completion callback runs as a worklet on the UI
      // thread — setMode is a plain JS-thread function, so it needs
      // scheduleOnRN (runOnJS's current replacement in this Reanimated
      // version) rather than being called directly.
      if (finished) scheduleOnRN(setMode, next);
    });
  }

  React.useEffect(() => {
    contentOpacity.value = withTiming(1, { duration: 200 });
  }, [mode, contentOpacity]);

  const contentStyle = useAnimatedStyle(() => ({ opacity: contentOpacity.value }));

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="border-b border-border px-5 py-4">
        <Text className="text-[22px] font-semibold text-foreground">Profile</Text>
      </View>

      <ScrollView contentContainerClassName="gap-5 px-5 py-6" showsVerticalScrollIndicator={false}>
        <Animated.View style={contentStyle}>
          {mode === 'view' ? (
            <View className="gap-5">
              <ProfileHeader profile={profile} />
              <ProfileDetails profile={profile} onEdit={() => switchMode('edit')} />
              <FamilyPreviewCard profile={profile} />

              <Link href="/support" asChild>
                <Pressable className="flex-row items-center gap-3 rounded-2xl border border-border p-4 active:bg-secondary">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-secondary">
                    <Icon as={LifeBuoy} size={16} className="text-ltx-gold" />
                  </View>
                  <Text className="flex-1 font-montserrat-medium text-[13px] text-foreground">
                    Support
                  </Text>
                  <Icon as={ChevronRight} size={16} className="text-muted-foreground" />
                </Pressable>
              </Link>
            </View>
          ) : (
            <EditProfileForm
              profile={profile}
              onCancel={() => switchMode('view')}
              onSave={(data) => {
                setProfile((prev) => ({ ...prev, ...data }));
                switchMode('view');
              }}
            />
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
