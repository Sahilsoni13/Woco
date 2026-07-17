import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { BedDouble, CalendarDays, Coins, UserPlus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const ACTIONS = [
  { icon: BedDouble, label: 'Book Hotel', href: '/hotels' },
  { icon: CalendarDays, label: 'View Bookings', href: '/booking' },
  { icon: UserPlus, label: 'Add Family', href: '/family' },
  { icon: Coins, label: 'My Points', href: '/points' },
];

export function QuickActions() {
  return (
    <View className="flex-row flex-wrap gap-3">
      {ACTIONS.map((action) => (
        <Link key={action.label} href={action.href as Href} asChild>
          <Pressable className="border-border active:border-foreground/30 h-28 w-[47%] items-center justify-center gap-2 rounded-2xl border">
            <View className="bg-secondary h-11 w-11 items-center justify-center rounded-xl">
              <Icon as={action.icon} size={19} className="text-ltx-gold" />
            </View>
            <Text
              numberOfLines={2}
              className="font-montserrat-medium text-foreground text-center text-[12px]">
              {action.label}
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
