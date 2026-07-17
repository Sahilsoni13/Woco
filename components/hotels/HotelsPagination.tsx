import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type HotelsPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function HotelsPagination({ page, totalPages, onPageChange }: HotelsPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

  return (
    <View className="flex-row items-center justify-center gap-2 pt-2">
      <Pressable
        onPress={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="border-border h-9 w-9 items-center justify-center rounded-full border disabled:opacity-30">
        <Icon as={ChevronLeft} size={16} className="text-foreground" />
      </Pressable>

      <View className="flex-row items-center gap-1">
        {pageNumbers.map((n) => (
          <Pressable
            key={n}
            onPress={() => onPageChange(n)}
            className={cn('h-9 w-9 items-center justify-center rounded-full', n === page && 'bg-primary')}>
            <Text
              className={cn(
                'font-montserrat text-[13px] font-medium',
                n === page ? 'text-primary-foreground' : 'text-muted-foreground'
              )}>
              {n}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="border-border h-9 w-9 items-center justify-center rounded-full border disabled:opacity-30">
        <Icon as={ChevronRight} size={16} className="text-foreground" />
      </Pressable>
    </View>
  );
}
