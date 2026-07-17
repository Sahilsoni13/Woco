import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Alert, Linking, Pressable, View } from 'react-native';
import { CONTACT_ITEMS, SUBJECT_OPTIONS } from './mock-data';

const GENERAL_ENQUIRIES_EMAIL = CONTACT_ITEMS[0].value;

function buildMailtoUrl(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const subjectLabel = SUBJECT_OPTIONS.find((s) => s.value === data.subject)?.label ?? 'General Enquiry';
  const bodyLines = [`Name: ${`${data.firstName} ${data.lastName}`.trim()}`, `Email: ${data.email}`, '', data.message];
  const query = `subject=${encodeURIComponent(subjectLabel)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  return `mailto:${GENERAL_ENQUIRIES_EMAIL}?${query}`;
}

// Web's "form" has no backend either — it's a plain `mailto:` link (a GET
// form with encType="text/plain"), so this isn't a mocked submission, it's
// the real equivalent: builds the same kind of mailto URL and hands it to
// the device's own mail app via Linking.
export function ContactForm() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit() {
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!message.trim()) {
      setError('Please tell us how we can help.');
      return;
    }
    setError(null);

    const url = buildMailtoUrl({ firstName, lastName, email, subject: subject ?? '', message });
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert('No Mail App Found', `Please email us directly at ${GENERAL_ENQUIRIES_EMAIL}.`);
      return;
    }
    await Linking.openURL(url);
  }

  return (
    <View className="border-border gap-5 rounded-2xl border p-6">
      <View>
        <Text className="font-noto-serif text-foreground text-[20px]">Send us a message</Text>
        <Text className="font-montserrat text-muted-foreground mt-0.5 text-[12px]">
          We'll get back to you within one business day.
        </Text>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 gap-1.5">
          <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
            First Name
          </Text>
          <Input value={firstName} onChangeText={setFirstName} placeholder="Jane" className="rounded-xl text-[13px]" />
        </View>
        <View className="flex-1 gap-1.5">
          <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
            Last Name
          </Text>
          <Input value={lastName} onChangeText={setLastName} placeholder="Smith" className="rounded-xl text-[13px]" />
        </View>
      </View>

      <View className="gap-1.5">
        <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
          Email Address
        </Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="jane@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          className="rounded-xl text-[13px]"
        />
      </View>

      <View className="gap-1.5">
        <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
          Subject
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {SUBJECT_OPTIONS.map((option) => {
            const selected = subject === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSubject(option.value)}
                className={cn(
                  'rounded-full border px-3.5 py-2',
                  selected ? 'border-ltx-gold bg-secondary' : 'border-border'
                )}>
                <Text
                  className={cn(
                    'font-montserrat text-[12px]',
                    selected ? 'text-ltx-gold font-semibold' : 'text-muted-foreground'
                  )}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="gap-1.5">
        <Text className="font-montserrat text-muted-foreground text-[11px] font-semibold uppercase tracking-[1px]">
          Message
        </Text>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Tell us how we can help…"
          multiline
          numberOfLines={5}
          className="rounded-xl py-2.5 text-[13px]"
          // Explicit numeric height, not a `native:h-auto` className — see
          // the memory note on Input's unconditional base `h-10` having no
          // web-scoped override (components/support/CreateTicketSheet.tsx's
          // Message field had exactly this bug).
          style={{ height: 130, textAlignVertical: 'top' }}
        />
      </View>

      {error ? <Text className="font-montserrat text-[12px] text-red-500">{error}</Text> : null}

      <Button size="lg" className="rounded-full" onPress={handleSubmit}>
        <Text className="text-primary-foreground text-[12px] font-semibold uppercase tracking-[1.5px]">
          Send Message
        </Text>
      </Button>
    </View>
  );
}
