'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, MapPin, Clock } from 'lucide-react'
import branches from '@/data/branches.json'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const BranchesMap = dynamic(() => import('./BranchesMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-900/60 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-400/30 border-t-brand-400 animate-spin" />
    </div>
  ),
})

const tabContentVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '22%' : '-22%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-22%' : '22%', opacity: 0 }),
}

// ─── Mobile: tabbed accordion (unchanged) ──────────────────────────────────

function MobileBranches({ locale }: { locale: string }) {
  const t = useTranslations('branches')
  const regionOrder = Array.from(new Set(branches.map(b => b.region)))

  const [activeIdx, setActiveIdx]       = useState(0)
  const [direction, setDirection]       = useState(1)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  const switchTab = (idx: number) => {
    if (idx === activeIdx) return
    setDirection(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
    setExpandedCity(null)
  }

  const activeRegion   = regionOrder[activeIdx]
  const regionBranches = branches.filter(b => b.region === activeRegion && !b.comingSoon)

  return (
    <div className="md:hidden">
      {/* Region tabs */}
      <div className="relative flex gap-1.5 mb-6 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
        {regionOrder.map((key, idx) => {
          const text     = t(`region_${key}` as Parameters<typeof t>[0])
          const isActive = idx === activeIdx
          return (
            <button
              type="button"
              key={key}
              onClick={() => switchTab(idx)}
              className="relative flex-1 py-2.5 px-3 text-xs font-semibold text-center z-10 transition-colors duration-200 rounded-full"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-brand-400/15 border border-brand-400/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative transition-colors duration-200 tracking-wide ${isActive ? 'text-brand-300' : 'text-white/35'}`}>
                {text}
              </span>
            </button>
          )
        })}
      </div>

      {/* Sliding branch list */}
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeRegion}
            custom={direction}
            variants={tabContentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {regionBranches.map((branch, i) => {
              const cityName   = locale === 'ar' ? branch.cityAr : branch.city
              const address    = locale === 'ar' ? branch.addressAr : branch.address
              const isExpanded = expandedCity === branch.city

              return (
                <div
                  key={branch.city}
                  className={i < regionBranches.length - 1 ? 'border-b border-white/[0.06]' : ''}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedCity(isExpanded ? null : branch.city)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(37,99,235,0.7)]" />
                      <span className="font-display text-[1.2rem] leading-tight truncate text-white">
                        {cityName}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 ms-3 text-brand-400/60 font-light text-xl leading-none select-none"
                    >
                      +
                    </motion.div>
                  </button>

                  <div
                    className="overflow-hidden"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isExpanded ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.28s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className="pb-5 ps-[18px] space-y-3"
                        style={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s ease' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-3.5 h-3.5 text-brand-400/45 flex-shrink-0" strokeWidth={2} />
                          <span dir="ltr" className="font-sans text-sm text-brand-300/65 font-semibold tracking-widest">{branch.phone}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-400/45 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <p className="font-sans text-sm text-brand-100/55 leading-relaxed">{address}</p>
                        </div>
                        <div className="pt-1">
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-brand-400 border border-brand-400/20 rounded-full px-4 py-2 hover:bg-brand-400/10 transition-colors duration-200"
                          >
                            {t('open_maps')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main section ───────────────────────────────────────────────────────────

export default function BranchesSection() {
  const t      = useTranslations('branches')
  const locale = useLocale()

  const activeBranches    = branches.filter(b => !b.comingSoon)
  const comingSoonBranch  = branches.find(b => !!b.comingSoon) ?? null
  const [activeCity, setActiveCity] = useState<string | null>(null)

  return (
    <section id="branches" className="relative py-10 md:py-24 px-6 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-14 reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-normal leading-[1.1] mt-4 text-glow-soft">
              {t('title')}
            </h2>
          </div>
          <p className="font-sans text-brand-300/50 text-sm tracking-[0.12em] font-medium sm:mb-2 flex-shrink-0">
            {activeBranches.length} {t('label').toLowerCase()}
          </p>
        </div>

        {/* ── Mobile: accordion + small map ── */}
        <div className="md:hidden">
          <MobileBranches locale={locale} />
          <div className="mt-8 h-56 rounded-2xl overflow-hidden border border-white/8 shadow-[0_0_40px_rgba(37,99,235,0.05)]">
            <BranchesMap branches={activeBranches} activeCity={null} locale={locale} />
          </div>
        </div>

        {/* ── Desktop: branch cards + sticky map ── */}
        <div className="hidden md:grid md:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">

          {/* Left — branch card list */}
          <div className="space-y-3">
            {activeBranches.map((branch) => {
              const cityName = locale === 'ar' ? branch.cityAr : branch.city
              const address  = locale === 'ar' ? branch.addressAr : branch.address
              const isActive = activeCity === branch.city

              return (
                <button
                  key={branch.city}
                  type="button"
                  onClick={() => setActiveCity(isActive ? null : branch.city)}
                  className={`reveal group w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-brand-400/30 bg-brand-400/[0.06] shadow-[0_0_24px_rgba(37,99,235,0.08)]'
                      : 'border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Top row: city + region */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className={`font-display text-xl leading-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {cityName}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400/55 shrink-0 mt-1">
                      {t(`region_${branch.region}` as Parameters<typeof t>[0])}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className={`w-3 h-3 shrink-0 transition-colors duration-300 ${isActive ? 'text-brand-400/70' : 'text-brand-400/40'}`} strokeWidth={2} />
                    <span dir="ltr" className="font-sans text-sm text-brand-300/65 font-semibold tracking-widest">
                      {branch.phone}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className={`w-3 h-3 shrink-0 mt-0.5 transition-colors duration-300 ${isActive ? 'text-brand-400/70' : 'text-brand-400/40'}`} strokeWidth={2} />
                    <span className="font-sans text-xs text-brand-100/50 leading-relaxed">{address}</span>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-brand-400/15 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse flex-shrink-0" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400/50 animate-pulse flex-shrink-0" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400/25 animate-pulse flex-shrink-0" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </button>
              )
            })}

            {comingSoonBranch && (
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border-2 border-dashed border-white/8 bg-white/[0.01]">
                <Clock className="w-4 h-4 text-white/25 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-white/50 text-sm font-medium">
                    {locale === 'ar' ? comingSoonBranch.cityAr : comingSoonBranch.city}
                  </p>
                  <p className="font-sans text-white/25 text-xs mt-0.5">{t('coming_soon')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — sticky map */}
          <div className="sticky top-24 h-[580px] rounded-2xl overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(37,99,235,0.06)]">
            <BranchesMap branches={activeBranches} activeCity={activeCity} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  )
}
