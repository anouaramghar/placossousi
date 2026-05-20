'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { MapPin, X } from 'lucide-react'

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

type TPortfolio = ReturnType<typeof useTranslations<'portfolio'>>

// ─── Lightbox — bottom sheet on mobile, centered modal on desktop ─────────────
function Lightbox({
  project,
  onClose,
  t,
}: {
  project: (typeof projects)[0]
  onClose: () => void
  t: TPortfolio
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  // Keep the ref current without re-running the stable effect
  useEffect(() => {
    onCloseRef.current = onClose
  })

  const titleId = `lightbox-title-${project.id}`
  const modalId = `lightbox-modal-${project.id}`

  // Stable effect — runs once on mount, cleans up on unmount only
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    closeRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key === 'Tab') {
        const modal = document.getElementById(modalId)
        if (!modal) return
        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled'))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [modalId])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        id={modalId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full sm:max-w-2xl bg-brand-850 sm:rounded-3xl rounded-t-3xl overflow-hidden border border-white/8 shadow-[0_-8px_48px_rgba(0,0,0,0.6)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        style={{ background: 'var(--color-brand-850)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        <div className="relative w-full aspect-video">
          <Image
            src={project.image}
            alt={t(project.titleKey as Parameters<typeof t>[0])}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-850 via-brand-900/25 to-transparent"
            style={{ '--tw-gradient-from': 'var(--color-brand-850)' } as React.CSSProperties}
          />
          <span className="absolute top-4 ltr:right-5 rtl:left-5 font-display text-white/20 text-4xl leading-none tabular-nums">
            {String(projects.findIndex(p => p.id === project.id) + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <span className="section-label mb-3 block">
                {t(project.categoryKey as Parameters<typeof t>[0])}
              </span>
              <h3 id={titleId} className="font-display text-white text-xl sm:text-2xl leading-snug">
                {t(project.titleKey as Parameters<typeof t>[0])}
              </h3>
            </div>
            <div className="text-end shrink-0">
              <p className="font-sans text-brand-300/80 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">
                {t('surface')}
              </p>
              <p className="font-display text-white text-2xl">{project.surface}</p>
            </div>
          </div>

          <p className="font-sans text-brand-100/55 text-sm leading-relaxed border-t border-white/6 pt-4">
            {t(project.descKey as Parameters<typeof t>[0])}
          </p>

          <div className="mt-4 flex items-center gap-2 text-brand-300/70 text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.city}</span>
          </div>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-brand-900/80 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
          aria-label={t('close')}
        >
          <X className="w-4 h-4" />
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
  t: TPortfolio
}) {
  const delayClasses = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6']

  return (
    <div
      className={`reveal ${delayClasses[index % 6]} rounded-2xl overflow-hidden border border-white/8 bg-brand-900/40 cursor-pointer group active:scale-[0.985] transition-transform duration-150`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={t(project.titleKey as Parameters<typeof t>[0])}
    >
      {/* Image */}
      <div className="relative w-full aspect-video sm:aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={t(project.titleKey as Parameters<typeof t>[0])}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Theme-consistent gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/25 to-transparent" />

        {/* Corner number (like services section) */}
        <span className="absolute top-3 ltr:right-4 rtl:left-4 font-display text-white/20 text-3xl leading-none tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category badge */}
        <div className="absolute top-3 start-3">
          <span className="px-2.5 py-1 rounded-full bg-brand-900/70 border border-white/10 text-brand-300/90 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
            {t(project.categoryKey as Parameters<typeof t>[0])}
          </span>
        </div>

        {/* Bottom info — always visible on mobile, enhanced on hover for desktop */}
        <div className="absolute bottom-0 inset-x-0 p-4">
          <h3 className="font-sans text-white text-sm sm:text-base font-medium leading-snug line-clamp-2 tracking-[-0.01em]">
            {t(project.titleKey as Parameters<typeof t>[0])}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5 text-brand-100/55 text-xs">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{project.city}</span>
            </div>
            <span className="font-sans text-brand-300/80 text-xs font-semibold">{project.surface}</span>
          </div>
        </div>
      </div>
    </div>
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
    <section id="portfolio" className="relative py-10 md:py-24 px-6 z-10 overflow-hidden">
      {/* Background tint — matches other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* Header — uses reveal class like About / Services */}
        <div className="reveal mb-8 md:mb-14">
          <span className="section-label">{t('label')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] text-glow-soft">
              {t('title')}
            </h2>
            <div className="mt-4 md:mt-0 md:mb-3 inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 self-start">
              <span className="font-sans text-brand-200/80 text-sm tracking-wide font-medium">
                {filtered.length} {t('label').toLowerCase()}
              </span>
            </div>
          </div>
          <p className="font-sans text-brand-100/55 text-base mt-4 max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter pills — horizontal scroll on mobile */}
        <div className="reveal mb-8 md:mb-12">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:flex-wrap sm:overflow-visible">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap flex-shrink-0 border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-400/20 border-brand-400/50 text-brand-300 shadow-[0_0_16px_rgba(37,99,235,0.2)]'
                    : 'bg-white/5 border-white/10 text-brand-200/60 hover:text-brand-200/90 hover:bg-white/8'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {t(cat as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        {/* Divider — matches services section style */}
        <div className="border-t border-white/10 mb-8 md:mb-10" />

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
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
