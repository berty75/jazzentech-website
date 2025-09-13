#!/usr/bin/env python3
"""
Script de migration Cloudinary - Version Python
Remplace toutes les références d'images locales par les URLs Cloudinary
"""
import os
import re

# Mapping des remplacements
replacements = {
    "/images/jazz-en-tech-logo.png": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/jazz-en-tech-logo_yl2uj4.png",
    "/images/affiche-2025.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg",
    "https://jazzentech.com/images/affiche-2025.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg",
    "/images/manu-le-prince.jpeg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg",
    "/images/florin-gugulica.jpeg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg",
    "/images/stefano-di-battista.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg",
    "/images/jacky-terrasson.jpeg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg",
    "/images/camille-bertault.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg",
    "/images/charlotte-planchou.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg",
    "/images/triton-66.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg",
    "/images/florin-gugulica-trio.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica-trio_wejyxd.jpg",
    "/images/david-vilayleck.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg",
    "/images/cavale-trio.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg",
    "/images/benevoles.jpg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/benevoles_cwdmh1.jpg",
    "/images/alain-brunet.jpeg": "https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/alain-brunet_gb0jx1.jpg"
}

# Fichiers à traiter
files_to_process = [
    "src/components/Header.tsx",
    "src/app/layout.tsx", 
    "src/app/page.tsx",
    "src/app/programmation/page.tsx",
    "src/app/artistes/page.tsx",
    "src/app/artistes/[slug]/page.tsx",
    "src/app/benevoles/page.tsx",
    "src/app/mot-du-president/page.tsx"
]

def process_file(filepath):
    """Traite un fichier et effectue les remplacements"""
    if not os.path.exists(filepath):
        print(f"⚠️  Fichier non trouvé: {filepath}")
        return 0
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements_made = 0
        
        # Effectue tous les remplacements
        for old_url, new_url in replacements.items():
            if old_url in content:
                content = content.replace(old_url, new_url)
                replacements_made += 1
        
        # Sauvegarde seulement si des changements ont été faits
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {filepath}: {replacements_made} remplacements")
        else:
            print(f"🔍 {filepath}: aucun remplacement nécessaire")
            
        return replacements_made
        
    except Exception as e:
        print(f"❌ Erreur dans {filepath}: {e}")
        return 0

def main():
    print("🚀 Migration Cloudinary - Script Python")
    print("=" * 50)
    
    total_replacements = 0
    
    for filepath in files_to_process:
        replacements_made = process_file(filepath)
        total_replacements += replacements_made
    
    print("=" * 50)
    print(f"✅ Migration terminée!")
    print(f"📊 Total: {total_replacements} remplacements effectués")
    
    # Vérification finale
    print("\n🔍 Vérification finale...")
    remaining_images = 0
    for filepath in files_to_process:
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                count = content.count('/images/')
                if count > 0:
                    print(f"⚠️  {filepath}: {count} images locales restantes")
                    remaining_images += count
    
    if remaining_images == 0:
        print("🎉 Toutes les images ont été migrées!")
    else:
        print(f"⚠️  {remaining_images} images locales restantes à corriger manuellement")

if __name__ == "__main__":
    main()