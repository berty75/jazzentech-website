#!/usr/bin/env python3
"""
Script d'optimisation Cloudinary - Ajoute compression et redimensionnement
Transforme les URLs basiques en URLs optimisées pour de meilleures performances
"""
import os
import re

def optimize_cloudinary_url(url):
    """
    Transforme une URL Cloudinary basique en URL optimisée
    Ajoute f_auto,q_auto,w_800 pour compression et redimensionnement automatiques
    """
    if 'res.cloudinary.com' not in url:
        return url
    
    # Pattern pour détecter les URLs Cloudinary
    pattern = r'(https://res\.cloudinary\.com/[^/]+/image/upload)(/v\d+/)(.+)'
    match = re.match(pattern, url)
    
    if match:
        base_url = match.group(1)
        version = match.group(2)
        image_id = match.group(3)
        
        # Ajouter les paramètres d'optimisation
        # f_auto = format automatique (webp, avif selon le navigateur)
        # q_auto = qualité automatique optimisée
        # w_800 = largeur max 800px (adapté pour le web)
        optimized_url = f"{base_url}/f_auto,q_auto,w_800{version}{image_id}"
        return optimized_url
    
    return url

def process_file(filepath):
    """Traite un fichier et optimise toutes les URLs Cloudinary"""
    if not os.path.exists(filepath):
        print(f"Fichier non trouvé: {filepath}")
        return 0
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        optimizations_made = 0
        
        # Trouve toutes les URLs Cloudinary dans le fichier
        cloudinary_pattern = r'https://res\.cloudinary\.com/[^/]+/image/upload/v\d+/[^"\s]+'
        
        def replace_url(match):
            nonlocal optimizations_made
            original_url = match.group(0)
            optimized_url = optimize_cloudinary_url(original_url)
            
            if optimized_url != original_url:
                optimizations_made += 1
                print(f"  Optimisation: {os.path.basename(original_url.split('/')[-1])}")
            
            return optimized_url
        
        # Remplace toutes les URLs trouvées
        content = re.sub(cloudinary_pattern, replace_url, content)
        
        # Sauvegarde seulement si des changements ont été faits
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {filepath}: {optimizations_made} URLs optimisées")
        else:
            print(f"🔍 {filepath}: aucune optimisation nécessaire")
            
        return optimizations_made
        
    except Exception as e:
        print(f"❌ Erreur dans {filepath}: {e}")
        return 0

def main():
    print("🚀 Optimisation URLs Cloudinary")
    print("Ajoute compression automatique et redimensionnement optimal")
    print("=" * 60)
    
    # Fichiers à traiter
    files_to_process = [
        "src/components/Header.tsx",
        "src/app/layout.tsx", 
        "src/app/page.tsx",
        "src/app/programmation/page.tsx",
        "src/app/artistes/page.tsx",
        "src/app/artistes/[slug]/page.tsx",
        "src/app/benevoles/page.tsx",
        "src/app/mot-du-president/page.tsx",
        "src/app/galerie/page.tsx",
        "src/app/dossier-presse/page.tsx",
        "src/app/billetterie/page.tsx"
    ]
    
    total_optimizations = 0
    
    for filepath in files_to_process:
        optimizations_made = process_file(filepath)
        total_optimizations += optimizations_made
    
    print("=" * 60)
    print(f"✅ Optimisation terminée!")
    print(f"📊 Total: {total_optimizations} URLs optimisées")
    print("")
    print("🎯 Bénéfices attendus:")
    print("  • Images 30-50% plus légères")
    print("  • Format WebP/AVIF automatique") 
    print("  • Redimensionnement adaptatif")
    print("  • Chargement 2-3x plus rapide")
    print("")
    print("⚡ Testez maintenant avec 'npm run dev'")

if __name__ == "__main__":
    main()