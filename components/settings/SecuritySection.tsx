import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { LoaderCircle, Shield } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { PasswordField } from './PasswordField';

type SecuritySectionProps = {
  onSaved: () => void;
};

// Web's change-password flow hits a real memberAuthApi.changePassword — no
// auth system exists in WocoApp at all (see project_wocoapp_member_flow_scope
// memory), so this mocks success after a delay rather than checking
// "current password" against anything real. Same latitude as
// EditProfileForm's mocked OTP flow.
export function SecuritySection({ onSaved }: SecuritySectionProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  function reset() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
  }

  async function handleChange() {
    if (!currentPassword) {
      setError('Current password is required.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSaving(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaving(false);
    reset();
    setExpanded(false);
    onSaved();
  }

  return (
    <View className="border-border gap-6 rounded-2xl border p-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2.5">
          <Icon as={Shield} size={17} className="text-ltx-gold" />
          <Text className="font-playfair text-foreground text-[18px]">Security</Text>
        </View>
        {!expanded ? (
          <Pressable onPress={() => setExpanded(true)} hitSlop={8}>
            <Text className="text-ltx-gold font-montserrat-medium text-[13px]">Change Password</Text>
          </Pressable>
        ) : null}
      </View>

      {expanded ? (
        <View className="gap-5">
          <PasswordField label="Current Password" value={currentPassword} onChangeText={setCurrentPassword} />
          <PasswordField label="New Password" value={newPassword} onChangeText={setNewPassword} />
          <PasswordField label="Confirm New Password" value={confirmPassword} onChangeText={setConfirmPassword} />

          {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}

          <View className="flex-row justify-end gap-4">
            <Pressable
              onPress={() => {
                reset();
                setExpanded(false);
              }}
              className="px-2 py-2.5">
              <Text className="font-montserrat text-muted-foreground text-[12px]">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleChange}
              disabled={saving}
              className="border-foreground active:bg-secondary flex-row items-center gap-2 rounded-full border px-7 py-2.5 disabled:opacity-60">
              {saving ? <Icon as={LoaderCircle} size={13} className="text-foreground" /> : null}
              <Text className="font-montserrat text-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
                Change Password
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}
