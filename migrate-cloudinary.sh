#!/bin/bash
# migrate-cloudinary.sh
# Script de migration automatique des images locales vers Cloudinary

echo "🚀 Début de la migration Cloudinary..."

# ETAPE 1: Header - Logo principal
echo "📝 Correction du Header..."
sed -i 's|/images/jazz-en-tech-logo\.png|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/jazz-en-tech-logo_yl2uj4.png|g' src/components/Header.tsx

# ETAPE 2: Layout - Métadonnées
echo "📝 Correction du Layout..."
sed -i 's|/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/layout.tsx
sed -i 's|https://jazzentech\.com/images/affiche-2025\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg|g' src/app/layout.tsx

# ETAPE 3: Page d'accueil - Toutes les images
echo "📝 Correction de la page d'accueil..."
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

# ETAPE 4: Programmation - Mêmes images que page d'accueil
echo "📝 Correction de la page Programmation..."
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

# ETAPE 5: Artistes - Page listing
echo "📝 Correction de la page Artistes..."
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' src/app/artistes/page.tsx
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' src/app/artistes/page.tsx

# ETAPE 6: Artistes - Pages individuelles
echo "📝 Correction des pages individuelles d'artistes..."
sed -i 's|/images/manu-le-prince\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/florin-gugulica\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/stefano-di-battista\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/jacky-terrasson\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/camille-bertault\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/charlotte-planchou\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/cavale-trio\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/david-vilayleck\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg|g' src/app/artistes/\[slug\]/page.tsx
sed -i 's|/images/triton-66\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg|g' src/app/artistes/\[slug\]/page.tsx

# ETAPE 7: Bénévoles
echo "📝 Correction de la page Bénévoles..."
sed -i 's|/images/benevoles\.jpg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/benevoles_cwdmh1.jpg|g' src/app/benevoles/page.tsx

# ETAPE 8: Mot du président
echo "📝 Correction de la page Mot du président..."
sed -i 's|/images/alain-brunet\.jpeg|https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/alain-brunet_gb0jx1.jpg|g' src/app/mot-du-president/page.tsx

echo "✅ Migration Cloudinary terminée !"
echo "📊 Résumé:"
echo "   • Header: logo migré"
echo "   • Layout: métadonnées migrées"  
echo "   • Page d'accueil: 10 images migrées"
echo "   • Programmation: 9 images migrées"
echo "   • Artistes: 6+9 images migrées"
echo "   • Bénévoles: 1 image migrée"
echo "   • Mot du président: 1 image migrée"
echo "   • Billetterie: déjà corrigée manuellement"
echo ""
echo "🧹 Vous pouvez maintenant supprimer le dossier /public/images/ pour libérer l'espace"
echo "🚀 Testez votre site pour vérifier que toutes les images s'affichent correctement"