import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleAlert, Coins, LoaderCircle } from 'lucide-react-native';
import { View } from 'react-native';
import type { Booking } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function StatusBanner({ booking }: { booking: Booking }) {
  if (booking.status === 'PENDING_APPROVAL') {
    return (
      <View className="flex-row items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <Icon as={LoaderCircle} size={16} className="mt-0.5 text-amber-600" />
        <View className="flex-1 gap-0.5">
          <Text className="font-montserrat-medium text-[13px] text-amber-800">Awaiting Admin Review</Text>
          <Text className="font-montserrat text-[12px] leading-[17px] text-amber-700">
            Your points have been held and this request is being reviewed. You&apos;ll be notified once it&apos;s
            confirmed.
          </Text>
        </View>
      </View>
    );
  }

  if (booking.status === 'FAILED') {
    return (
      <View className="flex-row items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
        <Icon as={CircleAlert} size={16} className="mt-0.5 text-red-600" />
        <View className="flex-1 gap-0.5">
          <Text className="font-montserrat-medium text-[13px] text-red-800">Booking Failed</Text>
          <Text className="font-montserrat text-[12px] leading-[17px] text-red-700">
            {booking.notes ?? 'We were unable to confirm this booking. Any held points have been released.'}
          </Text>
        </View>
      </View>
    );
  }

  if (booking.status === 'CANCELLED') {
    return (
      <View className="border-ltx-gold/30 bg-secondary flex-row items-start gap-3 rounded-2xl border p-4">
        <Icon as={Coins} size={16} className="text-ltx-gold mt-0.5" />
        <View className="flex-1 gap-1">
          <Text className="font-montserrat-medium text-foreground text-[13px]">Booking Cancelled</Text>
          <Text className="font-montserrat text-muted-foreground text-[12px] leading-[17px]">
            {booking.notes ?? 'This booking has been cancelled.'}
          </Text>
          {booking.refundedPoints ? (
            <Text className="font-montserrat text-ltx-gold mt-1 text-[12px] font-semibold">
              {formatWithCommas(booking.refundedPoints)} pts refunded to your balance
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  return null;
}
