import '@/global.css';

import { CustomSplashScreen } from '@/components/splash/CustomSplashScreen';
import { NAV_THEME } from '@/lib/theme';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { EBGaramond_400Regular } from '@expo-google-fonts/eb-garamond';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import {
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold_Italic,
} from '@expo-google-fonts/playfair-display';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'expo-router/react-navigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

// How long the custom splash holds on screen (after its own entrance
// animation finishes) before crossfading into the real app.
const CUSTOM_SPLASH_HOLD_MS = 1400;
const CUSTOM_SPLASH_FADE_MS = 350;

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold_Italic,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    EBGaramond_400Regular,
  });
  const [showCustomSplash, setShowCustomSplash] = React.useState(true);
  const splashOverlayOpacity = useSharedValue(1);

  const onLayoutRootView = React.useCallback(() => {
    if (fontsLoaded) {
      // The native launch image (a static PNG, app.json's expo-splash-screen
      // config) can't animate at all — hide it immediately once fonts are
      // ready and let CustomSplashScreen (real Views/fonts/Reanimated) take
      // over visually as a "second stage" that actually can.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  React.useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => {
      splashOverlayOpacity.value = withTiming(0, { duration: CUSTOM_SPLASH_FADE_MS }, (finished) => {
        // scheduleOnRN, not runOnJS — this Reanimated version (4.3.1) flags
        // runOnJS itself as deprecated in favor of react-native-worklets'
        // scheduleOnRN for hopping off the UI-thread worklet back to JS.
        if (finished) scheduleOnRN(setShowCustomSplash, false);
      });
    }, CUSTOM_SPLASH_HOLD_MS);
    return () => clearTimeout(timer);
  }, [fontsLoaded, splashOverlayOpacity]);

  const splashOverlayStyle = useAnimatedStyle(() => ({ opacity: splashOverlayOpacity.value }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <KeyboardProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          {/* WocoApp mirrors LTX web's single light brand palette (see lib/theme.ts) —
            the background never actually goes dark, so status bar content stays dark too. */}
          <StatusBar style="dark" />
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="about"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="contact"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="faq"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="terms"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="privacy"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="cookies"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="become-a-partner"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="hotels"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="hotels/[id]"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="booking/[id]"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="family"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="points"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="support"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="support/[id]"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="join"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </Stack>
          <PortalHost />
          {showCustomSplash ? (
            <Animated.View style={[StyleSheet.absoluteFill, splashOverlayStyle]}>
              <CustomSplashScreen />
            </Animated.View>
          ) : null}
        </ThemeProvider>
      </KeyboardProvider>
    </View>
  );
}
