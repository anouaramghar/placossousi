import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import BranchesSection from '@/components/sections/BranchesSection'
import ContactSection from '@/components/sections/ContactSection'

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }]
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <BranchesSection />
      <ContactSection />
    </main>
  )
}
