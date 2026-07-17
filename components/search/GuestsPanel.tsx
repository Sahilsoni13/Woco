import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Minus, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export type GuestCounts = {
  adults: number;
  children: number;
  rooms: number;
};

type GuestsPanelProps = {
  value: GuestCounts;
  onChange: (value: GuestCounts) => void;
};

const ROWS: Array<{ key: keyof GuestCounts; label: string; sub: string; min: number }> = [
  { key: 'adults', label: 'Adults', sub: 'Ages 13 or above', min: 1 },
  { key: 'children', label: 'Children', sub: 'Ages 2–12', min: 0 },
  { key: 'rooms', label: 'Rooms', sub: 'Number of rooms', min: 1 },
];

export function GuestsPanel({ value, onChange }: GuestsPanelProps) {
  function step(key: keyof GuestCounts, delta: number, min: number) {
    onChange({ ...value, [key]: Math.max(min, value[key] + delta) });
  }

  return (
    <View className="border-border gap-5 rounded-2xl border p-4">
      {ROWS.map((row, index) => (
        <View key={row.key}>
          {index > 0 ? <View className="bg-border mb-5 h-px" /> : null}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-montserrat-medium text-foreground text-sm">{row.label}</Text>
              <Text variant="muted" className="text-xs">
                {row.sub}
              </Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Pressable
                onPress={() => step(row.key, -1, row.min)}
                className="border-border active:border-foreground h-8 w-8 items-center justify-center rounded-full border">
                <Icon as={Minus} size={14} className="text-muted-foreground" />
              </Pressable>
              <Text className="text-foreground w-5 text-center text-base font-semibold">
                {value[row.key]}
              </Text>
              <Pressable
                onPress={() => step(row.key, 1, row.min)}
                className="border-border active:border-foreground h-8 w-8 items-center justify-center rounded-full border">
                <Icon as={Plus} size={14} className="text-muted-foreground" />
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
