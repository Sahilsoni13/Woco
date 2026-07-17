import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ArrowRight, Building2, Home as HomeIcon, Star, TreePine, WavesHorizontal } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';

const CATEGORIES = [
  { icon: HomeIcon, label: 'Private Villas' },
  { icon: Building2, label: 'Penthouses' },
  { icon: WavesHorizontal, label: 'Beachfront' },
  { icon: TreePine, label: 'Jungle Retreats' },
];

// Placeholder photography (same Unsplash placeholders LTX web uses) — swap
// for real property photos once a content/media backend exists.
const VILLA_IMAGE = { uri: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' };
const POOL_IMAGE = { uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80' };
const BEDROOM_IMAGE = { uri: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80' };

export function Features() {
  return (
    <View className="bg-background gap-8 px-5 py-12">
      <View>
        <View className="flex-row items-center justify-center gap-4 mb-3">
          <View className="h-px w-10 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
          Our Collection
          </Text>
          <View className="h-px w-10 bg-foreground" />
        </View>
     <View>
        <Text className="text-center font-montserrat text-foreground text-[24px] leading-[36px]">
          Take the first step
        </Text>
         <Text className="text-center font-montserrat text-foreground text-[24px] leading-[36px]">toward your dream</Text>
        <Text className="text-center font-playfair text-foreground text-[24px] leading-[36px]">destination.</Text>
     </View>
        <Text className="text-center font-montserrat text-muted-foreground mt-5 text-[15px] leading-[26px]">
          A private travel experience designed for discerning members seeking refined hospitality,
          timeless destinations, and understated luxury worldwide.
        </Text>
      </View>

      {/* Category chips — icon stacked above label (not side-by-side) so the
          full chip width is free for text; a fixed height keeps all four
          uniform whether their label wraps to one or two lines. */}
      <View className="flex-row flex-wrap gap-3">
        {CATEGORIES.map((category) => (
          <Pressable
            key={category.label}
            className="border-border active:border-foreground/30 h-24 w-[47%] items-center justify-center gap-2 rounded-2xl border px-2">
            <View className="bg-secondary h-10 w-10 items-center justify-center rounded-xl">
              <Icon as={category.icon} size={18} className="text-foreground" />
            </View>
            <Text
              numberOfLines={2}
              className="font-montserrat-medium text-foreground text-center text-[12px] leading-[15px]">
              {category.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Link href="/hotels" asChild>
        <Pressable className="bg-primary active:bg-primary/90 flex-row items-center gap-2 self-center rounded-full px-7 py-3.5">
          <Text className="font-montserrat text-primary-foreground text-[13px] font-medium">
            Explore all estates
          </Text>
          <Icon as={ArrowRight} size={14} className="text-primary-foreground" />
        </Pressable>
      </Link>

      {/* Image grid */}
      <View className="flex-row gap-3">
        <View className="flex-1 overflow-hidden rounded-2xl">
          <Image source={VILLA_IMAGE} resizeMode="cover" style={{ flex: 1 }} />
        </View>
        <View className="flex-1 gap-3">
          <View className="aspect-[4/3] overflow-hidden rounded-2xl">
            <Image source={POOL_IMAGE} resizeMode="cover" style={{ flex: 1 }} />
          </View>
          <View className="aspect-[4/3] overflow-hidden rounded-2xl">
            <Image source={BEDROOM_IMAGE} resizeMode="cover" style={{ flex: 1 }} />
            <View className="bg-background/90 absolute bottom-2 left-2 flex-row items-center gap-1.5 rounded-full px-2.5 py-1.5">
              <Icon as={Star} size={11} color="#f59e0b" fill="#f59e0b" />
              <Text className="font-montserrat-medium text-foreground text-[11px]">4.9</Text>
              <Text className="font-montserrat text-muted-foreground text-[10px]">Member Rated</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
