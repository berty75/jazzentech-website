/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  env: {
    CLOUDINARY_CLOUD_NAME: 'dpgfensnv',
  },
  async redirects() {
    return [
      // Redirections de domaine existantes
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'jazzentech.fr',
          },
        ],
        destination: 'https://www.jazzentech.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jazzentech.fr',
          },
        ],
        destination: 'https://www.jazzentech.com/:path*',
        permanent: true,
      },
      
      // Nouvelles redirections pour gérer les 404
      
      // Éditions passées vers accueil
      {
        source: '/edition-:year/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Événements avec dates vers programmation
      {
        source: '/dimanche-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/samedi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/vendredi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/jeudi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/mercredi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/mardi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      {
        source: '/lundi-:path*',
        destination: '/programmation',
        permanent: true,
      },
      
      // Billetterie anciennes versions
      {
        source: '/billetterie-jazz-en-tech-:year',
        destination: '/billetterie',
        permanent: true,
      },
      {
        source: '/billetterie-jazz-en-tech-:year/:path*',
        destination: '/billetterie',
        permanent: true,
      },
      
      // Pages de pagination vers accueil
      {
        source: '/page/:page',
        destination: '/',
        permanent: true,
      },
      
      // Feed RSS vers accueil
      {
        source: '/feed/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Recherche vers accueil
      {
        source: '/search/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Event-pro vers programmation
      {
        source: '/event-pro/:path*',
        destination: '/programmation',
        permanent: true,
      },
      
      // Anciennes pages vers leurs équivalents
      {
        source: '/plan-du-site',
        destination: '/plan-site',
        permanent: true,
      },
      
      // URLs en catalan vers français
      {
        source: '/ca/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Dossier 2022-2 vers accueil
      {
        source: '/2022-2/:path*',
        destination: '/',
        permanent: true,
      }
    ]
  },

  // ---- En-têtes de sécurité ----
  // Protections préventives (clickjacking, MIME-sniffing, fuite de référent...).
  // Volontairement SANS Content-Security-Policy : une CSP mal réglée casserait
  // le widget Billetweb, Stripe ou Cloudinary. À voir après le festival, avec
  // le temps de tester chaque source.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Empêche l'affichage du site dans une iframe tierce (clickjacking)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

          // Le navigateur respecte le type déclaré au lieu de le deviner
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // N'envoie l'URL complète qu'aux pages du même site
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // Désactive les API sensibles dont le site n'a pas besoin
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.stripe.com" "https://www.billetweb.fr"), interest-cohort=()',
          },

          // Force HTTPS pendant 2 ans (déjà actif, on le fige explicitement)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig