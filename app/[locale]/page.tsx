import { setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProductsSection from '@/components/sections/ProductsSection'

// Dynamically load heavy client components below the fold
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'))
const GuideSection = dynamic(() => import('@/components/sections/GuideSection'))
const BranchesSection = dynamic(() => import('@/components/sections/BranchesSection'))
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'))
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'))

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
    <main id="main-content" className="relative">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <GuideSection />
      <TeamSection />
      <BranchesSection />
      <ContactSection />
    </main>
  )
}
