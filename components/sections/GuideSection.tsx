import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Layers, Sparkles, Droplets, Lightbulb, LayoutGrid } from 'lucide-react'

const ICONS = [Layers, Sparkles, Droplets, Lightbulb, LayoutGrid]

const GRADIENTS = [
  'from-brand-700/40 to-brand-900/60',
  'from-violet-900/40 to-brand-900/60',
  'from-cyan-900/40 to-brand-900/60',
  'from-amber-900/40 to-brand-900/60',
  'from-brand-800/40 to-brand-900/60',
]

const ICON_COLORS = [
  'text-brand-300',
  'text-violet-300',
  'text-cyan-300',
  'text-amber-300',
  'text-brand-300',
]

type GuideItem = { name: string; tag: string; description: string }

export default function GuideSection() {
  const t = useTranslations('guide')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const items = t.raw('items') as GuideItem[]

  return (
    <section id="guide" className="relative py-10 md:py-24 z-10 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/2 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-normal leading-[1.1] mt-4 text-glow-soft">
              {t('title')}
            </h2>
            <p className="font-sans text-brand-300/50 text-sm mt-3 tracking-wide">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* ── Mobile: horizontal scroll ── */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
            {items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <div
                  key={i}
                  className={`snap-start flex-shrink-0 w-[72vw] max-w-[280px] rounded-2xl border border-white/8 bg-gradient-to-br ${GRADIENTS[i]} p-5 flex flex-col gap-4`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${ICON_COLORS[i]}`} strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-white/15 text-3xl leading-none tabular-nums self-start">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-white font-semibold text-[1.05rem] leading-tight mb-1 tracking-[-0.01em]">
                      {item.name}
                    </h3>
                    <span className={`inline-block text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border mb-3 ${ICON_COLORS[i]} border-current opacity-60`}>
                      {item.tag}
                    </span>
                    <p className="font-sans text-brand-100/55 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={i}
                className={`reveal delay-${Math.min(i + 1, 6)} group relative rounded-2xl border border-white/8 bg-gradient-to-br ${GRADIENTS[i]} p-6 flex flex-col gap-5 hover:border-white/15 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${ICON_COLORS[i]}`} strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-white/10 text-3xl leading-none tabular-nums group-hover:text-white/20 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-white font-semibold text-base leading-tight mb-2 tracking-[-0.01em]">
                    {item.name}
                  </h3>
                  <span className={`inline-block text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border mb-3 ${ICON_COLORS[i]} border-current opacity-50`}>
                    {item.tag}
                  </span>
                  <p className="font-sans text-brand-100/50 text-[0.8rem] leading-relaxed group-hover:text-brand-100/70 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="reveal mt-10 md:mt-12 flex justify-center">
          <Link
            href={`/${locale}#contact`}
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/40 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300 font-sans text-brand-200/70 hover:text-brand-200 text-sm font-semibold tracking-[0.08em] uppercase`}
          >
            {t('cta')}
            <span className={`transition-transform duration-300 text-base ${isAr ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'}`}>
              {isAr ? '←' : '→'}
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
