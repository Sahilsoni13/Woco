import { FilterSheet } from '@/components/search/FilterSheet';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type Option = { label: string; value: string };

type OptionSheetProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

// Generic single-select list sheet — same shape as hotels/SortSheet.tsx,
// generalized so both Country and Phone Dial Code pickers below can share
// one implementation instead of two near-identical files.
export function OptionSheet({ title, open, onOpenChange, options, value, onChange }: OptionSheetProps) {
  return (
    <FilterSheet title={title} open={open} onOpenChange={onOpenChange}>
      <View className="gap-1 pt-1">
        {options.map((option) => {
          const active = option.value === value;
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
