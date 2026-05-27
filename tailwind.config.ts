import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#0A0A0A',
        foreground: '#F0F0F0',
        card: {
          DEFAULT: '#141414',
          foreground: '#F0F0F0',
        },
        popover: {
          DEFAULT: '#0A0A0A',
          foreground: '#F0F0F0',
        },
        primary: {
          DEFAULT: '#00FFB2',
          foreground: '#0A0A0A',
        },
        secondary: {
          DEFAULT: '#7B61FF',
          foreground: '#F0F0F0',
        },
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#555555',
        },
        accent: {
          DEFAULT: '#00FFB2',
          foreground: '#0A0A0A',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: '#1F1F1F',
        input: '#1A1A1A',
        ring: '#00FFB2',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: '#0A0A0A',
          foreground: '#F0F0F0',
          primary: '#00FFB2',
          'primary-foreground': '#0A0A0A',
          accent: '#1A1A1A',
          'accent-foreground': '#00FFB2',
          border: '#1F1F1F',
          ring: '#00FFB2',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
