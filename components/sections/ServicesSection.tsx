// components/sections/ServicesSection.tsx
import { useTranslations } from 'next-intl'

const ICONS = ['🏗️', '🎨', '🖌️', '💡']

export default function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]

  return (
    <section id="services" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-10">{t('title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-brand-800 rounded-xl p-6 border border-brand-700">
              <span className="text-3xl mb-4 block">{ICONS[i]}</span>
              <p className="text-white font-semibold text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
