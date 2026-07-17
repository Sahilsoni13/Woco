import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import type { MOCK_PROFILE } from './mock-data';

type ProfileHeaderProps = {
  profile: typeof MOCK_PROFILE;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  const isCorporate = profile.packageType === 'CORPORATE';

  return (
    <View className="items-center gap-3 pt-2">
      <View className="bg-primary h-20 w-20 items-center justify-center rounded-full">
        <Text className="font-playfair text-[26px] text-white">{initials}</Text>
      </View>
      <View className="items-center gap-1.5">
        <Text className="font-playfair text-foreground text-[22px]">
          {profile.firstName} {profile.lastName}
        </Text>
        <View className={cn('rounded-full px-3 py-1', isCorporate ? 'bg-emerald-50' : 'bg-secondary')}>
          <Text
            className={cn(
              'font-montserrat text-[10px] font-bold uppercase tracking-[1px]',
              isCorporate ? 'text-emerald-700' : 'text-muted-foreground'
            )}>
            {isCorporate ? 'Corporate' : 'Individual'}
          </Text>
        </View>
      </View>
    </View>
  );
}
