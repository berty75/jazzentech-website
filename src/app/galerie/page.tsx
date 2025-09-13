// src/app/galerie/page.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Camera, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Link from 'next/link'

// Données des photos complètes - AVEC URLs CLOUDINARY
const photos = [
    // Charlotte Planchou (6 photos)
    {
      id: 1,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767209/2025_C%C3%A9ret_Charlotte_Planchou_01___Jacques_Martinez_tfkeua.jpg',
      alt: 'Charlotte Planchou en concert à Céret - Jazz en Tech 2025',
      category: 'artistes',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Charlotte Planchou - Quartet en concert'
    },
    {
      id: 2,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767206/2025_C%C3%A9ret_Charlotte_Planchou_03___Jacques_Martinez_egmmcm.jpg',
      alt: 'Charlotte Planchou sur scène avec sa formation',
      category: 'artistes',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Charlotte Planchou - Performance scénique'
    },
    {
      id: 3,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767203/2025_C%C3%A9ret_Charlotte_Planchou_04___Jacques_Martinez_rrmxj6.jpg',
      alt: 'Charlotte Planchou - Moment musical intense',
      category: 'artistes',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Charlotte Planchou - Expression musicale'
    },
    {
      id: 4,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767201/2025_C%C3%A9ret_Charlotte_Planchou_08___Jacques_Martinez_heeua6.jpg',
      alt: 'Charlotte Planchou et ses musiciens - Salut final',
      category: 'ambiance',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Salut final de Charlotte Planchou et sa formation'
    },
    {
      id: 5,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767198/2025_C%C3%A9ret_Charlotte_Planchou_10___Jacques_Martinez_c17nc2.jpg',
      alt: 'Charlotte Planchou - Performance vocale',
      category: 'artistes',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Charlotte Planchou - Interprétation vocale'
    },
    {
      id: 6,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767196/2025_C%C3%A9ret_Charlotte_Planchou_13___Jacques_Martinez_luh75w.jpg',
      alt: 'Charlotte Planchou - Energie sur scène',
      category: 'artistes',
      artist: 'Charlotte Planchou',
      year: 2025,
      caption: 'Charlotte Planchou - Énergie communicative'
    },
  
    // Jacky Terrasson et Camille Bertault (8 photos)
    {
      id: 7,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767214/2025_C%C3%A9ret_Concert_Jacky_Terrasson_01_Jacques_Martinez_copie_a8v8qf.jpg',
      alt: 'Jacky Terrasson et Camille Bertault - Moment de complicité',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Jacky Terrasson et Camille Bertault - Duo exceptionnel'
    },
    {
      id: 8,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767191/2025_C%C3%A9ret_Concert_Jacky_Terrasson_03___Jacques_Martinez_yfa7lk.jpg',
      alt: 'Jacky Terrasson au piano - Concentration musicale',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Jacky Terrasson - Trio "Moving On"'
    },
    {
      id: 9,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767181/2025_C%C3%A9ret_Concert_Jacky_Terrasson_Camille_Bertault_02___Jacques_Martinez_sguc02.jpg',
      alt: 'Camille Bertault en performance vocale',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Camille Bertault - Virtuosité vocale'
    },
    {
      id: 10,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767187/2025_C%C3%A9ret_Concert_Jacky_Terrasson_05___Jacques_Martinez_isbbor.jpg',
      alt: 'Jacky Terrasson - Passion au piano',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Jacky Terrasson - Intensité pianistique'
    },
    {
      id: 11,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767186/2025_C%C3%A9ret_Concert_Jacky_Terrasson_08___Jacques_Martinez_kfvfd7.jpg',
      alt: 'Jacky Terrasson Trio - Vue de la scène',
      category: 'lieux',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Vue de la scène Place de la République'
    },
    {
      id: 12,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767184/2025_C%C3%A9ret_Concert_Jacky_Terrasson_09___Jacques_Martinez_xt0edk.jpg',
      alt: 'Jacky Terrasson - Présentation du concert',
      category: 'ambiance',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Présentation avant le concert'
    },
    {
      id: 13,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767177/2025_C%C3%A9ret_Concert_Jacky_Terrasson_Camille_Bertault_07___Jacques_Martinez_snwiyn.jpg',
      alt: 'Camille Bertault - Performance scénique',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Camille Bertault - Élégance sur scène'
    },
    {
      id: 14,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767179/2025_C%C3%A9ret_Concert_Jacky_Terrasson_Camille_Bertault_03___Jacques_Martinez_p7eikc.jpg',
      alt: 'Camille Bertault - Expression artistique',
      category: 'artistes',
      artist: 'Jacky Terrasson',
      year: 2025,
      caption: 'Camille Bertault - Expression unique'
    },
  
    // Florin Gugulica Sextet (6 photos) - J'ai utilisé les URLs que vous avez fournies
    {
      id: 15,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767157/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__00___Jacques_Martinez_eqvh7k.jpg',
      alt: 'Florin Gugulica Sextet dans le cloître de Saint-Génis',
      category: 'lieux',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Florin Gugulica Sextet - Cloître de Saint-Génis'
    },
    {
      id: 16,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767154/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__03___Jacques_Martinez_f7s96a.jpg',
      alt: 'Florin Gugulica Sextet - Ambiance intimiste',
      category: 'artistes',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Florin Gugulica Sextet - Formation complète'
    },
    {
      id: 17,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767152/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__12___Jacques_Martinez_gs6der.jpg',
      alt: 'Florin Gugulica Sextet - Éclairage magique',
      category: 'ambiance',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Atmosphère magique du cloître'
    },
    {
      id: 18,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767150/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__14___Jacques_Martinez_c3obaw.jpg',
      alt: 'Florin Gugulica Sextet - Moment musical',
      category: 'artistes',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Florin Gugulica Sextet - Concentration musicale'
    },
    {
      id: 19,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767148/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__17___Jacques_Martinez_r1cfaw.jpg',
      alt: 'Florin Gugulica Sextet - Architecture historique',
      category: 'lieux',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Jazz et patrimoine historique'
    },
    {
      id: 20,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767144/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__18___Jacques_Martinez_ba1tkq.jpg',
      alt: 'Florin Gugulica Sextet - Salut des musiciens',
      category: 'ambiance',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Salut final sous les applaudissements'
    },
    {
      id: 21,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767143/2025_St_G%C3%A9nis_des_Fontaines_Florin_Guguliaca_Sextet__20___Jacques_Martinez_wrtean.jpg',
      alt: 'Florin Gugulica Sextet - Performance collective',
      category: 'artistes',
      artist: 'Florin Gugulica',
      year: 2025,
      caption: 'Florin Gugulica Sextet - Harmonie collective'
    },
  
    // Stefano Di Battista (6 photos)
    {
      id: 22,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767174/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__03___Jacques_Martinez_oudzpv.jpg',
      alt: 'Stefano Di Battista au saxophone - La Dolce Vita',
      category: 'artistes',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Stefano Di Battista - "La Dolce Vita"'
    },
    {
      id: 23,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767171/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__04___Jacques_Martinez_bjnskt.jpg',
      alt: 'Stefano Di Battista - Performance passionate',
      category: 'artistes',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Stefano Di Battista - Passion italienne'
    },
    {
      id: 24,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767167/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__05___Jacques_Martinez_ue4y5u.jpg',
      alt: 'Stefano Di Battista - Virtuosité au saxophone',
      category: 'artistes',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Stefano Di Battista - Virtuosité italienne'
    },
    {
      id: 25,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767164/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__06___Jacques_Martinez_lr5jsv.jpg',
      alt: 'Stefano Di Battista - Complicité musicale',
      category: 'ambiance',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Complicité entre les musiciens'
    },
    {
      id: 26,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767161/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__18___Jacques_Martinez_h0v6wp.jpg',
      alt: 'Stefano Di Battista - Jazz italien à Céret',
      category: 'artistes',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Stefano Di Battista - Jazz italien à Céret'
    },
    {
      id: 27,
      src: 'https://res.cloudinary.com/dpgfensnv/image/upload/v1757767159/2025_C%C3%A9ret_St%C3%A9fano_Di_Battista__20___Jacques_Martinez_delmn9.jpg',
      alt: 'Stefano Di Battista - Place de la République',
      category: 'lieux',
      artist: 'Stefano Di Battista',
      year: 2025,
      caption: 'Place de la République sous les étoiles'
    }
  ]

const categories = [
  { key: 'all', label: 'Toutes les photos', count: photos.length },
  { key: 'artistes', label: 'Artistes', count: photos.filter(p => p.category === 'artistes').length },
  { key: 'ambiance', label: 'Ambiance', count: photos.filter(p => p.category === 'ambiance').length },
  { key: 'lieux', label: 'Lieux', count: photos.filter(p => p.category === 'lieux').length }
]

const artists = [
  { key: 'all', label: 'Tous les artistes', count: photos.length },
  { key: 'Charlotte Planchou', label: 'Charlotte Planchou', count: photos.filter(p => p.artist === 'Charlotte Planchou').length },
  { key: 'Jacky Terrasson', label: 'Jacky Terrasson', count: photos.filter(p => p.artist === 'Jacky Terrasson').length },
  { key: 'Florin Gugulica', label: 'Florin Gugulica', count: photos.filter(p => p.artist === 'Florin Gugulica').length },
  { key: 'Stefano Di Battista', label: 'Stefano Di Battista', count: photos.filter(p => p.artist === 'Stefano Di Battista').length }
]

export default function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArtist, setSelectedArtist] = useState('all')
  const [lightboxImage, setLightboxImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredPhotos = photos.filter(photo => {
    const categoryMatch = selectedCategory === 'all' || photo.category === selectedCategory
    const artistMatch = selectedArtist === 'all' || photo.artist === selectedArtist
    return categoryMatch && artistMatch
  })

  const openLightbox = (photo, index) => {
    setLightboxImage(photo)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredPhotos.length
    setLightboxImage(filteredPhotos[nextIndex])
    setCurrentImageIndex(nextIndex)
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredPhotos.length - 1 : currentImageIndex - 1
    setLightboxImage(filteredPhotos[prevIndex])
    setCurrentImageIndex(prevIndex)
  }

  // Gestion des touches clavier
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeLightbox()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [lightboxImage, currentImageIndex, filteredPhotos])

  return (
    <div className="min-h-screen bg-white">
      <title>Galerie Photos - Jazz en Tech 2025</title>
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Les concerts de l'édition 2025 en images
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4" style={{ color: '#f7f3e9' }}>
              L'édition 2025, qui célébrait les dix ans du festival, a réuni chaque soir des artistes d'exception, 
              qui ont fait de chaque soirée une fête. Musiciens de haut vol, chanteuses hors du commun et public conquis !
            </p>
            <p className="text-sm md:text-base mb-6" style={{ color: '#f7f3e9' }}>
              En voici quelques images.
            </p>
            <p className="text-sm font-medium" style={{ color: '#d4af37' }}>
              Photographies : <strong>© Jacques Martinez</strong>
            </p>
          </div>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Camera className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>{photos.length} photos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Filter className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>4 artistes</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Filtres par catégorie */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center" style={{ color: '#722f37' }}>
              <Camera className="w-6 h-6 inline mr-3" />
              Parcourir la galerie
            </h2>
            
            <div className="space-y-4">
              {/* Filtres par catégorie */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#722f37' }}>
                  Par catégorie
                </h3>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`px-3 md:px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.key ? 'shadow-lg' : 'hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === category.key ? '#722f37' : '#f3f4f6',
                        color: selectedCategory === category.key ? '#f7f3e9' : '#6b7280'
                      }}
                    >
                      {category.label}
                      <span 
                        className="ml-2 px-2 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: selectedCategory === category.key ? '#d4af37' : '#e5e7eb',
                          color: selectedCategory === category.key ? '#722f37' : '#6b7280'
                        }}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtres par artiste */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#722f37' }}>
                  Par artiste
                </h3>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {artists.map((artist) => (
                    <button
                      key={artist.key}
                      onClick={() => setSelectedArtist(artist.key)}
                      className={`px-3 md:px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedArtist === artist.key ? 'shadow-lg' : 'hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: selectedArtist === artist.key ? '#d4af37' : '#f8f9fa',
                        color: selectedArtist === artist.key ? '#722f37' : '#6b7280'
                      }}
                    >
                      {artist.label}
                      <span 
                        className="ml-2 px-2 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: selectedArtist === artist.key ? '#722f37' : '#e9ecef',
                          color: selectedArtist === artist.key ? '#f7f3e9' : '#6b7280'
                        }}
                      >
                        {artist.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compteur de photos filtrées */}
          <div className="text-center mb-6">
            <p className="text-sm" style={{ color: '#b87333' }}>
              {filteredPhotos.length} photo{filteredPhotos.length > 1 ? 's' : ''} trouvée{filteredPhotos.length > 1 ? 's' : ''}
            </p>
          </div>

{/* Grille de photos - Layout uniforme */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredPhotos.map((photo, index) => (
    <div
      key={photo.id}
      className="group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
      onClick={() => openLightbox(photo, index)}
    >
      <div className="relative h-64 w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        
        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center p-4">
            <Camera className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Cliquer pour agrandir</p>
          </div>
        </div>

        {/* Badge catégorie */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: photo.category === 'artistes' ? '#722f37' : 
                           photo.category === 'ambiance' ? '#d4af37' : '#b87333',
            color: photo.category === 'artistes' ? '#f7f3e9' : 
                  photo.category === 'ambiance' ? '#722f37' : '#f7f3e9'
          }}
        >
          {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
        </div>

        {/* Badge artiste */}
        <div 
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#f7f3e9'
          }}
        >
          {photo.artist}
        </div>
      </div>

      {/* Légende */}
      <div className="p-4" style={{ backgroundColor: 'rgba(247, 243, 233, 0.9)' }}>
        <p className="text-sm font-medium mb-1 h-10 overflow-hidden" style={{ color: '#722f37' }}>
          {photo.caption}
        </p>
        <p className="text-xs" style={{ color: '#b87333' }}>
          © Jacques Martinez - {photo.year}
        </p>
      </div>
    </div>
  ))}
</div>

{/* Message si aucune photo */}
{filteredPhotos.length === 0 && (
  <div className="text-center py-12">
    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#722f37' }} />
    <h3 className="text-xl font-bold mb-2" style={{ color: '#722f37' }}>
      Aucune photo trouvée
    </h3>
    <p className="text-gray-600">
      Aucune photo ne correspond à vos critères de filtrage
    </p>
  </div>
)}

{/* Bouton retour programmation */}
<div className="text-center mt-12 md:mt-16">
  <Link
    href="/programmation"
    className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
    style={{
      backgroundColor: '#722f37',
      color: '#f7f3e9'
    }}
  >
    Découvrir la programmation 2025
  </Link>
</div>
      </div>
    </div>

    {/* Lightbox Modal */}
    {lightboxImage && (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-6xl max-h-full">
          
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Bouton précédent */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Bouton suivant */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image principale */}
          <div className="relative">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Légende en bas */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6 rounded-b-lg"
              style={{ 
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <p className="text-white text-sm md:text-base font-medium mb-1">
                {lightboxImage.caption}
              </p>
              <p className="text-gray-300 text-xs md:text-sm">
                © Jacques Martinez - {lightboxImage.year} • {lightboxImage.artist}
              </p>
            </div>

            {/* Compteur */}
            <div 
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
            >
              {currentImageIndex + 1} / {filteredPhotos.length}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)
}