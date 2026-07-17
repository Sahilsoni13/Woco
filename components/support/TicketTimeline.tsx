import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { TICKET_TIMELINE_STEPS, getTicketTimelineStep, type TicketStatus } from './mock-data';

// Same flex-1-per-node + Fragment-divider shape as BookingTimeline.tsx —
// keeps each circle and its label sharing one column so they stay aligned
// regardless of connector length (see the earlier overflow bug that pattern
// was built to fix).
const NODE_WIDTH = 76;

export function TicketTimeline({ status }: { status: TicketStatus }) {
  const activeStep = getTicketTimelineStep(status);

  return (
    <View className="border-border gap-4 rounded-2xl border p-5">
      <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
        Status Timeline
      </Text>

      <View className="flex-row items-start">
        {TICKET_TIMELINE_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const done = stepNumber <= activeStep;
          const isLast = index === TICKET_TIMELINE_STEPS.length - 1;

          return (
            <React.Fragment key={step}>
              <View className="items-center gap-2" style={{ width: NODE_WIDTH }}>
                <View
                  className={cn(
                    'h-8 w-8 items-center justify-center rounded-full border-2',
                    done ? 'bg-ltx-gold border-ltx-gold' : 'bg-background border-border'
                  )}>
                  {done ? <Icon as={Check} size={14} className="text-white" /> : <View className="bg-border h-2 w-2 rounded-full" />}
                </View>
                <Text
                  className={cn(
                    'font-montserrat text-center text-[10px] uppercase leading-[13px] tracking-[0.5px]',
                    done ? 'text-ltx-gold font-semibold' : 'text-muted-foreground'
                  )}>
                  {step}
                </Text>
              </View>
              {!isLast ? (
                <View className={cn('mt-[15px] h-[2px] flex-1', stepNumber < activeStep ? 'bg-ltx-gold' : 'bg-border')} />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
