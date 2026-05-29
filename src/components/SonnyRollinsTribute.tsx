// PATH: src/components/SonnyRollinsTribute.tsx
export default function SonnyRollinsTribute() {
  return (
    <section
      aria-labelledby="sonny-tribute-heading"
      className="container mx-auto px-4 py-12 md:py-16"
    >
      <article
        className="relative rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        style={{
          backgroundColor: 'rgba(26, 26, 26, 0.55)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <header className="mb-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: '#d4af37' }}
          >
            Hommage
          </p>
          <h3
            id="sonny-tribute-heading"
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Adresse à Sonny Rollins
          </h3>
          <p
            className="mt-2 text-sm"
            style={{ color: '#f7f3e9', opacity: 0.85 }}
          >
            disparu le 25 mai 2026
          </p>
        </header>

        <div
          className="leading-relaxed space-y-5"
          style={{ color: '#f7f3e9' }}
        >
          <p className="font-semibold">Cher Theodore Walter,</p>
          <p>
            Un jour, cela s&apos;est imposé et tu es devenu, «&nbsp;Sonny&nbsp;».
            C&apos;est ainsi que nous te connaissons. Mais je sais que dès le
            premier jour, la musique, le jazz, les mélodies et les traditions
            venues du Sud ou du Nord, étaient en toi. Et que non seulement cela
            mais que tu savais les réinventer comme personne ! Absolument
            personne.
          </p>
          <p>
            C&apos;est toujours avec émotion que je me souviens du 6 juillet
            1974. C&apos;était, t&apos;en souviens-tu, à Juan-les-Pins. Dans la
            Pinède Gould que les musiciens, les Américains, peut-être encore
            plus que les Français ou ceux des autres pays du vieux continent
            appréciaient infiniment. Ce soir-là tu étais accompagné par ton ami
            d&apos;alors Rufus Harley. Toi, joueur de ténor, lui de cornemuse !
            Je me demandais bien comment cet instrument allait vivre en quelque
            sorte auprès de toi, du jazz : allait-on vivre un moment un peu
            brutal comme quelques-uns les affectionnaient alors ? Il fallu
            quelques notes seulement pour comprendre que, sous ton impulsion, on
            pouvait entendre, non pas le meilleur jazz seulement, mais toute la
            musique de la Terre tout entière. Et puis, grâce à toi, à Rufus, à
            Mtume (perc), Stanley Cowell (p), Bob Cranshaw (b), David Lee (dm)
            et Masuo (guitare). Ce fut la fête. Et même le Carnaval ne cessa
            jamais... tooute la nuit nous aurions pu danser. Et, oui, nous
            étions nombreux et nombreuses à danser. Salut à toi Theodore, et
            grand merci pour tout ce que tu fais encore, au fond de nous. Ce
            qui ne cessera jamais, n&apos;est-ce pas ?
          </p>
          <p
            className="text-right font-semibold pt-2"
            style={{ color: '#d4af37' }}
          >
            Alain Brunet
          </p>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}
        >
          <p
            className="text-sm font-medium text-center sm:text-left"
            style={{ color: '#f7f3e9', opacity: 0.9 }}
          >
            La leçon de Sonny Rollins en 1981
          </p>
          <a
            href="https://www.instagram.com/reel/DU-10xpE6Am/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
            aria-label="Visionner la leçon de Sonny Rollins en 1981 sur Instagram (nouvel onglet)"
          >
            <span aria-hidden="true">▶</span>
            <span>Visionner la vidéo</span>
          </a>
        </div>
      </article>
    </section>
  )
}
