import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'persian-blue': '#3c3ca3',
        'midnight-blue': '#262671',
        'penn-blue': '#121248',
        'oxford-blue': '#050526',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(45deg, #050526 0%, #262671 50%, #3c3ca3 100%)',
        'catalan-soft-gradient': 'linear-gradient(45deg, #3c3ca3 0%, #262671 50%, #050526 100%)',
        'warm-gradient': 'linear-gradient(135deg, rgba(38,38,113,0.12) 0%, rgba(60,60,163,0.12) 100%)',
      },
    },
  },
  plugins: [],
}

export default config