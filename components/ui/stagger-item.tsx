import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

type StaggerItemProps = {
  index: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const STEP_MS = 60;
const MAX_STEPS = 6; // caps the delay for long lists/pages instead of growing unbounded

// A lightweight "list mount" reveal — each item fades in + slides up a
// little, staggered by index, once when it first mounts. Not a scroll-
// position reveal (see lib/use-scroll-reveal.ts for that heavier pattern,
// used on the landing/hotel-detail screens that sit inside PublicPageLayout's
// shared ScrollYContext) — this just needs "arrived on screen, animate in,"
// which covers list/grid screens (Booking, Points, Family, Support, Hotels
// listing) that don't have that scroll-tracking plumbing.
//
// Deliberately keyed off mount, not `index` changing — a re-render that
// keeps the same list item (same React `key`) at a new index (e.g. a search
// filter narrowing the list) must NOT replay the animation on it; only a
// genuinely new item (new key, fresh mount) should stagger in.
//
// Per the established Animated.View/className interop gotcha (RoomTypeCard,
// ToggleSwitch, BookingCtaBar), this carries no className — callers needing
// layout sizing (e.g. a grid's `w-[47%]`) pass it through `style` instead.
export function StaggerItem({ index, children, style }: StaggerItemProps) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(
      Math.min(index, MAX_STEPS) * STEP_MS,
      withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 14 }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
