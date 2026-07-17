import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Bell, LoaderCircle } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { ToggleSwitch } from './ToggleSwitch';
import { NOTIFICATION_ITEMS, type NotificationPrefs } from './mock-data';

type NotificationsSectionProps = {
  prefs: NotificationPrefs;
  onChange: (prefs: NotificationPrefs) => void;
  onSaved: () => void;
};

export function NotificationsSection({ prefs, onChange, onSaved }: NotificationsSectionProps) {
  const [saving, setSaving] = React.useState(false);

  async function handleUpdate() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    onSaved();
  }

  return (
    <View className="border-border gap-6 rounded-2xl border p-5">
      <View className="flex-row items-center gap-2.5">
        <Icon as={Bell} size={17} className="text-ltx-gold" />
        <Text className="font-playfair text-foreground text-[18px]">Notifications</Text>
      </View>

      <View className="gap-5">
        {NOTIFICATION_ITEMS.map((item, index) => (
          <View
            key={item.key}
            className={cn(
              'flex-row items-start justify-between gap-4',
              index > 0 && 'border-border border-t pt-5'
            )}>
            <View className="flex-1 gap-1">
              <Text className="font-montserrat-medium text-foreground text-[13px]">{item.title}</Text>
              <Text className="font-montserrat text-muted-foreground text-[12px] leading-[17px]">
                {item.description}
              </Text>
            </View>
            <ToggleSwitch checked={prefs[item.key]} onChange={(value) => onChange({ ...prefs, [item.key]: value })} />
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleUpdate}
        disabled={saving}
        className="bg-ltx-gold active:opacity-90 flex-row items-center justify-center gap-2 self-end rounded-full px-6 py-3 disabled:opacity-60">
        {saving ? <Icon as={LoaderCircle} size={13} className="text-white" /> : null}
        <Text className="font-montserrat text-[12px] font-semibold uppercase tracking-[1.5px] text-white">
          Update Preferences
        </Text>
      </Pressable>
    </View>
  );
}
