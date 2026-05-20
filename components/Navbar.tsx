// components/Navbar.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const otherLocale = locale === 'fr' ? 'ar' : 'fr'
  const switchPath = pathname.startsWith(`/${locale}`)
    ? `/${otherLocale}${pathname.slice(`/${locale}`.length)}`
    : `/${otherLocale}`

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 32))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  const links = [
    { href: `/${locale}#about`,     label: t('home') },
    { href: `/${locale}#products`, label: t('products') },
    { href: `/${locale}#services`, label: t('services') },
    { href: `/${locale}#portfolio`, label: t('portfolio') },
    { href: `/${locale}#branches`, label: t('branches') },
    { href: `/${locale}#team`,     label: t('team') },
    { href: `/${locale}#contact`,  label: t('contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-brand-900/80 md:bg-brand-900/75 md:backdrop-blur-2xl border-b border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(37,99,235,0.35)] group-hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] transition-shadow duration-300 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Placo Sousi Logo"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-sans text-white/90 font-bold text-sm tracking-[0.12em] uppercase group-hover:text-white transition-colors duration-200">
            Placo Sousi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans link-underline text-brand-200/60 hover:text-white text-sm font-medium tracking-[-0.01em] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-white/4"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchPath}
            className="ml-3 font-sans text-brand-200/70 hover:text-white text-sm font-medium px-4 py-2.5 min-h-[44px] rounded-full border border-transparent bg-white/5 hover:bg-white/10 transition-all duration-200 tracking-[0.08em]"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={switchPath}
            className="font-sans text-brand-200/70 text-sm font-medium px-4 py-2.5 min-h-[44px] rounded-full border border-transparent bg-white/5 tracking-[0.08em] hover:bg-white/10 hover:text-white transition-colors duration-200"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brand-200/70 hover:text-white p-3 transition-colors rounded-lg hover:bg-white/5"
            aria-label={t('menu_toggle')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — CSS transition, no Framer Motion */}
      <div
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={`md:hidden bg-brand-900/95 border border-white/10 px-4 py-4 flex flex-col gap-1 absolute left-4 right-4 top-[72px] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out ${
          menuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
      >
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-sans text-brand-200/80 hover:text-white font-medium text-base py-3.5 px-4 rounded-xl hover:bg-white/5 transition-all duration-200 tracking-[-0.01em]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
