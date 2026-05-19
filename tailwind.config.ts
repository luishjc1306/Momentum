import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16211f',
        mint: '#2bbf8a',
        lagoon: '#257e8c',
        coral: '#ef6f61',
        sun: '#f5b942',
        cream: '#fff9ef',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(22, 33, 31, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
