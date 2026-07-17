import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

// Web uses a full calendar DatePicker component that doesn't exist in this
// app's UI kit yet — three plain digit inputs cover the same optional field
// without pulling in a date-picker library for one rarely-used field.
type DateOfBirthInputsProps = {
  day: string;
  month: string;
  year: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
};

export function DateOfBirthInputs({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}: DateOfBirthInputsProps) {
  return (
    <View className="gap-1.5">
      <Text className="font-montserrat text-foreground text-[12px] font-semibold">Date of Birth</Text>
      <View className="flex-row items-center gap-2">
        <Input
          value={day}
          onChangeText={(text) => onDayChange(text.replace(/\D/g, '').slice(0, 2))}
          placeholder="DD"
          keyboardType="number-pad"
          maxLength={2}
          className="w-16 rounded-xl text-center text-[13px]"
        />
        <Text className="text-muted-foreground">/</Text>
        <Input
          value={month}
          onChangeText={(text) => onMonthChange(text.replace(/\D/g, '').slice(0, 2))}
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
          className="w-16 rounded-xl text-center text-[13px]"
        />
        <Text className="text-muted-foreground">/</Text>
        <Input
          value={year}
          onChangeText={(text) => onYearChange(text.replace(/\D/g, '').slice(0, 4))}
          placeholder="YYYY"
          keyboardType="number-pad"
          maxLength={4}
          className="w-20 rounded-xl text-center text-[13px]"
        />
      </View>
    </View>
  );
}

export function parseDobParts(iso: string | undefined): { day: string; month: string; year: string } {
  if (!iso) return { day: '', month: '', year: '' };
  const [year, month, day] = iso.split('-');
  return { day: day ?? '', month: month ?? '', year: year ?? '' };
}

export function formatDobParts(day: string, month: string, year: string): string | undefined {
  if (!day || !month || !year || year.length !== 4) return undefined;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
