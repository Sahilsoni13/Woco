import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

const FAQS = [
  {
    q: 'How does membership approval work?',
    a: 'Every application is carefully reviewed to maintain our private, refined, and experience-focused travel community standards. You will receive a decision within 7 business days.',
  },
  {
    q: 'Are all properties exclusively available to members?',
    a: 'Yes. Every property in our network is reserved exclusively for WOCO members — no public booking channels are available for any of our estates.',
  },
  {
    q: 'Can I travel internationally with my membership?',
    a: 'Absolutely. Your WOCO membership grants access to curated retreats across Asia, Europe, the Middle East, the Americas, and beyond.',
  },
  {
    q: 'Is pricing visible while browsing destinations?',
    a: 'No. Pricing is never displayed. Properties are accessed through points, maintaining complete financial discretion for all of our members.',
  },
  {
    q: 'What benefits come with concierge services?',
    a: 'Your dedicated concierge handles private transfers, in-residence dining, bespoke itineraries, and exclusive experience arrangements around the clock.',
  },
  {
    q: 'Can I invite friends or family members?',
    a: 'Members may designate up to three family members or gift points to any guest through a concierge-facilitated request at no additional cost.',
  },
];

export function Faq() {
  return (
    <View className="gap-8 bg-background px-5 py-12">
      <View>
        <View className="mb-3 flex-row items-center justify-center gap-4">
          <View className="h-px w-10 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
            FAQ
          </Text>
          <View className="h-px w-10 bg-foreground" />
        </View>

        <View className="items-center">
          <Text className="text-center text-[24px] leading-[30px]">
            <Text className="font-montserrat text-foreground">Member </Text>
            <Text className="font-playfair text-foreground">questions</Text>
          </Text>
          <Text className="mt-4 max-w-[320px] text-center font-montserrat text-[15px] leading-[26px] text-muted-foreground">
            Everything you need to know about WOCO membership and how our points-based travel
            ecosystem works.
          </Text>
        </View>
      </View>

      <Accordion type="single" collapsible className="gap-3">
        {FAQS.map((faq, index) => (
          <AccordionItem
            key={faq.q}
            value={String(index)}
            className="overflow-hidden rounded-lg border border-border px-3">
            <AccordionTrigger className="py-3">
              <Text className="flex-1 font-montserrat text-sm leading-[21px] text-foreground">
                {faq.q}
              </Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="font-montserrat text-xs leading-[23px] text-muted-foreground">
                {faq.a}
              </Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </View>
  );
}
