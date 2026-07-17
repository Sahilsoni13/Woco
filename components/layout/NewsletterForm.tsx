import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ArrowRight, LoaderCircle } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');

  async function handleSubmit() {
    if (!email.trim() || status === 'loading') return;
    setStatus('loading');
    try {
      // TODO: wire up to the real newsletter subscription API once it exists.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <Input
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          className="native:h-12 flex-1 rounded-full"
        />
        <Button
          size="icon"
          className="native:h-12 native:w-12 rounded-full"
          onPress={handleSubmit}
          disabled={status === 'loading'}>
          <Icon
            as={status === 'loading' ? LoaderCircle : ArrowRight}
            className="text-primary-foreground"
            size={18}
          />
        </Button>
      </View>
      {status === 'success' ? (
        <Text variant="muted" className="text-xs">
          Thanks — you&apos;re on the list.
        </Text>
      ) : null}
      {status === 'error' ? (
        <Text className="text-destructive text-xs">Something went wrong. Please try again.</Text>
      ) : null}
    </View>
  );
}
