import { OtpInput } from '@/components/auth/OtpInput';
import { PasswordRequirementsList } from '@/components/auth/PasswordRequirementsList';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { isValidEmail, type LoginStep } from '@/components/auth/mock-data';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Info,
  LoaderCircle,
  Lock,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react-native';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Ported from LTX web's /login page. WocoApp has no auth system at all
// (see project_wocoapp_member_flow_scope memory) — every step here is
// mocked: "Sign In" accepts any non-empty email/password and routes
// straight into the existing (already-unguarded) tab flow rather than
// setting a real session; the forgot-password OTP accepts any 6 digits,
// same latitude already used for EditProfileForm's phone-OTP flow.
export function LoginScreen() {
  const insets = useSafeAreaInsets();
  // Mirrors web's Header, which opens the same auth modal defaulted to
  // either "login" or "signup" (`openAuth(step)`) depending on which button
  // was tapped — NavDrawer's "Join Now" button links here with `?step=signup`.
  const { step: initialStep } = useLocalSearchParams<{ step?: string }>();
  const [step, setStep] = React.useState<LoginStep>(initialStep === 'signup' ? 'signup' : 'login');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');

  const [forgotEmail, setForgotEmail] = React.useState('');
  const [forgotLoading, setForgotLoading] = React.useState(false);
  const [forgotError, setForgotError] = React.useState<string | null>(null);

  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(''));
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [countdown, setCountdown] = React.useState(59);

  const [newPassword, setNewPassword] = React.useState('');
  const [newConfirmPassword, setNewConfirmPassword] = React.useState('');
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);
  const [resetError, setResetError] = React.useState<string | null>(null);

  const [successCountdown, setSuccessCountdown] = React.useState(5);

  React.useEffect(() => {
    if (step !== 'verify') return;
    setOtp(Array(6).fill(''));
    setOtpError(null);
    setCountdown(59);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const finishResetFlow = React.useCallback(() => {
    setStep('login');
    setNewPassword('');
    setNewConfirmPassword('');
    setOtp(Array(6).fill(''));
  }, []);

  React.useEffect(() => {
    if (step !== 'success') return;
    setSuccessCountdown(5);
    const interval = setInterval(() => {
      setSuccessCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  React.useEffect(() => {
    if (step === 'success' && successCountdown === 0) finishResetFlow();
  }, [step, successCountdown, finishResetFlow]);

  function startForgotPassword() {
    setForgotEmail('');
    setForgotError(null);
    setOtp(Array(6).fill(''));
    setOtpError(null);
    setNewPassword('');
    setNewConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setResetError(null);
    setStep('forgot');
  }

  async function handleLogin() {
    if (!email.trim() || !password) {
      setLoginError('Please enter your email and password.');
      return;
    }
    setLoginError('');
    setLoginLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoginLoading(false);
    setPassword('');
    router.replace('/dashboard');
  }

  async function handleForgot() {
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(forgotEmail)) {
      setForgotError('Please enter a valid email address.');
      return;
    }
    setForgotLoading(true);
    setForgotError(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setForgotLoading(false);
    setStep('verify');
  }

  async function handleVerifyOtp() {
    if (otp.join('').length < 6) {
      setOtpError('Please enter the full 6-digit code.');
      return;
    }
    setOtpLoading(true);
    setOtpError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setOtpLoading(false);
    setStep('reset');
  }

  function handleResend() {
    setCountdown(59);
    setOtp(Array(6).fill(''));
    setOtpError(null);
  }

  async function handleReset() {
    if (newPassword.length < 8) {
      setResetError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== newConfirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }
    setResetLoading(true);
    setResetError(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setResetLoading(false);
    setStep('success');
  }

  return (
    <View className="flex-1 bg-primary">
      {/* App-wide StatusBar is fixed to "dark" (see app/_layout.tsx) since
          every other screen has a light background — this is the one
          screen with a dark top panel, so it needs light icons instead.
          The most recently mounted <StatusBar> wins, which is this one
          while the screen is focused. */}
      {/* <StatusBar style="light" /> */}
      <View style={{ paddingTop: insets.top + 24 }} className="items-center gap-2 px-6 pb-8">
        <View className="flex-row items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3">
          <Text className="font-montserrat text-[16px] font-bold text-white">WOCO</Text>
          <Text className="font-montserrat text-[13px] text-white/40">Verdant Estates</Text>
        </View>
        <Text className="font-montserrat text-[13px] text-white/40">Members-only access</Text>
      </View>

      <View className="flex-1 rounded-t-[32px] bg-background">
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
          {step === 'login' ? (
            <View className="gap-4">
              <View>
                <Text className="font-noto-serif text-[20px] text-foreground">Welcome back</Text>
                <Text className="mt-1 font-montserrat text-[13px] text-muted-foreground">
                  Sign in to your WOCO membership account.
                </Text>
              </View>

              <View className="gap-1.5">
                <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">
                  Email Address
                </Text>
                <Input
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setLoginError('');
                  }}
                  placeholder="raj@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="rounded-xl"
                />
              </View>

              <View className="gap-1.5">
                <View className="flex-row items-center justify-between">
                  <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">
                    Password
                  </Text>
                  <Pressable onPress={startForgotPassword} hitSlop={8}>
                    <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">
                      Forgot?
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-row items-center">
                  <Input
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setLoginError('');
                    }}
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    className="flex-1 rounded-xl"
                  />
                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={8}
                    className="absolute right-3">
                    <Icon
                      as={showPassword ? EyeOff : Eye}
                      size={16}
                      className="text-muted-foreground"
                    />
                  </Pressable>
                </View>
              </View>

              {loginError ? (
                <View className="flex-row items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5">
                  <Icon as={CircleAlert} size={14} className="text-red-500" />
                  <Text className="flex-1 font-montserrat text-[12px] text-red-600">
                    {loginError}
                  </Text>
                </View>
              ) : null}

              <Button
                size="lg"
                className="mt-2 rounded-full"
                onPress={handleLogin}
                disabled={loginLoading}>
                {loginLoading ? (
                  <Icon as={LoaderCircle} size={14} className="text-primary-foreground" />
                ) : null}
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-primary-foreground">
                  {loginLoading ? 'Signing in…' : 'Sign In'}
                </Text>
              </Button>

              <Text className="mt-4 text-center font-montserrat text-[12px] text-muted-foreground">
                Not a member?{' '}
                <Text
                  className="font-semibold text-foreground underline"
                  onPress={() => setStep('signup')}>
                  Join WOCO
                </Text>
              </Text>
            </View>
          ) : null}

          {step === 'signup' ? (
            <View className="items-center gap-1">
              <Text className="text-center font-noto-serif text-[20px] text-foreground">
                Membership by Invitation
              </Text>
              <Text className="mt-1 text-center font-montserrat text-[13px] text-muted-foreground">
                WOCO is an invitation-only membership. Access is available only through an
                invitation from an existing member or the WOCO team.
              </Text>

              <Button
                size="lg"
                className="mt-6 w-full rounded-full"
                onPress={() => router.push('/join')}>
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-primary-foreground">
                  I Have an Invitation
                </Text>
              </Button>

              <Pressable onPress={() => router.push('/contact')} hitSlop={8} className="mt-3">
                <Text className="text-center font-montserrat text-[12px] text-muted-foreground">
                  Need access? Contact the WOCO team
                </Text>
              </Pressable>

              <Text className="mt-5 font-montserrat text-[13px] text-muted-foreground">
                Already a member?{' '}
                <Text className="font-semibold text-foreground" onPress={() => setStep('login')}>
                  Sign In
                </Text>
              </Text>
            </View>
          ) : null}

          {step === 'forgot' ? (
            <View className="items-center gap-1">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <Icon as={Lock} size={22} className="text-foreground" />
              </View>
              <Text className="font-noto-serif text-[20px] text-foreground">Recover Access</Text>
              <Text className="text-center font-montserrat text-[13px] text-muted-foreground">
                Enter the email on your account and we'll send you a reset code.
              </Text>

              <View className="mt-4 w-full gap-1.5">
                <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">
                  Email Address
                </Text>
                <Input
                  value={forgotEmail}
                  onChangeText={(text) => {
                    setForgotEmail(text);
                    setForgotError(null);
                  }}
                  placeholder="raj@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="rounded-xl"
                />
                {forgotError ? (
                  <View className="mt-1 flex-row items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5">
                    <Icon as={Info} size={13} className="text-red-500" />
                    <Text className="flex-1 font-montserrat text-[11px] text-red-600">
                      {forgotError}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Button
                size="lg"
                variant="secondary"
                className="mt-4 w-full rounded-full"
                onPress={handleForgot}
                disabled={forgotLoading}>
                {forgotLoading ? (
                  <Icon as={LoaderCircle} size={14} className="text-foreground" />
                ) : null}
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-foreground">
                  {forgotLoading ? 'Sending…' : 'Send Reset Code'}
                </Text>
              </Button>

              <Pressable
                onPress={() => setStep('login')}
                hitSlop={8}
                className="mt-3 flex-row items-center gap-1.5">
                <Icon as={ArrowLeft} size={13} className="text-muted-foreground" />
                <Text className="font-montserrat text-[13px] text-muted-foreground">
                  Return to Login
                </Text>
              </Pressable>
            </View>
          ) : null}

          {step === 'verify' ? (
            <View className="items-center gap-1">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <Icon as={Lock} size={22} className="text-foreground" />
              </View>
              <Text className="font-noto-serif text-[20px] text-foreground">Verify Identity</Text>
              <Text className="font-montserrat text-[13px] text-muted-foreground">
                We sent a 6-digit code to
              </Text>
              <Text className="font-montserrat-medium text-[13px] text-foreground">
                {forgotEmail}
              </Text>

              <View className="mt-5">
                <OtpInput
                  value={otp}
                  onChange={(next) => {
                    setOtp(next);
                    setOtpError(null);
                  }}
                />
              </View>

              {otpError ? (
                <View className="mt-3 w-full flex-row items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <Icon as={Info} size={13} className="mt-0.5 text-red-500" />
                  <Text className="flex-1 font-montserrat text-[11px] text-red-600">
                    {otpError}
                  </Text>
                </View>
              ) : null}

              <Button
                size="lg"
                variant="secondary"
                className="mt-5 w-full rounded-full"
                onPress={handleVerifyOtp}
                disabled={otpLoading}>
                {otpLoading ? (
                  <Icon as={LoaderCircle} size={14} className="text-foreground" />
                ) : null}
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-foreground">
                  {otpLoading ? 'Verifying…' : 'Verify & Continue'}
                </Text>
              </Button>

              <Text className="mt-4 font-montserrat text-[13px] text-muted-foreground">
                Didn't receive the code?{' '}
                {countdown > 0 ? (
                  <Text className="text-muted-foreground/70">
                    Resend in 0:{String(countdown).padStart(2, '0')}
                  </Text>
                ) : (
                  <Text className="font-semibold text-foreground" onPress={handleResend}>
                    Resend
                  </Text>
                )}
              </Text>

              <Pressable
                onPress={() => setStep('forgot')}
                hitSlop={8}
                className="mt-2 flex-row items-center gap-1.5">
                <Icon as={ArrowLeft} size={13} className="text-muted-foreground" />
                <Text className="font-montserrat text-[13px] text-muted-foreground">
                  Change Email
                </Text>
              </Pressable>
            </View>
          ) : null}

          {step === 'reset' ? (
            <View className="items-center gap-1">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <Icon as={RefreshCw} size={22} className="text-foreground" />
              </View>
              <Text className="font-noto-serif text-[20px] text-foreground">New Credentials</Text>
              <Text className="text-center font-montserrat text-[13px] text-muted-foreground">
                Set a secure new password for your account.
              </Text>

              <View className="mt-5 w-full gap-4">
                <View className="gap-1.5">
                  <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">
                    New Password
                  </Text>
                  <View className="flex-row items-center">
                    <Input
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder="••••••••••••••••"
                      secureTextEntry={!showNewPassword}
                      className="flex-1 rounded-xl"
                    />
                    <Pressable
                      onPress={() => setShowNewPassword((v) => !v)}
                      hitSlop={8}
                      className="absolute right-3">
                      <Icon
                        as={showNewPassword ? EyeOff : Eye}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </Pressable>
                  </View>
                  <PasswordStrengthMeter password={newPassword} />
                </View>

                <View className="gap-1.5">
                  <Text className="font-montserrat text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">
                    Confirm New Password
                  </Text>
                  <View className="flex-row items-center">
                    <Input
                      value={newConfirmPassword}
                      onChangeText={setNewConfirmPassword}
                      placeholder="••••••••••••••••"
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 rounded-xl"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword((v) => !v)}
                      hitSlop={8}
                      className="absolute right-3">
                      <Icon
                        as={showConfirmPassword ? EyeOff : Eye}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </Pressable>
                  </View>
                </View>

                <PasswordRequirementsList password={newPassword} />
              </View>

              {resetError ? (
                <View className="mt-4 w-full flex-row items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <Icon as={Info} size={13} className="mt-0.5 text-red-500" />
                  <Text className="flex-1 font-montserrat text-[11px] text-red-600">
                    {resetError}
                  </Text>
                </View>
              ) : null}

              <Button
                size="lg"
                variant="secondary"
                className="mt-5 w-full rounded-full"
                onPress={handleReset}
                disabled={resetLoading}>
                {resetLoading ? (
                  <Icon as={LoaderCircle} size={14} className="text-foreground" />
                ) : null}
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-foreground">
                  {resetLoading ? 'Updating…' : 'Update Password'}
                </Text>
              </Button>

              <Pressable onPress={() => setStep('login')} hitSlop={8} className="mt-3">
                <Text className="font-montserrat text-[13px] text-muted-foreground">
                  Return to Login
                </Text>
              </Pressable>
            </View>
          ) : null}

          {step === 'success' ? (
            <View className="items-center gap-1">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                <Icon as={CircleCheck} size={22} className="text-emerald-600" />
              </View>
              <Text className="font-noto-serif text-[20px] text-foreground">Password Updated</Text>
              <Text className="text-center font-montserrat text-[13px] text-muted-foreground">
                Your password has been reset successfully. You can now log in with your new
                password.
              </Text>
              <Text className="mt-1 font-montserrat text-[11px] text-muted-foreground/70">
                Redirecting to login in {successCountdown} second{successCountdown !== 1 ? 's' : ''}
                ...
              </Text>

              <Button size="lg" className="mt-6 w-full rounded-full" onPress={finishResetFlow}>
                <Text className="text-[13px] font-semibold uppercase tracking-[1px] text-primary-foreground">
                  Sign In
                </Text>
              </Button>

              <View className="mt-5 flex-row items-center gap-1.5">
                <Icon as={ShieldCheck} size={13} className="text-muted-foreground" />
                <Text className="font-montserrat text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
                  Encrypted Connection
                </Text>
              </View>
            </View>
          ) : null}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
