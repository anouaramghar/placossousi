// components/sections/BranchesSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import branches from '@/data/branches.json'

export default function BranchesSection() {
  const t = useTranslations('branches')
  const locale = useLocale()

  return (
    <section id="branches" className="bg-brand-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-8">{t('title')}</h2>

        {/* Google Maps embed — centered on Nador region */}
        <div className="rounded-xl overflow-hidden mb-8 border border-brand-700">
          <iframe
            title={t('map_label')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-2.9335!3d35.1740!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7510b29c47e80b%3A0x4a09e93d52b11e5a!2sNador!5e0!3m2!1sfr!2sma!4v1710000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Branch city tags */}
        <div className="flex flex-wrap gap-3">
          {branches.map(branch => (
            <a
              key={branch.city}
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-700 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-700 rounded-full px-4 py-2 text-sm transition-colors"
            >
              📍 {locale === 'ar' ? branch.cityAr : branch.city}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
