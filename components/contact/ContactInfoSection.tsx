import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Handshake, Mail, Phone } from 'lucide-react-native';
import { View } from 'react-native';
import { CONTACT_ITEMS, REGISTERED_ADDRESS, type ContactMethod } from './mock-data';

const METHOD_ICONS: Record<ContactMethod, typeof Mail> = {
  mail: Mail,
  phone: Phone,
  partner: Handshake,
};

export function ContactInfoSection() {
  return (
    <View className="gap-5 px-5 py-10">
      <Text className="font-noto-serif text-foreground text-[22px]">How to reach us</Text>
      <Text className="font-montserrat text-muted-foreground text-[13px] leading-[21px]">
        Our team is available to assist members, answer questions about our exclusive travel society, and support
        property partners through every step of the journey.
      </Text>

      <View className="gap-3">
        {CONTACT_ITEMS.map((item) => (
          <View key={item.label} className="border-border flex-row gap-4 rounded-2xl border p-5">
            <View className="bg-ltx-gold/10 h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <Icon as={METHOD_ICONS[item.method]} size={18} className="text-ltx-gold" />
            </View>
            <View className="flex-1">
              <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1.5px]">
                {item.label}
              </Text>
              <Text className="font-montserrat-medium text-foreground mt-0.5 text-[14px]">{item.value}</Text>
              <Text className="font-montserrat text-muted-foreground mt-0.5 text-[12px]">{item.sub}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="border-border gap-2 rounded-2xl border p-5">
        <Text className="font-montserrat text-muted-foreground text-[10px] uppercase tracking-[1.5px]">
          Registered Address
        </Text>
        <View>
          <Text className="font-montserrat text-muted-foreground text-[13px] leading-[21px]">
            {REGISTERED_ADDRESS.name}
          </Text>
          {REGISTERED_ADDRESS.lines.map((line) => (
            <Text key={line} className="font-montserrat text-muted-foreground text-[13px] leading-[21px]">
              {line}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
