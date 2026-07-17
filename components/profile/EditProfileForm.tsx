import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ChevronLeft, LoaderCircle, ShieldCheck } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import type { MOCK_PROFILE } from './mock-data';

// Country code is fixed to +91 here — web offers a full country picker, but
// that's a lot of UI for a field this app has no real SMS backend behind.
const COUNTRY_CODE = '+91';

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <View className="border-border gap-1.5 border-b pb-3">
      <Text className="font-montserrat text-ltx-gold text-[10px] uppercase tracking-[1.2px]">{label}</Text>
      {children}
    </View>
  );
}

type EditProfileFormProps = {
  profile: typeof MOCK_PROFILE;
  onCancel: () => void;
  onSave: (data: { firstName: string; lastName: string; phone: string }) => void;
};

// Consolidates web's phone-change OTP flow (send -> countdown -> verify)
// into the same shape, but mocked — any 6 digits verify successfully after a
// simulated delay, same "no backend" pattern as CancelSheet's confirm alert.
export function EditProfileForm({ profile, onCancel, onSave }: EditProfileFormProps) {
  const [firstName, setFirstName] = React.useState(profile.firstName);
  const [lastName, setLastName] = React.useState(profile.lastName);
  const originalDigits = profile.phone.replace(COUNTRY_CODE, '');
  const [phoneDigits, setPhoneDigits] = React.useState(originalDigits);

  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [sendingOtp, setSendingOtp] = React.useState(false);
  const [verifyingOtp, setVerifyingOtp] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const phoneChanged = phoneDigits !== originalDigits;

  function resetOtpState() {
    setOtpSent(false);
    setOtp('');
    setOtpVerified(false);
  }

  async function handleSendOtp() {
    if (phoneDigits.length < 6) {
      setError('Enter a valid phone number.');
      return;
    }
    setSendingOtp(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSendingOtp(false);
    setOtpSent(true);
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP.');
      return;
    }
    setVerifyingOtp(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setVerifyingOtp(false);
    setOtpVerified(true);
  }

  async function handleSave() {
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (phoneChanged && !otpVerified) {
      setError('Please verify your new phone number before saving.');
      return;
    }
    setSaving(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    onSave({ firstName: firstName.trim(), lastName: lastName.trim(), phone: `${COUNTRY_CODE}${phoneDigits}` });
  }

  return (
    <View className="gap-6">
      <Pressable onPress={onCancel} hitSlop={8} className="flex-row items-center gap-1.5">
        <Icon as={ChevronLeft} size={18} className="text-foreground" />
        <Text className="font-montserrat-medium text-foreground text-[14px]">Edit Personal Details</Text>
      </Pressable>

      <View className="gap-5">
        <Field label="First Name">
          <Input
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            className="native:h-auto rounded-none border-0 bg-transparent p-0 text-[14px] shadow-none"
          />
        </Field>

        <Field label="Last Name">
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            className="native:h-auto rounded-none border-0 bg-transparent p-0 text-[14px] shadow-none"
          />
        </Field>

        <Field label="Phone Number">
          <View className="flex-row items-center gap-2">
            <Text className="font-montserrat text-foreground text-[14px]">{COUNTRY_CODE}</Text>
            <Input
              value={phoneDigits}
              onChangeText={(text) => {
                setPhoneDigits(text.replace(/\D/g, ''));
                setError(null);
                resetOtpState();
              }}
              keyboardType="number-pad"
              maxLength={10}
              editable={!(phoneChanged && otpVerified)}
              className="native:h-auto flex-1 rounded-none border-0 bg-transparent p-0 text-[14px] shadow-none"
            />
            {phoneChanged && !otpVerified ? (
              <Pressable onPress={handleSendOtp} disabled={sendingOtp} hitSlop={8}>
                {sendingOtp ? (
                  <Icon as={LoaderCircle} size={14} className="text-ltx-gold" />
                ) : (
                  <Text className="font-montserrat text-ltx-gold text-[11px] font-semibold uppercase tracking-[0.5px]">
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </Text>
                )}
              </Pressable>
            ) : null}
            {phoneChanged && otpVerified ? (
              <View className="flex-row items-center gap-1">
                <Icon as={ShieldCheck} size={13} className="text-emerald-600" />
                <Text className="font-montserrat text-[11px] text-emerald-600">Verified</Text>
              </View>
            ) : null}
          </View>

          {phoneChanged && otpSent && !otpVerified ? (
            <View className="mt-1 flex-row gap-2">
              <Input
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                keyboardType="number-pad"
                maxLength={6}
                className="native:h-9 flex-1 rounded-lg text-[13px]"
              />
              <Button size="sm" variant="outline" onPress={handleVerifyOtp} disabled={verifyingOtp || otp.length !== 6}>
                {verifyingOtp ? (
                  <Icon as={LoaderCircle} size={13} className="text-ltx-gold" />
                ) : (
                  <Text className="text-ltx-gold text-[11px] font-semibold uppercase tracking-[0.5px]">Verify</Text>
                )}
              </Button>
            </View>
          ) : null}
        </Field>

        <Field label="Email">
          <Text className="font-montserrat text-muted-foreground text-[14px]">{profile.email}</Text>
        </Field>
      </View>

      {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}

      <View className="flex-row justify-end gap-3">
        <Button variant="outline" size="lg" className="rounded-full" onPress={onCancel} disabled={saving}>
          <Text className="text-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">Cancel</Text>
        </Button>
        <Button size="lg" className="rounded-full" onPress={handleSave} disabled={saving}>
          {saving ? <Icon as={LoaderCircle} size={14} className="text-primary-foreground" /> : null}
          <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
            Update
          </Text>
        </Button>
      </View>
    </View>
  );
}
