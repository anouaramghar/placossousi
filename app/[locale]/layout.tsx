import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Tajawal } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollReveal from '@/components/ScrollReveal'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--font-dm-serif' })
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['300', '400', '500', '700', '800'], variable: '--font-tajawal' })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const title = locale === 'ar'
    ? 'بلاكو سوسي — أسياد الجبص والتشطيب'
    : 'Placo Sousi — Maîtres du Plâtre et de la Finition'
  const description = locale === 'ar'
    ? 'شركة مغربية متخصصة في الجبص والطلاء والباستا. الناظور، بني أنصار، أريد.'
    : 'Société marocaine spécialisée dans le plâtre, peinture et pasta. Nador, Beni Ansar, Arrid.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_FR',
      siteName: 'Placo Sousi',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      languages: {
        'fr': '/fr',
        'ar': '/ar',
      },
    },
  }
}

const locales = ['fr', 'ar']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${dmSerif.variable} ${tajawal.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {locale === 'ar' ? 'انتقل إلى المحتوى' : 'Aller au contenu'}
          </a>
          <ScrollReveal />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
