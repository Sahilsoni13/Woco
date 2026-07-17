import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import type { CookieType } from './content';

// Web shows each cookie type's examples as an HTML table (Cookie / Purpose /
// Duration columns) — doesn't fit mobile width, so each example became its
// own stacked row (name chip + duration on top, purpose text below).
export function CookieTypeCard({ type }: { type: CookieType }) {
  return (
    <View className="border-border overflow-hidden rounded-2xl border">
      <View className="border-border flex-row items-center justify-between gap-3 border-b px-5 py-4">
        <Text className="font-montserrat-medium text-foreground flex-1 text-[14px]">{type.name}</Text>
        <View className={cn('rounded-full px-3 py-1', type.canOptOut ? 'bg-secondary' : 'bg-ltx-gold/15')}>
          <Text
            className={cn(
              'font-montserrat text-[10px] font-semibold uppercase tracking-[0.5px]',
              type.canOptOut ? 'text-muted-foreground' : 'text-ltx-gold'
            )}>
            {type.canOptOut ? 'Optional' : 'Required'}
          </Text>
        </View>
      </View>

      <View className="gap-4 px-5 py-4">
        <Text className="font-montserrat text-muted-foreground text-[12px] leading-[19px]">{type.description}</Text>

        <View className="gap-3">
          {type.examples.map((example, index) => (
            <View key={example.name} className={cn('gap-1', index > 0 && 'border-border border-t pt-3')}>
              <View className="flex-row items-center justify-between gap-2">
                <View className="bg-secondary rounded px-2 py-0.5">
                  <Text className="font-montserrat text-foreground text-[11px]">{example.name}</Text>
                </View>
                <Text className="font-montserrat text-muted-foreground text-[11px]">{example.duration}</Text>
              </View>
              <Text className="font-montserrat text-muted-foreground text-[12px]">{example.purpose}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
