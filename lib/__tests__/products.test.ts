import { getProducts, getProductBySlug, getProductsByCategory, getFeaturedProducts } from '../products'

describe('product data helpers', () => {
  it('returns all products', () => {
    const products = getProducts()
    expect(products.length).toBeGreaterThan(0)
  })

  it('finds product by slug', () => {
    const product = getProductBySlug('platre-ba13')
    expect(product).not.toBeNull()
    expect(product?.slug).toBe('platre-ba13')
  })

  it('returns null for unknown slug', () => {
    expect(getProductBySlug('does-not-exist')).toBeNull()
  })

  it('filters products by category', () => {
    const platre = getProductsByCategory('platre')
    expect(platre.every(p => p.category === 'platre')).toBe(true)
  })

  it('returns only featured products', () => {
    const featured = getFeaturedProducts()
    expect(featured.every(p => p.featured === true)).toBe(true)
    expect(featured.length).toBeGreaterThan(0)
  })

  it('each product has required fields', () => {
    const products = getProducts()
    products.forEach(p => {
      expect(p.slug).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.nameAr).toBeTruthy()
      expect(p.category).toBeTruthy()
      expect(p.image).toBeTruthy()
      expect(typeof p.featured).toBe('boolean')
    })
  })

  it('returns empty array for unknown category', () => {
    const result = getProductsByCategory('does-not-exist')
    expect(result).toEqual([])
  })
})
