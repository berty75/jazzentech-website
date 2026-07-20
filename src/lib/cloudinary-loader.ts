// PATH: src/lib/cloudinary-loader.ts
//
// Loader d'images pour next/image.
//
// Sans lui, chaque visuel est traité deux fois : Cloudinary le redimensionne et
// le compresse, puis l'optimiseur Vercel (/_next/image) le retélécharge, le
// redimensionne encore et le recompresse. D'où une latence au premier accès et
// une double compression avec perte.
//
// Ce loader laisse Cloudinary faire tout le travail : les images arrivent
// directement de son CDN, en une seule transformation.
//
// Point délicat : certaines URLs portent déjà un recadrage intelligent
// (galerie : c_fill,g_auto,w_600,h_400). Il ne faut surtout pas l'écraser — on
// ajoute donc la largeur demandée par Next en CHAÎNANT une transformation
// supplémentaire, appliquée après les précédentes.

type LoaderArgs = { src: string; width: number; quality?: number }

const CLOUDINARY_HOST = 'res.cloudinary.com'

// Un segment de transformation ressemble à « f_auto,q_auto,w_1200 » :
// une suite de couples préfixe_valeur séparés par des virgules.
// Le point d'extension exclut les identifiants de fichier (« img_01.jpg »),
// qui pourraient sinon être pris pour des transformations.
const TRANSFORM = /^(?:[a-z]{1,3}_[^,/]+)(?:,[a-z]{1,3}_[^,/]+)*$/
const VERSION = /^v\d+$/

function isTransform(segment: string): boolean {
  if (segment.includes('.')) return false
  return VERSION.test(segment) || TRANSFORM.test(segment)
}

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  // Tout ce qui ne vient pas de Cloudinary (favicons, SVG locaux, images
  // externes) passe sans modification.
  if (!src.includes(CLOUDINARY_HOST)) return src

  const marker = '/image/upload/'
  const cut = src.indexOf(marker)
  if (cut === -1) return src

  const base = src.slice(0, cut + marker.length)
  const rest = src.slice(cut + marker.length)

  // On sépare les transformations déjà présentes de l'identifiant du fichier,
  // ce dernier pouvant contenir des dossiers (donc des « / »).
  const segments = rest.split('/')
  let i = 0
  while (i < segments.length - 1 && isTransform(segments[i])) i++

  // Cloudinary impose l'ordre : transformations, puis version, puis identifiant.
  // On extrait donc la version pour la replacer au bon endroit.
  const head = segments.slice(0, i)
  const existing = head.filter((s) => !VERSION.test(s))
  const version = head.filter((s) => VERSION.test(s))
  const publicId = segments.slice(i).join('/')

  // c_limit : ne jamais agrandir au-delà de la taille source.
  const own = `c_limit,w_${width},f_auto,q_${quality ?? 'auto'}`

  return `${base}${[...existing, own, ...version].join('/')}/${publicId}`
}
