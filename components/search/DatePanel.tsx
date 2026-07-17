import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import {
  addMonths,
  type DateRange,
  formatMonthYear,
  getMonthGrid,
  isBefore,
  isSameDay,
  isWithinRange,
  startOfDay,
  startOfMonth,
} from './date-utils';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type DatePanelProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
  onClear: () => void;
};

export function DatePanel({ value, onChange, onClear }: DatePanelProps) {
  const [visibleMonth, setVisibleMonth] = React.useState(() => startOfMonth(value.from ?? new Date()));
  const today = startOfDay(new Date());

  function selectDay(day: Date) {
    const { from, to } = value;
    if (!from || to) {
      onChange({ from: day, to: null });
      return;
    }
    if (isBefore(day, from)) {
      onChange({ from: day, to: null });
      return;
    }
    onChange({ from, to: day });
  }

  const cells = getMonthGrid(visibleMonth);

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between">
        <Pressable
          hitSlop={8}
          onPress={() => setVisibleMonth((month) => addMonths(month, -1))}
          className="border-border active:border-foreground h-8 w-8 items-center justify-center rounded-full border">
          <Icon as={ChevronLeft} size={16} className="text-foreground" />
        </Pressable>
        <Text className="font-montserrat-medium text-foreground text-sm">
          {formatMonthYear(visibleMonth)}
        </Text>
        <Pressable
          hitSlop={8}
          onPress={() => setVisibleMonth((month) => addMonths(month, 1))}
          className="border-border active:border-foreground h-8 w-8 items-center justify-center rounded-full border">
          <Icon as={ChevronRight} size={16} className="text-foreground" />
        </Pressable>
      </View>

      <View className="flex-row">
        {WEEKDAY_LABELS.map((label, index) => (
          <View key={index} className="w-[14.28%] items-center py-1">
            <Text variant="muted" className="text-[11px]">
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {cells.map((day, index) => {
          if (!day) return <View key={index} className="h-10 w-[14.28%]" />;

          const disabled = isBefore(day, today);
          const isStart = isSameDay(day, value.from);
          const isEnd = isSameDay(day, value.to);
          const inRange = isWithinRange(day, value.from, value.to);

          return (
            <View key={index} className="h-10 w-[14.28%] items-center justify-center">
              <View
                className={cn(
                  'h-10 w-full items-center justify-center',
                  inRange && 'bg-secondary',
                  isStart && value.to ? 'rounded-l-full bg-secondary' : '',
                  isEnd && value.from ? 'rounded-r-full bg-secondary' : ''
                )}>
                <Pressable
                  disabled={disabled}
                  onPress={() => selectDay(day)}
                  className={cn(
                    'h-8 w-8 items-center justify-center rounded-full',
                    (isStart || isEnd) && 'bg-primary'
                  )}>
                  <Text
                    className={cn(
                      'font-montserrat text-[13px]',
                      disabled
                        ? 'text-muted-foreground/40'
                        : isStart || isEnd
                          ? 'text-primary-foreground font-semibold'
                          : 'text-foreground'
                    )}>
                    {day.getDate()}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      <Pressable onPress={onClear} className="items-center border-t border-border pt-4">
        <Text variant="muted" className="text-[13px]">
          Clear dates
        </Text>
      </Pressable>
    </View>
  );
}
