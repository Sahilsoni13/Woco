import { Dialog, DialogClose, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FilterSheetProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

// A bottom-docked sheet built the same way as NavDrawer's right-docked one:
// the `dialog` primitive has no dedicated "sheet" variant, so this overrides
// DialogOverlay's centering (`items-end justify-center` -> stretched-to-bottom)
// and gives DialogPrimitive.Content its own rounded-top-corners styling instead
// of the generic centered-card `DialogContent` wrapper.
export function FilterSheet({ title, open, onOpenChange, children }: FilterSheetProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="items-stretch justify-end p-0">
          <DialogPrimitive.Content
            // A `max-h-[80%]` className would need a parent with a resolved
            // height to size against — the dialog primitive's native wrapper
            // around this Content has none (it sizes to content), so the
            // percentage silently no-ops and the sheet grows past the screen
            // edge uncapped. An explicit pixel maxHeight sidesteps that.
            style={{ paddingBottom: insets.bottom, maxHeight: windowHeight * 0.8 }}
            className="border-border bg-background rounded-t-3xl border-t">
            <View className="items-center pb-1 pt-3">
              <View className="bg-border h-1 w-10 rounded-full" />
            </View>
            <View className="flex-row items-center justify-between px-5 pb-4">
              <Text variant="h4">{title}</Text>
              <DialogClose hitSlop={12} className="p-1">
                <Icon as={X} size={20} className="text-foreground" />
              </DialogClose>
            </View>
            <ScrollView contentContainerClassName="px-5 pb-6" showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </DialogPrimitive.Content>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
