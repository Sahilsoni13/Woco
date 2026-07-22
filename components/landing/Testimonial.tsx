import * as React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const testimonials = [
  {
    quote:
      'From the moment we arrived, everything felt intentionally curated and beautifully understated. The villa, concierge, and private experiences created a level of calm luxury I rarely find while traveling.',
    name: 'Sophia Laurent',
    role: 'Member since 2023',
    location: 'Goa · Coastal Serenity Villa',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'WOCO transformed how we think about travel entirely. No price tags, no negotiations — just flawless experiences delivered with quiet excellence. The Bali retreat exceeded every expectation we had.',
    name: 'Arjun Mehrotra',
    role: 'Member since 2022',
    location: 'Bali · Tirta Retreat',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'The concierge team anticipated every need before we even voiced it. Private transfers, bespoke dining, sunrise yacht excursions — all arranged seamlessly through points alone. Extraordinary.',
    name: 'Isabelle Chen',
    role: 'Member since 2024',
    location: 'Maldives · Casa Solmare',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

// hsl(...) tokens from lib/theme.ts, converted to hex — same reasoning as
// RoomTypeCard.tsx's BORDER_OFF/FOREGROUND constants: interpolateColor needs
// real color strings, not theme className tokens. GOLD matches the same
// conversion already used for --ltx-gold in Hero.tsx.
const GOLD = '#b8962e';
const DOT_OFF = '#ede9e4'; // --border

const OUTER_PADDING = 20; // px-5
const CARD_GAP = 16;

function StarRating({ count }: { count: number }) {
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="#f59e0b">
          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </Svg>
      ))}
    </View>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <View className="gap-5 rounded-3xl border border-border bg-background p-5 shadow-lg shadow-black/5">
      {/* Stars + avatar */}
      <View className="flex-row items-start justify-between">
        <StarRating count={testimonial.rating} />
        <Image
          source={{ uri: testimonial.image }}
          resizeMode="cover"
          className="rounded-full border-2 border-border"
          style={{ width: 44, height: 44 }}
        />
      </View>

      {/* Quote */}
      <Text className="font-montserrat text-[14px] leading-[23px] text-[#374151]">
        &ldquo;{testimonial.quote}&rdquo;
      </Text>

      {/* Author */}
      <View className="border-t border-border pt-4">
        <Text className="font-montserrat-medium text-[14px] text-foreground">
          {testimonial.name}
        </Text>
        <Text className="mt-0.5 font-montserrat text-[12px] text-muted-foreground">
          {testimonial.role}
        </Text>
        <View className="mt-2 flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <Text className="font-montserrat text-[11px] uppercase tracking-[1px] text-muted-foreground">
            {testimonial.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

// A pill that widens + shifts from border-gray to gold once its slide is
// active — same manual useSharedValue/interpolateColor pattern established
// for RoomTypeCard/ToggleSwitch, not a Layout Animation (nothing here mounts
// or unmounts, just an interpolated style, so none of the Portal/Dialog
// entering/exiting risk documented elsewhere applies).
function Dot({ active }: { active: boolean }) {
  const progress = useSharedValue(active ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: 200 });
  }, [active, progress]);

  const style = useAnimatedStyle(() => ({
    width: 6 + progress.value * 14,
    backgroundColor: interpolateColor(progress.value, [0, 1], [DOT_OFF, GOLD]),
  }));

  return <Animated.View style={[{ height: 6, borderRadius: 3 }, style]} />;
}

// Web's version is a CSS grid that just collapses to 1 column on mobile —
// a plain vertical stack here matched that literally, but with 3 full-height
// quote cards that reads as a long scroll. Swapped for a horizontal
// snap-scrolling carousel instead (one card per "page", full width minus the
// section's own px-5 padding) + autoplay + dot pagination, a more
// native-feeling mobile pattern than replicating web's collapsed-grid
// behavior — a deliberate mobile-specific improvement, not a port.
const AUTOPLAY_INTERVAL_MS = 4500;

export default function Testimonial() {
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = windowWidth - OUTER_PADDING * 2;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  // A ref, not state — flips on every touch frame during a drag, and
  // shouldn't itself trigger a re-render.
  const draggingRef = React.useRef(false);

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(testimonials.length - 1, index)));
  }

  // Auto-advances one slide every 4.5s, wrapping back to the first after the
  // last. Depends on `activeIndex` deliberately — any index change, whether
  // from this timer's own `scrollTo` or a manual swipe (via `onScroll`
  // above), re-runs this effect and restarts the wait, so a manual swipe
  // always gets a fresh 4.5s before autoplay resumes rather than firing
  // right on top of it. `draggingRef` additionally skips the tick while a
  // touch is actively in progress, so autoplay never fights a swipe mid-drag.
  React.useEffect(() => {
    const id = setInterval(() => {
      if (draggingRef.current) return;
      const next = (activeIndex + 1) % testimonials.length;
      scrollRef.current?.scrollTo({ x: next * (cardWidth + CARD_GAP), animated: true });
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [activeIndex, cardWidth]);

  return (
    <View className="gap-8 bg-background py-12">
      <View className="gap-3 px-5">
        {/* Heading */}
        <View className="flex-row items-center justify-center gap-4">
          <View className="h-px w-8 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
            Member Stories
          </Text>
          <View className="h-px w-8 bg-foreground" />
        </View>

        <View className="items-center">
          <Text className="text-center text-[24px] leading-[30px]">
            <Text className="font-montserrat text-foreground">What our </Text>
            <Text className="font-playfair text-foreground">members say</Text>
          </Text>
          <Text className="mt-4 max-w-[320px] text-center font-montserrat text-[15px] leading-[26px] text-muted-foreground">
            Stories from discerning travelers who have experienced the WOCO difference firsthand.
          </Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + CARD_GAP}
        snapToAlignment="start"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
          draggingRef.current = true;
        }}
        onScrollEndDrag={() => {
          draggingRef.current = false;
        }}
        contentContainerStyle={{ paddingHorizontal: OUTER_PADDING, gap: CARD_GAP }}>
        {testimonials.map((t) => (
          <View key={t.name} style={{ width: cardWidth }}>
            <TestimonialCard testimonial={t} />
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center justify-center gap-2">
        {testimonials.map((t, index) => (
          <Dot key={t.name} active={index === activeIndex} />
        ))}
      </View>
    </View>
  );
}
