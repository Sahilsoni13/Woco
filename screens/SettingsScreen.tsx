import { MOCK_NOTIFICATION_PREFS, type NotificationPrefs } from '@/components/settings/mock-data';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { SecuritySection } from '@/components/settings/SecuritySection';
import { SettingsToast } from '@/components/settings/SettingsToast';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SettingsScreen() {
  const [prefs, setPrefs] = React.useState<NotificationPrefs>(MOCK_NOTIFICATION_PREFS);
  const [toast, setToast] = React.useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border border-b px-5 py-4">
        <Text className="text-foreground text-[22px] font-semibold">Settings</Text>
      </View>

      <View className="flex-1">
        <ScrollView contentContainerClassName="gap-5 px-5 py-6" showsVerticalScrollIndicator={false}>
          <NotificationsSection
            prefs={prefs}
            onChange={setPrefs}
            onSaved={() => showToast('Notification preferences saved.')}
          />
          <SecuritySection onSaved={() => showToast('Your password has been changed successfully.')} />
        </ScrollView>

        {toast ? <SettingsToast message={toast} /> : null}
      </View>
    </SafeAreaView>
  );
}
