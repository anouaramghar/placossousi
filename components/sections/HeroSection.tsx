// components/sections/HeroSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-20"
    >
      {/* Atmospheric orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-400/15 rounded-[100%] blur-[140px] animate-pulse-slow pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-purple-700/10 rounded-full blur-[160px] animate-float pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-400/8 rounded-full blur-[120px] animate-float pointer-events-none -z-10" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/8 hover:border-brand-400/40 transition-colors duration-500 cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse flex-shrink-0"></span>
            <span className="font-sans text-brand-200/90 text-xs tracking-[0.2em] uppercase font-semibold letter-spacing-wider">{t('tagline')}</span>
          </div>
        </div>

        {/* Display heading — DM Serif */}
        <h1
          className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-200/50 text-[clamp(3rem,10vw,7.5rem)] leading-[1.02] tracking-[-0.04em] mb-7 animate-fade-in-up text-glow"
          style={{ animationDelay: '0.12s' }}
        >
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-brand-200/60 text-lg md:text-xl font-light mb-12 max-w-xl animate-fade-in-up leading-[1.7] tracking-[-0.01em]"
          style={{ animationDelay: '0.24s' }}
        >
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-28 animate-fade-in-up"
          style={{ animationDelay: '0.36s' }}
        >
          <Link
            href={`/${locale}#products`}
            className="btn-primary px-9 py-4 text-base font-semibold tracking-[-0.01em] shadow-[0_0_40px_rgba(37,99,235,0.3)]"
          >
            {t('cta_products')}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="btn-ghost px-9 py-4 text-base font-medium tracking-[-0.01em]"
          >
            {t('cta_contact')}
          </Link>
        </div>

        {/* Stats ticker — no cards, just numbers */}
        <div
          className="flex items-baseline justify-center gap-12 md:gap-20 lg:gap-28 flex-wrap animate-fade-in-up"
          style={{ animationDelay: '0.48s' }}
        >
          {[
            { value: '10+', key: 'stat_years' },
            { value: '6', key: 'stat_cities' },
            { value: '100%', key: 'stat_quality' },
          ].map((stat) => (
            <div key={stat.key} className="text-center group cursor-default">
              <p className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-300/70 text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.04em] group-hover:scale-110 transition-transform duration-500 origin-bottom">
                {stat.value}
              </p>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <p className="font-sans text-brand-400/70 text-[0.65rem] uppercase tracking-[0.2em] font-bold mt-2">{t(stat.key as any)}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 w-full max-w-md h-px bg-gradient-to-r from-transparent via-brand-400/20 to-transparent animate-fade-in-up" style={{ animationDelay: '0.56s' }}></div>
      </div>
    </section>
  )
}
