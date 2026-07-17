import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type LogoProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

export function Logo({ variant = 'dark', className }: LogoProps) {
  const color = variant === 'light' ? 'text-white' : 'text-foreground';

  return (
    <Text className={cn('font-noto-serif text-[20px] tracking-tight', color, className)}>
      WOCO<Text className={cn('font-playfair', color)}> | </Text>Travel
    </Text>
  );
}
