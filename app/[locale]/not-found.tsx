// app/[locale]/not-found.tsx
'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function NotFound() {
  const locale = useLocale()
  const t = useTranslations('not_found')

  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <p className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-300/50 text-[clamp(6rem,20vw,12rem)] leading-none tracking-[-0.04em] mb-4">
        404
      </p>
      <h1 className="font-sans text-white/80 text-xl md:text-2xl font-medium mb-3 tracking-[-0.02em]">
        {t('heading')}
      </h1>
      <p className="font-sans text-brand-300/50 text-sm mb-10 max-w-md leading-relaxed">
        {t('description')}
      </p>
      <Link
        href={`/${locale}`}
        className="btn-primary px-8 py-3.5 text-sm font-semibold tracking-[-0.01em]"
      >
        {t('back_home')}
      </Link>
    </main>
  )
}
