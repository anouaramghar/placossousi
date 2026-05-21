'use client'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import MagneticButton from '@/components/MagneticButton'
import heroBg from '@/public/images/hero_bg_wide.webp'

const WORDS: Record<string, string[]> = {
  fr: ["du Plâtre", "de la Peinture", "du Pasta", "de l'Armstrong", "du LED"],
  ar: ["الجبص", "الصباغة", "الباستا", "آرمسترونغ", "LED"],
}

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && displayed === word) {
      timer = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
    } else {
      timer = setTimeout(
        () => setDisplayed(d => deleting ? d.slice(0, -1) : word.slice(0, d.length + 1)),
        deleting ? 50 : 100
      )
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, index, words])

  return displayed
}

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const words = WORDS[locale] ?? WORDS.fr
  const displayed = useTypewriter(words)

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 bg-brand-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/30 to-brand-900 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-900 to-transparent z-20 pointer-events-none"></div>
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          placeholder="blur"
          quality={65}
          sizes="100vw"
          className="object-cover"
        />
      </div>
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

        {/* Display heading */}
        <h1
          className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-[1.1] tracking-normal mb-7 animate-fade-in-up text-balance"
          style={{ animationDelay: '0.12s' }}
          aria-label={`${t('title_prefix')} ${words[0]}`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-200/50 text-glow">
            {t('title_prefix')}{' '}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-200/50 text-glow" aria-hidden="true">
            {displayed}
            <span className="animate-blink ms-0.5">|</span>
          </span>
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-fade-in pointer-events-none"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      >
        <span className="font-sans text-brand-200/40 text-[10px] tracking-[0.2em] uppercase">
          {t('scroll_hint')}
        </span>
        <svg
          className="w-4 h-4 text-brand-300/40 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
