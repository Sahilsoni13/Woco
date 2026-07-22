import { CreateTicketSheet } from '@/components/support/CreateTicketSheet';
import { MOCK_TICKETS, TICKETS_PER_PAGE, type Ticket } from '@/components/support/mock-data';
import { SupportEmptyState } from '@/components/support/SupportEmptyState';
import { TicketCard } from '@/components/support/TicketCard';
import { HotelsPagination } from '@/components/hotels/HotelsPagination';
import { Icon } from '@/components/ui/icon';
import { StaggerItem } from '@/components/ui/stagger-item';
import { SuccessDialog } from '@/components/ui/success-dialog';
import { Text } from '@/components/ui/text';
import { router, type Href } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let nextId = 100;

export function SupportScreen() {
  // A fresh copy, not the same array reference as MOCK_TICKETS — handleCreate
  // below mutates MOCK_TICKETS directly (so SupportDetailScreen can see new
  // tickets too), and if this state started out *as* that same array object,
  // that mutation would silently double up the newly created ticket here
  // (once from the shared-reference mutation, once from setTickets' own
  // spread), producing a duplicate `key` in the list below.
  const [tickets, setTickets] = React.useState<Ticket[]>(() => [...MOCK_TICKETS]);
  const [page, setPage] = React.useState(1);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [successTicket, setSuccessTicket] = React.useState<Ticket | null>(null);

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
    // MOCK_TICKETS is a mutable module-level array, not a frozen snapshot —
    // SupportDetailScreen reads it directly rather than this screen's own
    // `tickets` state, so without this the "View Ticket" button below would
    // 404 on every ticket created this session.
    MOCK_TICKETS.unshift(ticket);
    setTickets((prev) => [ticket, ...prev]);
    setPage(1);
    setCreateOpen(false);
    setSuccessTicket(ticket);
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
          paginated.map((ticket, index) => (
            <StaggerItem key={ticket.id} index={index}>
              <TicketCard ticket={ticket} />
            </StaggerItem>
          ))
        )}

        <HotelsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </ScrollView>

      <CreateTicketSheet open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />

      <SuccessDialog
        open={!!successTicket}
        onOpenChange={(next) => {
          if (!next) setSuccessTicket(null);
        }}
        title="Ticket Created"
        message={
          successTicket
            ? `Your ticket ${successTicket.ticketNumber} has been submitted successfully.`
            : ''
        }
        secondaryAction={{
          label: 'View Ticket',
          onPress: () => {
            if (successTicket) router.push(`/support/${successTicket.id}` as Href);
          },
        }}
      />
    </SafeAreaView>
  );
}
