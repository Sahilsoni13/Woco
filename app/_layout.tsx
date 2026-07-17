import '@/global.css';

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
import { View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

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

  const onLayoutRootView = React.useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="contact" options={{ headerShown: false }} />
            <Stack.Screen name="faq" options={{ headerShown: false }} />
            <Stack.Screen name="terms" options={{ headerShown: false }} />
            <Stack.Screen name="privacy" options={{ headerShown: false }} />
            <Stack.Screen name="cookies" options={{ headerShown: false }} />
            <Stack.Screen name="become-a-partner" options={{ headerShown: false }} />
            <Stack.Screen name="hotels" options={{ headerShown: false }} />
            <Stack.Screen name="hotels/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="booking/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="family" options={{ headerShown: false }} />
            <Stack.Screen name="points" options={{ headerShown: false }} />
            <Stack.Screen name="support" options={{ headerShown: false }} />
            <Stack.Screen name="support/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="join" options={{ headerShown: false }} />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </KeyboardProvider>
    </View>
  );
}
