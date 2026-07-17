import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react-native';
import * as React from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import type { HotelDetail } from './mock-data';

// Web's version is a desktop photo mosaic (main + top-right + bottom-left +
// "+N" tile) with a separate full-gallery modal. Simplified to one tappable
// hero photo + photo-count badge opening the same kind of lightbox — the
// mosaic's extra tiles don't have anywhere useful to go at mobile width.
export function HotelDetailGallery({ hotel }: { hotel: HotelDetail }) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function next() {
    setActiveIndex((i) => (i + 1) % hotel.images.length);
  }
  function prev() {
    setActiveIndex((i) => (i - 1 + hotel.images.length) % hotel.images.length);
  }

  return (
    <View className="gap-4 pt-4">
      <View className="flex-row items-center gap-1 px-5">
        <Link href="/" asChild>
          <Pressable>
            <Text className="font-montserrat text-muted-foreground text-[12px]">Home</Text>
          </Pressable>
        </Link>
        <Icon as={ChevronRight} size={12} className="text-muted-foreground" />
        <Link href="/hotels" asChild>
          <Pressable>
            <Text className="font-montserrat text-muted-foreground text-[12px]">Hotels</Text>
          </Pressable>
        </Link>
        <Icon as={ChevronRight} size={12} className="text-muted-foreground" />
        <Text numberOfLines={1} className="font-montserrat-medium text-foreground flex-1 text-[12px]">
          {hotel.name}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          setActiveIndex(0);
          setLightboxOpen(true);
        }}
        className="px-5">
        <View className="aspect-[4/3] overflow-hidden rounded-2xl">
          <Image source={{ uri: hotel.images[0] }} resizeMode="cover" style={{ flex: 1 }} />
          <View className="absolute bottom-3 left-3 flex-row items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5">
            <Icon as={Images} size={12} className="text-white" />
            <Text className="font-montserrat text-[11px] font-semibold text-white">
              {hotel.images.length} PHOTOS
            </Text>
          </View>
        </View>
      </Pressable>

      <Modal
        visible={lightboxOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setLightboxOpen(false)}>
        <View className="flex-1 items-center justify-center bg-black">
          <Pressable onPress={() => setLightboxOpen(false)} className="absolute right-5 top-14 z-10 p-2">
            <Icon as={X} size={22} className="text-white" />
          </Pressable>

          <Image
            source={{ uri: hotel.images[activeIndex] }}
            resizeMode="contain"
            style={{ width: '100%', height: '70%' }}
          />

          <Text className="font-montserrat mt-4 text-[13px] text-white/60">
            {activeIndex + 1} / {hotel.images.length}
          </Text>

          <View className="absolute left-4 right-4 top-1/2 flex-row items-center justify-between">
            <Pressable onPress={prev} className="h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <Icon as={ChevronLeft} size={20} className="text-white" />
            </Pressable>
            <Pressable onPress={next} className="h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <Icon as={ChevronRight} size={20} className="text-white" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
