import { PasswordRequirementsList } from '@/components/auth/PasswordRequirementsList';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { MOCK_INVITATION, type JoinStep } from '@/components/auth/mock-data';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Fixed +91, no country picker — same call already made for
// EditProfileForm's phone field: web offers a full country selector, but
// that's a lot of UI for a field with no real SMS backend behind it here.
const COUNTRY_CODE = '+91';

// Ported from LTX web's /join page (invitation-only membership activation).
// WocoApp has no auth system at all (see project_wocoapp_member_flow_scope
// memory) — every step here is mocked, same latitude as LoginScreen: the
// "invitation" is a fixed constant (see mock-data.ts for why), the phone OTP
// accepts any 6 digits, and "Activate Membership" just routes into the
// existing (already-unguarded) tab flow rather than creating a real session.
export function JoinScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = React.useState<JoinStep>('validating');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneDigits, setPhoneDigits] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [sendingOtp, setSendingOtp] = React.useState(false);
  const [verifyingOtp, setVerifyingOtp] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordTouched, setPasswordTouched] = React.useState(false);

  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFirstName(MOCK_INVITATION.fullName.split(' ')[0] ?? '');
      setLastName(MOCK_INVITATION.fullName.split(' ').slice(1).join(' '));
      setStep('form');
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  function resetOtpState() {
    setOtpSent(false);
    setOtp('');
    setOtpVerified(false);
  }

  async function handleSendOtp() {
    if (phoneDigits.length < 6) {
      setPhoneError('Enter a valid phone number.');
      return;
    }
    setSendingOtp(true);
    setPhoneError('');
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSendingOtp(false);
    setOtpSent(true);
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      setFormError('Enter the 6-digit OTP.');
      return;
    }
    setVerifyingOtp(true);
    setFormError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setVerifyingOtp(false);
    setOtpVerified(true);
  }

  async function handleSubmit() {
    if (!firstName.trim() || !lastName.trim()) {
      setFormError('First name and last name are required.');
      return;
    }
    if (!otpVerified) {
      setFormError('Please verify your phone number before continuing.');
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordTouched(true);
      setFormError('Password does not meet all the requirements below.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setFormError(null);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setStep('success');
    setTimeout(() => router.replace('/dashboard'), 1200);
  }

  return (
    <View className="bg-primary flex-1">
      {/* Same reasoning as LoginScreen: app-wide StatusBar defaults to
          "dark", this is the one other screen with a dark top panel. */}
      {/* <StatusBar style="light" /> */}
      <View style={{ paddingTop: insets.top + 24 }} className="items-center gap-2 px-6 pb-8">
        <View className="flex-row items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3">
          <Text className="font-montserrat text-[16px] font-bold text-white">WOCO</Text>
          <Text className="font-montserrat text-[13px] text-white/40">Verdant Estates</Text>
        </View>
        <Text className="font-montserrat text-[13px] text-white/40">Exclusive Members Only</Text>
      </View>

      <View className="bg-background flex-1 rounded-t-[32px]">
          {step === 'validating' ? (
            <View className="flex-1 items-center justify-center gap-3">
              <Icon as={LoaderCircle} size={26} className="text-ltx-gold" />
              <Text className="font-montserrat text-muted-foreground text-[13px]">Validating invitation…</Text>
            </View>
          ) : null}

          {step === 'form' ? (
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 24,
                paddingTop: 32,
                paddingBottom: 40,
              }}
              keyboardShouldPersistTaps="handled"
              bottomOffset={20}
              showsVerticalScrollIndicator={false}>
              <Text className="font-noto-serif text-foreground text-[20px]">Complete your Membership</Text>
              <Text className="font-montserrat text-muted-foreground mt-1 text-[13px]">
                Confirm your details and set a password to activate exclusive access.
              </Text>

              <View className="border-ltx-gold/20 bg-ltx-gold/[0.07] mt-5 flex-row items-center gap-3 rounded-xl border px-4 py-3">
                <View className="bg-ltx-gold/15 h-7 w-7 items-center justify-center rounded-full">
                  <Text className="text-[13px]">✦</Text>
                </View>
                <View>
                  <Text className="font-montserrat text-ltx-gold text-[12px] font-bold uppercase tracking-[1px]">
                    {MOCK_INVITATION.packageName}
                  </Text>
                  <Text className="font-montserrat text-muted-foreground text-[11px]">
                    {MOCK_INVITATION.points.toLocaleString()} points credited on activation
                  </Text>
                </View>
              </View>

              <View className="mt-5 gap-4">
                <View className="gap-1.5">
                  <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                    Email Address
                  </Text>
                  <Input value={MOCK_INVITATION.email} editable={false} className="rounded-xl text-sm" />
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1 gap-1.5">
                    <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                      First Name
                    </Text>
                    <Input value={firstName} onChangeText={setFirstName} placeholder="Raj" className="rounded-xl text-sm" />
                  </View>
                  <View className="flex-1 gap-1.5">
                    <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                      Last Name
                    </Text>
                    <Input value={lastName} onChangeText={setLastName} placeholder="Mehta" className="rounded-xl text-sm" />
                  </View>
                </View>

                <View className="gap-1.5">
                  <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                    Phone Number
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View className="border-input bg-secondary h-10 flex-row items-center gap-2 rounded-xl border px-3">
                      <Text className="font-montserrat text-foreground text-[13px] font-semibold">
                        {COUNTRY_CODE}
                      </Text>
                    </View>
                    <Input
                      value={phoneDigits}
                      onChangeText={(text) => {
                        setPhoneDigits(text.replace(/\D/g, ''));
                        setPhoneError('');
                        if (otpSent) resetOtpState();
                      }}
                      placeholder="98765 43210"
                      keyboardType="number-pad"
                      maxLength={10}
                      editable={!otpVerified}
                      className="flex-1 rounded-xl text-sm"
                    />
                    {!otpVerified ? (
                      <Button size="sm" className="rounded-xl" onPress={handleSendOtp} disabled={sendingOtp}>
                        {sendingOtp ? (
                          <Icon as={LoaderCircle} size={13} className="text-primary-foreground" />
                        ) : (
                          <Text className="text-primary-foreground text-[11px] font-semibold uppercase tracking-[0.5px]">
                            {otpSent ? 'Resend' : 'Send OTP'}
                          </Text>
                        )}
                      </Button>
                    ) : (
                      <View className="flex-row items-center gap-1">
                        <Icon as={ShieldCheck} size={14} className="text-emerald-600" />
                      </View>
                    )}
                  </View>

                  {phoneError ? (
                    <Text className="font-montserrat text-[11px] text-red-500">{phoneError}</Text>
                  ) : null}

                  {otpVerified ? (
                    <Text className="font-montserrat text-[12px] text-emerald-600">Phone number verified</Text>
                  ) : null}

                  {otpSent && !otpVerified ? (
                    <View className="mt-1 flex-row gap-2">
                      <Input
                        value={otp}
                        onChangeText={(text) => setOtp(text.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit OTP"
                        keyboardType="number-pad"
                        maxLength={6}
                        className="flex-1 rounded-xl text-sm"
                      />
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onPress={handleVerifyOtp}
                        disabled={verifyingOtp || otp.length !== 6}>
                        {verifyingOtp ? (
                          <Icon as={LoaderCircle} size={13} className="text-ltx-gold" />
                        ) : (
                          <Text className="text-ltx-gold text-[11px] font-semibold uppercase tracking-[0.5px]">
                            Verify
                          </Text>
                        )}
                      </Button>
                    </View>
                  ) : null}
                </View>

                <View className="gap-1.5">
                  <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                    Set Password
                  </Text>
                  <View className="flex-row items-center">
                    <Input
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setPasswordTouched(true);
                      }}
                      placeholder="Min. 8 characters"
                      secureTextEntry={!showPassword}
                      className="flex-1 rounded-xl text-sm"
                    />
                    <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8} className="absolute right-3">
                      <Icon as={showPassword ? EyeOff : Eye} size={16} className="text-muted-foreground" />
                    </Pressable>
                  </View>
                  <PasswordStrengthMeter password={password} />
                  {passwordTouched ? <PasswordRequirementsList password={password} /> : null}
                </View>

                <View className="gap-1.5">
                  <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                    Confirm Password
                  </Text>
                  <View className="flex-row items-center">
                    <Input
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter password"
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 rounded-xl text-sm"
                    />
                    <View className="absolute right-3 flex-row items-center gap-2">
                      {confirmPassword ? (
                        <Icon
                          as={password === confirmPassword ? CircleCheck : CircleAlert}
                          size={15}
                          className={password === confirmPassword ? 'text-emerald-600' : 'text-red-500'}
                        />
                      ) : null}
                      <Pressable onPress={() => setShowConfirmPassword((v) => !v)} hitSlop={8}>
                        <Icon
                          as={showConfirmPassword ? EyeOff : Eye}
                          size={16}
                          className="text-muted-foreground"
                        />
                      </Pressable>
                    </View>
                  </View>
                  {confirmPassword && password !== confirmPassword ? (
                    <Text className="font-montserrat text-[12px] text-red-500">Passwords do not match</Text>
                  ) : null}
                </View>
              </View>

              {formError ? (
                <View className="mt-4 flex-row items-center gap-2 rounded-xl bg-red-50 px-4 py-3">
                  <Icon as={CircleAlert} size={14} className="text-red-500" />
                  <Text className="font-montserrat flex-1 text-[12px] text-red-600">{formError}</Text>
                </View>
              ) : null}

              <Button size="lg" className="mt-5 rounded-full" onPress={handleSubmit} disabled={submitting}>
                {submitting ? <Icon as={LoaderCircle} size={14} className="text-primary-foreground" /> : null}
                <Text className="text-primary-foreground text-[13px] font-semibold uppercase tracking-[1px]">
                  {submitting ? 'Activating…' : 'Activate Membership'}
                </Text>
              </Button>

              <Pressable onPress={() => router.push('/login')} hitSlop={8} className="mt-4 items-center">
                <Text className="font-montserrat text-muted-foreground text-[13px]">
                  Already a member? <Text className="text-foreground font-semibold">Sign In</Text>
                </Text>
              </Pressable>
            </KeyboardAwareScrollView>
          ) : null}

          {step === 'success' ? (
            <View className="flex-1 items-center justify-center gap-1 px-6">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                <Icon as={CircleCheck} size={22} className="text-emerald-600" />
              </View>
              <Text className="font-noto-serif text-foreground text-[20px]">Welcome to WOCO Verdant Estates!</Text>
              <Text className="font-montserrat text-muted-foreground text-center text-[13px]">
                Setting up your profile…
              </Text>
            </View>
          ) : null}
      </View>
    </View>
  );
}
