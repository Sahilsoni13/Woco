import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { STEP_META, TOTAL_STEPS } from './mock-data';

type StepProgressProps = {
  step: number;
};

// Web's dot row keeps a text label under every dot (`hidden sm:block` on
// mobile widths, i.e. web itself hides them below a breakpoint) — this
// drops the labels entirely rather than cramming 6 of them into ~340px,
// relying on the "Step X of 6 — Title" line above instead.
export function StepProgress({ step }: StepProgressProps) {
  const progressPct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="font-montserrat text-muted-foreground text-[11px] uppercase tracking-[2px]">
          Step {step} of {TOTAL_STEPS}
        </Text>
        <Text className="font-montserrat text-ltx-gold text-[13px] font-semibold">
          {STEP_META[step - 1].title}
        </Text>
      </View>

      <View className="bg-secondary h-1.5 overflow-hidden rounded-full">
        <View className="bg-ltx-gold h-full rounded-full" style={{ width: `${progressPct}%` }} />
      </View>

      <View className="flex-row items-center justify-between">
        {STEP_META.map((meta, index) => {
          const n = index + 1;
          const done = n < step;
          const active = n === step;
          return (
            <React.Fragment key={meta.title}>
              <View
                className={
                  done
                    ? 'bg-ltx-gold h-7 w-7 items-center justify-center rounded-full'
                    : active
                      ? 'border-ltx-gold bg-ltx-gold/10 h-7 w-7 items-center justify-center rounded-full border-2'
                      : 'border-border h-7 w-7 items-center justify-center rounded-full border-2'
                }>
                {done ? (
                  <Icon as={Check} size={13} className="text-primary-foreground" />
                ) : (
                  <Text
                    className={`font-montserrat text-[11px] font-bold ${active ? 'text-ltx-gold' : 'text-muted-foreground/50'}`}>
                    {n}
                  </Text>
                )}
              </View>
              {n < TOTAL_STEPS ? (
                <View className={done ? 'bg-ltx-gold mx-1 h-[2px] flex-1' : 'bg-border mx-1 h-[2px] flex-1'} />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
