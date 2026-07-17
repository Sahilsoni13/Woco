import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';

// LTX web (src/app/globals.css) ships one brand palette with no separate
// dark-mode values, so light and dark mirror it here to keep WocoApp's
// color theme identical to web in either mode.
const LTX_PALETTE = {
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(0 0% 10.2%)',
  card: 'hsl(0 0% 100%)',
  cardForeground: 'hsl(0 0% 10.2%)',
  popover: 'hsl(0 0% 100%)',
  popoverForeground: 'hsl(0 0% 10.2%)',
  primary: 'hsl(0 0% 10.2%)',
  primaryForeground: 'hsl(0 0% 100%)',
  secondary: 'hsl(45 16.7% 95.3%)',
  secondaryForeground: 'hsl(0 0% 10.2%)',
  muted: 'hsl(45 16.7% 95.3%)',
  mutedForeground: 'hsl(220 8.9% 46.1%)',
  accent: 'hsl(45 16.7% 95.3%)',
  accentForeground: 'hsl(0 0% 10.2%)',
  destructive: 'hsl(357.2 100% 45.3%)',
  border: 'hsl(33.3 20% 91.2%)',
  input: 'hsl(45.5 29.3% 80.6%)',
  ring: 'hsl(0 0% 10.2%)',
  radius: '0.625rem',
  chart1: 'hsl(0 0% 83.1%)',
  chart2: 'hsl(0 0% 45.2%)',
  chart3: 'hsl(0 0% 32.2%)',
  chart4: 'hsl(0 0% 25%)',
  chart5: 'hsl(0 0% 14.9%)',
  ltxGreen: 'hsl(0 0% 10.2%)',
  ltxGreenLight: 'hsl(146.5 46.4% 22%)',
  ltxText: 'hsl(47 19.7% 22.9%)',
  ltxMuted: 'hsl(45 8.5% 54.1%)',
  ltxCream: 'hsl(0 0% 100%)',
  ltxCreamDark: 'hsl(45 16.7% 95.3%)',
  ltxBorder: 'hsl(33.3 20% 91.2%)',
  ltxGold: 'hsl(36.8 40.4% 61.2%)',
  ltxAccent: 'hsl(27.4 61.6% 56.1%)',
  ltxWarmAccent: 'hsl(29.4 66.8% 53.9%)',
} as const;

export const THEME = {
  light: LTX_PALETTE,
  dark: LTX_PALETTE,
};
 
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};