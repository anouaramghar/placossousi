'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useLocale()
  const t = useTranslations('error')

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.error(error)
  }, [error])

  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-sans text-brand-300/60 text-xs tracking-[0.25em] uppercase mb-6">{t('label')}</p>
      <h1 className="font-display text-white text-[clamp(2rem,6vw,4rem)] tracking-normal leading-[1.1] mb-4 text-glow-soft">
        {t('heading')}
      </h1>
      <p className="font-sans text-brand-100/55 text-base max-w-md mb-10">{t('description')}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="btn-ghost px-8 py-3.5 text-sm font-semibold"
        >
          {t('retry')}
        </button>
        <Link href={`/${locale}`} className="btn-primary px-8 py-3.5 text-sm font-semibold">
          {t('back_home')}
        </Link>
      </div>
    </main>
  )
}
