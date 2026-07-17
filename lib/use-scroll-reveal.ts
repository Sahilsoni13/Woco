import * as React from 'react';
import { useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { ScrollYContext } from './scroll-context';

// Web's landing sections use framer-motion's `whileInView` so entrance
// animations (e.g. Stats' counters) only play once a section actually
// scrolls into the viewport. This is the mobile equivalent — reads the
// scroll position shared by PublicPageLayout and flips `isVisible` to true
// once, the first time this section's measured position has scrolled far
// enough up to be on-screen. `offsetY` is a shared value (not a plain ref)
// specifically so the UI-thread reaction can read it safely — see the
// `headerContentHeight` staleness bug noted in memory for why a plain ref/
// state captured in a worklet closure isn't reliable here.
export function useScrollReveal() {
  const scrollY = React.useContext(ScrollYContext);
  const { height: windowHeight } = useWindowDimensions();
  const [isVisible, setIsVisible] = React.useState(false);
  const offsetY = useSharedValue<number | null>(null);

  function onLayout(event: LayoutChangeEvent) {
    if (offsetY.value === null) {
      offsetY.value = event.nativeEvent.layout.y;
    }
  }

  useAnimatedReaction(
    () => ({ scrollY: scrollY?.value ?? 0, offsetY: offsetY.value }),
    (current) => {
      if (isVisible || current.offsetY === null) return;
      // Trigger a bit before the section is fully scrolled into view (here,
      // once its top is within 85% of a screen height from the bottom edge)
      // rather than waiting for it to be perfectly centered on screen.
      if (current.scrollY + windowHeight * 0.85 > current.offsetY) {
        runOnJS(setIsVisible)(true);
      }
    },
    [isVisible, windowHeight]
  );

  return { isVisible, onLayout };
}
