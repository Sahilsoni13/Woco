const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './screens/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        // LTX web brand palette (src/app/globals.css @theme inline color-ltx-*)
        ltx: {
          green: 'hsl(var(--ltx-green))',
          'green-light': 'hsl(var(--ltx-green-light))',
          text: 'hsl(var(--ltx-text))',
          muted: 'hsl(var(--ltx-muted))',
          cream: 'hsl(var(--ltx-cream))',
          'cream-dark': 'hsl(var(--ltx-cream-dark))',
          border: 'hsl(var(--ltx-border))',
          gold: 'hsl(var(--ltx-gold))',
          accent: 'hsl(var(--ltx-accent))',
          'warm-accent': 'hsl(var(--ltx-warm-accent))',
        },
      },
      fontFamily: {
        // LTX web brand fonts (src/app/globals.css --font-noto-serif / --font-playfair / --font-montserrat)
        'noto-serif': ['NotoSerif_400Regular'],
        'noto-serif-bold': ['NotoSerif_700Bold'],
        playfair: ['PlayfairDisplay_400Regular_Italic'],
        'playfair-bold': ['PlayfairDisplay_700Bold_Italic'],
        montserrat: ['DMSans_400Regular'],
        'montserrat-medium': ['DMSans_500Medium'],
        'montserrat-bold': ['DMSans_700Bold'],
        'eb-garamond': ['EBGaramond_400Regular'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
