import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Eye, EyeOff } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export function PasswordField({ label, value, onChangeText }: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className="border-border gap-1.5 border-b pb-3">
      <Text className="font-montserrat text-ltx-gold text-[10px] uppercase tracking-[1.2px]">{label}</Text>
      <View className="flex-row items-center gap-3">
        <Input
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          placeholder="••••••••••••"
          className="native:h-auto flex-1 rounded-none border-0 bg-transparent p-0 tracking-[3px] shadow-none"
        />
        <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8}>
          <Icon as={visible ? Eye : EyeOff} size={16} className="text-muted-foreground" />
        </Pressable>
      </View>
    </View>
  );
}
