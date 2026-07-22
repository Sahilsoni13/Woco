import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  dismissLabel?: string;
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
};

// A branded replacement for `Alert.alert` confirmations — same DialogContent
// shell as RemoveFamilyMemberDialog, but a gold "success" treatment instead
// of the red destructive one. Meant to be rendered as a sibling of whatever
// sheet/screen triggers it, never nested inside another Dialog's children —
// a Dialog closing unmounts its children, which would take this down with it
// before the user ever sees it.
export function SuccessDialog({
  open,
  onOpenChange,
  title,
  message,
  dismissLabel = 'OK',
  secondaryAction,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="items-center">
        <View className="bg-ltx-gold/15 h-14 w-14 items-center justify-center rounded-full">
          <Icon as={CircleCheck} size={28} className="text-ltx-gold" />
        </View>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <Text className="font-montserrat text-muted-foreground text-center text-[13px] leading-[19px]">
          {message}
        </Text>
        <View className="w-full flex-row gap-3">
          <Button
            variant={secondaryAction ? 'outline' : 'default'}
            size="sm"
            className="flex-1 rounded-full"
            onPress={() => onOpenChange(false)}>
            <Text
              className={
                secondaryAction
                  ? 'text-foreground text-[11px] font-semibold uppercase tracking-[1px]'
                  : 'text-primary-foreground text-[11px] font-semibold uppercase tracking-[1px]'
              }>
              {dismissLabel}
            </Text>
          </Button>
          {secondaryAction ? (
            <Button
              size="sm"
              className="flex-1 rounded-full"
              onPress={() => {
                // Close first — otherwise `open` stays true while the
                // secondary action navigates away, and the dialog reappears
                // if the user later navigates back to this screen. (This
                // exact fix has regressed more than once in this file —
                // don't drop it again.)
                onOpenChange(false);
                secondaryAction.onPress();
              }}>
              <Text className="text-primary-foreground text-[11px] font-semibold uppercase tracking-[1px]">
                {secondaryAction.label}
              </Text>
            </Button>
          ) : null}
        </View>
      </DialogContent>
    </Dialog>
  );
}
