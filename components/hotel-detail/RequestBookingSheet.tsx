import { MOCK_FAMILY_MEMBERS, RELATION_LABELS } from '@/components/family/mock-data';
import { FilterSheet } from '@/components/search/FilterSheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link, router } from 'expo-router';
import { CircleCheck, Circle, LoaderCircle, Minus, Plus, Users } from 'lucide-react-native';
import * as React from 'react';
import { Alert, Pressable, View } from 'react-native';
import type { RoomType } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="font-montserrat text-foreground text-[14px]">{label}</Text>
      <View className="flex-row items-center gap-4">
        <Pressable
          onPress={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="border-border h-8 w-8 items-center justify-center rounded-full border disabled:opacity-30">
          <Icon as={Minus} size={14} className="text-foreground" />
        </Pressable>
        <Text className="font-montserrat-medium text-foreground w-6 text-center text-[15px]">{value}</Text>
        <Pressable
          onPress={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="border-border h-8 w-8 items-center justify-center rounded-full border disabled:opacity-30">
          <Icon as={Plus} size={14} className="text-foreground" />
        </Pressable>
      </View>
    </View>
  );
}

type RequestBookingSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotelName: string;
  room: RoomType | null;
};

// This is deliberately NOT web's real booking flow (live TBO prebook, a
// multi-step passenger form with passport/PAN/GST fields, KYC gating) —
// none of that has a meaningful equivalent without a real backend and
// payment/inventory system. Family member selection IS kept, though — web's
// "Traveling With: Family/Others" + checklist is real content, and unlike
// the passport/KYC pieces it doesn't need a backend since real Family data
// already exists in this app (see components/family/mock-data.ts).
export function RequestBookingSheet({ open, onOpenChange, hotelName, room }: RequestBookingSheetProps) {
  const [nights, setNights] = React.useState(3);
  const [guests, setGuests] = React.useState(2);
  const [travelWith, setTravelWith] = React.useState<'SELF' | 'FAMILY'>('SELF');
  const [selectedFamilyIds, setSelectedFamilyIds] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setNights(3);
      setGuests(2);
      setTravelWith('SELF');
      setSelectedFamilyIds([]);
    }
  }, [open]);

  // Guest slots beyond yourself — selection can never exceed this, and
  // shrinks it if the guest count is reduced below the current selection.
  const familySlots = Math.max(0, guests - 1);
  React.useEffect(() => {
    if (selectedFamilyIds.length > familySlots) {
      setSelectedFamilyIds((prev) => prev.slice(0, familySlots));
    }
  }, [familySlots, selectedFamilyIds.length]);

  function toggleFamilyMember(id: string) {
    setSelectedFamilyIds((prev) => {
      if (prev.includes(id)) return prev.filter((memberId) => memberId !== id);
      if (prev.length >= familySlots) return prev;
      return [...prev, id];
    });
  }

  if (!room) return null;

  // Reassigned as a local const so TS keeps the non-null narrowing inside
  // handleSubmit — narrowing from the early return above doesn't carry into
  // a nested function that closes over the original `room` prop.
  const activeRoom = room;
  const totalPoints = activeRoom.pointsPerNight * nights;
  const travelingFamily = MOCK_FAMILY_MEMBERS.filter((member) => selectedFamilyIds.includes(member.id));

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    onOpenChange(false);
    const withFamily = travelingFamily.length > 0 ? ` — traveling with ${travelingFamily.map((m) => m.firstName).join(', ')}` : '';
    Alert.alert(
      'Request Sent',
      `Your request for ${activeRoom.name} at ${hotelName}${withFamily} has been sent to our concierge team for review.`,
      [
        { text: 'OK', style: 'cancel' },
        // Web's success screen has a "View My Bookings" button — same
        // redirect here, though the Bookings tab won't actually show this
        // request (no shared state between screens, same "no backend"
        // limitation already noted for the Family preview card).
        { text: 'View Booking', onPress: () => router.push('/booking') },
      ]
    );
  }

  return (
    <FilterSheet title="Request to Book" open={open} onOpenChange={onOpenChange}>
      <View className="gap-6 pt-1">
        <View className="border-border gap-1 rounded-2xl border p-4">
          <Text className="font-montserrat text-muted-foreground text-[11px] uppercase tracking-[1px]">
            {hotelName}
          </Text>
          <Text className="font-montserrat-medium text-foreground text-[15px]">{room.name}</Text>
        </View>

        <View className="gap-4">
          <Stepper label="Nights" value={nights} min={1} max={14} onChange={setNights} />
          <View className="border-border border-t" />
          <Stepper label="Guests" value={guests} min={1} max={6} onChange={setGuests} />
        </View>

        <View className="gap-3">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold uppercase tracking-[1px]">
            Traveling With
          </Text>
          <View className="flex-row gap-2">
            {(['SELF', 'FAMILY'] as const).map((option) => {
              const active = travelWith === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setTravelWith(option)}
                  className={cn(
                    'flex-1 items-center rounded-xl border py-2.5',
                    active ? 'bg-primary border-primary' : 'border-border'
                  )}>
                  <Text
                    className={cn(
                      'font-montserrat text-[12px] font-semibold',
                      active ? 'text-primary-foreground' : 'text-muted-foreground'
                    )}>
                    {option === 'SELF' ? 'Just Me' : 'With Family'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {travelWith === 'FAMILY' ? (
            <View className="border-border bg-secondary gap-2 rounded-xl border p-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1px]">
                  Select Traveling Family Members
                </Text>
                <Text className="font-montserrat text-muted-foreground text-[11px]">
                  {selectedFamilyIds.length} / {familySlots} selected
                </Text>
              </View>

              {MOCK_FAMILY_MEMBERS.length === 0 ? (
                <View className="items-center gap-2 py-3">
                  <Icon as={Users} size={20} className="text-ltx-gold" />
                  <Text className="font-montserrat-medium text-foreground text-center text-[13px]">
                    Add Family Members to Continue
                  </Text>
                  <Text className="font-montserrat text-muted-foreground max-w-[220px] text-center text-[11px] leading-[16px]">
                    You haven't added any family members yet. Add them first to select who's traveling with you.
                  </Text>
                  <Link href="/family" asChild>
                    <Pressable className="bg-primary mt-1 rounded-full px-5 py-2">
                      <Text className="font-montserrat text-primary-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                        Add Family Members
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              ) : familySlots === 0 ? (
                <Text className="font-montserrat text-muted-foreground text-[12px]">
                  Add another guest above to include family members.
                </Text>
              ) : (
                MOCK_FAMILY_MEMBERS.map((member) => {
                  const selected = selectedFamilyIds.includes(member.id);
                  const disabled = !selected && selectedFamilyIds.length >= familySlots;
                  return (
                    <Pressable
                      key={member.id}
                      onPress={() => toggleFamilyMember(member.id)}
                      disabled={disabled}
                      className={cn(
                        'flex-row items-center gap-2.5 rounded-lg px-2 py-1.5',
                        disabled && 'opacity-40'
                      )}>
                      <Icon
                        as={selected ? CircleCheck : Circle}
                        size={16}
                        className={selected ? 'text-ltx-gold' : 'text-muted-foreground'}
                      />
                      <Text className="font-montserrat text-foreground text-[12px]">
                        {member.firstName} {member.lastName}{' '}
                        <Text className="text-muted-foreground">({RELATION_LABELS[member.relation].toLowerCase()})</Text>
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </View>
          ) : null}
        </View>

        <View className="border-border flex-row items-center justify-between border-t pt-4">
          <Text className="font-montserrat text-muted-foreground text-[13px]">Estimated total</Text>
          <Text className="font-montserrat-medium text-foreground text-[18px]">
            {formatWithCommas(totalPoints)} pts
          </Text>
        </View>

        <Text className="font-montserrat text-muted-foreground text-[11px] leading-[16px]">
          This sends a request to our concierge team — your points are only confirmed once the booking is
          reviewed and accepted.
        </Text>

        <Button size="lg" className="rounded-full" onPress={handleSubmit} disabled={submitting}>
          {submitting ? <Icon as={LoaderCircle} size={14} className="text-primary-foreground" /> : null}
          <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
            Submit Request
          </Text>
        </Button>
      </View>
    </FilterSheet>
  );
}
