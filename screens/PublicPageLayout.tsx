import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollYContext } from '@/lib/scroll-context';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PublicPageLayoutProps = {
  children: React.ReactNode;
};

export function PublicPageLayout({ children }: PublicPageLayoutProps) {
  const insets = useSafeAreaInsets();
  // Tracked only so descendant sections can know when they've scrolled into
  // view (see lib/use-scroll-reveal.ts, used by Stats' counters) — this is
  // NOT the header hide/show behavior (that was tried and reverted).
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View className="bg-background flex-1">
      <Header />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        // Plain style objects, not className — Animated.ScrollView has the
        // same NativeWind interop gap as Animated.View (see TabBar.tsx).
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}>
        <ScrollYContext.Provider value={scrollY}>
          {children}
          <Footer />
        </ScrollYContext.Provider>
      </Animated.ScrollView>
    </View>
  );
}
