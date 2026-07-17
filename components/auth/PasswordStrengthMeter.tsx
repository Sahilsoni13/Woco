import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { getPasswordStrength } from './mock-data';

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const strength = getPasswordStrength(password);

  return (
    <View className="mt-2 flex-row items-center gap-2.5">
      <View className="bg-secondary h-1 flex-1 overflow-hidden rounded-full">
        <View
          className="h-full rounded-full"
          style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color }}
        />
      </View>
      <Text className="font-montserrat text-[11px] font-medium" style={{ color: strength.color }}>
        {strength.label}
      </Text>
    </View>
  );
}
