import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { ArrowRight, Star } from 'lucide-react-native';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';

const ESTATE_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
};

const STATS = [
  { value: '12,000+', label: 'Active Members' },
  { value: '48', label: 'Countries' },
  { value: '2,500+', label: 'Estates' },
];

export function Cta() {
  return (
    <View className="gap-8 bg-secondary px-5 py-16">
      <View className="gap-3">
        <View className="flex-row items-center justify-center gap-4">
          <View className="h-px w-10 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
            Begin Your Journey
          </Text>
          <View className="h-px w-10 bg-foreground" />
        </View>

        <View>
          <Text className="font-montserrat  text-center text-[24px] leading-[34px] text-foreground">
            The world&apos;s finest
          </Text>
          <Text className="font-playfair text-center  text-[24px] leading-[34px] text-foreground">estates,</Text>
          <Text className="font-montserrat text-center  text-[24px] leading-[34px] text-foreground">
            reserved for you.
          </Text>
        </View>

        <Text className="max-w-[340px] text-center font-montserrat text-[15px] leading-[26px] text-muted-foreground">
          Join an exclusive circle of discerning travelers. Apply today and let your points take you
          further than you ever imagined.
        </Text>
      </View>

      <Link href="/hotels" asChild>
        <Pressable className="flex-row items-center gap-3 self-center rounded-full bg-primary px-8 py-4 active:bg-primary/90">
          <Text className="font-montserrat text-[13px] font-medium uppercase tracking-[1.5px] text-primary-foreground">
            Explore Estates
          </Text>
          <Icon as={ArrowRight} size={16} className="text-primary-foreground" />
        </Pressable>
      </Link>

      {/* Each stat is `flex-1` (equal thirds) with dividers as flat siblings —
          not nested inside each stat's own row — so the row's total width can
          never exceed the container regardless of label length. The original
          draft nested a `gap-6` inside each stat AND on the outer row, which
          double-stacked spacing and pushed "Active Members" off screen. */}
      <View className="flex-row items-center justify-between border-t border-border pt-8">
        {STATS.map((stat, index) => (
          <React.Fragment key={stat.label}>
            {index > 0 ? <View className="mx-1 h-8 w-px bg-border" /> : null}
            <View className="flex-1 items-center justify-between">
              <Text
                numberOfLines={1}
                className="font-montserrat text-[18px] whitespace-nowrap font-light leading-none text-foreground">
                {stat.value}
              </Text>
              <Text
                numberOfLines={2}
                className="mt-1.5 font-montserrat text-[10px] uppercase whitespace-nowrap tracking-[1.5px] text-muted-foreground">
                {stat.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      {/* Image card + floating points badge (same normal-flow negative-margin
          overlap technique as components/landing/ExploreSearchCard.tsx —
          deliberately not `position: absolute`, see that file's comment). */}
      <View>
        <View className="aspect-[3/4] overflow-hidden rounded-3xl">
          <Image source={ESTATE_IMAGE} resizeMode="cover" style={{ flex: 1 }} />
          <LinearGradient
            colors={['transparent', 'transparent', 'rgba(0,0,0,0.65)']}
            locations={[0, 0.5, 1]}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View className="absolute bottom-8 left-6 right-6">
            <Text className="font-montserrat text-[11px] uppercase tracking-[2px] text-white/80">
              Featured Estate
            </Text>
            <Text className="mt-1 font-playfair text-[22px] text-white">Casa Solmare</Text>
            <Text className="font-montserrat text-[13px] text-white/80">
              North Malé Atoll, Maldives
            </Text>
          </View>
        </View>

        <View className="-mt-6 ml-5 flex-row items-center gap-3 self-start rounded-2xl bg-background p-3 shadow-lg shadow-black/15">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Icon as={Star} size={16} color="white" fill="white" />
          </View>
          <View>
            <Text className="font-montserrat-medium text-[13px] text-foreground">
              2,500 pts / night
            </Text>
            <Text className="font-montserrat text-[11px] text-muted-foreground">
              Points only · No price shown
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
