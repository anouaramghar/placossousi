import branchesData from '@/data/branches.json'
import { BASE_URL, WHATSAPP_NUMBER } from '@/lib/config'

type Branch = {
  city: string
  cityAr: string
  address: string
  addressAr: string
  phone: string
  region: string
  mapUrl: string
  comingSoon?: boolean
}

export default function StructuredData({ locale }: { locale: string }) {
  const branches = branchesData as Branch[]
  const openBranches = branches.filter((b) => !b.comingSoon)

  const description =
    locale === 'ar'
      ? 'شركة مغربية متخصصة في الجبص والطلاء والباستا. الناظور، بني أنصار، أريد.'
      : 'Société marocaine spécialisée dans le plâtre, peinture et pasta. Nador, Beni Ansar, Arrid.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Placo Sousi',
    url: `${BASE_URL}/${locale}`,
    telephone: `+${WHATSAPP_NUMBER}`,
    image: `${BASE_URL}/images/og-image.jpg`,
    description,
    priceRange: '$$',
    areaServed: branches.map((b) => (locale === 'ar' ? b.cityAr : b.city)),
    address: openBranches.map((b) => ({
      '@type': 'PostalAddress',
      streetAddress: locale === 'ar' ? b.addressAr : b.address,
      addressLocality: locale === 'ar' ? b.cityAr : b.city,
      addressCountry: 'MA',
    })),
    sameAs: ['https://www.instagram.com/placosousi'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
