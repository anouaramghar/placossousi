'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, MapPin, ExternalLink, Clock, Plus } from 'lucide-react'
import branches from '@/data/branches.json'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const regionLabels: Record<string, { fr: string; ar: string }> = {
  oriental:   { fr: "Oriental",              ar: 'الشرق' },
  casablanca: { fr: 'Casablanca-Settat',     ar: 'الدار البيضاء سطات' },
}

const tabContentVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '22%' : '-22%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-22%' : '22%', opacity: 0 }),
}

// ─── Mobile: tabbed accordion ──────────────────────────────────────────────

function MobileBranches({ locale }: { locale: string }) {
  const t = useTranslations('branches')
  const regionOrder = Array.from(new Set(branches.map(b => b.region)))

  const [activeIdx, setActiveIdx]     = useState(0)
  const [direction, setDirection]     = useState(1)
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  const switchTab = (idx: number) => {
    if (idx === activeIdx) return
    setDirection(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
    setExpandedCity(null)
  }

  const activeRegion  = regionOrder[activeIdx]
  const regionBranches = branches.filter(b => b.region === activeRegion)

  return (
    <div className="md:hidden">
      {/* Region tabs */}
      <div className="relative flex gap-1.5 mb-6 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
        {regionOrder.map((key, idx) => {
          const label = regionLabels[key]
          const text  = label ? (locale === 'ar' ? label.ar : label.fr) : key
          const isActive = idx === activeIdx
          return (
            <button
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
              const cityName = locale === 'ar' ? branch.cityAr : branch.city
              const address  = locale === 'ar' ? branch.addressAr : branch.address
              const isSoon   = branch.mapUrl === '#'
              const isExpanded = expandedCity === branch.city

              return (
                <div
                  key={branch.city}
                  className={i < regionBranches.length - 1 ? 'border-b border-white/[0.06]' : ''}
                >
                  {/* Row — always visible */}
                  <button
                    onClick={() => !isSoon && setExpandedCity(isExpanded ? null : branch.city)}
                    disabled={isSoon}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Glowing dot */}
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${isSoon ? 'bg-white/15 border border-dashed border-white/20' : 'bg-brand-400 shadow-[0_0_8px_rgba(37,99,235,0.7)]'}`} />
                      <span className={`font-display text-[1.2rem] leading-tight truncate ${isSoon ? 'text-white/40' : 'text-white'}`}>
                        {cityName}
                      </span>
                      {isSoon && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-white/35 border border-white/10 rounded px-1.5 py-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {locale === 'ar' ? 'قريباً' : 'Bientôt'}
                        </span>
                      )}
                    </div>

                    {!isSoon && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0 ms-3"
                      >
                        <Plus className="w-4 h-4 text-brand-400/50" strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </button>

                  {/* Expandable detail */}
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
                        {/* Address */}
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-400/45 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <p className="font-sans text-sm text-brand-100/40 leading-relaxed">{address}</p>
                        </div>
                        {/* Phone */}
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-3.5 h-3.5 text-brand-400/45 flex-shrink-0" strokeWidth={2} />
                          <span className="font-sans text-sm text-brand-300/65 font-semibold tracking-widest">{branch.phone}</span>
                        </div>
                        {/* Maps CTA */}
                        <div className="pt-1">
                          <a
                            href={branch.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-brand-400 border border-brand-400/20 rounded-full px-4 py-2 hover:bg-brand-400/10 transition-colors duration-200"
                          >
                            <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
                            {locale === 'ar' ? 'فتح في الخريطة' : 'Voir sur Maps'}
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
  const t = useTranslations('branches')
  const locale = useLocale()

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  // scaleY (0→1) instead of height (0%→100%) — transform is GPU-composited, height is not
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const regionOrder = Array.from(new Set(branches.map(b => b.region)))

  return (
    <section id="branches" className="relative py-10 md:py-24 px-6 z-10" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-16 reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-normal leading-[1.1] mt-4 text-glow-soft">
              {t('title')}
            </h2>
          </div>
          <p className="font-sans text-brand-300/50 text-sm tracking-[0.12em] font-medium sm:mb-2 flex-shrink-0">
            {branches.length} {t('label').toLowerCase()}
          </p>
        </div>

        {/* ── Mobile layout ── */}
        <MobileBranches locale={locale} />

        {/* ── Desktop layout — route timeline ── */}
        <div className="relative hidden md:block">
          {/* Background track line */}
          <div
            aria-hidden="true"
            className="absolute ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2 top-1 bottom-1 w-px pointer-events-none bg-white/5"
          />
          {/* Animated fill line — scaleY grows from top, GPU-composited */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            className="absolute ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2 top-1 bottom-1 w-px pointer-events-none bg-gradient-to-b from-brand-400 via-brand-500 to-brand-300 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-0"
          />

          {branches.map((branch, i) => {
            const isLeft    = i % 2 === 0
            const cityName  = locale === 'ar' ? branch.cityAr : branch.city
            const address   = locale === 'ar' ? branch.addressAr : branch.address
            const isSoon    = branch.mapUrl === '#'
            const isFirstInRegion = branches.findIndex(b => b.region === branch.region) === i
            const regionLabel = regionLabels[branch.region]
            const regionTitle = regionLabel
              ? (locale === 'ar' ? regionLabel.ar : regionLabel.fr)
              : branch.region

            return (
              <div key={branch.city}>
                {isFirstInRegion && (
                  <div className="reveal relative flex justify-center mb-8 mt-4 z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-400/20 bg-brand-900/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                      <span className="font-sans text-brand-100/90 text-sm tracking-widest uppercase font-semibold">
                        {regionTitle}
                      </span>
                    </div>
                  </div>
                )}

                <div className={`reveal delay-${Math.min((i % 4) + 1, 4)} relative ${i < branches.length - 1 ? 'mb-10 md:mb-12' : ''}`}>
                  <div className="flex items-center relative z-10">
                    {/* Left slot */}
                    <div className="flex-1 flex justify-end pe-9">
                      {isLeft ? (
                        <div className="w-full max-w-[22rem]">
                          <CardWrapper isSoon={isSoon} branch={branch}>
                            <RouteCard cityName={cityName} address={address} phone={branch.phone} index={i} isSoon={isSoon} locale={locale} />
                          </CardWrapper>
                        </div>
                      ) : (
                        <div className={`self-center w-8 h-px ${isSoon ? 'bg-gradient-to-r from-transparent to-white/10' : 'bg-gradient-to-r from-transparent to-brand-400/40'}`} />
                      )}
                    </div>

                    {/* Centre stop */}
                    <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-9 h-9">
                      <div className="absolute inset-0 rounded-full border border-brand-900 bg-brand-900/80" />
                      <div className={`relative w-3.5 h-3.5 rounded-full ${isSoon ? 'bg-white/20 border-2 border-dashed border-white/30' : 'bg-brand-400 shadow-[0_0_16px_rgba(37,99,235,0.9)]'}`} />
                    </div>

                    {/* Right slot */}
                    <div className="flex-1 flex ps-9">
                      {!isLeft ? (
                        <div className="w-full max-w-[22rem]">
                          <CardWrapper isSoon={isSoon} branch={branch}>
                            <RouteCard cityName={cityName} address={address} phone={branch.phone} index={i} isSoon={isSoon} locale={locale} />
                          </CardWrapper>
                        </div>
                      ) : (
                        <div className={`self-center w-8 h-px ${isSoon ? 'bg-gradient-to-r from-white/10 to-transparent' : 'bg-gradient-to-r from-brand-400/40 to-transparent'}`} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Shared desktop sub-components ─────────────────────────────────────────

function CardWrapper({ isSoon, branch, children }: { isSoon?: boolean; branch?: { mapUrl: string }; children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses =
    `group p-5 md:p-8 rounded-2xl transition-all duration-500 relative overflow-hidden ` +
    (isSoon
      ? `border-2 border-dashed border-white/10 bg-white/[0.015] opacity-80 cursor-default`
      : `border border-white/6 bg-white/[0.025] hover:border-brand-400/25 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08),inset_0_0_28px_rgba(37,99,235,0.03)] block w-full text-left cursor-pointer`)

  const Inner = (
    <>
      {!isSoon && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.1), transparent 40%)` }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  )

  if (isSoon) return <div className={baseClasses}>{Inner}</div>

  return (
    <a
      href={branch?.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Inner}
    </a>
  )
}

function RouteCard({ cityName, address, phone, index, isSoon, locale }: {
  cityName: string; address: string; phone: string; index: number; isSoon?: boolean; locale?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-brand-700/60 text-xs tracking-[0.15em] select-none group-hover:text-brand-500/70 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        {isSoon ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-white/50 uppercase">
            <Clock className="w-3 h-3" strokeWidth={2} />
            {locale === 'ar' ? 'قريباً' : 'Bientôt'}
          </span>
        ) : (
          <ExternalLink className="w-4 h-4 text-brand-400/0 -translate-y-2 translate-x-2 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-brand-400/80 transition-all duration-300" strokeWidth={2} />
        )}
      </div>
      <h3 className={`font-display text-[clamp(1.6rem,3.5vw,2.4rem)] tracking-normal leading-[1.05] mb-3 ${isSoon ? 'text-white/60' : 'text-white'}`}>
        {cityName}
      </h3>
      <div className={`h-[2px] w-8 group-hover:w-14 transition-all duration-500 ease-out mb-5 ${isSoon ? 'bg-white/10' : 'bg-brand-400/30'}`} />
      <div className="flex items-start gap-2.5 mb-5">
        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 mt-[3px] ${isSoon ? 'text-white/20' : 'text-brand-400/45'}`} strokeWidth={2} />
        <p className={`font-sans text-sm font-light leading-relaxed tracking-[0.01em] ${isSoon ? 'text-white/30' : 'text-brand-100/40'}`}>{address}</p>
      </div>
      {!isSoon && (
        <div className="flex items-center gap-2.5 pt-4 border-t border-white/5">
          <Phone className="w-3.5 h-3.5 text-brand-400/50 flex-shrink-0" strokeWidth={2} />
          <span className="font-sans text-brand-300/65 text-sm font-semibold tracking-widest group-hover:text-brand-200/80 transition-colors duration-300">{phone}</span>
        </div>
      )}
    </div>
  )
}
