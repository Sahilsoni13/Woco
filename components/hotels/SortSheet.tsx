import { FilterSheet } from '@/components/search/FilterSheet';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { SORT_OPTIONS } from './mock-data';

type SortSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sort: string;
  onChange: (value: string) => void;
};

export function SortSheet({ open, onOpenChange, sort, onChange }: SortSheetProps) {
  return (
    <FilterSheet title="Sort By" open={open} onOpenChange={onOpenChange}>
      <View className="gap-1 pt-1">
        {SORT_OPTIONS.map((option) => {
          const active = option.value === sort;
          return (
            <Pressable
              key={option.value}
              onPress={() => {
                onChange(option.value);
                onOpenChange(false);
              }}
              className={cn(
                'flex-row items-center justify-between rounded-xl px-3 py-3.5',
                active && 'bg-secondary'
              )}>
              <Text
                className={cn(
                  'font-montserrat text-[14px]',
                  active ? 'text-foreground font-semibold' : 'text-muted-foreground'
                )}>
                {option.label}
              </Text>
              {active ? <Icon as={Check} size={16} className="text-foreground" /> : null}
            </Pressable>
          );
        })}
      </View>
    </FilterSheet>
  );
}
