import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Mail, Phone, UserRound } from 'lucide-react-native';
import { View } from 'react-native';
import type { Guest } from './mock-data';

export function GuestDetails({ guestList }: { guestList: Guest[] }) {
  return (
    <View className="border-border gap-4 rounded-2xl border p-5">
      <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
        Guest Details
      </Text>

      <View className="gap-4">
        {guestList.map((guest, index) => (
          <View key={guest.name} className="flex-row items-start gap-3">
            <View className="bg-secondary h-9 w-9 items-center justify-center rounded-full">
              <Icon as={UserRound} size={16} className="text-muted-foreground" />
            </View>
            <View className="flex-1 gap-1">
              <View className="flex-row flex-wrap items-center gap-2">
                <Text className="font-montserrat-medium text-foreground text-[13px]">{guest.name}</Text>
                <View className="bg-secondary rounded-full px-2 py-0.5">
                  <Text className="font-montserrat text-muted-foreground text-[9px] uppercase tracking-[1px]">
                    {guest.isLead ? 'Lead Guest' : guest.type}
                  </Text>
                </View>
              </View>
              {guest.phone ? (
                <View className="flex-row items-center gap-1.5">
                  <Icon as={Phone} size={11} className="text-muted-foreground" />
                  <Text className="font-montserrat text-muted-foreground text-[11px]">{guest.phone}</Text>
                </View>
              ) : null}
              {guest.email ? (
                <View className="flex-row items-center gap-1.5">
                  <Icon as={Mail} size={11} className="text-muted-foreground" />
                  <Text className="font-montserrat text-muted-foreground text-[11px]">{guest.email}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
