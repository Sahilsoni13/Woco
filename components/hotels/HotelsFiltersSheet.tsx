import { FilterSheet } from '@/components/search/FilterSheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { DESTINATION_FILTER_OPTIONS, POINTS_FILTER_OPTIONS, STAR_FILTER_OPTIONS, type FilterOption } from './mock-data';

export type HotelFilterGroupId = 'points' | 'destination' | 'stars';
export type HotelFilterSelection = Record<HotelFilterGroupId, Set<string>>;

export function emptyHotelFilterSelection(): HotelFilterSelection {
  return { points: new Set(), destination: new Set(), stars: new Set() };
}

const GROUPS: { id: HotelFilterGroupId; title: string; options: FilterOption[] }[] = [
  { id: 'points', title: 'Points per night', options: POINTS_FILTER_OPTIONS },
  { id: 'destination', title: 'Destination', options: DESTINATION_FILTER_OPTIONS },
  { id: 'stars', title: 'Star rating', options: STAR_FILTER_OPTIONS },
];

type HotelsFiltersSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selection: HotelFilterSelection;
  onApply: (selection: HotelFilterSelection) => void;
};

// Selections build up locally and only commit to the parent (re-filtering
// the grid) on "Apply" — matches web's exact UX (HotelsFilters.tsx keeps its
// own `selected` state, only calling `onApply` on the button press).
export function HotelsFiltersSheet({ open, onOpenChange, selection, onApply }: HotelsFiltersSheetProps) {
  const [pending, setPending] = React.useState<HotelFilterSelection>(selection);

  React.useEffect(() => {
    if (open) setPending(selection);
  }, [open, selection]);

  function toggle(groupId: HotelFilterGroupId, value: string) {
    setPending((prev) => {
      const next = new Set(prev[groupId]);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return { ...prev, [groupId]: next };
    });
  }

  function clearAll() {
    setPending(emptyHotelFilterSelection());
  }

  const totalSelected = Object.values(pending).reduce((sum, set) => sum + set.size, 0);

  return (
    <FilterSheet title="Filters" open={open} onOpenChange={onOpenChange}>
      <View className="gap-6 pt-1">
        {totalSelected > 0 ? (
          <Pressable onPress={clearAll} className="self-end">
            <Text className="font-montserrat text-muted-foreground text-[12px] underline">Clear all</Text>
          </Pressable>
        ) : null}

        {GROUPS.map((group) => (
          <View key={group.id} className="gap-3">
            <Text className="font-montserrat-medium text-foreground text-[11px] uppercase tracking-[2px]">
              {group.title}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {group.options.map((option) => {
                const active = pending[group.id].has(option.value);
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => toggle(group.id, option.value)}
                    className={cn(
                      'rounded-full border px-3.5 py-2',
                      active ? 'bg-primary border-primary' : 'border-border bg-background'
                    )}>
                    <Text
                      className={cn(
                        'font-montserrat text-[12px] font-medium',
                        active ? 'text-primary-foreground' : 'text-muted-foreground'
                      )}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Button
          size="lg"
          className="rounded-full"
          onPress={() => {
            onApply(pending);
            onOpenChange(false);
          }}>
          <Text className="text-primary-foreground text-[12px] font-medium uppercase tracking-[1.5px]">
            Apply Filters
          </Text>
        </Button>
      </View>
    </FilterSheet>
  );
}
