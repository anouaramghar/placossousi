// components/Footer.tsx
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-brand-900 border-t border-brand-700 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-start">
          <p className="text-white font-black text-sm tracking-widest uppercase">Placo Sousi</p>
          <p className="text-brand-300 text-xs mt-1">{t('tagline')}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/placosousi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-white text-xs transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/placosousi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-white text-xs transition-colors"
          >
            Facebook
          </a>
        </div>

        <p className="text-brand-300 text-xs">{t('copyright')}</p>
      </div>
    </footer>
  )
}
