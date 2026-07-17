import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';
import { CATEGORY_BADGE, STATUS_CONFIG, type Ticket } from './mock-data';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatRelative(iso: string): string {
  const diffHours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffHours < 48) return 'Yesterday';
  return formatDate(iso);
}

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const status = STATUS_CONFIG[ticket.status];

  return (
    <Link href={`/support/${ticket.id}` as Href} asChild>
      <Pressable className="active:border-foreground/30 gap-3 rounded-2xl border border-border p-4">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="font-montserrat-medium text-ltx-gold text-[12px]">#{ticket.ticketNumber}</Text>
          <View className={cn('rounded px-2 py-0.5', status.className, 'border')}>
            <Text className={cn('font-montserrat text-[9px] font-bold uppercase tracking-[1px]', status.textClassName)}>
              {status.label}
            </Text>
          </View>
        </View>

        <View>
          <Text numberOfLines={2} className="font-montserrat-medium text-foreground text-[14px] leading-[19px]">
            {ticket.subject}
          </Text>
          <Text className="font-montserrat text-muted-foreground mt-1 text-[11px] uppercase tracking-[0.5px]">
            Created on {formatDate(ticket.createdAt)}
          </Text>
        </View>

        <View className="border-border flex-row items-center justify-between border-t pt-3">
          <View className="bg-secondary rounded px-2.5 py-1">
            <Text className="font-montserrat text-muted-foreground text-[9px] font-bold uppercase tracking-[1px]">
              {CATEGORY_BADGE[ticket.category]}
            </Text>
          </View>
          <Text className="font-montserrat text-muted-foreground text-[11px]">
            Updated {formatRelative(ticket.updatedAt)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
