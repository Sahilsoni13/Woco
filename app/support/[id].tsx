import { SupportDetailScreen } from '@/screens';
import { useLocalSearchParams } from 'expo-router';

export default function SupportDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SupportDetailScreen id={id} />;
}
