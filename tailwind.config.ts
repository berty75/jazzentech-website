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
        // Palette Jazz classique
        'jazz-black': '#1a1a1a',
        'jazz-gold': '#d4af37',
        'jazz-red': '#722f37', // deep-burgundy
        'jazz-yellow': '#d4af37', // même que jazz-gold
        'deep-burgundy': '#722f37',
        'warm-cream': '#f7f3e9',
        'copper': '#b87333',
        
        // Couleurs existantes
        'persian-blue': '#3c3ca3',
        'midnight-blue': '#262671',
        'penn-blue': '#121248',
        'oxford-blue': '#050526',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(45deg, #1a1a1a 0%, #722f37 40%, #b87333 80%, #d4af37 100%)',
        'catalan-soft-gradient': 'linear-gradient(45deg, #d4af37 0%, #b87333 50%, #722f37 100%)',
        'warm-gradient': 'linear-gradient(135deg, rgba(114, 47, 55, 0.12) 0%, rgba(212, 175, 55, 0.12) 100%)',
      },
    },
  },
  plugins: [],
}

export default config