import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleCheck, CircleX } from 'lucide-react-native';
import { View } from 'react-native';
import { MOCK_MEMBERSHIP } from './mock-data';

function formatWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const TYPE_LABEL: Record<typeof MOCK_MEMBERSHIP.packageType, string> = {
  INDIVIDUAL: 'Individual',
  CORPORATE: 'Corporate',
};

const STATS = [
  { label: 'Total Points', value: formatWithCommas(MOCK_MEMBERSHIP.totalPoints), sub: 'allocated' },
  { label: 'Per Year', value: formatWithCommas(MOCK_MEMBERSHIP.pointsPerYear), sub: 'points' },
  { label: 'Package Value', value: `₹${formatWithCommas(MOCK_MEMBERSHIP.packageValue)}`, sub: 'total amount' },
  {
    label: 'Validity',
    value: `${MOCK_MEMBERSHIP.validityYears} Yr${MOCK_MEMBERSHIP.validityYears !== 1 ? 's' : ''}`,
    sub: 'years',
  },
];

export function MembershipCard() {
  const start = new Date(MOCK_MEMBERSHIP.startDate).getTime();
  const end = new Date(MOCK_MEMBERSHIP.endDate).getTime();
  const now = Date.now();
  const progressPct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  const daysUntilExpiry = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  return (
    <View className="bg-primary gap-5 rounded-3xl p-6">
      {/* Tier / type / status */}
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <View className="flex-row flex-wrap items-center gap-2">
          <View className="bg-ltx-gold rounded-full px-3 py-1">
            <Text className="font-montserrat text-primary text-[10px] font-bold uppercase tracking-[1px]">
              {MOCK_MEMBERSHIP.tier}
            </Text>
          </View>
          <View className="rounded-full bg-white/10 px-3 py-1">
            <Text className="font-montserrat text-[10px] font-bold uppercase tracking-[1px] text-white/70">
              {TYPE_LABEL[MOCK_MEMBERSHIP.packageType]}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1">
          <View className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <Text className="font-montserrat text-[11px] font-medium text-emerald-400">Active</Text>
        </View>
      </View>

      {/* Package name + member number */}
      <View>
        <Text className="font-playfair text-[22px] text-white">{MOCK_MEMBERSHIP.packageName}</Text>
        <Text className="font-montserrat mt-0.5 text-[12px] text-white/50">
          Member #{MOCK_MEMBERSHIP.memberNumber}
        </Text>
      </View>

      {/* Points balance — the single most glanceable number */}
      <View>
        <Text className="font-eb-garamond text-[40px] leading-[42px] text-white">
          {formatWithCommas(MOCK_MEMBERSHIP.pointsBalance)}
        </Text>
        <Text className="font-montserrat text-[11px] uppercase tracking-[1.5px] text-white/50">
          Points Balance
        </Text>
      </View>

      {/* 4-stat grid */}
      <View className="flex-row flex-wrap gap-2">
        {STATS.map((stat) => (
          <View key={stat.label} className="min-w-[47%] flex-1 rounded-xl bg-white/5 p-3">
            <Text className="font-montserrat text-[9px] font-semibold uppercase tracking-[1px] text-white/45">
              {stat.label}
            </Text>
            <Text className="font-montserrat mt-1.5 text-[16px] font-bold text-white">{stat.value}</Text>
            <Text className="font-montserrat text-[9px] text-white/45">{stat.sub}</Text>
          </View>
        ))}
      </View>

      <View className="h-px bg-white/10" />

      {/* Rollover */}
      {MOCK_MEMBERSHIP.carryForward && MOCK_MEMBERSHIP.carryForwardPoints > 0 ? (
        <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <Text className="font-montserrat flex-1 text-[11px] text-white/60">
            Unused Rollover (this year)
          </Text>
          <Text className="font-montserrat text-ltx-gold text-[14px] font-bold">
            {formatWithCommas(MOCK_MEMBERSHIP.carryForwardPoints)} pts
          </Text>
        </View>
      ) : null}

      {/* Timeline */}
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="font-montserrat text-[11px] text-white/50">
            Since {formatShortDate(MOCK_MEMBERSHIP.startDate)}
          </Text>
          <Text className="font-montserrat text-ltx-gold text-[11px]">
            {daysUntilExpiry.toLocaleString()} days remaining
          </Text>
        </View>
        <View className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <View className="bg-ltx-gold h-full rounded-full" style={{ width: `${progressPct}%` }} />
        </View>
        <Text className="font-montserrat text-[10px] text-white/40">
          Expires {formatShortDate(MOCK_MEMBERSHIP.endDate)}
        </Text>
      </View>

      {/* Carry-forward status */}
      <View className="flex-row items-center gap-2">
        <Icon
          as={MOCK_MEMBERSHIP.carryForward ? CircleCheck : CircleX}
          size={14}
          className={MOCK_MEMBERSHIP.carryForward ? 'text-emerald-400' : 'text-white/40'}
        />
        <Text className="font-montserrat flex-1 text-[11px] text-white/60">
          {MOCK_MEMBERSHIP.carryForward
            ? `${formatWithCommas(MOCK_MEMBERSHIP.pointsPerYear)} pts/year — unused points roll over`
            : 'Points do not carry forward at year end'}
        </Text>
      </View>
    </View>
  );
}
