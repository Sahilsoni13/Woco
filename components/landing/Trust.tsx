import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { TRUST_BRANDS } from './TrustBrandMarks';

const MARQUEE_SPEED_PX_PER_SEC = 42;
const TRACK = [...TRUST_BRANDS, ...TRUST_BRANDS];

function BrandRow() {
  return (
    <>
      {TRACK.map((brand, index) => (
        <View key={index} className="flex-row items-center">
          <View className="px-6">{brand.content}</View>
          <View className="bg-border h-4 w-px" />
        </View>
      ))}
    </>
  );
}

// Infinite marquee: the track renders the brand list twice back-to-back, and
// loops translateX from 0 to -(one set's width) with no easing/reverse — once
// it reaches -oneSetWidth the visible content is pixel-identical to position
// 0 (the second copy has scrolled into the first copy's start position), so
// the instant reset is imperceptible. Animation only starts once onLayout has
// measured the real width; before that it just sits still at 0, so there's no
// jump on mount either.
export function Trust() {
  const [trackWidth, setTrackWidth] = React.useState(0);
  const translateX = useSharedValue(0);
  const oneSetWidth = trackWidth / 2;

  React.useEffect(() => {
    if (!oneSetWidth) return;
    translateX.value = withRepeat(
      withTiming(-oneSetWidth, {
        duration: (oneSetWidth / MARQUEE_SPEED_PX_PER_SEC) * 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [oneSetWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function onTrackLayout(event: LayoutChangeEvent) {
    const width = event.nativeEvent.layout.width;
    if (width > 0 && trackWidth === 0) setTrackWidth(width);
  }

  return (
    <View className="border-border bg-background border-b py-10">
      <Text className="font-montserrat text-muted-foreground mb-8 text-center text-[11px] uppercase tracking-[3px]">
        Trusted by premium hospitality brands
      </Text>

      <View className="overflow-hidden">
        <Animated.View onLayout={onTrackLayout} style={[{ flexDirection: 'row' }, animatedStyle]}>
          <BrandRow />
        </Animated.View>

        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48 }}
        />
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48 }}
        />
      </View>
    </View>
  );
}
