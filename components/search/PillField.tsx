import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type PillFieldProps = {
  label: string;
  value: string;
  hasValue: boolean;
  active: boolean;
  onPress: () => void;
  onClear: () => void;
};

export function PillField({ label, value, hasValue, active, onPress, onClear }: PillFieldProps) {
  return (
    <View
      className={cn('min-w-0 flex-1 flex-row items-center rounded-full', active && 'bg-accent')}>
      <Pressable onPress={onPress} className="min-w-0 flex-1 items-start px-3 py-1.5">
        <Text
          numberOfLines={1}
          className="font-montserrat-medium text-muted-foreground text-[9px] uppercase tracking-[1px]">
          {label}
        </Text>
        <Text numberOfLines={1} className="font-montserrat-medium text-foreground w-full text-[11px]">
          {value}
        </Text>
      </Pressable>
      {hasValue ? (
        <Pressable
          hitSlop={8}
          onPress={onClear}
          className="active:bg-accent mr-1 h-5 w-5 items-center justify-center rounded-full">
          <Icon as={X} size={11} className="text-muted-foreground" />
        </Pressable>
      ) : null}
    </View>
  );
}
