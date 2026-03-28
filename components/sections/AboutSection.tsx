// components/sections/AboutSection.tsx
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="relative py-36 px-6 z-10 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-400/4 to-transparent pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-16">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2.8rem,7vw,5.5rem)] tracking-[-0.04em] leading-[1.04] mt-5 max-w-2xl text-glow-soft">
            {t('title')}
          </h2>
        </div>

        {/* Two-column editorial layout */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — description */}
          <div className="reveal-left delay-1">
            <p className="font-sans text-brand-100/70 text-xl md:text-2xl leading-[1.75] font-light tracking-[-0.01em]">
              {t('description')}
            </p>

            {/* Stats inline */}
            <div className="mt-14 pt-10 border-t border-white/6 grid grid-cols-2 gap-8">
              <div className="reveal delay-2">
                <p className="font-display text-4xl text-white tracking-[-0.04em] mb-1">10+</p>
                <p className="font-sans text-brand-300/70 text-xs uppercase tracking-[0.18em] font-semibold">{t('stat_years')}</p>
              </div>
              <div className="reveal delay-3">
                <p className="font-display text-4xl text-white tracking-[-0.04em] mb-1">4</p>
                <p className="font-sans text-brand-300/70 text-xs uppercase tracking-[0.18em] font-semibold">{t('stat_cities')}</p>
              </div>
            </div>
          </div>

          {/* Right — founder  */}
          <div className="flex flex-col items-center text-center reveal delay-2">
            {/* Floating avatar with ring */}
            <div className="relative mb-10 group">
              {/* Outer decorative ring */}
              <div className="absolute -inset-6 border border-brand-400/10 rounded-[2.5rem] rotate-3 transition-all duration-700 group-hover:border-brand-400/25 group-hover:rotate-6 group-hover:scale-105"></div>
              {/* Glow blob */}
              <div className="absolute inset-0 bg-brand-400/20 rounded-3xl blur-2xl scale-110 animate-pulse-slow"></div>
              {/* Avatar */}
              <div className="relative w-72 h-[22rem] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.35)] transition-transform duration-500 group-hover:rotate-3">
                <Image
                  src="/images/founder.png"
                  alt={t('founder')}
                  fill
                  className="object-cover object-top"
                  sizes="288px"
                />
              </div>
            </div>
            <p className="font-display text-white text-3xl md:text-4xl tracking-[-0.04em] mb-2">{t('founder')}</p>
            <p className="font-sans text-brand-300/70 text-xs tracking-[0.25em] uppercase font-semibold">{t('founder_title')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
