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
        'jazz-red': '#722f37',
        'jazz-yellow': '#d4af37',
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
      // Hauteurs personnalisées pour le mode paysage
      height: {
        'landscape-header': '3rem',        // 48px
        'landscape-header-sm': '2.5rem',   // 40px
        'landscape-logo': '2rem',          // 32px
        'landscape-logo-sm': '1.5rem',     // 24px
      },
      // Breakpoints personnalisés pour la hauteur
      screens: {
        'h-sm': { 'raw': '(max-height: 500px)' },
        'h-md': { 'raw': '(max-height: 700px)' },
        'h-lg': { 'raw': '(min-height: 701px)' },
      }
    },
  },
  plugins: [
    // Plugin pour les variantes d'orientation
    function({ addVariant }) {
      // Mode paysage général
      addVariant('landscape', '@media (orientation: landscape)')
      
      // Mode paysage sur petits écrans (mobiles)
      addVariant('landscape-sm', '@media (orientation: landscape) and (max-height: 500px)')
      
      // Mode paysage sur écrans moyens (tablettes)
      addVariant('landscape-md', '@media (orientation: landscape) and (min-height: 501px) and (max-height: 900px)')
      
      // Mode paysage sur grands écrans
      addVariant('landscape-lg', '@media (orientation: landscape) and (min-height: 901px)')
      
      // Mode portrait
      addVariant('portrait', '@media (orientation: portrait)')
      
      // iPhone en paysage spécifiquement
      addVariant('iphone-landscape', '@media (orientation: landscape) and (max-width: 896px) and (max-height: 414px)')
      
      // iPad en paysage
      addVariant('ipad-landscape', '@media (orientation: landscape) and (min-width: 768px) and (max-width: 1024px) and (max-height: 768px)')
    }
  ],
}

export default config