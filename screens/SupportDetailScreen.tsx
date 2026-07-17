import { CATEGORIES, MOCK_TICKETS } from '@/components/support/mock-data';
import { TicketTimeline } from '@/components/support/TicketTimeline';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft, FileText } from 'lucide-react-native';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceholderScreen } from './PlaceholderScreen';

type SupportDetailScreenProps = {
  id: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Reads from the static MOCK_TICKETS constant, not SupportScreen's local
// (mutated) copy — a ticket created there in this session won't resolve
// here, same "no shared store between screens" limitation noted elsewhere
// in this app (Family preview card, booking-request CTA redirect).
export function SupportDetailScreen({ id }: SupportDetailScreenProps) {
  const ticket = MOCK_TICKETS.find((t) => t.id === id);

  if (!ticket) {
    return <PlaceholderScreen title="Ticket Not Found" description={`No ticket matches #${id}`} />;
  }

  const categoryLabel = CATEGORIES.find((c) => c.value === ticket.category)?.label ?? ticket.category;

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border flex-row items-center gap-3 border-b px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <Icon as={ChevronLeft} size={22} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[15px]">Ticket #{ticket.ticketNumber}</Text>
          <Text className="font-montserrat text-muted-foreground text-[11px]">
            Submitted {formatDate(ticket.createdAt)}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="gap-5 px-5 py-6" showsVerticalScrollIndicator={false}>
        <View className="border-border gap-4 rounded-2xl border p-5">
          <View className="gap-1">
            <Text className="font-montserrat text-ltx-gold text-[10px] uppercase tracking-[1.2px]">Category</Text>
            <Text className="font-montserrat text-foreground text-[14px]">{categoryLabel}</Text>
          </View>
          <View className="border-border gap-1 border-t pt-4">
            <Text className="font-montserrat text-ltx-gold text-[10px] uppercase tracking-[1.2px]">Subject</Text>
            <Text className="font-montserrat text-foreground text-[14px]">{ticket.subject}</Text>
          </View>
          <View className="border-border gap-1 border-t pt-4">
            <Text className="font-montserrat text-ltx-gold text-[10px] uppercase tracking-[1.2px]">Message</Text>
            <Text className="font-montserrat text-foreground text-[13px] leading-[20px]">
              {ticket.message || 'No message provided.'}
            </Text>
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
            Attachments
          </Text>
          {ticket.attachments && ticket.attachments.length > 0 ? (
            <View className="gap-2">
              {ticket.attachments.map((att) => (
                <View
                  key={att.fileName}
                  className="border-border flex-row items-center gap-2.5 rounded-xl border px-4 py-3">
                  {att.uri ? (
                    <Image source={{ uri: att.uri }} style={{ width: 36, height: 36, borderRadius: 8 }} />
                  ) : (
                    <Icon as={FileText} size={14} className="text-muted-foreground" />
                  )}
                  <Text numberOfLines={1} className="font-montserrat text-foreground flex-1 text-[12px]">
                    {att.fileName}
                  </Text>
                  {att.fileSizeKb > 0 ? (
                    <Text className="font-montserrat text-muted-foreground text-[10px]">{att.fileSizeKb}KB</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : (
            <Text className="font-montserrat text-muted-foreground text-[13px]">No attachments.</Text>
          )}
        </View>

        <TicketTimeline status={ticket.status} />
      </ScrollView>
    </SafeAreaView>
  );
}
