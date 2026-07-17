import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { Link, router, type Href } from 'expo-router';
import { Building2, ChevronRight, Compass, Crown, Mail, Menu, Scale, X } from 'lucide-react-native';
import { Linking, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { Logo } from './Logo';
import { DRAWER_NAV_SECTIONS } from './nav-links';
import { InstagramIcon, LinkedinIcon, XSocialIcon } from './SocialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Matches LTX web's real contact address (src/components/landing/nav-drawer.tsx);
// the other social links are `#` placeholders on web too, so they stay inert here.
const SUPPORT_EMAIL = 'hello@ltxtravel.com';

const SECTION_ICONS: Record<string, typeof Compass> = {
  Explore: Compass,
  Membership: Crown,
  Company: Building2,
  Legal: Scale,
};

function DrawerContent() {
  const { onOpenChange } = DialogPrimitive.useRootContext();
  const close = () => onOpenChange(false);
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  return (
    <DialogPrimitive.Content
      // `h-full` needs a parent with a resolved height to size against — see
      // the comment in components/search/FilterSheet.tsx for why that's not
      // reliably true here on native, and why this uses a pixel height instead.
      //
      // Whole drawer is dark (`bg-primary`), not just the top panel — reuses
      // the app's existing "dark card" convention (see ConciergeCard.tsx:
      // bg-primary surface, bg-white/10 chips, text-white/50 secondary text,
      // bg-ltx-gold CTA with text-primary label) rather than inventing new
      // dark-mode colors, since this app has no separate dark palette
      // (lib/theme.ts mirrors the same tokens for light+dark).
      className="ml-auto w-[86%] max-w-[400px] overflow-hidden border-l border-white/10 bg-primary"
      style={{ height: windowHeight }}>
      {/* A fixed sibling above the ScrollView, not a scrollable child of it,
          so it stays pinned while only the nav list/buttons below it
          scroll. Extends behind the status bar for an immersive feel. A
          bottom border (not a shadow) now separates it, since it's the
          same dark surface as the rest of the drawer, not a lighter block
          sitting on a white body anymore. */}
      <View
        className="gap-5 border-b border-white/10 px-6 pb-7"
        style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between">
          <Logo variant="light" />
          <DialogClose hitSlop={12} className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Icon as={X} size={16} className="text-white" />
          </DialogClose>
        </View>

        <Text className="font-montserrat text-[13px] leading-5 text-white/60">
          An invitation-only travel society for those who seek experiences beyond the reach of ordinary
          currency.
        </Text>

        <View className="flex-row gap-3">
          <Pressable hitSlop={6} className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <InstagramIcon size={15} color="#ffffff" />
          </Pressable>
          <Pressable hitSlop={6} className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <XSocialIcon size={15} color="#ffffff" />
          </Pressable>
          <Pressable hitSlop={6} className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <LinkedinIcon size={15} color="#ffffff" />
          </Pressable>
          <Pressable
            hitSlop={6}
            onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
            className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Icon as={Mail} size={15} className="text-white" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
        <View className="gap-3 px-6 pt-6">
          {DRAWER_NAV_SECTIONS.map((section) => (
            <View key={section.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
              <Accordion type="multiple">
                <AccordionItem value={section.title} className="border-b-0">
                  <AccordionTrigger className="px-4 py-3.5">
                    <View className="flex-row items-center gap-3">
                      <View className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
                        <Icon as={SECTION_ICONS[section.title] ?? Compass} size={16} className="text-ltx-gold" />
                      </View>
                      <Text className="font-montserrat-medium text-[14px] text-white">{section.title}</Text>
                    </View>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-1 pt-0">
                    <View className="gap-0.5 border-t border-white/10 pt-2">
                      {section.links.map((link) => (
                        <Link key={link.label} href={link.href as Href} asChild onPress={close}>
                          <Pressable className="flex-row items-center justify-between rounded-xl py-3 pl-[52px] pr-2 active:bg-white/10">
                            <Text className="font-montserrat text-[13px] text-white/60">{link.label}</Text>
                            <Icon as={ChevronRight} size={14} className="text-white/25" />
                          </Pressable>
                        </Link>
                      ))}
                    </View>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          ))}
        </View>

        <View className="gap-3 px-6 pt-8">
          {/* Gold-filled CTA on a dark surface — same convention as
              ConciergeCard's "Call Concierge" button, not the shared
              Button component's default (bg-primary), which would be
              nearly invisible against this now-all-dark drawer. */}
          <Pressable
            className="items-center rounded-full bg-ltx-gold py-3.5 active:opacity-90"
            onPress={() => {
              close();
              // Mirrors web's Header "Join" button (`openAuth("signup")`) —
              // opens the login screen defaulted to its "signup" step (the
              // "Membership by Invitation" prompt), not the /join form
              // directly. Only the "I Have an Invitation" button there
              // navigates on to /join.
              router.push('/login?step=signup' as Href);
            }}>
            <Text className="font-montserrat text-primary text-[13px] font-semibold uppercase tracking-[1px]">
              Join Now
            </Text>
          </Pressable>
          <Pressable
            className="items-center rounded-full border border-white/20 py-3.5 active:bg-white/5"
            onPress={() => {
              close();
              router.push('/login');
            }}>
            <Text className="font-montserrat text-[13px] font-semibold uppercase tracking-[1px] text-white">
              Login
            </Text>
          </Pressable>
        </View>

        <Text className="font-montserrat mt-8 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} WOCO Verdant Estates
        </Text>
      </ScrollView>
    </DialogPrimitive.Content>
  );
}

export function NavDrawer() {
  return (
    <Dialog>
      <DialogTrigger hitSlop={8} className="p-2">
        <Icon as={Menu} size={22} className="text-foreground" />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="items-stretch justify-end p-0">
          <DrawerContent />
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
