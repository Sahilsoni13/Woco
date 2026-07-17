import { BookingDetailScreen } from '@/screens';
import { useLocalSearchParams } from 'expo-router';

export default function BookingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <BookingDetailScreen id={id} />;
}
