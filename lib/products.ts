// lib/products.ts
import productsData from '@/data/products.json'

export interface Product {
  slug: string
  name: string
  nameAr: string
  category: string
  description: string
  descriptionAr: string
  image: string
  featured: boolean
  specs?: Record<string, string>
}

export function getProducts(): Product[] {
  return productsData as Product[]
}

export function getProductBySlug(slug: string): Product | null {
  return getProducts().find(p => p.slug === slug) ?? null
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter(p => p.featured)
}
