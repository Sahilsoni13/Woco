import { Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

// react-native-svg has no concept of the CSS keyword "currentColor" (that
// only worked in the web preview because react-native-web renders real DOM/
// SVG where the browser resolves it) — every icon gets an explicit color.
const ICON_COLOR = '#1a1a1a';

const steps = [
  {
    num: '01',
    icon: (
      <Svg width={28} height={28} viewBox="0 0 32 32" fill="none" stroke={ICON_COLOR} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <Rect x={4} y={6} width={24} height={20} rx={3} />
        <Path d="M10 2v4M22 2v4M4 14h24" />
        <Path d="M10 20h4M10 24h8" />
      </Svg>
    ),
    title: 'Apply for membership',
    desc: 'Submit your application to join our curated Circle of discerning travelers worldwide.',
  },
  {
    num: '02',
    icon: (
      <Svg width={28} height={28} viewBox="0 0 32 32" fill="none" stroke={ICON_COLOR} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx={16} cy={16} r={12} />
        <Path d="M16 8v4l3 3" />
        <Path d="M10 22l2-2M22 10l-2 2" />
      </Svg>
    ),
    title: 'Receive your points',
    desc: 'Your annual allocation of WOCO points — your silent currency for worldwide luxury access.',
  },
  {
    num: '03',
    icon: (
      <Svg width={28} height={28} viewBox="0 0 32 32" fill="none" stroke={ICON_COLOR} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M16 4C10 4 6 9 6 14c0 7.5 10 16 10 16s10-8.5 10-16c0-5-4-10-10-10z" />
        <Circle cx={16} cy={14} r={3.5} />
      </Svg>
    ),
    title: 'Choose your estate',
    desc: 'Browse 2,500+ curated estates across 48 countries — no pricing visible, ever.',
  },
  {
    num: '04',
    icon: (
      <Svg width={28} height={28} viewBox="0 0 32 32" fill="none" stroke={ICON_COLOR} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M28 14c0 8-12 14-12 14S4 22 4 14a12 12 0 1124 0z" />
        <Path d="M16 10v4l2.5 2.5" />
      </Svg>
    ),
    title: 'Experience the world',
    desc: 'Arrive. Your concierge, private villa, and curated experiences await — effortlessly.',
  },
];

const HowItWorks = () => {
  return (
    <View className="bg-ltx-cream-dark gap-9 px-5 py-12">
  <View className='gap-3'>
        <View className="flex-row items-center justify-center gap-4">
        <View className="bg-foreground h-px w-10" />
        <Text className="font-montserrat text-muted-foreground text-[12px] uppercase tracking-[3px]">
          How it works
        </Text>
          <View className="bg-foreground h-px w-10" />
      </View>

      <View className="items-center">
        <Text className="text-center text-[24px] leading-[32px]">
          <Text className="font-montserrat text-foreground">From application to </Text>
          <Text className="font-playfair text-foreground">arrival</Text>
        </Text>
        <Text className="font-montserrat text-muted-foreground mt-4 max-w-[320px] text-center text-[15px] leading-[26px]">
          Four effortless steps between you and the most extraordinary travel experiences in the
          world.
        </Text>
      </View>
  </View>

      <View className="gap-4">
        {steps.map((step) => (
          <View
            key={step.num}
            className="border-border bg-background gap-5 rounded-3xl border p-4 shadow-lg shadow-black/5">
            <View className="flex-row items-center gap-4">
              <View className="bg-secondary h-10 w-10 items-center justify-center rounded-xl">
                {step.icon}
              </View>
              <Text className="font-montserrat-bold text-muted-foreground text-[12px] uppercase tracking-[2px]">
                Step {step.num}
              </Text>
            </View>

            <View>
              <Text className="font-montserrat-medium text-foreground mb-2 text-[17px] capitalize">
                {step.title}
              </Text>
              <Text className="font-montserrat text-muted-foreground text-xs leading-[19px]">
                {step.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HowItWorks;
 