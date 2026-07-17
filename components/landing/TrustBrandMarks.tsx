import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';
import { Circle, Path, Rect, Svg } from 'react-native-svg';

// Muted, resting-state color only — web's hover-to-dark-on-desktop interaction
// doesn't have a touch equivalent, so these just render in one fixed tone.
const MARK_COLOR = '#b0b0b0';

function AmanMark() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Circle cx={12} cy={12} r={10} />
      <Circle cx={12} cy={12} r={4} />
    </Svg>
  );
}

function FourSeasonsMark() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Path d="M12 2C12 2 6 8 6 13a6 6 0 0012 0C18 8 12 2 12 2z" />
      <Path d="M12 22v-9" />
    </Svg>
  );
}

function SixSensesMark() {
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: MARK_COLOR }} />
      ))}
    </View>
  );
}

function BanyanTreeMark() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Path d="M12 22v-8" />
      <Path d="M8 14c0 0-4-2-4-6s4-6 8-4c4-2 8 0 8 4s-4 6-4 6H8z" />
      <Path d="M10 10c0 0-3-1-3-4" />
      <Path d="M14 10c0 0 3-1 3-4" />
    </Svg>
  );
}

function SonevaMark() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Path d="M12 3a6 6 0 000 18 6 6 0 000-18" />
      <Path d="M12 8a3 3 0 100 8 3 3 0 000-8" />
    </Svg>
  );
}

function MandarinOrientalMark() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z" />
    </Svg>
  );
}

function OberoiMark() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MARK_COLOR} strokeWidth={1.2}>
      <Rect x={3} y={3} width={18} height={18} rx={1} />
      <Path d="M3 9h18M9 9v12" />
    </Svg>
  );
}

type Brand = {
  name: string;
  content: React.ReactNode;
};

export const TRUST_BRANDS: Brand[] = [
  {
    name: 'Aman',
    content: (
      <View className="flex-row items-center gap-2.5">
        <AmanMark />
        <Text style={{ color: MARK_COLOR }} className="font-noto-serif text-[15px] uppercase tracking-[5px]">
          Aman
        </Text>
      </View>
    ),
  },
  {
    name: 'Four Seasons',
    content: (
      <View className="flex-row items-center gap-2.5">
        <FourSeasonsMark />
        <Text style={{ color: MARK_COLOR }} className="font-montserrat text-[10px] uppercase tracking-[3.5px]">
          Four Seasons
        </Text>
      </View>
    ),
  },
  {
    name: 'One&Only',
    content: (
      <View className="flex-row items-center gap-1">
        <Text style={{ color: MARK_COLOR }} className="font-playfair text-[16px]">
          One
        </Text>
        <Text style={{ color: MARK_COLOR, opacity: 0.6 }} className="font-montserrat text-[11px]">
          &
        </Text>
        <Text style={{ color: MARK_COLOR }} className="font-playfair text-[16px]">
          Only
        </Text>
      </View>
    ),
  },
  {
    name: 'Six Senses',
    content: (
      <View className="flex-row items-center gap-2">
        <SixSensesMark />
        <Text style={{ color: MARK_COLOR }} className="font-montserrat text-[11px] uppercase tracking-[3.5px]">
          Six Senses
        </Text>
      </View>
    ),
  },
  {
    name: 'Banyan Tree',
    content: (
      <View className="flex-row items-center gap-2.5">
        <BanyanTreeMark />
        <Text style={{ color: MARK_COLOR }} className="font-noto-serif text-[13px] uppercase tracking-[3px]">
          Banyan Tree
        </Text>
      </View>
    ),
  },
  {
    name: 'Soneva',
    content: (
      <View className="flex-row items-center gap-2">
        <SonevaMark />
        <Text style={{ color: MARK_COLOR }} className="font-playfair text-[17px] tracking-[2px]">
          Soneva
        </Text>
      </View>
    ),
  },
  {
    name: 'Mandarin Oriental',
    content: (
      <View className="flex-row items-center gap-2.5">
        <MandarinOrientalMark />
        <Text style={{ color: MARK_COLOR }} className="font-montserrat text-[9px] uppercase tracking-[3px]">
          Mandarin Oriental
        </Text>
      </View>
    ),
  },
  {
    name: 'The Oberoi',
    content: (
      <View className="flex-row items-center gap-2">
        <OberoiMark />
        <Text style={{ color: MARK_COLOR }} className="font-noto-serif text-[13px] tracking-[2px]">
          The Oberoi
        </Text>
      </View>
    ),
  },
];
