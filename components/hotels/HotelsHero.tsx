import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as React from 'react';
import { View } from 'react-native';
import { HOTELS_STATS } from './mock-data';

// Hosted on Cloudinary instead of bundled locally (`require(...)`) — the
// original local file was ~53MB, which was baked directly into the app
// binary at build time. A remote `{ uri }` source streams at runtime
// instead, so it no longer inflates the installed app size at all.
const HERO_VIDEO = {
  uri: 'https://res.cloudinary.com/pc848udo/video/upload/v1784719159/4010511-hd_1280_720_50fps_gskh4m.mp4',
};

// Web's version is a hero with a "Member Collection" label, a two-line
// italic heading, and a 3-stat row — same layout here, center-aligned
// (matching web) rather than the bottom-aligned/left-aligned Hero.tsx used
// on the landing page, since this page's hero has no search card below it
// competing for attention.
export function HotelsHero() {
  // Replaces the static Unsplash still with the app's own looping estate
  // footage (assets/video/bg-video.mp4) — muted + looped + no controls, same
  // "ambient background" treatment as a CSS `<video autoplay loop muted>`
  // would get on web. `expo-video` (not the deprecated `expo-av` Video
  // component) is this SDK's current, non-deprecated video API.
  const player = useVideoPlayer(HERO_VIDEO, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    // `min-h` instead of a fixed `h-[420px]` — the heading/subtitle/stats
    // stack can run taller than 420px on narrower phones (font-playfair
    // italic runs wide enough that "curated estates" alone can wrap to its
    // own second line), and a fixed height + overflow-hidden was silently
    // clipping that overflow instead of growing to fit it.
    <View className="min-h-[420px] overflow-hidden bg-black">
      <VideoView
        player={player}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        contentFit="cover"
        nativeControls={false}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.72)']}
        locations={[0, 0.45, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View className="items-center px-6 py-16">
        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-px w-8 bg-white/50" />
          <Text className="font-montserrat text-[11px] uppercase tracking-[3px] text-white/70">
            Member Collection
          </Text>
          <View className="h-px w-8 bg-white/50" />
        </View>

        <Text className="font-montserrat text-center text-[34px] leading-[38px] text-white">Explore our</Text>
        <Text className="font-playfair text-center text-[36px] italic leading-[42px] text-white">
          curated estates
        </Text>

        <Text className="font-montserrat mt-4 max-w-[300px] text-center text-[13px] leading-[20px] text-white/70">
          Exclusive access to extraordinary properties across the globe — no prices, only points.
        </Text>

        {/* flex-1 per stat + dividers as flat siblings via Fragment, same
            overflow-proof pattern as Cta.tsx's stat row — fixed-width
            (px-6) blocks with no wrap let "Members Only" push this row
            wider than the screen. */}
        <View className="mt-8 w-full flex-row items-center">
          {HOTELS_STATS.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 ? <View className="mx-3 h-8 w-px bg-white/20" /> : null}
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="font-eb-garamond text-center text-[22px] leading-none text-white">
                  {stat.value}
                </Text>
                <Text
                  numberOfLines={2}
                  className="font-montserrat mt-1.5 text-center text-[9px] uppercase tracking-[2px] text-white/70">
                  {stat.label}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
}
