import { CreateTicketSheet } from '@/components/support/CreateTicketSheet';
import { MOCK_TICKETS, TICKETS_PER_PAGE, type Ticket } from '@/components/support/mock-data';
import { SupportEmptyState } from '@/components/support/SupportEmptyState';
import { TicketCard } from '@/components/support/TicketCard';
import { HotelsPagination } from '@/components/hotels/HotelsPagination';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import * as React from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let nextId = 100;

export function SupportScreen() {
  const [tickets, setTickets] = React.useState<Ticket[]>(MOCK_TICKETS);
  const [page, setPage] = React.useState(1);
  const [createOpen, setCreateOpen] = React.useState(false);

  const totalPages = Math.max(1, Math.ceil(tickets.length / TICKETS_PER_PAGE));
  const paginated = tickets.slice((page - 1) * TICKETS_PER_PAGE, page * TICKETS_PER_PAGE);

  function handleCreate(
    data: Pick<Ticket, 'subject' | 'message' | 'category'> & {
      attachment?: { uri: string; fileName: string; fileSizeKb: number };
    }
  ) {
    const now = new Date().toISOString();
    const ticket: Ticket = {
      id: String(nextId),
      ticketNumber: `LT-${8000 + nextId}`,
      subject: data.subject,
      message: data.message,
      category: data.category,
      status: 'OPEN',
      createdAt: now,
      updatedAt: now,
      attachments: data.attachment
        ? [{ fileName: data.attachment.fileName, fileSizeKb: data.attachment.fileSizeKb, uri: data.attachment.uri }]
        : undefined,
    };
    nextId += 1;
    setTickets((prev) => [ticket, ...prev]);
    setPage(1);
    setCreateOpen(false);
    Alert.alert('Ticket Created', `Your ticket ${ticket.ticketNumber} has been submitted successfully.`);
  }

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="border-border flex-row items-center gap-3 border-b px-5 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <Icon as={ChevronLeft} size={22} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text className="font-montserrat-medium text-foreground text-[15px]">Support</Text>
          <Text className="font-montserrat text-muted-foreground text-[11px]">
            Your support tickets and requests
          </Text>
        </View>
        <Pressable
          onPress={() => setCreateOpen(true)}
          className="bg-ltx-gold active:opacity-90 h-9 w-9 items-center justify-center rounded-full">
          <Icon as={Plus} size={16} className="text-white" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="gap-3 px-5 py-6" showsVerticalScrollIndicator={false}>
        {paginated.length === 0 ? (
          <SupportEmptyState onCreate={() => setCreateOpen(true)} />
        ) : (
          paginated.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        )}

        <HotelsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </ScrollView>

      <CreateTicketSheet open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />
    </SafeAreaView>
  );
}
