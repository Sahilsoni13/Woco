import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';
import { PASSWORD_REQUIREMENTS } from './mock-data';

export function PasswordRequirementsList({ password }: { password: string }) {
  return (
    <View className="border-border bg-secondary gap-2 rounded-xl border p-4">
      {PASSWORD_REQUIREMENTS.map((requirement) => {
        const done = requirement.test(password);
        return (
          <View key={requirement.text} className="flex-row items-center gap-2">
            <Icon as={CircleCheck} size={14} className={done ? 'text-emerald-500' : 'text-muted-foreground/40'} />
            <Text className={`font-montserrat text-[12px] ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
              {requirement.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
