import { Image, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const testimonials = [
  {
    quote:
      'From the moment we arrived, everything felt intentionally curated and beautifully understated. The villa, concierge, and private experiences created a level of calm luxury I rarely find while traveling.',
    name: 'Sophia Laurent',
    role: 'Member since 2023',
    location: 'Goa · Coastal Serenity Villa',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'WOCO transformed how we think about travel entirely. No price tags, no negotiations — just flawless experiences delivered with quiet excellence. The Bali retreat exceeded every expectation we had.',
    name: 'Arjun Mehrotra',
    role: 'Member since 2022',
    location: 'Bali · Tirta Retreat',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'The concierge team anticipated every need before we even voiced it. Private transfers, bespoke dining, sunrise yacht excursions — all arranged seamlessly through points alone. Extraordinary.',
    name: 'Isabelle Chen',
    role: 'Member since 2024',
    location: 'Maldives · Casa Solmare',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="#f59e0b">
          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </Svg>
      ))}
    </View>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <View className="gap-5 rounded-3xl border border-border bg-background p-5 shadow-lg shadow-black/5">
      {/* Stars + avatar */}
      <View className="flex-row items-start justify-between">
        <StarRating count={testimonial.rating} />
        <Image
          source={{ uri: testimonial.image }}
          resizeMode="cover"
          className="rounded-full border-2 border-border"
          style={{ width: 44, height: 44 }}
        />
      </View>

      {/* Quote */}
      <Text className="font-montserrat text-[14px] leading-[23px] text-[#374151]">
        &ldquo;{testimonial.quote}&rdquo;
      </Text>

      {/* Author */}
      <View className="border-t border-border pt-4">
        <Text className="font-montserrat-medium text-[14px] text-foreground">
          {testimonial.name}
        </Text>
        <Text className="mt-0.5 font-montserrat text-[12px] text-muted-foreground">
          {testimonial.role}
        </Text>
        <View className="mt-2 flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <Text className="font-montserrat text-[11px] uppercase tracking-[1px] text-muted-foreground">
            {testimonial.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Testimonial() {
  return (
    <View className="gap-8 bg-background px-5 py-12">
      <View className="gap-3">
        {/* Heading */}
        <View className="flex-row items-center justify-center gap-4">
          <View className="h-px w-8 bg-foreground" />
          <Text className="font-montserrat text-[12px] uppercase tracking-[3px] text-muted-foreground">
            Member Stories
          </Text>
          <View className="h-px w-8 bg-foreground" />
        </View>

        <View className="items-center">
          <Text className="text-center text-[24px] leading-[30px]">
            <Text className="font-montserrat text-foreground">What our </Text>
            <Text className="font-playfair text-foreground">members say</Text>
          </Text>
          <Text className="mt-4 max-w-[320px] text-center font-montserrat text-[15px] leading-[26px] text-muted-foreground">
            Stories from discerning travelers who have experienced the WOCO difference firsthand.
          </Text>
        </View>
      </View>

      <View className="gap-5">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </View>
    </View>
  );
}
