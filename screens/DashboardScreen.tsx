import { MembershipCard } from '@/components/dashboard/MembershipCard';
import { MOCK_MEMBER } from '@/components/dashboard/mock-data';
import { NotificationsList } from '@/components/dashboard/NotificationsList';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { Text } from '@/components/ui/text';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardScreen() {
  const initial = MOCK_MEMBER.firstName.charAt(0).toUpperCase();

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <ScrollView contentContainerClassName="gap-7 px-5 pb-8 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-montserrat text-muted-foreground text-sm">{getGreeting()},</Text>
            <Text className="font-playfair text-foreground text-[26px]">{MOCK_MEMBER.firstName}</Text>
          </View>
          <View className="bg-primary h-12 w-12 items-center justify-center rounded-full">
            <Text className="font-montserrat-medium text-primary-foreground text-base">{initial}</Text>
          </View>
        </View>

        <MembershipCard />
        <QuickActions />
        <RecentBookings />
        <NotificationsList />
      </ScrollView>
    </SafeAreaView>
  );
}
