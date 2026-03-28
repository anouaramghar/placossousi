// components/sections/HeroSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import MagneticButton from '@/components/MagneticButton'

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
          className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-200/50 text-[clamp(2.5rem,10vw,7.5rem)] leading-[1.1] tracking-normal mb-7 animate-fade-in-up text-glow text-balance"
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
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10 animate-fade-in-up w-full px-4 sm:px-0"
          style={{ animationDelay: '0.36s' }}
        >
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href={`/${locale}#products`}
              className="btn-primary w-full px-9 py-4 text-base font-semibold tracking-[-0.01em] shadow-[0_0_40px_rgba(37,99,235,0.3)] flex justify-center text-center"
            >
              {t('cta_products')}
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href={`/${locale}#contact`}
              className="btn-ghost w-full px-9 py-4 text-base font-medium tracking-[-0.01em] flex justify-center text-center"
            >
              {t('cta_contact')}
            </Link>
          </MagneticButton>
        </div>


      </div>
    </section>
  )
}
