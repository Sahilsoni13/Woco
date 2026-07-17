import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';
import { Logo } from './Logo';
import { FOOTER_NAV_SECTIONS } from './nav-links';
import { NewsletterForm } from './NewsletterForm';
import { InstagramIcon, LinkedinIcon, XSocialIcon } from './SocialIcons';

// Matches the same real contact address already used in NavDrawer.tsx.
const SUPPORT_EMAIL = 'hello@ltxtravel.com';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <View className="border-border bg-background border-t">
      {/* Newsletter — its own highlighted card instead of blending into the
          page, so it reads as a deliberate moment rather than a text block. */}
      <View className="px-5 pt-8">
        <View className="bg-secondary gap-4 rounded-3xl p-6">
          <View className="gap-1">
            <Text className="font-montserrat-medium text-ltx-muted text-[11px] uppercase tracking-[2px]">
              Stay informed
            </Text>
            <Text className="text-foreground text-lg font-semibold">
              Exclusive destination updates & member previews.
            </Text>
          </View>
          <NewsletterForm />
        </View>
      </View>

      {/* Brand + socials */}
      <View className="gap-4 px-5 py-8">
        <Logo />
        <Text className="font-montserrat text-ltx-muted text-sm leading-5">
          An invitation-only travel society for those who seek experiences beyond the reach of
          ordinary currency.
        </Text>
        <View className="flex-row gap-5">
          <Pressable hitSlop={8}>
            <InstagramIcon size={17} />
          </Pressable>
          <Pressable hitSlop={8}>
            <XSocialIcon size={17} />
          </Pressable>
          <Pressable hitSlop={8}>
            <LinkedinIcon size={17} />
          </Pressable>
          <Pressable hitSlop={8} onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}>
            <Icon as={Mail} size={17} className="text-foreground" />
          </Pressable>
        </View>
      </View>

      {/* Nav links — collapsed into the same accordion pattern used in
          NavDrawer/Faq instead of showing all ~11 links flat at once. */}
      <View className="border-border border-t px-5">
        <Accordion type="multiple">
          {FOOTER_NAV_SECTIONS.map((section) => (
            <AccordionItem key={section.title} value={section.title}>
              <AccordionTrigger>
                <Text className="font-montserrat-medium text-foreground text-[13px] uppercase tracking-[1.5px]">
                  {section.title}
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <View className="gap-3 pb-1">
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href as Href} asChild>
                      <Pressable>
                        <Text className="font-montserrat text-ltx-muted text-sm">{link.label}</Text>
                      </Pressable>
                    </Link>
                  ))}
                </View>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </View>

      {/* Bottom row */}
      <View className="border-border flex-row flex-wrap items-center justify-between gap-3  px-5 py-5">
        <Text className="font-montserrat text-ltx-muted text-xs">
          © {year} WOCO Verdant Estates. All rights reserved.
        </Text>
        <View className="flex-row gap-4">
          <Link href="/terms" asChild>
            <Pressable>
              <Text className="font-montserrat text-ltx-muted text-xs">Terms</Text>
            </Pressable>
          </Link>
          <Link href="/privacy" asChild>
            <Pressable>
              <Text className="font-montserrat text-ltx-muted text-xs">Privacy</Text>
            </Pressable>
          </Link>
          <Link href="/cookies" asChild>
            <Pressable>
              <Text className="font-montserrat text-ltx-muted text-xs">Cookies</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
