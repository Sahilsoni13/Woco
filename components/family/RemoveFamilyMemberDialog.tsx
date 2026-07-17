import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';
import type { FamilyMember } from './mock-data';

type RemoveFamilyMemberDialogProps = {
  member: FamilyMember | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RemoveFamilyMemberDialog({ member, onOpenChange, onConfirm }: RemoveFamilyMemberDialogProps) {
  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent className="items-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-red-500">
          <Icon as={TriangleAlert} size={26} className="text-white" />
        </View>
        <DialogHeader>
          <DialogTitle className="text-center">Remove Family Member?</DialogTitle>
        </DialogHeader>
        <Text className="font-montserrat text-muted-foreground text-center text-[13px] leading-[19px]">
          Are you sure you want to remove{' '}
          <Text className="text-foreground font-semibold">
            {member ? `${member.firstName} ${member.lastName}` : 'this member'}
          </Text>{' '}
          from your family members? This action cannot be undone.
        </Text>
        <View className="w-full flex-row gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" onPress={() => onOpenChange(false)}>
            <Text className="text-foreground text-[12px] font-semibold uppercase tracking-[1px]">Cancel</Text>
          </Button>
          <Button variant="destructive" size="lg" className="flex-1 rounded-full" onPress={onConfirm}>
            <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-white">Remove</Text>
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  );
}
