import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { MOCK_NOTIFICATIONS as INITIAL_NOTIFICATIONS } from './mock-data';

export function NotificationsList() {
  // Local mutable copy so "Archive All" can actually mark everything read —
  // web's equivalent calls a real `memberApi.markAllNotificationsRead()`,
  // which doesn't exist here, so this just flips local state instead.
  const [notifications, setNotifications] = React.useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  function archiveAll() {
    setNotifications((current) => current.map((n) => ({ ...n, unread: false })));
  }

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground text-base font-semibold">Notifications</Text>
        {unreadCount > 0 ? (
          <View className="bg-ltx-gold rounded-full px-2 py-0.5">
            <Text className="font-montserrat text-[10px] font-bold uppercase text-white">
              {unreadCount} New
            </Text>
          </View>
        ) : null}
      </View>

      <View className="border-border overflow-hidden rounded-2xl border">
        {notifications.length === 0 ? (
          <View className="items-center gap-3 px-6 py-10">
            <Icon as={Bell} size={22} className="text-muted-foreground" />
            <Text variant="muted" className="text-sm">
              No notifications yet.
            </Text>
          </View>
        ) : (
          <>
            {notifications.map((notification, index) => (
              <View
                key={notification.id}
                className={cn('flex-row gap-3 p-4', index > 0 && 'border-border border-t')}>
                <View
                  className={cn(
                    'mt-1.5 h-2 w-2 rounded-full',
                    notification.unread ? 'bg-ltx-gold' : 'bg-border'
                  )}
                />
                <View className="flex-1 gap-0.5">
                  <Text className="font-montserrat-medium text-foreground text-[13px]">
                    {notification.title}
                  </Text>
                  <Text className="font-montserrat text-muted-foreground text-[12px] leading-[18px]">
                    {notification.message}
                  </Text>
                  <Text className="font-montserrat text-muted-foreground mt-1 text-[10px] uppercase tracking-[0.5px] opacity-70">
                    {notification.time}
                  </Text>
                </View>
              </View>
            ))}
            <Pressable
              onPress={archiveAll}
              disabled={unreadCount === 0}
              className="border-border items-center border-t py-3 disabled:opacity-40">
              <Text className="font-montserrat text-muted-foreground text-[11px]">
                Archive All Notifications
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
