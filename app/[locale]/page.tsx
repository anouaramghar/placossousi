import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import BranchesSection from '@/components/sections/BranchesSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <BranchesSection />
    </main>
  )
}
