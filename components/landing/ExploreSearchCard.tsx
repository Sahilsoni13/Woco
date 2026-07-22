import { SearchFilterBar } from '@/components/search/SearchFilterBar';
import { View } from 'react-native';

// Overlaps Hero's bottom edge via a negative top margin — a normal-flow
// sibling, not absolute positioning, so it can't drift out of place the way
// the earlier transparent-header approach did. Solid background throughout,
// so it stays legible regardless of what's in the photo behind it.
export function ExploreSearchCard() {
  return (
    <View className="-mt-9 px-5">
      {/* <View className="bg-background border-border rounded-full border p-2.5 shadow-lg shadow-black/10"> */}
        <SearchFilterBar />
      {/* </View> */}
    </View>
  );
}
