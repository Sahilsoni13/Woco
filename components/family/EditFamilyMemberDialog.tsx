import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { DateOfBirthInputs, formatDobParts, parseDobParts } from './DateOfBirthInputs';
import { RELATIONS, type FamilyMember, type FamilyRelation } from './mock-data';

const COUNTRY_CODE = '+91';

type EditFamilyMemberDialogProps = {
  member: FamilyMember | null;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<FamilyMember, 'id' | 'allocatedPoints'>) => void;
};

// Centered dialog, same as RemoveFamilyMemberDialog — matches web, which also
// keeps Edit as its own modal separate from Add (AddFamilyMemberSheet is a
// bottom sheet since it has the points-allocation field Edit doesn't).
export function EditFamilyMemberDialog({ member, onOpenChange, onSave }: EditFamilyMemberDialogProps) {
  const { height: windowHeight } = useWindowDimensions();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dobDay, setDobDay] = React.useState('');
  const [dobMonth, setDobMonth] = React.useState('');
  const [dobYear, setDobYear] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneDigits, setPhoneDigits] = React.useState('');
  const [relation, setRelation] = React.useState<FamilyRelation | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!member) return;
    setFirstName(member.firstName);
    setLastName(member.lastName);
    const dob = parseDobParts(member.dateOfBirth);
    setDobDay(dob.day);
    setDobMonth(dob.month);
    setDobYear(dob.year);
    setEmail(member.email ?? '');
    setPhoneDigits(member.phone?.replace(COUNTRY_CODE, '') ?? '');
    setRelation(member.relation);
    setError(null);
  }, [member]);

  function handleSave() {
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

    onSave({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      relation,
      email: email.trim() || undefined,
      phone: phoneDigits.trim() ? `${COUNTRY_CODE}${phoneDigits}` : undefined,
      dateOfBirth: formatDobParts(dobDay, dobMonth, dobYear),
    });
  }

  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Family Member</DialogTitle>
        </DialogHeader>

        <ScrollView
          style={{ maxHeight: windowHeight * 0.5 }}
          contentContainerClassName="gap-4"
          showsVerticalScrollIndicator={false}>
          <View className="flex-row gap-3">
            <View className="flex-1 gap-1.5">
              <Text className="font-montserrat text-foreground text-[12px] font-semibold">First Name *</Text>
              <Input value={firstName} onChangeText={setFirstName} className="rounded-xl text-[13px]" />
            </View>
            <View className="flex-1 gap-1.5">
              <Text className="font-montserrat text-foreground text-[12px] font-semibold">Last Name *</Text>
              <Input value={lastName} onChangeText={setLastName} className="rounded-xl text-[13px]" />
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

          {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}
        </ScrollView>

        <View className="flex-row gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" onPress={() => onOpenChange(false)}>
            <Text className="text-foreground text-[12px] font-semibold uppercase tracking-[1px]">Cancel</Text>
          </Button>
          <Button size="lg" className="flex-1 rounded-full" onPress={handleSave}>
            <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1px]">
              Save Changes
            </Text>
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  );
}
