import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Circle, CircleCheck, Info } from 'lucide-react-native';
import * as React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { FilterSheet } from '../search/FilterSheet';
import { CANCELLATION_DEDUCTION_RATE, CANCEL_REASONS, type Booking } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type CancelSheetProps = {
  booking: Booking;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelled: () => void;
};

// Consolidates web's 3-step modal chain (Cancellation Policy info -> Confirm
// Cancellation with refund calc -> a simpler confirm for PENDING_APPROVAL)
// into one sheet, reusing FilterSheet's bottom-docked pattern. The standalone
// policy modal's text is folded inline instead of a separate step.
export function CancelSheet({ booking, open, onOpenChange, onCancelled }: CancelSheetProps) {
  const [reason, setReason] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState('');

  const deduction = Math.round(booking.points * CANCELLATION_DEDUCTION_RATE);
  const refund = booking.points - deduction;
  const isPending = booking.status === 'PENDING_APPROVAL';

  function handleConfirm() {
    if (!reason) return;
    onOpenChange(false);
    Alert.alert(
      'Cancellation Requested',
      isPending
        ? 'Your booking request has been withdrawn and any held points have been released.'
        : `This booking has been cancelled. ${formatWithCommas(refund)} pts will be refunded to your balance.`
    );
    onCancelled();
  }

  return (
    <FilterSheet title="Cancel Booking" open={open} onOpenChange={onOpenChange}>
      <View className="gap-5 pt-1">
        <View className="border-border bg-secondary flex-row items-start gap-2.5 rounded-xl border p-3.5">
          <Icon as={Info} size={14} className="text-muted-foreground mt-0.5" />
          <Text className="font-montserrat text-muted-foreground flex-1 text-[11px] leading-[16px]">
            {isPending
              ? 'This request hasn’t been confirmed yet, so cancelling now releases 100% of your held points.'
              : `Per membership policy, cancelling a confirmed booking incurs a ${Math.round(CANCELLATION_DEDUCTION_RATE * 100)}% points deduction.`}
          </Text>
        </View>

        {!isPending ? (
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-muted-foreground text-[12px]">Points Held</Text>
              <Text className="font-montserrat-medium text-foreground text-[13px]">
                {formatWithCommas(booking.points)} pts
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-muted-foreground text-[12px]">Cancellation Fee</Text>
              <Text className="font-montserrat-medium text-[13px] text-red-600">
                -{formatWithCommas(deduction)} pts
              </Text>
            </View>
            <View className="border-border flex-row items-center justify-between border-t pt-2">
              <Text className="font-montserrat-medium text-foreground text-[13px]">Refund</Text>
              <Text className="font-montserrat-medium text-ltx-gold text-[15px]">
                {formatWithCommas(refund)} pts
              </Text>
            </View>
          </View>
        ) : null}

        <View className="gap-2.5">
          <Text className="font-montserrat-medium text-foreground text-[12px] uppercase tracking-[1px]">
            Reason for Cancellation
          </Text>
          {CANCEL_REASONS.map((option) => {
            const selected = reason === option;
            return (
              <Pressable
                key={option}
                onPress={() => setReason(option)}
                className={cn(
                  'flex-row items-center gap-2.5 rounded-xl border px-3.5 py-3',
                  selected ? 'border-ltx-gold bg-secondary' : 'border-border'
                )}>
                <Icon
                  as={selected ? CircleCheck : Circle}
                  size={16}
                  className={selected ? 'text-ltx-gold' : 'text-muted-foreground'}
                />
                <Text className="font-montserrat text-foreground text-[13px]">{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <View className="gap-2">
          <Text className="font-montserrat-medium text-foreground text-[12px] uppercase tracking-[1px]">
            Additional Notes (Optional)
          </Text>
          <Input
            value={notes}
            onChangeText={setNotes}
            placeholder="Anything else we should know?"
            multiline
            numberOfLines={3}
            className="rounded-xl py-2.5 text-[13px]"
            // Same fix as CreateTicketSheet's Message field — Input's base
            // `h-10` has no web-scoped override, so a `native:h-auto`
            // className only won on native. Explicit numeric `style` height
            // always wins over className-derived height, on every platform.
            style={{ height: 100, textAlignVertical: 'top' }}
          />
        </View>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full"
          disabled={!reason}
          onPress={handleConfirm}>
          <Text className="text-[12px] font-semibold uppercase tracking-[1.5px] text-white">
            Confirm Cancellation
          </Text>
        </Button>
      </View>
    </FilterSheet>
  );
}
