import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Star } from 'lucide-react-native';
import { View, useWindowDimensions } from 'react-native';

// Hosted on Cloudinary instead of bundled locally (`require(...)`) — the
// original local file was ~15MB, which was baked directly into the app
// binary at build time. A remote `{ uri }` source streams at runtime
// instead, so it no longer inflates the installed app size at all.
const HERO_VIDEO = {
  uri: 'https://res.cloudinary.com/pc848udo/video/upload/v1784719234/8397918-hd_1920_1080_25fps_hc2ilo.mp4',
};
const GOLD = '#b8962e';

// A solid header always sits above this (see components/layout/Header.tsx) —
// no transparent-overlay header here. Simpler, always legible, and the search
// card below (see HomeScreen) is the one clear next action instead of this
// also carrying its own competing CTA button.
export function Hero() {
  const { height: windowHeight } = useWindowDimensions();
  // Looping ambient background video instead of the old static hero-bg.jpg
  // still — same muted/looped/no-controls treatment as HotelsHero.tsx's
  // bg-video.mp4, using expo-video (not the deprecated expo-av Video) for it.
  const player = useVideoPlayer(HERO_VIDEO, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={{ height: Math.max(windowHeight * 0.6, 460) }} className="bg-ltx-green overflow-hidden">
      <VideoView
        player={player}
        contentFit="cover"
        nativeControls={false}
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.7)']}
        locations={[0, 0.45, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View className="flex-1 justify-end px-5 pb-14 pt-6">
        {/* Rating badge */}
        <View className="absolute right-3 top-3 flex-row items-center gap-2 backdrop-blur-sm bg-black/40 rounded-lg p-2 px-2.5">
          <Icon as={Star} size={14} color={GOLD} fill={GOLD} />
          <Text className="font-montserrat text-[13px] text-white/80">4.9/5 from 12K+ members</Text>
        </View>

        {/* Pre-label */}
        <View className="mb-4 flex-row items-center gap-2.5">
          <View className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
          <Text className="font-montserrat text-[11px] uppercase tracking-[2.5px] text-white/80">
            Invitation Only · Members Worldwide
          </Text>
        </View>

        {/* Heading */}
        <Text className="font-playfair text-[44px] leading-[44px] text-white">The World,</Text>
        <Text className="font-montserrat-bold -mt-1 text-[44px] leading-[44px] text-white">Reserved</Text>
        <Text className="font-montserrat-bold mt-1 text-[26px] leading-[28px] text-white">for Members.</Text>

        {/* Subtitle */}
        <Text className="font-montserrat mt-4 max-w-[340px] text-[14px] leading-[22px] text-white/80">
          An invitation-only travel society for those who seek experiences beyond the reach of
          ordinary currency.
        </Text>
      </View>
    </View>
  );
}
