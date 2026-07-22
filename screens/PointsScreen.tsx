import { MembershipCard } from '@/components/dashboard/MembershipCard';
import { HotelsPagination } from '@/components/hotels/HotelsPagination';
import { MOCK_TRANSACTIONS, TRANSACTIONS_PER_PAGE } from '@/components/points/mock-data';
import { PointsEmptyState } from '@/components/points/PointsEmptyState';
import { TransactionRow } from '@/components/points/TransactionRow';
import { Icon } from '@/components/ui/icon';
import { StaggerItem } from '@/components/ui/stagger-item';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function PointsScreen() {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(MOCK_TRANSACTIONS.length / TRANSACTIONS_PER_PAGE));
  const paginated = MOCK_TRANSACTIONS.slice((page - 1) * TRANSACTIONS_PER_PAGE, page * TRANSACTIONS_PER_PAGE);

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border flex-row items-center gap-3 border-b px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <Icon as={ChevronLeft} size={22} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[15px]">My Points</Text>
          <Text className="font-montserrat text-muted-foreground text-[11px]">
            Your membership plan and points activity
          </Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-6 px-5 py-6" showsVerticalScrollIndicator={false}>
        <View className="gap-3">
          <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1px]">
            Membership Plan
          </Text>
          <MembershipCard />
        </View>

        <View className="gap-3">
          <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1px]">
            Transaction History
          </Text>

          <View className="border-border overflow-hidden rounded-2xl border">
            {paginated.length === 0
              ? <PointsEmptyState />
              : paginated.map((tx, index) => (
                  <StaggerItem key={tx.id} index={index}>
                    <TransactionRow transaction={tx} />
                  </StaggerItem>
                ))}
          </View>

          <HotelsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
