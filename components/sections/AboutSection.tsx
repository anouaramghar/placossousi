// components/sections/AboutSection.tsx
import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-8">{t('title')}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <p className="text-brand-300 text-lg leading-relaxed">{t('description')}</p>
          <div className="bg-brand-800 rounded-xl p-8 border border-brand-700 flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xl">AA</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">{t('founder')}</p>
              <p className="text-brand-300 text-sm">{t('founder_title')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
