import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PencilLine, Star } from 'lucide-react-native';
import { View } from 'react-native';
import type { Booking } from './mock-data';

// Web's Add Review flow (a modal with a 1-5 star picker + text) is deferred
// for this pass — see project_wocoapp_booking_detail_screen memory. This
// only renders an existing review, or a static prompt if there isn't one.
export function ReviewSection({ booking }: { booking: Booking }) {
  if (booking.status !== 'COMPLETED') return null;

  if (booking.review) {
    return (
      <View className="border-border gap-3 rounded-2xl border p-5">
        <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
          Your Review
        </Text>
        <View className="flex-row gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              as={Star}
              size={14}
              className={index < booking.review!.rating ? 'fill-ltx-gold text-ltx-gold' : 'text-border'}
            />
          ))}
        </View>
        <Text className="font-montserrat text-muted-foreground text-[13px] leading-[19px]">
          {booking.review.text}
        </Text>
      </View>
    );
  }

  return (
    <View className="border-border flex-row items-center gap-3 rounded-2xl border border-dashed p-5">
      <View className="bg-secondary h-9 w-9 items-center justify-center rounded-full">
        <Icon as={PencilLine} size={16} className="text-ltx-gold" />
      </View>
      <View className="flex-1">
        <Text className="font-montserrat-medium text-foreground text-[13px]">Share Your Experience</Text>
        <Text className="font-montserrat text-muted-foreground text-[11px]">
          Reviews are coming soon for this stay.
        </Text>
      </View>
    </View>
  );
}
