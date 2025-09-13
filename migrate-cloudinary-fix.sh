#!/bin/bash
# migrate-cloudinary-fix.sh
# Script de migration corrigé - toutes les images restantes

echo "🔧 Migration Cloudinary - Version corrigée"

# Header
echo "📝 Header..."
sed -i 's|/images/jazz-en-tech-logo\.png|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/jazz-en-tech-logo_yl2uj4.png|g' src/components/Header.tsx

# Layout - Toutes les variantes d'affiche
echo "📝 Layout..."
sed -i 's|/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/layout.tsx
sed -i 's|https://jazzentech\.com/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/layout.tsx

# Page d'accueil
echo "📝 Page d'accueil..."
sed -i 's|/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/page.tsx
sed -i 's|https://jazzentech\.com/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/page.tsx
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' src/app/page.tsx
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' src/app/page.tsx
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' src/app/page.tsx
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' src/app/page.tsx
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' src/app/page.tsx
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' src/app/page.tsx
sed -i 's|/images/triton-66\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg|g' src/app/page.tsx
sed -i 's|/images/florin-gugulica-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica-trio_wejyxd.jpg|g' src/app/page.tsx
sed -i 's|/images/david-vilayleck\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg|g' src/app/page.tsx
sed -i 's|/images/cavale-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg|g' src/app/page.tsx

# Programmation
echo "📝 Programmation..."
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/cavale-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/david-vilayleck\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/triton-66\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg|g' src/app/programmation/page.tsx
sed -i 's|/images/florin-gugulica-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica-trio_wejyxd.jpg|g' src/app/programmation/page.tsx

# Artistes listing
echo "📝 Artistes listing..."
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' src/app/artistes/page.tsx

# Artistes pages individuelles - avec échappement correct
echo "📝 Artistes individuels..."
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/cavale-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/david-vilayleck\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg|g' 'src/app/artistes/[slug]/page.tsx'
sed -i 's|/images/triton-66\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg|g' 'src/app/artistes/[slug]/page.tsx'

# Bénévoles
echo "📝 Bénévoles..."
sed -i 's|/images/benevoles\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/benevoles_cwdmh1.jpg|g' src/app/benevoles/page.tsx

# Mot du président
echo "📝 Mot du président..."
sed -i 's|/images/alain-brunet\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/alain-brunet_gb0jx1.jpg|g' src/app/mot-du-president/page.tsx

echo "✅ Migration corrigée terminée !"
echo "🔍 Vérification finale..."
echo "Images restantes :"
grep -r "/images/" src/ --include="*.tsx" --include="*.ts" | wc -l