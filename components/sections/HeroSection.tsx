// components/sections/HeroSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-b from-brand-800 to-brand-900 pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="max-w-2xl">
          <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-4">
            {t('tagline')}
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-brand-300 text-lg mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href={`/${locale}#products`}
              className="bg-brand-400 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              {t('cta_products')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="border border-brand-400 text-brand-300 font-bold px-6 py-3 rounded hover:text-white hover:border-white transition-colors"
            >
              {t('cta_contact')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-brand-700">
            {[
              { value: '10+', key: 'stat_years' },
              { value: '6', key: 'stat_cities' },
              { value: '100%', key: 'stat_quality' },
            ].map(stat => (
              <div key={stat.key}>
                <p className="text-white text-3xl font-black">{stat.value}</p>
                <p className="text-brand-300 text-sm">{t(stat.key as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
