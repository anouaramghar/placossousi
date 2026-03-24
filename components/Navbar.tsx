// components/Navbar.tsx
'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const otherLocale = locale === 'fr' ? 'ar' : 'fr'
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const links = [
    { href: `/${locale}#hero`, label: t('home') },
    { href: `/${locale}#products`, label: t('products') },
    { href: `/${locale}#services`, label: t('services') },
    { href: `/${locale}#branches`, label: t('branches') },
    { href: `/${locale}#contact`, label: t('contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-800/95 backdrop-blur border-b border-brand-700">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-400 rounded flex items-center justify-center">
            <span className="text-white font-black text-xs">PS</span>
          </div>
          <span className="text-white font-black text-sm tracking-widest uppercase">
            Placo Sousi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-300 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={switchPath}
            className="bg-brand-400 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={switchPath}
            className="bg-brand-400 text-white text-xs font-bold px-3 py-1.5 rounded"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brand-300 p-1"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-800 border-t border-brand-700 px-4 py-3 flex flex-col gap-3">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-300 hover:text-white text-sm py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
