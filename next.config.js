/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudinary redimensionne et compresse déjà : on lui laisse la main plutôt
    // que de refaire le même travail dans /_next/image (double compression,
    // latence au premier accès, cache Vercel à remplir pour chaque taille).
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',

    // remotePatterns devient inutile avec un loader personnalisé, mais on le
    // garde : il redeviendrait nécessaire en cas de retour à l'optimiseur Vercel.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  // Protections simples et sans effet de bord : elles ne bloquent aucune
  // ressource, elles ne font que restreindre des comportements du navigateur.
  //
  // Pas de Content-Security-Policy ici : elle demande de recenser toutes les
  // sources externes (Billetweb, Stripe, Convex, Clerk, Cloudinary...) et le
  // moindre oubli casse une fonctionnalité. À reprendre après le festival,
  // au calme, en mode Report-Only d'abord.
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

          // Désactive les API dont le site n'a pas besoin
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },

          // Force HTTPS
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