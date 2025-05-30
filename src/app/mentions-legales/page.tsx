import React from 'react'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Mentions Légales</h1>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Editeur du site</h2>
            <p className="mb-4">
              L'association (loi 1901) Jazz En Tech, SIRET 838 417 012 00013 / APE 0499Z, 
              sise 10 rue Companyo à Céret (66), représentée par son président Alain Brunet.
            </p>
            <p className="mb-4">
              E-mail : <a href="mailto:contact@jazzentech.com" className="text-jazz-red hover:underline">contact@jazzentech.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Hébergement</h2>
            <p>
              Ce site est hébergé sur les serveurs de la société OVH, sise 2, rue Kellermann, 59100 Roubaix.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Propriété intellectuelle</h2>
            <p className="mb-4">
              Toute reproduction ou distribution non autorisée de tout ou partie des éléments et informations 
              de ce site est interdite. Le contenu est disponible pour un usage privé et non collectif.
            </p>
            <p className="mb-4">
              Le code de la propriété intellectuelle n'autorisant, aux termes de l'article L. 122-5.2° et 3°a, 
              d'une part, que les « copies ou reproductions strictement réservées à l'usage privé du copiste et 
              non destinées à une utilisation collective » et, d'autre part, que les analyses et les courtes 
              citations dans un but d'exemple et d'illustration, « toute représentation ou reproduction intégrale 
              ou partielle faite sans le consentement de l'auteur ou de ses ayants droit ou ayants cause est 
              illicite » (art. L. 122-4).
            </p>
            <p>
              Cette représentation ou reproduction, par quelque procédé que ce soit constituerait donc une 
              contrefaçon sanctionnée par les articles L. 335-2 et suivants du code de la propriété intellectuelle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">CNIL (Commission Nationale Informatique et Libertés)</h2>
            <h3 className="text-xl font-semibold text-jazz-red mb-3">Protection et utilisation des données</h3>
            <p className="mb-4">
              Les utilisateurs ayant déposé dans le site des informations nominatives peuvent demander la 
              communication des informations nominatives les concernant à l'administrateur du site et les 
              faire rectifier le cas échéant, conformément à la loi française N° 78-17 du 6 janvier 1978 
              relative à l'informatique, aux fichiers et aux libertés.
            </p>
            <p className="mb-4">
              Ils peuvent exercer ces droits en adressant un courrier à l'éditeur du site.
            </p>
            <p>
              Les informations nominatives peuvent être utilisées par l'éditeur pour proposer ses services 
              et/ou produits et faire connaître ceux de ses partenaires. Elles ne seront communiquées aux 
              tiers que pour permettre la gestion des opérations ou pour satisfaire aux obligations légales. 
              Chaque utilisateur peut s'y opposer en adressant un courrier à l'adresse ci-dessus.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Marques et logos, liens hypertextes</h2>
            <p>
              Toute utilisation quelle qu'elle soit des noms de marques et logos de ce site est interdite 
              sans l'autorisation de l'éditeur. De même tous liens hypertextes visant ce site sont soumis 
              à autorisation préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Utilisation des données personnelles collectées</h2>
            
            <h3 className="text-xl font-semibold text-jazz-red mb-3">Commentaires</h3>
            <p className="mb-4">
              Quand vous laissez un commentaire sur notre site web, les données inscrites dans le formulaire 
              de commentaire, mais aussi votre adresse IP et l'agent utilisateur de votre navigateur sont 
              collectés pour nous aider à la détection des commentaires indésirables.
            </p>

            <h3 className="text-xl font-semibold text-jazz-red mb-3">Formulaires de contact</h3>
            <p className="mb-4">
              Les données saisies sur nos formulaires de contact sont enregistrées dans la base de données 
              du site (nom, adresse e-mail, commentaire, adresse IP de connexion, date et heure de connexion, 
              navigateur utilisé).
            </p>

            <h3 className="text-xl font-semibold text-jazz-red mb-3">Cookies</h3>
            <p className="mb-4">
              Un « Cookie » permet l'identification de l'Utilisateur, la personnalisation de sa consultation 
              du présent site et l'accélération de la mise en page du site grâce à l'enregistrement d'un 
              fichier de données sur son ordinateur.
            </p>
            <p>
              Voir notre page <a href="/politique-cookies" className="text-jazz-red hover:underline">« Politique de cookies »</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Informations de contact</h2>
            <p>
              Vous pouvez nous contacter via notre <a href="/contact" className="text-jazz-red hover:underline">formulaire de contact</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Informations supplémentaires</h2>
            <p>
              Ce site n'a pas pour objet l'exploitation commerciale de vos données personnelles.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}