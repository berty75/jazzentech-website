#!/usr/bin/env python3
"""
Script de remplacement d'adresse email
Remplace contact@jazzentech.com par une adresse Gmail
"""
import os

# Quelle adresse Gmail voulez-vous utiliser ?
# Changez cette ligne avec votre adresse Gmail souhaitée
NOUVELLE_EMAIL = "contactjazzentech@gmail.com"  # Changez ici

# Fichiers à traiter
files_to_process = [
    "src/app/plan-site/page.tsx",
    "src/app/politique-cookies/page.tsx", 
    "src/app/contact/page.tsx",
    "src/app/benevoles/page.tsx",
    "src/app/dossier-presse/page.tsx",
    "src/app/mentions-legales/page.tsx",
    "src/app/politique-confidentialite/page.tsx",
    "src/components/Footer.tsx"
]

def replace_email_in_file(filepath):
    """Remplace l'email dans un fichier"""
    if not os.path.exists(filepath):
        print(f"⚠️  Fichier non trouvé: {filepath}")
        return 0
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements_made = 0
        
        # Remplace contact@jazzentech.com par la nouvelle adresse
        if "contact@jazzentech.com" in content:
            content = content.replace("contact@jazzentech.com", NOUVELLE_EMAIL)
            replacements_made = content.count(NOUVELLE_EMAIL) - original_content.count(NOUVELLE_EMAIL)
        
        # Sauvegarde si des changements ont été faits
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
    print("📧 Remplacement adresse email")
    print(f"De: contact@jazzentech.com")
    print(f"Vers: {NOUVELLE_EMAIL}")
    print("=" * 50)
    
    total_replacements = 0
    
    for filepath in files_to_process:
        replacements_made = replace_email_in_file(filepath)
        total_replacements += replacements_made
    
    print("=" * 50)
    print(f"✅ Remplacement terminé!")
    print(f"📊 Total: {total_replacements} remplacements effectués")
    
    # Note importante
    print("\n⚠️  N'oubliez pas de vérifier:")
    print("   • src/app/api/contact/route.ts (API email)")
    print("   • src/app/billetterie/page.tsx (billetterie@jazzentech.com)")

if __name__ == "__main__":
    main()