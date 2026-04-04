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
                <div className="inline-block bg-jazz-gold text-jazz-noir px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm mb-4"
                  style={{ color: '#1a1a1a' }}>
                  🎺 11ème édition — 2026
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white">
                  Mot du Président
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-warm-cream leading-relaxed mb-4 md:mb-6">
                  Onze ans de passion pour le jazz dans les Pyrénées-Orientales.
                  Cette édition 2026 rend hommage à deux géants dont nous célébrons le centenaire
                  de la naissance : Miles Davis et John Coltrane.
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
                    src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/v1757764875/alain-brunet_gb0jx1.jpg"
                    alt="Alain Brunet, Président de Jazz en Tech"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-jazz-gold rounded-full flex items-center justify-center font-bold text-xs md:text-sm"
                    style={{ color: '#1a1a1a' }}>
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

      {/* Lettre du président */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block px-4 py-2 rounded-full font-bold text-sm mb-4"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                ✉️ Message d'Alain Brunet
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Festival Jazz en Tech — 11ème édition
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">

                {/* Texte principal */}
                <div className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                    <Star className="w-5 h-5 md:w-6 md:h-6 mr-3 text-jazz-gold" />
                    Une édition anniversaire
                  </h3>
                  <div className="space-y-4 md:space-y-5 text-stone-200 leading-relaxed">
                    <p className="text-base md:text-lg">Chères amies, chers amis,</p>
                    <p className="text-base md:text-lg">
                      C'est avec une immense fierté et une grande émotion que je vous convie à la
                      <strong className="text-white"> 11ème édition de Jazz en Tech</strong>, qui se tiendra
                      les <strong className="text-white">5, 6, 7 et 8 août 2026</strong> à Céret,
                      au cœur des Pyrénées-Orientales.
                    </p>
                    <p className="text-base md:text-lg">
                      Cette édition revêt une signification particulière : en 2026, nous célébrons le
                      <strong className="text-white"> centenaire de la naissance de deux titans du jazz</strong> —
                      <strong className="text-jazz-gold"> Miles Davis</strong> (26 mai 1926) et
                      <strong className="text-jazz-gold"> John Coltrane</strong> (23 septembre 1926).
                      Ces deux géants ont révolutionné la musique du XXème siècle et leur héritage
                      continue d'irriguer le jazz contemporain. Jazz en Tech leur rendra un hommage
                      digne de leur immense contribution à la musique mondiale.
                    </p>
                    <p className="text-base md:text-lg">
                      Après dix éditions couronnées de succès, notre festival s'est imposé comme
                      un rendez-vous incontournable de l'été culturel en Occitanie. Nous avons su
                      créer un espace unique où excellence artistique et convivialité se conjuguent
                      dans le cadre exceptionnel de Céret.
                    </p>
                  </div>
                </div>

                {/* Hommage Miles & Coltrane */}
                <div className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                    <Music className="w-5 h-5 md:w-6 md:h-6 mr-3 text-jazz-gold" />
                    Hommage au centenaire
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-xl p-5"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                      <div className="text-3xl mb-3">🎺</div>
                      <h4 className="font-bold text-white text-lg mb-2">Miles Davis</h4>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        26 mai 1926 — 28 septembre 1991.
                        Le « Prince des Ténèbres » a sans cesse réinventé le jazz,
                        du bebop au jazz modal, du cool jazz au jazz fusion.
                        <em className="text-jazz-gold"> Kind of Blue</em>,
                        <em className="text-jazz-gold"> Bitches Brew</em>…
                        son œuvre demeure une boussole pour les musiciens du monde entier.
                      </p>
                    </div>
                    <div className="rounded-xl p-5"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                      <div className="text-3xl mb-3">🎷</div>
                      <h4 className="font-bold text-white text-lg mb-2">John Coltrane</h4>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        23 septembre 1926 — 17 juillet 1967.
                        « Trane » a poussé le saxophone et l'improvisation jazz à leurs
                        limites absolues avec une quête spirituelle sans pareille.
                        <em className="text-jazz-gold"> A Love Supreme</em> reste
                        l'une des œuvres les plus transcendantes de la musique moderne.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appel au soutien */}
                <div className="text-white rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                    Un appel à votre soutien
                  </h3>
                  <div className="space-y-4 text-warm-cream leading-relaxed">
                    <p className="text-base md:text-lg">
                      Je dois vous faire part d'une réalité : notre mécène principal, qui nous
                      accompagnait fidèlement depuis plusieurs années, ne pourra pas renouveler
                      son soutien pour cette édition. Cette situation nous oblige à mobiliser
                      l'ensemble de notre réseau de donateurs et de partenaires.
                    </p>
                    <p className="text-base md:text-lg">
                      Jazz en Tech est une association à but non lucratif, animée par des bénévoles
                      passionnés. Sans votre soutien, il nous serait impossible de maintenir le
                      niveau d'exigence artistique qui fait la réputation de notre festival.
                      Chaque don, quel qu'en soit le montant, contribue directement à la réalisation
                      de cette 11ème édition.
                    </p>
                    <p className="text-base md:text-lg">
                      En tant que donateur, vous bénéficiez d'une
                      <strong className="text-jazz-gold"> déduction fiscale de 66 %</strong> sur vos impôts
                      (Jazz en Tech est reconnue association d'intérêt général).
                      Et en contrepartie de votre générosité, nous avons prévu des avantages exclusifs
                      à chaque palier de don.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/soutenir"
                      className="inline-flex items-center gap-2 bg-jazz-gold font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-base"
                      style={{ color: '#1a1a1a' }}
                    >
                      <Heart className="w-5 h-5" />
                      Soutenir Jazz en Tech 2026
                    </Link>
                  </div>
                </div>

                {/* Clôture */}
                <div className="rounded-2xl p-6 md:p-8"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <div className="space-y-4 text-stone-200 leading-relaxed">
                    <p className="text-base md:text-lg">
                      Je remercie chaleureusement tous ceux qui nous font confiance depuis onze ans :
                      la Mairie de Céret, son service culture et ses services techniques,
                      la Région Occitanie, le Département des Pyrénées-Orientales, la Spedidam,
                      nos bénévoles toujours au rendez-vous, et bien sûr vous,
                      fidèles festivaliers qui donnez son sens à l'aventure Jazz en Tech.
                    </p>
                    <p className="text-base md:text-lg">
                      À très bientôt sous les étoiles de Céret.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white border-opacity-20 flex items-center space-x-4">
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

                  <div className="rounded-2xl p-4 md:p-6"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-jazz-gold" />
                      Édition 2026
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm">Dates</span>
                        </div>
                        <div className="ml-6 text-sm" style={{ color: '#f7f3e9' }}>5, 6, 7 et 8 août 2026</div>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <MapPin className="w-4 h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm">Lieu</span>
                        </div>
                        <div className="ml-6 text-sm" style={{ color: '#f7f3e9' }}>Céret, Pyrénées-Orientales</div>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <Star className="w-4 h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm">Hommage</span>
                        </div>
                        <div className="ml-6 text-sm" style={{ color: '#f7f3e9' }}>
                          <div>🎺 Miles Davis (1926–1991)</div>
                          <div className="mt-1">🎷 John Coltrane (1926–1967)</div>
                          <div className="mt-1 text-xs text-stone-400">Centenaire de leur naissance</div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <Users className="w-4 h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm">Association</span>
                        </div>
                        <div className="ml-6 text-sm" style={{ color: '#f7f3e9' }}>Loi 1901 — d'intérêt général</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 md:p-6 text-center"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <div className="text-4xl font-bold text-jazz-gold mb-1">66%</div>
                    <p className="text-white text-sm font-semibold mb-2">de déduction fiscale</p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Un don de 100 € ne vous coûte réellement que 34 €
                      après déduction d'impôt (art. 200 du CGI).
                    </p>
                  </div>

                  <div className="text-white rounded-2xl p-4 md:p-6 text-center"
                    style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <h4 className="font-bold mb-2 text-sm">Soutenez le festival</h4>
                    <p className="text-xs text-warm-cream mb-4">
                      Chaque don contribue directement à la programmation artistique
                    </p>
                    <Link
                      href="/soutenir"
                      className="inline-block bg-jazz-gold font-bold px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
                      style={{ color: '#1a1a1a' }}
                    >
                      Faire un don →
                    </Link>
                  </div>

                  <div className="rounded-2xl p-4 md:p-6"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
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