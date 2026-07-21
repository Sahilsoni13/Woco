import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

// Shown once the JS bundle mounts, as a "second stage" that picks up where
// the native launch image (app.json's expo-splash-screen config, a static
// PNG) leaves off — that native image can't animate at all, so this gives
// the same "Woco / — ◆ — / Travel" composition real motion once React is
// actually running. Colors intentionally match assets/images/splash.png's
// warm bronze-to-black glow for continuity between the two splash stages.
//
// Deliberately built with manual useSharedValue/useAnimatedStyle timing
// rather than Reanimated's entering/exiting Layout Animations API
// (FadeIn/SlideInRight etc.) — this codebase already hit reliability
// problems with that API on web inside the Dialog primitive (see
// components/ui/native-only-animated-view.tsx, which disables it entirely
// on web) and settled on manual shared-value animation as the proven-safe
// pattern elsewhere (TabBar's indicator, Hero's scroll-reveal counters).
//
// className is intentionally kept off every Animated.View/Animated.Text in
// this file — only plain nested View/Text carry className, per the
// documented gotcha that NativeWind's class-to-style interop isn't wired up
// for react-native-reanimated's Animated components (see
// project_wocoapp_tab_structure memory / TabBar.tsx's own comment on this).
export function CustomSplashScreen() {
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(14);
  const dividerOpacity = useSharedValue(0);
  const labelOpacity = useSharedValue(0);

  React.useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoTranslateY.value = withTiming(0, { duration: 600 });
    dividerOpacity.value = withDelay(350, withTiming(1, { duration: 450 }));
    labelOpacity.value = withDelay(520, withTiming(1, { duration: 450 }));
  }, [dividerOpacity, labelOpacity, logoOpacity, logoTranslateY]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));
  const dividerStyle = useAnimatedStyle(() => ({ opacity: dividerOpacity.value }));
  const labelStyle = useAnimatedStyle(() => ({ opacity: labelOpacity.value }));

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <LinearGradient
        colors={['#2e2416', '#000000']}
        start={{ x: 0.5, y: 0.32 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={logoStyle}>
        <Text className="font-noto-serif-bold text-[58px] text-white">Woco</Text>
      </Animated.View>

      <Animated.View style={[dividerStyle, { marginTop: 20 }]}>
        <View className="flex-row items-center gap-3">
          <View className="bg-ltx-gold h-[2px] w-14" />
          <View className="bg-ltx-gold h-2.5 w-2.5" style={{ transform: [{ rotate: '45deg' }] }} />
          <View className="bg-ltx-gold h-[2px] w-14" />
        </View>
      </Animated.View>

      <Animated.View style={[labelStyle, { marginTop: 16 }]}>
        <Text className="font-montserrat-medium text-ltx-gold text-[13px] uppercase" style={{ letterSpacing: 6 }}>
          Travel
        </Text>
      </Animated.View>
    </View>
  );
}
