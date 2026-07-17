import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { MapPin, Search } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { POPULAR_DESTINATIONS } from './destinations';

type LocationPanelProps = {
  onSelect: (location: string) => void;
};

export function LocationPanel({ onSelect }: LocationPanelProps) {
  const [query, setQuery] = React.useState('');

  const matches = POPULAR_DESTINATIONS.filter((destination) =>
    `${destination.city} ${destination.country}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View className="gap-5">
      <View className="border-border  flex-row items-center gap-2 rounded-full border px-4 py-3">
        <Icon as={Search} size={16} className="text-muted-foreground" />
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search destinations..."
          autoFocus
          className="native:h-auto flex-1 border-0  p-0 shadow-none"
        />
      </View>

      <View className="gap-1">
        <Text className="font-montserrat-medium text-muted-foreground text-[11px] uppercase tracking-[2px]">
          {query ? 'Matching destinations' : 'Popular destinations'}
        </Text>
        <View className="-mx-1 flex-row flex-wrap">
          {matches.map((destination) => (
            <View key={destination.city} className="w-1/2 p-1">
              <Pressable
                onPress={() => onSelect(`${destination.city}, ${destination.country}`)}
                className="border-border active:border-foreground gap-2.5 rounded-2xl border p-3">
                <View className="bg-secondary h-9 w-9 items-center justify-center rounded-xl">
                  <Icon as={MapPin} size={16} className="text-muted-foreground" />
                </View>
                <View>
                  <Text className="font-montserrat-medium text-foreground text-[13px]">
                    {destination.city}
                  </Text>
                  <Text className="font-montserrat text-muted-foreground text-[11px]">
                    {destination.country}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
          {matches.length === 0 ? (
            <Text variant="muted" className="p-1 text-sm">
              No destinations found for &quot;{query}&quot;
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
