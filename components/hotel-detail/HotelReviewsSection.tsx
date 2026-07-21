import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { Star } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { MEMBER_REVIEW, RATING_CATEGORIES } from './mock-data';

// Same scroll-into-view trigger + rAF ease-out fill as Stats.tsx's counters
// (`useCountUp`) — the bars used to jump straight to their final width with
// no animation at all, mount or not.
function useFillReveal(targetPct: number, start: boolean, durationMs = 900) {
  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    let frame: number;
    const beginTime = Date.now();

    function tick() {
      const progress = Math.min((Date.now() - beginTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setPct(targetPct * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, targetPct, durationMs]);

  return pct;
}

function RatingBar({ label, score, start }: { label: string; score: number; start: boolean }) {
  const targetPct = (score / 5) * 100;
  const pct = useFillReveal(targetPct, start);
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="font-montserrat text-muted-foreground text-[13px]">{label}</Text>
        <Text className="font-montserrat-medium text-foreground text-[13px]">{score.toFixed(1)}</Text>
      </View>
      <View className="bg-secondary h-1 w-full overflow-hidden rounded-full">
        <View className="bg-foreground h-full rounded-full" style={{ width: `${pct}%` }} />
      </View>
    </View>
  );
}

export function HotelReviewsSection() {
  const { isVisible, onLayout } = useScrollReveal();

  // `onLayout` must sit on THIS section's own outermost View — the one that's
  // a direct child of PublicPageLayout's ScrollView content (matching
  // Stats.tsx's placement) — not on some nested child further down. RN's
  // onLayout reports position relative to the immediate parent, not the
  // scroll container, so putting it on an inner View measured only that
  // View's tiny offset within its own parent, which was already satisfied
  // by the "within 85% of a screen height" check the instant this mounted —
  // the reveal fired (and finished) on mount, before any real scrolling.
  return (
    <View onLayout={onLayout} className="border-border gap-6 border-t px-5 py-8">
      <View className="flex-row items-center gap-4">
        <View className="bg-primary items-center gap-1.5 rounded-2xl px-4 py-3">
          <Icon as={Star} size={14} className="fill-white text-white" />
          <Text className="font-eb-garamond text-[22px] leading-none text-white">{MEMBER_REVIEW.rating}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-[22px] leading-[26px]">
            <Text className="font-montserrat text-foreground text-[22px]">Elite </Text>
            <Text className="font-playfair text-foreground text-[22px] italic">Perspective</Text>
          </Text>
          <Text className="font-montserrat text-muted-foreground mt-1 text-[12px]">
            Curated member experiences
          </Text>
        </View>
      </View>

      <View className="border-border gap-5 rounded-3xl border p-5">
        {RATING_CATEGORIES.map((category) => (
          <RatingBar key={category.label} label={category.label} score={category.score} start={isVisible} />
        ))}
      </View>

      <View className="border-border gap-4 rounded-3xl border p-5">
        <View className="flex-row gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon key={index} as={Star} size={14} className="fill-amber-500 text-amber-500" />
          ))}
        </View>
        <Text className="font-montserrat text-foreground text-[14px] italic leading-[22px]">
          "{MEMBER_REVIEW.quote}"
        </Text>
        <View>
          <Text className="font-playfair text-foreground text-[22px] italic">— {MEMBER_REVIEW.author}</Text>
          <Text className="font-montserrat text-muted-foreground mt-1 text-[11px] uppercase tracking-[1.5px]">
            {MEMBER_REVIEW.memberSince}
          </Text>
        </View>
      </View>
    </View>
  );
}
