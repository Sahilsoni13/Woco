import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { TIMELINE_STEPS, getTimelineStep, type Booking } from './mock-data';

// Node width (68) and the connector's top offset (13 = half the 28px circle
// minus half the 2px line) keep the circle and its label sharing one column,
// so the label centers under its own circle instead of under the circle+line
// pair — the previous version's circle sat at the left edge of a flex-1
// column while the label centered in the same column, drifting them apart.
const NODE_WIDTH = 68;

export function BookingTimeline({ booking }: { booking: Booking }) {
  const activeStep = getTimelineStep(booking.status);

  return (
    <View className="border-border gap-4 rounded-2xl border p-5">
      <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
        Booking Timeline
      </Text>

      <View className="flex-row items-start">
        {TIMELINE_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const done = stepNumber <= activeStep;
          const isLast = index === TIMELINE_STEPS.length - 1;

          return (
            <React.Fragment key={step}>
              <View className="items-center gap-2" style={{ width: NODE_WIDTH }}>
                <View
                  className={cn(
                    'h-7 w-7 items-center justify-center rounded-full',
                    done ? 'bg-ltx-gold' : 'bg-secondary border-border border'
                  )}>
                  {done ? (
                    <Icon as={Check} size={13} className="text-white" />
                  ) : (
                    <Text className="font-montserrat text-muted-foreground text-[11px]">{stepNumber}</Text>
                  )}
                </View>
                <Text
                  className={cn(
                    'font-montserrat text-center text-[9px] leading-[12px]',
                    done ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                  {step}
                </Text>
              </View>
              {!isLast ? (
                <View
                  className={cn('mt-[13px] h-[2px] flex-1', stepNumber < activeStep ? 'bg-ltx-gold' : 'bg-border')}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
