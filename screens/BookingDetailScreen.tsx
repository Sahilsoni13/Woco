import { BookingHero } from '@/components/booking/BookingHero';
import { BookingTimeline } from '@/components/booking/BookingTimeline';
import { CancelSheet } from '@/components/booking/CancelSheet';
import { ConciergeCard } from '@/components/booking/ConciergeCard';
import { GuestDetails } from '@/components/booking/GuestDetails';
import { CANCELLABLE_STATUSES, MOCK_ALL_BOOKINGS } from '@/components/booking/mock-data';
import { ReviewSection } from '@/components/booking/ReviewSection';
import { StatusBanner } from '@/components/booking/StatusBanner';
import { SummaryGrid } from '@/components/booking/SummaryGrid';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from './PlaceholderScreen';

type BookingDetailScreenProps = {
  id: string;
};

export function BookingDetailScreen({ id }: BookingDetailScreenProps) {
  const [cancelSheetOpen, setCancelSheetOpen] = React.useState(false);
  const booking = MOCK_ALL_BOOKINGS.find((item) => item.id === id);

  if (!booking) {
    return <PlaceholderScreen title="Booking Not Found" description={`No booking matches #${id}`} />;
  }

  const showConcierge = booking.status !== 'CANCELLED' && booking.status !== 'FAILED';
  const showTimeline = booking.status !== 'CANCELLED' && booking.status !== 'FAILED';
  const canCancel = CANCELLABLE_STATUSES.includes(booking.status);

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border flex-row items-center gap-3 border-b px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <Icon as={ChevronLeft} size={22} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[15px]">Booking Details</Text>
          <Text className="font-montserrat text-muted-foreground text-[11px]">Ref: {booking.bookingNumber}</Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-4 pb-8" showsVerticalScrollIndicator={false}>
        <BookingHero booking={booking} />

        <View className="gap-4 px-5">
          <SummaryGrid booking={booking} />
          <StatusBanner booking={booking} />
          <GuestDetails guestList={booking.guestList} />
          {showTimeline ? <BookingTimeline booking={booking} /> : null}
          <ReviewSection booking={booking} />
          {showConcierge ? <ConciergeCard /> : null}

          {canCancel ? (
            <Pressable
              onPress={() => setCancelSheetOpen(true)}
              className="border-border active:bg-secondary mt-1 items-center rounded-full border py-3.5">
              <Text className="font-montserrat text-[12px] font-semibold uppercase tracking-[1.5px] text-red-600">
                Cancel Booking
              </Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>

      <CancelSheet
        booking={booking}
        open={cancelSheetOpen}
        onOpenChange={setCancelSheetOpen}
        onCancelled={() => {
          // No backend yet — MOCK_ALL_BOOKINGS isn't actually mutated, so the
          // status shown on this screen won't flip after confirming. Revisit
          // once a real cancellation API exists.
        }}
      />
    </SafeAreaView>
  );
}
