import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// Matches web's GoldToggle exactly (LTX/src/app/member/settings/page.tsx) —
// same 48x26 track / 22px thumb / #d1d5db-to-#c4a574 color, animated here
// instead of a CSS transition. Animated.View needs plain `style` objects,
// not `className` — see the NativeWind/Reanimated interop note in memory.
const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 26;
const THUMB_SIZE = 22;
const THUMB_INSET = 2;
const OFF_COLOR = '#d1d5db';
const ON_COLOR = '#c4a574';

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  const progress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [OFF_COLOR, ON_COLOR]),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * (TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2) }],
  }));

  return (
    <Pressable onPress={() => onChange(!checked)} hitSlop={8}>
      <Animated.View
        style={[
          {
            width: TRACK_WIDTH,
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            padding: THUMB_INSET,
            justifyContent: 'center',
          },
          trackStyle,
        ]}>
        <Animated.View
          style={[
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
