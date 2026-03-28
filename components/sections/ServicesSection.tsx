// components/sections/ServicesSection.tsx
import { useTranslations } from 'next-intl'
import { Hammer, Palette, Paintbrush, Lightbulb, ArrowRight } from 'lucide-react'
import servicesData from '@/data/services.json'

const ICONS: Record<string, React.ElementType> = {
  Hammer, Palette, Paintbrush, Lightbulb
}

export default function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]

  return (
    <section id="services" className="relative py-36 px-6 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10"></div>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="reveal mb-20">
          <span className="section-label">{t('label')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
            <h2 className="font-display text-white text-[clamp(2.8rem,7vw,5.5rem)] tracking-[-0.04em] leading-[1.04] text-glow-soft">
              {t('title')}
            </h2>
            <p className="font-sans text-brand-300/70 text-sm tracking-[0.12em] font-medium mt-4 md:mt-0 md:mb-3">{items.length} {t('label').toLowerCase()}</p>
          </div>
        </div>

        {/* Stacked editorial list */}
        <div className="border-t border-white/6">
          {items.map((item, i) => {
            const IconComponent = ICONS[servicesData[i]?.icon] ?? Paintbrush;
            return (
              <div
                key={servicesData[i]?.id ?? i}
                className={`service-row reveal delay-${Math.min(i + 1, 6)} group flex items-center gap-6 md:gap-10 py-8 md:py-10 border-b border-white/5 transition-all duration-500 cursor-default relative overflow-hidden`}
              >
                {/* Hover glow fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-brand-400/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Index number */}
                <span className="font-display text-brand-700/50 text-5xl md:text-7xl tabular-nums min-w-[70px] md:min-w-[100px] text-right select-none group-hover:text-brand-500/70 transition-colors duration-500 relative z-10 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon box */}
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-brand-700/80 to-brand-900 rounded-2xl flex items-center justify-center border border-white/5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:border-brand-400/30 transition-all duration-500 relative z-10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <div className="absolute inset-0 rounded-2xl bg-brand-400 opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500"></div>
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-brand-300 group-hover:text-white relative z-10 transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <p className="font-sans text-brand-100/80 text-xl md:text-2xl font-light group-hover:text-white transition-colors duration-300 relative z-10 leading-tight tracking-[-0.02em] flex-1 min-w-0">
                  {item}
                </p>

                {/* Arrow reveal */}
                <ArrowRight className="text-brand-400/60 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-400 relative z-10 w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
