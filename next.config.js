// ---- Content-Security-Policy ----
// Version volontairement permissive. Le site étant entièrement statique (pages
// pré-rendues et servies par le CDN), on ne peut pas utiliser de nonce : celui-ci
// doit être recalculé à chaque requête, ce qui imposerait un rendu dynamique.
// D'où 'unsafe-inline' sur script-src, indispensable aux balises JSON-LD et aux
// scripts d'hydratation de Next.
//
// L'objectif ici n'est pas une protection maximale mais un filet raisonnable
// sans rien casser : billetterie Billetweb, paiement Stripe, temps réel Convex,
// images Cloudinary, vidéos YouTube.
//
// Pour tester sans bloquer : CSP_REPORT_ONLY=1 dans l'environnement. Les
// violations remontent alors dans /api/csp-report (terminal en local, onglet
// Logs sur Vercel) sans qu'aucune ressource ne soit refusée.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",

  // Formulaires : Billetweb et Stripe reçoivent des soumissions
  "form-action 'self' https://www.billetweb.fr https://checkout.stripe.com",

  // Scripts : widget Billetweb, Stripe. 'unsafe-inline' cf. explication ci-dessus.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.billetweb.fr https://js.stripe.com",

  // Styles : Tailwind et les styles inline des composants
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",

  // Images : Cloudinary, QR codes, vignettes diverses. Large à dessein — une
  // image bloquée est un visuel manquant sur le site public.
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",

  // Connexions : Convex (dont websocket temps réel), Cloudinary, Stripe, Billetweb
  "connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://api.cloudinary.com https://api.stripe.com https://www.billetweb.fr",

  // Cadres : YouTube, billetterie Billetweb, Stripe, Apple Music, office de tourisme
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.billetweb.fr https://js.stripe.com https://checkout.stripe.com https://embed.music.apple.com https://music.apple.com https://boutique.tourisme-pyrenees-mediterranee.com",

  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
  'report-uri /api/csp-report',
].join('; ')

const cspHeaderName = process.env.CSP_REPORT_ONLY
  ? 'Content-Security-Policy-Report-Only'
  : 'Content-Security-Policy'

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

          // Content-Security-Policy (voir le détail en haut du fichier)
          { key: cspHeaderName, value: csp },
        ],
      },
    ]
  },
}

module.exports = nextConfig