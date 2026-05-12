import { setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import ProductsSection from '@/components/sections/ProductsSection'

// Dynamically load heavy client components below the fold
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const GuideSection = dynamic(() => import('@/components/sections/GuideSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const BranchesSection = dynamic(() => import('@/components/sections/BranchesSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="py-24" aria-hidden="true" />,
})

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
      <PortfolioSection />
      <GuideSection />
      <TeamSection />
      <BranchesSection />
      <ContactSection />
    </main>
  )
}
