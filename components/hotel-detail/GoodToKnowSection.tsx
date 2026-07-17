import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Baby, Clock, FileText } from 'lucide-react-native';
import { View } from 'react-native';
import { GOOD_TO_KNOW, type HotelDetail } from './mock-data';

export function GoodToKnowSection({ hotel }: { hotel: HotelDetail }) {
  return (
    <View className="border-border gap-5 border-t px-5 py-8">
      <Text className="text-[22px] leading-[26px]">
        <Text className="font-montserrat text-foreground text-[22px]">Good to </Text>
        <Text className="font-playfair text-foreground text-[22px] italic">Know</Text>
      </Text>

      <View className="border-border overflow-hidden rounded-3xl border">
        <View className="border-border gap-4 border-b p-5">
          <View className="flex-row items-center gap-2.5">
            <Icon as={Clock} size={16} className="text-foreground" />
            <Text className="font-montserrat-medium text-foreground text-[14px]">Timing</Text>
          </View>
          <View className="border-border flex-row items-center justify-between border-b pb-2.5">
            <Text className="font-montserrat text-muted-foreground text-[13px]">Check-In</Text>
            <Text className="font-montserrat-medium text-foreground text-[13px]">{hotel.checkInTime}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-montserrat text-muted-foreground text-[13px]">Check-Out</Text>
            <Text className="font-montserrat-medium text-foreground text-[13px]">{hotel.checkOutTime}</Text>
          </View>
        </View>

        <View className="border-border gap-3 border-b p-5">
          <View className="flex-row items-center gap-2.5">
            <Icon as={Baby} size={16} className="text-foreground" />
            <Text className="font-montserrat-medium text-foreground text-[14px]">Child Policies</Text>
          </View>
          <Text className="font-montserrat text-muted-foreground text-[13px] leading-[20px]">
            {GOOD_TO_KNOW.childPolicy}
          </Text>
        </View>

        <View className="gap-3 p-5">
          <View className="flex-row items-center gap-2.5">
            <Icon as={FileText} size={16} className="text-foreground" />
            <Text className="font-montserrat-medium text-foreground text-[14px]">Fine Print</Text>
          </View>
          <Text className="font-montserrat text-muted-foreground text-[13px] leading-[20px]">
            {GOOD_TO_KNOW.finePrint}
          </Text>
        </View>
      </View>
    </View>
  );
}
