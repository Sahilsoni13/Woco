import { HotelDetailScreen } from '@/screens';
import { useLocalSearchParams } from 'expo-router';

export default function HotelDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <HotelDetailScreen id={id} />;
}
