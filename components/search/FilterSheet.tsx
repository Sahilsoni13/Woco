import { Dialog, DialogClose, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ReduceMotion, SlideInDown, SlideOutDown } from 'react-native-reanimated';
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
//
// Every bottom sheet in the app (RequestBookingSheet, CancelSheet,
// AddFamilyMemberSheet, HotelsFiltersSheet, SortSheet, CreateTicketSheet,
// OptionSheet, ...) is built on this one component, so fixing the entrance
// animation here once fixes it everywhere — same shared-fix leverage as
// DialogOverlay's own contentEntering/contentExiting props (added for
// NavDrawer's right-docked slide). Previously had no slide of its own at
// all — just DialogOverlay's default native FadeIn/FadeOut (or, on web,
// nothing beyond the backdrop's own fade), so a "bottom sheet" only ever
// faded in in place instead of sliding up from the bottom edge.
export function FilterSheet({ title, open, onOpenChange, children }: FilterSheetProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  // Real bug, only visible with long content (AddFamilyMemberSheet — every
  // shorter sheet built on this component never actually hit it): a
  // `flex:1` child inside a column whose OWN height is unresolved (only
  // `maxHeight`, not `height`) has nothing concrete to grow into. Yoga ends
  // up resolving that flex child to 0 height instead of "whatever's left
  // after the header" — for short content the outer Content never actually
  // reaches its maxHeight cap, so the collapse never gets exercised and the
  // bug stayed hidden; for long content it does, and the entire scrollable
  // body silently vanished (only the drag handle + title were visible).
  // Fixed with concrete pixel math instead of another flex trick: measure
  // the header's real height and give the ScrollView an explicit maxHeight
  // budget (sheetMaxHeight − header − bottom inset) instead of `flex:1`.
  const sheetMaxHeight = windowHeight * 0.8;
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="items-stretch justify-end p-0"
          contentEntering={SlideInDown.duration(300).reduceMotion(ReduceMotion.System)}
          contentExiting={SlideOutDown.duration(220).reduceMotion(ReduceMotion.System)}>
          <DialogPrimitive.Content
            // A `max-h-[80%]` className would need a parent with a resolved
            // height to size against — the dialog primitive's native wrapper
            // around this Content has none (it sizes to content), so the
            // percentage silently no-ops and the sheet grows past the screen
            // edge uncapped. An explicit pixel maxHeight sidesteps that.
            style={{ paddingBottom: insets.bottom, maxHeight: sheetMaxHeight }}
            // Native gets its slide from contentEntering/contentExiting above
            // (NativeOnlyAnimatedView is a no-op on web). Web gets a plain,
            // unconditional `animate-in slide-in-from-bottom` instead of a
            // `data-[state=open]:` conditional — traced through `@rn-
            // primitives/dialog`'s web shim for NavDrawer already: it renders
            // Radix's real Dialog.Content (which carries `data-state`)
            // wrapping an *inner* plain View that this className actually
            // lands on, so a `data-[state=...]` selector here would never
            // match. Same reasoning, same fix shape as NavDrawer's.
            className={cn(
              'border-border bg-background rounded-t-3xl border-t',
              Platform.select({ web: 'animate-in slide-in-from-bottom duration-300 ease-out' })
            )}>
            <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
              <View className="items-center pb-1 pt-3">
                <View className="bg-border h-1 w-10 rounded-full" />
              </View>
              <View className="flex-row items-center justify-between px-5 pb-4">
                <Text variant="h4">{title}</Text>
                <DialogClose hitSlop={12} className="p-1">
                  <Icon as={X} size={20} className="text-foreground" />
                </DialogClose>
              </View>
            </View>
            <KeyboardAwareScrollView
              // Explicit pixel budget, not `flex:1` — see the comment above
              // this component for why `flex:1` silently collapsed to 0
              // height for any sheet whose content is long enough to
              // actually need the maxHeight cap. Falls back to the full
              // `sheetMaxHeight` before the header's first onLayout fires
              // (headerHeight still 0), which only overshoots for one frame.
              style={{ maxHeight: sheetMaxHeight - headerHeight - insets.bottom }}
              contentContainerClassName="px-5 pb-6"
              keyboardShouldPersistTaps="handled"
              bottomOffset={20}
              showsVerticalScrollIndicator={false}>
              {children}
            </KeyboardAwareScrollView>
          </DialogPrimitive.Content>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
