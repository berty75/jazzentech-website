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
        // VOS couleurs Jazz en Tech
        'jazz-yellow': '#E6A824',        // Or doux/miel
        'jazz-yellow-light': '#F2C55C',  // Jaune pâle doré
        'jazz-yellow-dark': '#B8841C',   // Or foncé
        
        'jazz-red': '#A8312F',           // Rouge brique doux
        'jazz-red-light': '#C14242',     // Rouge terracotta
        'jazz-red-dark': '#7D2726',      // Bordeaux doux
        
        'catalan-amber': '#D4941E',      // Ambre catalan
        'catalan-terracotta': '#B85450', // Terracotta
        'catalan-gold-soft': '#E8B44A',  // Or doux
        'catalan-rust': '#A0522D',       // Rouille douce
        
        'warm-cream': '#FDF7E7',         // Crème chaude
        'warm-beige': '#F5E6D3',         // Beige méditerranéen
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #A8312F 0%, #B85450 100%)',
        'catalan-soft-gradient': 'linear-gradient(45deg, #E6A824 0%, #F2C55C 50%, #A8312F 100%)',
        'warm-gradient': 'linear-gradient(to bottom, #FDF7E7 0%, #F5E6D3 100%)',
      },
    },
  },
  plugins: [],
}

export default config