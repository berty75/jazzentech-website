// PATH: src/components/OrganizationSchema.tsx

// Données structurées de l'organisation et du festival (schema.org).
// Complète le MusicEvent des fiches artistes : celles-ci décrivent CHAQUE concert,
// ceci décrit QUI organise et QUOI — ce qui permet à Google d'afficher un panneau
// de connaissance et de relier tous les concerts à une même entité.
export default function OrganizationSchema() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': 'https://jazzentech.com/#organization',
    name: 'Jazz en Tech',
    alternateName: 'Festival Jazz en Tech',
    description:
      "Festival de jazz organisé chaque été à Céret et Saint-Génis-des-Fontaines " +
      "dans les Pyrénées-Orientales. Concerts en plein air, podiums gratuits dans " +
      "les rues et têtes d'affiche internationales.",
    url: 'https://jazzentech.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_1200/jazz_en_tech_ceret.jpg',
    },
    email: 'contactjazzentech@gmail.com',
    foundingDate: '2018-01-23',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 rue Companyo',
      addressLocality: 'Céret',
      postalCode: '66400',
      addressRegion: 'Pyrénées-Orientales',
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Céret, Pyrénées-Orientales',
    },
    sameAs: [
      'https://www.facebook.com/festivaljazzentech',
      'https://www.instagram.com/festivaljazzentech',
    ],
    // Identifiants officiels de l'association loi 1901
    identifier: [
      { '@type': 'PropertyValue', name: 'SIRET', value: '838 417 012 00013' },
      { '@type': 'PropertyValue', name: 'RNA', value: 'W662007356' },
    ],
  }

  // Le festival 2026 : entité qui chapeaute tous les concerts individuels
  const festival = {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    '@id': 'https://jazzentech.com/#festival2026',
    name: 'Jazz en Tech 2026 — 11e édition',
    description:
      "11e édition du festival Jazz en Tech, en hommage au centenaire de Miles Davis " +
      "et John Coltrane. Du 4 au 8 août 2026 à Céret, avec des concerts en juillet " +
      "à Saint-Génis-des-Fontaines.",
    startDate: '2026-07-26T19:30:00+02:00',
    endDate: '2026-08-08T23:30:00+02:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_1200/jazz_en_tech_ceret.jpg',
    url: 'https://jazzentech.com/programmation',
    location: {
      '@type': 'Place',
      name: 'Place de la République',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Place de la République',
        addressLocality: 'Céret',
        postalCode: '66400',
        addressRegion: 'Pyrénées-Orientales',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.4859,
        longitude: 2.7486,
      },
    },
    organizer: { '@id': 'https://jazzentech.com/#organization' },
    // Têtes d'affiche : permet d'apparaître sur les recherches d'artistes
    // (« Erik Truffaz concert 2026 »), pas seulement « festival jazz Céret ».
    performer: [
      {
        '@type': 'MusicGroup',
        name: 'Erik Truffaz & Antonio Lizana',
        url: 'https://jazzentech.com/artistes/erik-truffaz',
      },
      {
        '@type': 'MusicGroup',
        name: 'Dal Sasso Big Band',
        url: 'https://jazzentech.com/artistes/dal-sasso',
      },
      {
        '@type': 'MusicGroup',
        name: 'Ladyva & Barcelona Big Blues Band',
        url: 'https://jazzentech.com/artistes/ladyva',
      },
      {
        '@type': 'MusicGroup',
        name: 'Akpé Motion featuring Karla Harris',
        url: 'https://jazzentech.com/artistes/akpe-motion',
      },
      {
        '@type': 'MusicGroup',
        name: 'Cecil L. Recchia Quintet',
        url: 'https://jazzentech.com/artistes/cecile-recchia',
      },
      {
        '@type': 'MusicGroup',
        name: 'Harmonie de Céret',
        url: 'https://jazzentech.com/artistes/harmonie-ceret',
      },
    ],
    offers: {
      '@type': 'Offer',
      url: 'https://jazzentech.com/billetterie',
      price: '15',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01T00:00:00+01:00',
    },
  }

  // Site web (permet la recherche interne dans les résultats Google)
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://jazzentech.com/#website',
    url: 'https://jazzentech.com',
    name: 'Jazz en Tech',
    inLanguage: 'fr-FR',
    publisher: { '@id': 'https://jazzentech.com/#organization' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(festival) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
