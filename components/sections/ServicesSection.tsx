'use client'
import { useTranslations } from 'next-intl'
import { Hammer, Palette, Paintbrush, Package } from 'lucide-react'
import servicesData from '@/data/services.json'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const ICONS: Record<string, React.ElementType> = {
  Hammer, Palette, Paintbrush, Package
}

const SERVICE_IMAGES = [
  "/images/services/service_platre.png",
  "/images/services/service_decoration.png",
  "/images/services/service_peinture.png",
  "/images/services/service_vente.png",
]

export default function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]
  const [activeIndex, setActiveIndex] = useState(0)

  let descriptions: string[] = []
  try {
    descriptions = t.raw('descriptions') as string[]
  } catch {
    descriptions = items.map(() => '')
  }

  return (
    <section id="services" className="relative py-10 md:py-24 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-8 md:mb-14">
          <span className="section-label">{t('label')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] text-glow-soft">
              {t('title')}
            </h2>
            <div className="mt-4 md:mt-0 md:mb-3 inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="font-sans text-brand-200/80 text-sm tracking-wide font-medium">
                {items.length} {t('label').toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ── Desktop: split panel ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* Left: numbered list */}
          <div className="border-t border-white/10">
            {items.map((item, i) => {
              const IconComponent = ICONS[servicesData[i]?.icon ?? 'Paintbrush'] ?? Paintbrush
              const isActive = i === activeIndex
              return (
                <button
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left border-b border-white/5 group transition-colors duration-300 relative ${isActive ? 'bg-white/[0.025]' : 'hover:bg-white/[0.01]'}`}
                >
                  {/* Active left accent */}
                  <motion.div
                    className="absolute ltr:left-0 rtl:right-0 top-0 bottom-0 w-[2px] bg-brand-400 origin-top"
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="flex items-center gap-5 py-6 px-6">
                    <span className={`font-display text-4xl tabular-nums min-w-[52px] text-right leading-none transition-colors duration-300 ${isActive ? 'text-brand-400/70' : 'text-brand-700/40 group-hover:text-brand-600/50'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${isActive ? 'bg-brand-400/15 border-brand-400/35 shadow-[0_0_16px_rgba(37,99,235,0.2)]' : 'bg-brand-900 border-white/8 group-hover:border-white/15'}`}>
                      <IconComponent className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-brand-300' : 'text-white/30 group-hover:text-white/50'}`} strokeWidth={1.5} />
                    </div>

                    <span className={`font-sans text-[1.15rem] font-light tracking-[-0.02em] leading-tight transition-colors duration-300 flex-1 ${isActive ? 'text-white' : 'text-brand-100/55 group-hover:text-brand-100/80'}`}>
                      {item}
                    </span>

                    <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${isActive ? 'bg-brand-400 shadow-[0_0_8px_rgba(37,99,235,0.8)]' : 'bg-white/10'}`} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: sticky image + description */}
          <div className="sticky top-24 self-start">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_32px_64px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SERVICE_IMAGES[activeIndex]}
                    alt={items[activeIndex]}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/25 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Description overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans text-brand-100/75 text-[0.95rem] leading-relaxed"
                  >
                    {descriptions[activeIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Corner label */}
              <div className="absolute top-5 ltr:right-5 rtl:left-5 z-10">
                <span className="font-display text-white/20 text-5xl leading-none tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="lg:hidden space-y-4">
          {items.map((item, i) => {
            const IconComponent = ICONS[servicesData[i]?.icon ?? 'Paintbrush'] ?? Paintbrush
            return (
              <div
                key={i}
                className="reveal rounded-2xl overflow-hidden border border-white/8 bg-brand-900/40"
              >
                {/* Image */}
                <div className="relative w-full h-44 sm:h-52">
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={item}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 0vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
                  <span className="absolute top-4 ltr:left-4 rtl:right-4 font-display text-white/25 text-3xl leading-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-800 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-brand-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-sans text-white text-[1.05rem] font-medium leading-tight tracking-[-0.01em]">
                      {item}
                    </h3>
                  </div>
                  <p className="font-sans text-brand-100/55 text-sm leading-relaxed">
                    {descriptions[i]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
