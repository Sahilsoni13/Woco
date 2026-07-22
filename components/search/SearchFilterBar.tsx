import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { type DateRange, formatMonthDay } from './date-utils';
import { DatePanel } from './DatePanel';
import { FilterSheet } from './FilterSheet';
import { type GuestCounts, GuestsPanel } from './GuestsPanel';
import { LocationPanel } from './LocationPanel';
import { PillField } from './PillField';

type ActiveField = 'location' | 'dates' | 'guests' | null;

const DEFAULT_GUESTS: GuestCounts = { adults: 2, children: 0, rooms: 1 };

export function SearchFilterBar() {
  const [activeField, setActiveField] = React.useState<ActiveField>(null);
  const [location, setLocation] = React.useState('');
  const [dateRange, setDateRange] = React.useState<DateRange>({ from: null, to: null });
  const [guests, setGuests] = React.useState<GuestCounts>(DEFAULT_GUESTS);

  const guestTotal = guests.adults + guests.children;
  const guestsChanged =
    guests.adults !== DEFAULT_GUESTS.adults ||
    guests.children !== DEFAULT_GUESTS.children ||
    guests.rooms !== DEFAULT_GUESTS.rooms;

  const dateLabel = dateRange.from
    ? dateRange.to
      ? `${formatMonthDay(dateRange.from)} – ${formatMonthDay(dateRange.to)}`
      : formatMonthDay(dateRange.from)
    : 'Any week';

  const guestLabel = guestsChanged
    ? `${guestTotal} guest${guestTotal > 1 ? 's' : ''}${guests.rooms > 1 ? `, ${guests.rooms} rooms` : ''}`
    : 'Add guests';

  function toggle(field: ActiveField) {
    setActiveField((current) => (current === field ? null : field));
  }

  function handleSearch() {
    // TODO: wire up to real hotel search results once that screen exists.
    setActiveField(null);
  }

  return (
    <>
      <View className="flex-row items-center rounded-full border border-border bg-background p-2.5">
        <PillField
          label="Location"
          value={location || 'Anywhere'}
          hasValue={!!location}
          active={activeField === 'location'}
          onPress={() => toggle('location')}
          onClear={() => setLocation('')}
        />
        <View className="h-5 w-px bg-border" />
        <PillField
          label="Dates"
          value={dateLabel}
          hasValue={!!dateRange.from}
          active={activeField === 'dates'}
          onPress={() => toggle('dates')}
          onClear={() => setDateRange({ from: null, to: null })}
        />
        <View className="h-5 w-px bg-border" />
        <PillField
          label="Guests"
          value={guestLabel}
          hasValue={guestsChanged}
          active={activeField === 'guests'}
          onPress={() => toggle('guests')}
          onClear={() => setGuests(DEFAULT_GUESTS)}
        />
        <Pressable
          onPress={handleSearch}
          className="ml-1 h-9 w-9 items-center justify-center rounded-full bg-primary active:bg-primary/90">
          <Icon as={Search} size={15} className="text-primary-foreground" />
        </Pressable>
      </View>

      <FilterSheet
        title="Where to?"
        open={activeField === 'location'}
        onOpenChange={(open) => !open && setActiveField(null)}>
        <LocationPanel
          onSelect={(value) => {
            setLocation(value);
            setActiveField('dates');
          }}
        />
      </FilterSheet>

      <FilterSheet
        title="When are you traveling?"
        open={activeField === 'dates'}
        onOpenChange={(open) => !open && setActiveField(null)}>
        <DatePanel
          value={dateRange}
          onChange={(range) => {
            setDateRange(range);
            if (range.from && range.to) setActiveField('guests');
          }}
          onClear={() => setDateRange({ from: null, to: null })}
        />
      </FilterSheet>

      <FilterSheet
        title="Who's coming?"
        open={activeField === 'guests'}
        onOpenChange={(open) => !open && setActiveField(null)}>
        <GuestsPanel value={guests} onChange={setGuests} />
      </FilterSheet>
    </>
  );
}
