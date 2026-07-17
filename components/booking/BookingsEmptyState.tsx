import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { CircleX } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type BookingsEmptyStateProps = {
  tabLabel: string;
  isSearching: boolean;
};

export function BookingsEmptyState({ tabLabel, isSearching }: BookingsEmptyStateProps) {
  return (
    <View className="items-center gap-3 px-6 py-20">
      <View className="bg-secondary h-16 w-16 items-center justify-center rounded-full">
        <Icon as={CircleX} size={28} className="text-ltx-gold" />
      </View>

      <Text className="font-playfair text-foreground text-center text-[22px]">
        {isSearching ? 'No Matches Found' : tabLabel === 'All' ? 'No Bookings Yet' : `No Active ${tabLabel}`}
      </Text>

      <Text className="font-montserrat text-muted-foreground max-w-[280px] text-center text-[13px] leading-[20px]">
        {isSearching
          ? 'No bookings match your search. Try a different hotel name, city, or booking reference.'
          : "Your journey with L'Elite awaits. Explore our curated collection to book your first privileged experience."}
      </Text>

      {!isSearching ? (
        <Link href="/hotels" asChild>
          <Pressable className="bg-ltx-gold active:opacity-90 mt-2 rounded-full px-8 py-3">
            <Text className="font-montserrat text-[12px] font-semibold uppercase tracking-[1.5px] text-white">
              Browse Destinations
            </Text>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}
