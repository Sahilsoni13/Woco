import { FilterSheet } from '@/components/search/FilterSheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { DateOfBirthInputs, formatDobParts } from './DateOfBirthInputs';
import { POINT_ALLOCATION_RELATIONS, RELATIONS, type FamilyMember, type FamilyRelation } from './mock-data';

const COUNTRY_CODE = '+91';

type AddFamilyMemberSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberCount: number;
  maxFamilyMembers: number | null;
  pointAllocationEnabled: boolean;
  availablePoints: number;
  onSubmit: (data: Omit<FamilyMember, 'id'>) => void;
};

// Web's full country-code picker is dropped, fixed to +91 — same call as
// EditProfileForm. Date of Birth IS kept (via DateOfBirthInputs — three
// plain digit fields instead of web's calendar DatePicker, no such component
// exists in this UI kit yet). Editing is a separate, simpler
// EditFamilyMemberDialog (matches web, which also splits Add/Edit into two
// components — and web's edit modal has no points-allocation field either,
// so that particular difference isn't purely a mobile simplification).
export function AddFamilyMemberSheet({
  open,
  onOpenChange,
  memberCount,
  maxFamilyMembers,
  pointAllocationEnabled,
  availablePoints,
  onSubmit,
}: AddFamilyMemberSheetProps) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dobDay, setDobDay] = React.useState('');
  const [dobMonth, setDobMonth] = React.useState('');
  const [dobYear, setDobYear] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneDigits, setPhoneDigits] = React.useState('');
  const [relation, setRelation] = React.useState<FamilyRelation | null>(null);
  const [allocatePoints, setAllocatePoints] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setFirstName('');
    setLastName('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setEmail('');
    setPhoneDigits('');
    setRelation(null);
    setAllocatePoints('');
    setError(null);
  }, [open]);

  const atLimit = maxFamilyMembers != null && memberCount >= maxFamilyMembers;
  const showAllocatePoints =
    pointAllocationEnabled && relation != null && POINT_ALLOCATION_RELATIONS.includes(relation);

  function handleSubmit() {
    if (atLimit) {
      setError(`You've reached your package's limit of ${maxFamilyMembers} family members.`);
      return;
    }
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      setError('Last name is required.');
      return;
    }
    if (!relation) {
      setError('Please select a relationship.');
      return;
    }

    let pointsToAllocate = 0;
    if (showAllocatePoints && allocatePoints) {
      if (!email.trim()) {
        setError('Email address is required to send a points invitation.');
        return;
      }
      const points = Number(allocatePoints);
      if (!Number.isInteger(points) || points <= 0) {
        setError('Points to allocate must be a positive whole number.');
        return;
      }
      if (points > availablePoints) {
        setError(`You only have ${availablePoints.toLocaleString()} points available.`);
        return;
      }
      pointsToAllocate = points;
    }

    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      relation,
      email: email.trim() || undefined,
      phone: phoneDigits.trim() ? `${COUNTRY_CODE}${phoneDigits}` : undefined,
      dateOfBirth: formatDobParts(dobDay, dobMonth, dobYear),
      allocatedPoints: pointsToAllocate,
    });
  }

  return (
    <FilterSheet title="Add Family Member" open={open} onOpenChange={onOpenChange}>
      <View className="gap-5 pt-1">
        {maxFamilyMembers != null ? (
          <View className="border-ltx-gold/25 bg-secondary rounded-xl border px-3.5 py-2.5">
            <Text className="font-montserrat text-muted-foreground text-[11px] leading-[16px]">
              Your package allows up to <Text className="text-foreground font-semibold">{maxFamilyMembers}</Text>{' '}
              family members. You&apos;ve added <Text className="text-foreground font-semibold">{memberCount}</Text>{' '}
              so far.
            </Text>
          </View>
        ) : null}

        <View className="flex-row gap-3">
          <View className="flex-1 gap-1.5">
            <Text className="font-montserrat text-foreground text-[12px] font-semibold">First Name *</Text>
            <Input value={firstName} onChangeText={setFirstName} placeholder="e.g. Sarah" className="rounded-xl text-[13px]" />
          </View>
          <View className="flex-1 gap-1.5">
            <Text className="font-montserrat text-foreground text-[12px] font-semibold">Last Name *</Text>
            <Input value={lastName} onChangeText={setLastName} placeholder="e.g. Johnson" className="rounded-xl text-[13px]" />
          </View>
        </View>

        <DateOfBirthInputs
          day={dobDay}
          month={dobMonth}
          year={dobYear}
          onDayChange={setDobDay}
          onMonthChange={setDobMonth}
          onYearChange={setDobYear}
        />

        <View className="gap-1.5">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Email Address</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="sarah@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="rounded-xl text-[13px]"
          />
        </View>

        <View className="gap-1.5">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Mobile Number</Text>
          <View className="border-input flex-row items-center gap-2 rounded-xl border px-3">
            <Text className="font-montserrat text-foreground text-[13px]">{COUNTRY_CODE}</Text>
            <Input
              value={phoneDigits}
              onChangeText={(text) => setPhoneDigits(text.replace(/\D/g, ''))}
              placeholder="9876543210"
              keyboardType="number-pad"
              maxLength={10}
              className="native:h-auto flex-1 rounded-none border-0 bg-transparent p-0 py-3 text-[13px] shadow-none"
            />
          </View>
        </View>

        <View className="gap-1.5">
          <Text className="font-montserrat text-foreground text-[12px] font-semibold">Relationship *</Text>
          <View className="flex-row flex-wrap gap-2">
            {RELATIONS.map((r) => {
              const selected = relation === r.value;
              return (
                <Pressable
                  key={r.value}
                  onPress={() => setRelation(r.value)}
                  className={cn(
                    'rounded-full border px-3.5 py-2',
                    selected ? 'border-ltx-gold bg-secondary' : 'border-border'
                  )}>
                  <Text
                    className={cn(
                      'font-montserrat text-[12px]',
                      selected ? 'text-ltx-gold font-semibold' : 'text-muted-foreground'
                    )}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {showAllocatePoints ? (
          <View className="gap-1.5">
            <Text className="font-montserrat text-foreground text-[12px] font-semibold">
              Points to Allocate (optional)
            </Text>
            <Input
              value={allocatePoints}
              onChangeText={(text) => setAllocatePoints(text.replace(/\D/g, ''))}
              placeholder="e.g. 1000"
              keyboardType="number-pad"
              className="rounded-xl text-[13px]"
            />
            <Text className="font-montserrat text-muted-foreground text-[11px] leading-[15px]">
              Sends an invitation to this email so they can claim their own account. Points are debited from your
              balance immediately ({availablePoints.toLocaleString()} available).
            </Text>
          </View>
        ) : null}

        {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}

        <Button size="lg" className="rounded-full" onPress={handleSubmit} disabled={atLimit}>
          <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
            Add Family Member
          </Text>
        </Button>
      </View>
    </FilterSheet>
  );
}
