import * as React from 'react';
import { TextInput, View } from 'react-native';

type OtpInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

// Web's version also supports pasting a full 6-digit code into the first
// box — RN's TextInput has no equivalent paste event to hook into, so that
// convenience is dropped; auto-advance/backspace-to-previous both work the
// same as web.
export function OtpInput({ value, onChange }: OtpInputProps) {
  const refs = React.useRef<(TextInput | null)[]>([]);

  function handleChange(index: number, text: string) {
    const digit = text.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < 5) refs.current[index + 1]?.focus();
  }

  function handleKeyPress(index: number, key: string) {
    if (key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <View className="flex-row justify-center gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={value[index] ?? ''}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          keyboardType="number-pad"
          maxLength={1}
          className="border-input bg-secondary text-foreground h-12 w-11 rounded-xl border text-center text-[18px] font-semibold"
        />
      ))}
    </View>
  );
}
