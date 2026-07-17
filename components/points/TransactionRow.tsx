import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { CREDIT_TYPES, HOLD_TYPES, TYPE_CONFIG, type Transaction } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const config = TYPE_CONFIG[transaction.type];
  const isCredit = CREDIT_TYPES.includes(transaction.type);
  const isHold = HOLD_TYPES.includes(transaction.type);
  const sign = isCredit ? '+' : isHold ? '' : '-';
  const pointsColor = isCredit ? 'text-emerald-600' : isHold ? 'text-amber-600' : 'text-foreground';

  return (
    <View className="border-border gap-2 border-b px-5 py-4 last:border-b-0">
      <View className="flex-row items-center justify-between">
        <Text className="font-montserrat text-muted-foreground text-[12px]">{formatDate(transaction.date)}</Text>
        <View className={cn('rounded px-2 py-0.5', config.badgeClassName, 'border')}>
          <Text className={cn('font-montserrat text-[9px] font-bold uppercase tracking-[1px]', config.badgeTextClassName)}>
            {config.label}
          </Text>
        </View>
      </View>

      <View className="flex-row items-end justify-between gap-3">
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[13px]">{transaction.description}</Text>
          {transaction.notes ? (
            <Text className="font-montserrat text-muted-foreground mt-0.5 text-[11px]">{transaction.notes}</Text>
          ) : null}
        </View>
        <View className="items-end">
          <Text className={cn('font-montserrat text-[14px] font-bold', pointsColor)}>
            {sign}
            {formatWithCommas(Math.abs(transaction.points))}
          </Text>
          <Text className="font-montserrat text-ltx-gold text-[11px] font-semibold">
            {formatWithCommas(transaction.balanceAfter)} pts
          </Text>
        </View>
      </View>
    </View>
  );
}
