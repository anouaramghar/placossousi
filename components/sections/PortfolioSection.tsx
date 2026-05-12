'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MapPin, ZoomIn } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'platre-salon',
    categoryKey: 'platre',
    image: '/images/portfolio/platre-salon.jpg',
    city: 'Nador',
    surface: '85 m²',
    titleKey: 'project_platre_salon_title',
    descKey: 'project_platre_salon_desc',
  },
  {
    id: 'platre-chambre',
    categoryKey: 'platre',
    image: '/images/portfolio/platre-chambre.jpg',
    city: 'Beni Ansar',
    surface: '42 m²',
    titleKey: 'project_platre_chambre_title',
    descKey: 'project_platre_chambre_desc',
  },
  {
    id: 'peinture-salon',
    categoryKey: 'peinture',
    image: '/images/portfolio/peinture-salon.jpg',
    city: 'Nador',
    surface: '120 m²',
    titleKey: 'project_peinture_salon_title',
    descKey: 'project_peinture_salon_desc',
  },
  {
    id: 'peinture-facade',
    categoryKey: 'peinture',
    image: '/images/portfolio/peinture-facade.jpg',
    city: 'Arrid',
    surface: '200 m²',
    titleKey: 'project_peinture_facade_title',
    descKey: 'project_peinture_facade_desc',
  },
  {
    id: 'pasta-salon',
    categoryKey: 'pasta',
    image: '/images/portfolio/pasta-salon.jpg',
    city: 'Nador',
    surface: '65 m²',
    titleKey: 'project_pasta_salon_title',
    descKey: 'project_pasta_salon_desc',
  },
  {
    id: 'armstrong-bureau',
    categoryKey: 'armstrong',
    image: '/images/portfolio/armstrong-bureau.jpg',
    city: 'Beni Ansar',
    surface: '300 m²',
    titleKey: 'project_armstrong_bureau_title',
    descKey: 'project_armstrong_bureau_desc',
  },
]

const CATEGORIES = ['all', 'platre', 'peinture', 'pasta', 'armstrong'] as const

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  project,
  onClose,
  t,
}: {
  project: (typeof projects)[0]
  onClose: () => void
  t: ReturnType<typeof useTranslations<'portfolio'>>
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl glass-card rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full aspect-video">
          <Image
            src={project.image}
            alt={t(project.titleKey as Parameters<typeof t>[0])}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="section-label mb-3 block">
                {t(project.categoryKey as Parameters<typeof t>[0])}
              </span>
              <h3 className="font-display text-white text-2xl leading-snug mb-2">
                {t(project.titleKey as Parameters<typeof t>[0])}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t(project.descKey as Parameters<typeof t>[0])}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-1">
                {t('surface')}
              </p>
              <p className="text-white font-display text-2xl">{project.surface}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-brand-300/70 text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.city}</span>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
          aria-label={t('close')}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
  t,
}: {
  project: (typeof projects)[0]
  index: number
  onClick: () => void
  t: ReturnType<typeof useTranslations<'portfolio'>>
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={t(project.titleKey as Parameters<typeof t>[0])}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={t(project.titleKey as Parameters<typeof t>[0])}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 start-3">
          <span className="px-3 py-1 rounded-full bg-brand-900/80 backdrop-blur-sm border border-brand-400/30 text-brand-300 text-[10px] font-bold uppercase tracking-widest">
            {t(project.categoryKey as Parameters<typeof t>[0])}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="p-4">
        <h3 className="font-display text-white text-lg leading-snug mb-1 group-hover:text-brand-300 transition-colors duration-300">
          {t(project.titleKey as Parameters<typeof t>[0])}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>{project.city}</span>
          </div>
          <span className="text-brand-300/70 text-xs font-semibold">{project.surface}</span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function PortfolioSection() {
  const t = useTranslations('portfolio')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxProject, setLightboxProject] = useState<(typeof projects)[0] | null>(null)

  const filtered =
    activeCategory === 'all' ? projects : projects.filter(p => p.categoryKey === activeCategory)

  return (
    <section id="portfolio" className="relative py-16 md:py-28 px-6 z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="section-label inline-block mb-4">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2rem,5vw,3.8rem)] tracking-normal leading-[1.1] mb-4 text-glow-soft">
            {t('title')}
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-400 border-brand-400 text-white shadow-[0_0_24px_rgba(37,99,235,0.45)]'
                  : 'btn-ghost border-white/10 text-white/60 hover:text-white'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {t(cat as Parameters<typeof t>[0])}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setLightboxProject(project)}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>


      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <Lightbox
            project={lightboxProject}
            onClose={() => setLightboxProject(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
