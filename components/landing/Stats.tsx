import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { Star } from 'lucide-react-native';
import * as React from 'react';
import { Image, View } from 'react-native';

const AVATAR_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
};

type Stat = {
  target: number;
  suffix: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { target: 2500, suffix: '+', label: 'Luxury Estates', sub: 'Globally curated' },
  { target: 48, suffix: '', label: 'Countries', sub: 'Worldwide access' },
  { target: 12000, suffix: '+', label: 'Members', sub: 'Invitation only' },
  { target: 98, suffix: '%', label: 'Satisfaction', sub: 'Member-rated' },
];

// Web's AnimatedCounter triggers on scroll-into-view (framer-motion
// `whileInView`) — this waits for `start` (from useScrollReveal) rather than
// running on mount, since Stats sits well below the fold (after Hero/Trust/
// Features); animating on mount meant the counters had already finished
// counting up long before the user actually scrolled down to see them.
function useCountUp(target: number, start: boolean, durationMs = 1400) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    let frame: number;
    const beginTime = Date.now();

    function tick() {
      const progress = Math.min((Date.now() - beginTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, durationMs]);

  return value;
}

// Not `.toLocaleString()` — that depends on Hermes having full ICU data
// bundled, which isn't guaranteed across RN/Expo versions, so it can silently
// stop adding thousands separators on-device while looking fine in a browser
// preview (a real V8/JSC engine, not Hermes). A manual formatter removes the
// dependency on any runtime Intl support entirely.
function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.target, start);

  return (
    <View className="w-[47%] gap-1 flex flex-col items-center justify-center">
      <Text className="font-eb-garamond text-[38px] leading-[42px] text-foreground">
        {formatWithCommas(value)}
        {stat.suffix}
      </Text>
      <Text className="font-montserrat-medium text-[14px] text-foreground">{stat.label}</Text>
      <Text className="font-montserrat text-[11px] uppercase tracking-[1.5px] text-muted-foreground">
        {stat.sub}
      </Text>
    </View>
  );
}

export function Stats() {
  const { isVisible, onLayout } = useScrollReveal();

  return (
    <View onLayout={onLayout} className="gap-9 bg-ltx-cream-dark px-5 py-12">
      <View className="flex-row items-center justify-center gap-4">
        <View className="h-px w-10 bg-foreground" />
        <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
          By the numbers
        </Text>
        <View className="h-px w-10 bg-foreground" />
      </View>

      {/* Testimonial card */}
      <View className="overflow-hidden rounded-3xl bg-background p-6 shadow-lg shadow-black/10">
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3.5">
            <Image
              source={AVATAR_IMAGE}
              resizeMode="cover"
              className="h-12 w-12 rounded-full border-2 border-border"
            />
            <View>
              <Text className="font-montserrat-medium text-[14px] text-foreground">
                Sophia Laurent
              </Text>
              <Text className="font-montserrat text-[11px] text-muted-foreground">
                Member since 2023
              </Text>
            </View>
          </View>
          <View className="rounded-xl bg-primary px-3 py-1.5">
            <Text className="font-noto-serif text-[12px] text-white">WOCO</Text>
          </View>
        </View>

        <View className="mb-3 flex-row gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} as={Star} size={14} color="#f59e0b" fill="#f59e0b" />
          ))}
        </View>

        <Text className="font-montserrat text-[14px] italic leading-[23px] text-[#374151]">
          &ldquo;From the moment we arrived, everything felt intentionally curated and beautifully
          understated. The villa, concierge, and private experiences created a level of calm luxury
          I rarely find while traveling.&rdquo;
        </Text>

        <View className="mt-5 flex-row items-center gap-2">
          <View className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <Text className="font-montserrat text-[11px] uppercase tracking-[1.5px] text-muted-foreground">
            Goa · Coastal Serenity Villa
          </Text>
        </View>
      </View>

      {/* Heading + stat grid */}
      <View>
        <Text className="font-montserrat text-center text-[24px] leading-[32px] text-foreground">
          Some interesting
        </Text>
        <Text className="font-playfair text-center text-[24px] leading-[32px] text-foreground">
          information
        </Text>
        <Text className="font-montserrat text-center text-[24px] leading-[32px] text-foreground">
          about WOCO Travel
        </Text>

        <View className="mt-7 flex-row flex-wrap gap-x-4 gap-y-6">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} start={isVisible} />
          ))}
        </View>
      </View>
    </View>
  );
}
