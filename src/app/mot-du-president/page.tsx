import { Music, Calendar, MapPin, Heart, Star, Users } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mot du Président - Jazz en Tech 2026',
  description: 'Message du président Alain Brunet pour la 11ème édition du festival Jazz en Tech 2026 — hommage à Miles Davis et John Coltrane.'
}

export default function MotDuPresident() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div
                  className="inline-block px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm mb-4"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  🎺 11ème édition — 2026
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white">
                  Mot du Président
                </h1>
                <p className="text-base sm:text-lg text-warm-cream leading-relaxed mb-4">
                  Chers amis de Jazz en Tech
                </p>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-jazz-gold bg-opacity-20 rounded-full flex items-center justify-center">
                    <Music className="w-5 h-5 md:w-6 md:h-6 text-jazz-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Alain Brunet</p>
                    <p className="text-warm-cream text-xs md:text-sm opacity-80">Président de Jazz en Tech</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
                  <Image
                    src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/alain-brunet_president.jpg"
                    alt="Alain Brunet, Président de Jazz en Tech"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  <div
                    className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-jazz-gold rounded-full flex items-center justify-center font-bold text-xs md:text-sm"
                    style={{ color: '#1a1a1a' }}
                  >
                    <div className="text-center">
                      <div className="text-xs">11ème</div>
                      <div className="text-xs">édition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lettre complète */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Texte principal — mot pour mot */}
              <div className="lg:col-span-2 space-y-6">

                {/* Programmation */}
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Star className="w-5 h-5 text-jazz-gold flex-shrink-0" />
                    La programmation 2026
                  </h2>
                  <div className="space-y-5 text-stone-200 leading-relaxed text-base md:text-lg">
                    <p>
                      L'année 2026 après 2025, édition couronnée de succès pour Jazz en Tech, verra
                      notre festival continuer son développement pour la plus grande satisfaction du
                      public.
                    </p>

                    <div className="border-l-4 pl-4" style={{ borderColor: '#d4af37' }}>
                      <p className="font-semibold text-white mb-1">Mercredi 5 août — 21h</p>
                      <p>
                        Coup d'envoi de la 11<sup>ème</sup> édition à Céret mercredi 5 août 21h. Un hommage
                        majestueux à Miles Davis, « Picasso du jazz » selon Pascal Anquetil, dont nous
                        fêterons avec éclat le 100<sup>ème</sup> anniversaire de la naissance. Le trompettiste Eric
                        Truffaz et le saxophoniste-chanteur Antonio Lizana, magnifiquement entourés
                        procéderont à une relecture du fameux disque devenu culte <em>Sketches of Spain</em>.
                      </p>
                    </div>

                    <div className="border-l-4 pl-4" style={{ borderColor: '#d4af37' }}>
                      <p className="font-semibold text-white mb-1">Jeudi 6 août — 21h</p>
                      <p>
                        Le lendemain, jeudi 6 août 21h ce sera autour de John Coltrane né aussi en
                        1926 et hélas trop tôt décédé (1967), géant du jazz s'il en est, d'être célébré à
                        Céret par le Big Band de Christophe Dal Sasso et les formidables saxophonistes Sophie
                        Alour, David El-Malek et Stéphane Guillaume qui incarneront à tour de rôle Coltrane autour d'une œuvre majeure
                        <em> Africa Brass</em> et de quelques autres….
                      </p>
                    </div>

                    <div className="border-l-4 pl-4" style={{ borderColor: '#d4af37' }}>
                      <p className="font-semibold text-white mb-1">Vendredi 7 août — 21h</p>
                      <p>
                        Vendredi 7 août 21h, la pianiste chanteuse Ladyva entourée des gaillards du
                        Barcelone Big band Blues revisiteront quelques grands standards du jazz dont
                        notamment des fameux Boogie-Woogie dont Ladyva est l'une des plus grandes
                        spécialistes au monde. Swing maximum assuré !
                      </p>
                    </div>

                    <div className="border-l-4 pl-4" style={{ borderColor: '#d4af37' }}>
                      <p className="font-semibold text-white mb-1">Samedi 8 août — Soirée de clôture</p>
                      <p>
                        Enfin samedi 8 août, soirée de clôture, devrait être aussi une soirée
                        particulièrement festive dont le programme est en cours de finalisation et
                        dépendra des moyens budgétaires que nous parviendrons à mobiliser dans les
                        toutes prochaines semaines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appel au soutien */}
                <div
                  className="rounded-2xl p-6 md:p-8 text-white"
                  style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                    <Heart className="w-5 h-5 flex-shrink-0" />
                    Votre soutien est essentiel
                  </h2>
                  <div className="space-y-5 leading-relaxed text-base md:text-lg text-warm-cream">
                    <p className="text-white font-semibold text-lg md:text-xl">
                      Cher public, ce programme qui présente de nouvelles ambitions en
                      regard de l'an dernier, ne pourra être concrétisé sans votre
                      concours.
                    </p>
                    <p>
                      A cette fin, nous mettons en œuvre une forme de financement participatif via
                      notre site web. La raison en est que notre premier et très important mécène
                      depuis des années n'est plus en mesure de nous soutenir.
                    </p>
                    <p>
                      Si vous nous l'accordez, votre soutien financier, fera l'objet d'une
                      défiscalisation car le festival est juridiquement porté par une association loi
                      1901 reconnue d'intérêt général. Vous trouverez en cliquant sur le bouton
                      ci-dessous les explications sur la manière de procéder.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/soutenir"
                      className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-base"
                      style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                    >
                      <Heart className="w-5 h-5" />
                      Soutenir Jazz en Tech 2026
                    </Link>
                  </div>
                </div>

                {/* Pourquoi soutenir */}
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Music className="w-5 h-5 text-jazz-gold flex-shrink-0" />
                    Pourquoi soutenir Jazz en Tech
                  </h2>
                  <ul className="space-y-4 text-stone-200 leading-relaxed text-base md:text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-jazz-gold mt-1 flex-shrink-0">◆</span>
                      <p>
                        Parce que Jazz en Tech veut vous offrir, année après année, une
                        programmation exigeante, éclectique, portée par des artistes nationaux et
                        internationaux de très haut niveau.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-jazz-gold mt-1 flex-shrink-0">◆</span>
                      <p>
                        Parce que nous voulons continuer à vous proposer des concerts à prix
                        abordables, restant accessibles au plus grand nombre.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-jazz-gold mt-1 flex-shrink-0">◆</span>
                      <p>
                        Parce que notre objectif est et sera de vous offrir toujours mieux, et qu'au-delà
                        du jazz et du spectacle vivant, Jazz en Tech se veut un festival humaniste,
                        écoresponsable, respectueux de l'environnement, soutenant l'égalité homme
                        femme et s'associant à la lutte contre toutes violences et exclusions.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-jazz-gold mt-1 flex-shrink-0">◆</span>
                      <p>
                        Parce qu'enfin, cette année, nous souhaitons vous offrir un festival grandiose,
                        inédit, pour fêter avec vous le centième anniversaire de la naissance de deux
                        géants du jazz, Miles Davis et John Coltrane.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-jazz-gold mt-1 flex-shrink-0">◆</span>
                      <p>
                        Toute l'équipe de Jazz en Tech vous remercie très sincèrement par avance
                        de votre précieux soutien.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Signature */}
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-jazz-red rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      AB
                    </div>
                    <div>
                      <p className="font-bold text-white">Alain Brunet</p>
                      <p className="text-sm" style={{ color: '#d4af37' }}>Président de Jazz en Tech</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-4 md:space-y-6">

                  {/* Dates */}
                  <div
                    className="rounded-2xl p-4 md:p-6"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-jazz-gold" />
                      Programme 2026
                    </h3>
                    <div className="space-y-3 text-sm max-h-80 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-700/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {[
                        { date: 'Dim. 26 juil.', titre: 'Cecil L. Recchia Quintet', desc: 'Saint-Génis · sings Django Reinhardt' },
                        { date: 'Lun. 27 juil.', titre: 'Knobil Trio', desc: 'Saint-Génis · Chanson et Jazz pailleté' },
                        { date: 'Mer. 5 août', titre: 'Erik Truffaz & Antonio Lizana', desc: 'Hommage Miles Davis — New Sketches of Spain' },
                        { date: 'Jeu. 6 août', titre: 'Dal Sasso Big Band', desc: 'Hommage John Coltrane — Africa Brass Revisited' },
                        { date: 'Ven. 7 août', titre: 'Ladyva & Barcelona Big Blues Band', desc: 'Boogie-Woogie & grands standards' },
                        { date: 'Sam. 8 août', titre: 'Akpé Motion featuring Karla Harris', desc: 'Hommage Miles Davis — « Électric Miles »' },
                      ].map((c, i) => (
                        <div key={i} className="rounded-lg p-3" style={{ backgroundColor: 'rgba(212,175,55,0.07)' }}>
                          <p className="font-bold text-jazz-gold text-xs">{c.date} — 21h</p>
                          <p className="text-white font-semibold text-xs mt-0.5">{c.titre}</p>
                          <p className="text-stone-400 text-xs mt-0.5">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lieu */}
                  <div
                    className="rounded-2xl p-4 md:p-6"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-jazz-gold" />
                      Lieu
                    </h3>
                    <p className="text-sm" style={{ color: '#f7f3e9' }}>Céret, Pyrénées-Orientales</p>
                  </div>

                  {/* Déduction fiscale */}
                  <div
                    className="rounded-2xl p-4 md:p-6 text-center"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <div className="text-4xl font-bold text-jazz-gold mb-1">66%</div>
                    <p className="text-white text-sm font-semibold mb-2">de déduction fiscale</p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Un don de 100 € ne vous coûte réellement que 34 €
                      après déduction d'impôt (art. 200 du CGI).
                    </p>
                  </div>

                  {/* CTA soutenir */}
                  <div
                    className="text-white rounded-2xl p-4 md:p-6 text-center"
                    style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <h4 className="font-bold mb-2 text-sm">Soutenez le festival</h4>
                    <p className="text-xs text-warm-cream mb-4">
                      Chaque don contribue directement à la programmation artistique
                    </p>
                    <Link
                      href="/soutenir"
                      className="inline-block font-bold px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
                      style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                    >
                      Faire un don →
                    </Link>
                  </div>

                  {/* Billetterie */}
                  <div
                    className="rounded-2xl p-4 md:p-6"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                  >
                    <h4 className="font-bold text-white mb-3 text-sm">Réserver vos places</h4>
                    <p className="text-stone-400 text-xs mb-4">Concerts 5, 6, 7 et 8 août 2026 à Céret</p>
                    <Link
                      href="/billetterie"
                      className="block text-center border font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-jazz-noir transition-colors text-sm"
                      style={{ borderColor: '#d4af37', color: '#d4af37' }}
                    >
                      Voir la billetterie
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}