# Placo Sousi Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (French/Arabic) brand showcase website for Placo Sousi using Next.js 14, deployable to Vercel.

**Architecture:** Hybrid approach — single long-scroll homepage with all key sections, plus dedicated `/products` catalog and `/products/[slug]` detail pages. All content served from static JSON files. i18n via next-intl with `/fr/` and `/ar/` URL prefixes and automatic RTL switching.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-intl, Formspree (contact form), Google Maps Embed, Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-03-24-placosousi-website-design.md`

> **next-intl v3 note:** In App Router, `useTranslations` and `useLocale` from `next-intl` work in **Server Components** (no `'use client'` needed) when the component is rendered inside `NextIntlClientProvider`. Components that use browser APIs or React state need `'use client'` explicitly — those are marked in the plan. Pure display components (sections, cards) are Server Components by default.

---

## File Map

```
D:/PS/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale root layout (fonts, dir, metadata)
│   │   ├── page.tsx                # Homepage (assembles all sections)
│   │   └── products/
│   │       ├── page.tsx            # Product catalog with category filter
│   │       └── [slug]/
│   │           └── page.tsx        # Product detail page
│   └── globals.css                 # Tailwind base + custom scrollbar
├── components/
│   ├── Navbar.tsx                  # Sticky nav: logo, links, FR↔AR toggle, hamburger
│   ├── Footer.tsx                  # Brand info, social links, copyright
│   ├── WhatsAppButton.tsx          # Fixed bottom-right floating button
│   └── sections/
│       ├── HeroSection.tsx         # Headline, tagline, stats, 2 CTAs
│       ├── AboutSection.tsx        # Company description + founder
│       ├── ProductsSection.tsx     # 5 featured product cards + "voir tout"
│       ├── ServicesSection.tsx     # 4 service items with icons
│       ├── BranchesSection.tsx     # Google Maps embed + city tags
│       └── ContactSection.tsx      # Phone, WhatsApp, Formspree form
├── components/products/
│   ├── ProductCard.tsx             # Single product card (image, name, category)
│   ├── ProductGrid.tsx             # Grid with category filter tabs
│   └── ProductDetail.tsx          # Full product detail view
├── data/
│   ├── products.json               # All product entries
│   ├── services.json               # All service entries
│   └── branches.json               # All branch/city entries
├── messages/
│   ├── fr.json                     # All French UI strings
│   └── ar.json                     # All Arabic UI strings
├── lib/
│   └── products.ts                 # Data access helpers (getProducts, getBySlug, getByCategory)
├── i18n.ts                         # next-intl configuration
├── middleware.ts                   # next-intl locale routing middleware
├── next.config.js                  # withNextIntl wrapper
├── tailwind.config.ts              # Custom brand-* color palette + fonts
└── tsconfig.json
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json` (auto-generated)
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json` (auto-generated)
- Create: `app/globals.css`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd D:/PS
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js 14 project created with TypeScript and Tailwind.

- [ ] **Step 2: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should see default Next.js page. Stop with Ctrl+C.

- [ ] **Step 4: Add .gitignore entries**

Add to `.gitignore`:
```
.superpowers/
.env.local
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 14 project with TypeScript, Tailwind, next-intl"
```

---

## Task 2: Tailwind Theme & Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Configure custom color palette and fonts**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#060e1c',
          800: '#0a1628',
          700: '#0f1e36',
          600: '#111e35',
          500: '#1a2d4a',
          400: '#1e4fa3',
          300: '#7fa8e0',
        },
        whatsapp: '#25d366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Update globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a1628;
  color: #ffffff;
}

/* RTL font override */
[dir="rtl"] body {
  font-family: var(--font-cairo), sans-serif;
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure brand color palette and font tokens"
```

---

## Task 3: i18n Configuration

**Files:**
- Create: `i18n.ts`
- Create: `middleware.ts`
- Modify: `next.config.js`
- Create: `messages/fr.json`
- Create: `messages/ar.json`

- [ ] **Step 1: Create i18n.ts**

```typescript
// i18n.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}))
```

- [ ] **Step 2: Create middleware.ts**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

- [ ] **Step 3: Update next.config.js**

```javascript
// next.config.js
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)
```

- [ ] **Step 4: Create messages/fr.json**

```json
{
  "nav": {
    "home": "Accueil",
    "products": "Produits",
    "services": "Services",
    "branches": "Nos Agences",
    "contact": "Contact"
  },
  "hero": {
    "tagline": "Plâtre · Peinture · Pasta",
    "title": "Maîtres du Plâtre et de la Finition",
    "subtitle": "Nador · Beni Ansar · Arrid",
    "cta_products": "Nos Produits",
    "cta_contact": "Nous contacter",
    "stat_years": "Ans d'exp.",
    "stat_cities": "Villes",
    "stat_quality": "Qualité"
  },
  "about": {
    "label": "À Propos",
    "title": "Placo Sousi — Maîtres du Plâtre",
    "description": "Société marocaine spécialisée dans le plâtre, la peinture et la décoration intérieure depuis plus de 10 ans. Fondée par Abdelghani Aganchich, Placo Sousi s'est imposée comme la référence régionale en matière de finition de qualité.",
    "founder": "Abdelghani Aganchich",
    "founder_title": "Fondateur de Placo Sousi"
  },
  "products": {
    "label": "Nos Produits",
    "title": "Gamme complète de matériaux",
    "see_all": "Voir tout le catalogue →",
    "categories": {
      "all": "Tout",
      "platre": "Plâtre",
      "peinture": "Peinture",
      "pasta": "Pasta",
      "armstrong": "Armstrong",
      "led": "Éclairage LED",
      "visserie": "Visserie"
    }
  },
  "services": {
    "label": "Services",
    "title": "Ce qu'on fait pour vous",
    "items": [
      "Pose & installation plâtre / BA13",
      "Décoration marocaine & égyptienne",
      "Peinture intérieure & extérieure",
      "Conseil & accompagnement projet"
    ]
  },
  "branches": {
    "label": "Nos Agences",
    "title": "Proches de chez vous",
    "map_label": "Carte des agences"
  },
  "contact": {
    "label": "Contact",
    "title": "Contactez-nous",
    "phone_label": "Téléphone",
    "whatsapp_label": "WhatsApp",
    "form_name": "Nom complet",
    "form_phone": "Numéro de téléphone",
    "form_message": "Votre message",
    "form_submit": "Envoyer le message",
    "form_success": "Message envoyé ! Nous vous répondrons bientôt.",
    "form_error": "Erreur d'envoi. Veuillez réessayer."
  },
  "footer": {
    "tagline": "Plâtre · Peinture · Pasta",
    "copyright": "© 2025 Placo Sousi. Tous droits réservés."
  }
}
```

- [ ] **Step 5: Create messages/ar.json**

```json
{
  "nav": {
    "home": "الرئيسية",
    "products": "المنتجات",
    "services": "الخدمات",
    "branches": "فروعنا",
    "contact": "اتصل بنا"
  },
  "hero": {
    "tagline": "جبص · طلاء · باستا",
    "title": "أسياد الجبص والتشطيب",
    "subtitle": "الناظور · بني أنصار · أريد",
    "cta_products": "منتجاتنا",
    "cta_contact": "تواصل معنا",
    "stat_years": "سنوات خبرة",
    "stat_cities": "مدن",
    "stat_quality": "جودة"
  },
  "about": {
    "label": "من نحن",
    "title": "بلاكو سوسي — أسياد الجبص",
    "description": "شركة مغربية متخصصة في الجبص والطلاء والديكور الداخلي منذ أكثر من 10 سنوات. تأسست على يد عبد الغني أكانشيش، وأصبحت بلاكو سوسي المرجع الإقليمي في التشطيب عالي الجودة.",
    "founder": "عبد الغني أكانشيش",
    "founder_title": "مؤسس بلاكو سوسي"
  },
  "products": {
    "label": "منتجاتنا",
    "title": "مجموعة كاملة من المواد",
    "see_all": "← عرض كامل الكتالوج",
    "categories": {
      "all": "الكل",
      "platre": "الجبص",
      "peinture": "الطلاء",
      "pasta": "باستا",
      "armstrong": "أرمسترونغ",
      "led": "إضاءة LED",
      "visserie": "مسامير"
    }
  },
  "services": {
    "label": "الخدمات",
    "title": "ما نقدمه لكم",
    "items": [
      "تركيب الجبص BA13",
      "الديكور المغربي والمصري",
      "الطلاء الداخلي والخارجي",
      "الاستشارة ومرافقة المشاريع"
    ]
  },
  "branches": {
    "label": "فروعنا",
    "title": "قريبون منكم",
    "map_label": "خريطة الفروع"
  },
  "contact": {
    "label": "اتصل بنا",
    "title": "تواصل معنا",
    "phone_label": "الهاتف",
    "whatsapp_label": "واتساب",
    "form_name": "الاسم الكامل",
    "form_phone": "رقم الهاتف",
    "form_message": "رسالتك",
    "form_submit": "إرسال الرسالة",
    "form_success": "تم الإرسال! سنرد عليكم قريباً.",
    "form_error": "خطأ في الإرسال. يرجى المحاولة مرة أخرى."
  },
  "footer": {
    "tagline": "جبص · طلاء · باستا",
    "copyright": "© 2025 بلاكو سوسي. جميع الحقوق محفوظة."
  }
}
```

- [ ] **Step 6: Verify dev server with i18n**

```bash
npm run dev
```

Open http://localhost:3000 — should redirect to http://localhost:3000/fr. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add i18n.ts middleware.ts next.config.js messages/
git commit -m "feat: configure next-intl i18n with FR/AR locales and RTL support"
```

---

## Task 4: Static Data Files

**Files:**
- Create: `data/products.json`
- Create: `data/services.json`
- Create: `data/branches.json`
- Create: `lib/products.ts`

- [ ] **Step 1: Write test for data helpers**

Create `lib/__tests__/products.test.ts`:

```typescript
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
    expect(featured.length).toBeLessThanOrEqual(6)
  })
})
```

- [ ] **Step 2: Install Jest + React Testing Library**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default config
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npx jest lib/__tests__/products.test.ts
```

Expected: FAIL — `lib/products.ts` not found.

- [ ] **Step 4: Create data/products.json**

```json
[
  {
    "slug": "platre-ba13",
    "name": "Plâtre BA13",
    "nameAr": "جبص BA13",
    "category": "platre",
    "description": "Plaque de plâtre standard pour cloisons et faux-plafonds intérieurs.",
    "descriptionAr": "لوح الجبص المعياري للحواجز والأسقف الداخلية.",
    "image": "/images/products/ba13.jpg",
    "featured": true
  },
  {
    "slug": "peinture-interieure",
    "name": "Peinture Intérieure",
    "nameAr": "طلاء داخلي",
    "category": "peinture",
    "description": "Peinture acrylique haute qualité pour murs et plafonds intérieurs.",
    "descriptionAr": "طلاء أكريليك عالي الجودة للجدران والأسقف الداخلية.",
    "image": "/images/products/peinture.jpg",
    "featured": true
  },
  {
    "slug": "pasta-finition",
    "name": "Pasta Finition",
    "nameAr": "باستا التشطيب",
    "category": "pasta",
    "description": "Enduit de finition à base de pasta pour une surface lisse et résistante.",
    "descriptionAr": "طلاء تشطيب بالباستا لسطح ناعم ومتين.",
    "image": "/images/products/pasta.jpg",
    "featured": true
  },
  {
    "slug": "armstrong-faux-plafond",
    "name": "Armstrong Faux-Plafond",
    "nameAr": "أرمسترونغ أسقف مستعارة",
    "category": "armstrong",
    "description": "Dalles Armstrong originales pour faux-plafonds acoustiques et décoratifs.",
    "descriptionAr": "بلاطات أرمسترونغ الأصلية للأسقف المستعارة الصوتية والزخرفية.",
    "image": "/images/products/armstrong.jpg",
    "featured": true
  },
  {
    "slug": "led-profile",
    "name": "Profil LED",
    "nameAr": "ملف LED",
    "category": "led",
    "description": "Profilés aluminium pour intégration de rubans LED dans les faux-plafonds.",
    "descriptionAr": "ملفات ألومنيوم لتركيب شرائط LED في الأسقف المستعارة.",
    "image": "/images/products/led.jpg",
    "featured": true
  },
  {
    "slug": "ttpc-visserie",
    "name": "Visserie TTPC",
    "nameAr": "مسامير TTPC",
    "category": "visserie",
    "description": "Vis TTPC haute performance pour la fixation de plaques de plâtre.",
    "descriptionAr": "مسامير TTPC عالية الأداء لتثبيت ألواح الجبص.",
    "image": "/images/products/ttpc.jpg",
    "featured": false
  }
]
```

- [ ] **Step 5: Create data/services.json**

```json
[
  {
    "id": "pose-platre",
    "icon": "🏗️",
    "titleKey": "services.items.0"
  },
  {
    "id": "decoration",
    "icon": "🎨",
    "titleKey": "services.items.1"
  },
  {
    "id": "peinture",
    "icon": "🖌️",
    "titleKey": "services.items.2"
  },
  {
    "id": "conseil",
    "icon": "💡",
    "titleKey": "services.items.3"
  }
]
```

- [ ] **Step 6: Create data/branches.json**

```json
[
  {
    "city": "Nador",
    "cityAr": "الناظور",
    "address": "Quartier Al Mouhit, Arrid",
    "addressAr": "حي المحيط، أريد",
    "phone": "0665652991",
    "mapUrl": "https://maps.google.com/?q=Nador+Maroc"
  },
  {
    "city": "Beni Ansar",
    "cityAr": "بني أنصار",
    "address": "Beni Ansar, Nador",
    "addressAr": "بني أنصار، الناظور",
    "phone": "0661827712",
    "mapUrl": "https://maps.google.com/?q=Beni+Ansar+Maroc"
  },
  {
    "city": "Driouech",
    "cityAr": "الدريوش",
    "address": "Driouech",
    "addressAr": "الدريوش",
    "phone": "0665652991",
    "mapUrl": "https://maps.google.com/?q=Driouech+Maroc"
  },
  {
    "city": "Ras El Ma",
    "cityAr": "راس الماء",
    "address": "Ras El Ma, Berkane",
    "addressAr": "راس الماء، بركان",
    "phone": "0665652991",
    "mapUrl": "https://maps.google.com/?q=Ras+El+Ma+Maroc"
  }
]
```

- [ ] **Step 7: Create lib/products.ts**

```typescript
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
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npx jest lib/__tests__/products.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 9: Commit**

```bash
git add data/ lib/ jest.config.ts
git commit -m "feat: add static data files and product data helpers with tests"
```

---

## Task 5: Root Layout

**Files:**
- Create: `app/[locale]/layout.tsx`
- Delete: `app/layout.tsx` (replaced by locale layout)

- [ ] **Step 1: Create app/[locale]/layout.tsx**

```typescript
// app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

export const metadata: Metadata = {
  title: 'Placo Sousi — Maîtres du Plâtre et de la Finition',
  description: 'Société marocaine spécialisée dans le plâtre, peinture et pasta. Nador, Beni Ansar, Arrid.',
}

const locales = ['fr', 'ar']

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Remove default app/layout.tsx**

Delete `app/layout.tsx` — the locale layout replaces it.

- [ ] **Step 3: Create placeholder app/[locale]/page.tsx**

```typescript
// app/[locale]/page.tsx
export default function HomePage() {
  return <main><p>Placo Sousi — coming soon</p></main>
}
```

- [ ] **Step 4: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000/fr — should show "Placo Sousi — coming soon". Open http://localhost:3000/ar — same. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: add locale root layout with i18n provider, fonts, and RTL support"
```

---

## Task 6: Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```typescript
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
```

- [ ] **Step 2: Add Navbar to layout**

In `app/[locale]/layout.tsx`, import and add Navbar before `{children}`:

```typescript
import Navbar from '@/components/Navbar'
// ...
<body>
  <NextIntlClientProvider messages={messages}>
    <Navbar />
    {children}
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Open http://localhost:3000/fr — check Navbar renders. Resize to mobile — verify hamburger menu. Click AR — should go to /ar. Stop.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/[locale]/layout.tsx
git commit -m "feat: add responsive Navbar with locale toggle and mobile menu"
```

---

## Task 7: Footer & WhatsAppButton

**Files:**
- Create: `components/Footer.tsx`
- Create: `components/WhatsAppButton.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```typescript
// components/Footer.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

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
```

- [ ] **Step 2: Create components/WhatsAppButton.tsx**

```typescript
// components/WhatsAppButton.tsx
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212665652991"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 bg-whatsapp hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  )
}
```

- [ ] **Step 3: Add Footer and WhatsAppButton to layout**

```typescript
// app/[locale]/layout.tsx — add imports and usage
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
// ...
<body>
  <NextIntlClientProvider messages={messages}>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppButton />
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Check: Footer at bottom, green WhatsApp button bottom-right. Switch to AR — button should align to bottom-left (RTL `end-6`). Stop.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx components/WhatsAppButton.tsx app/[locale]/layout.tsx
git commit -m "feat: add Footer and floating WhatsApp button with RTL support"
```

---

## Task 8: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create components/sections/HeroSection.tsx**

```typescript
// components/sections/HeroSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-b from-brand-800 to-brand-900 pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="max-w-2xl">
          <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-4">
            {t('tagline')}
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-brand-300 text-lg mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href={`/${locale}#products`}
              className="bg-brand-400 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-colors"
            >
              {t('cta_products')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="border border-brand-400 text-brand-300 font-bold px-6 py-3 rounded hover:text-white hover:border-white transition-colors"
            >
              {t('cta_contact')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-brand-700">
            {[
              { value: '10+', key: 'stat_years' },
              { value: '6', key: 'stat_cities' },
              { value: '100%', key: 'stat_quality' },
            ].map(stat => (
              <div key={stat.key}>
                <p className="text-white text-3xl font-black">{stat.value}</p>
                <p className="text-brand-300 text-sm">{t(stat.key as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to homepage**

```typescript
// app/[locale]/page.tsx
import HeroSection from '@/components/sections/HeroSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Check hero at http://localhost:3000/fr — full-height, title, stats, two buttons. Check /ar for RTL layout. Stop.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx app/[locale]/page.tsx
git commit -m "feat: add HeroSection with bilingual title, stats, and CTAs"
```

---

## Task 9: AboutSection

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Create components/sections/AboutSection.tsx**

```typescript
// components/sections/AboutSection.tsx
import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-8">{t('title')}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <p className="text-brand-300 text-lg leading-relaxed">{t('description')}</p>
          <div className="bg-brand-800 rounded-xl p-8 border border-brand-700 flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xl">AA</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">{t('founder')}</p>
              <p className="text-brand-300 text-sm">{t('founder_title')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to homepage**

```typescript
// app/[locale]/page.tsx — add after HeroSection
import AboutSection from '@/components/sections/AboutSection'
// ...
<HeroSection />
<AboutSection />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/AboutSection.tsx app/[locale]/page.tsx
git commit -m "feat: add AboutSection with founder card"
```

---

## Task 10: ProductsSection (Homepage)

**Files:**
- Create: `components/sections/ProductsSection.tsx`
- Create: `components/products/ProductCard.tsx`

- [ ] **Step 1: Create components/products/ProductCard.tsx**

```typescript
// components/products/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale()
  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="bg-brand-700 rounded-xl border-t-2 border-brand-400 p-5 hover:bg-brand-600 transition-colors group"
    >
      <div className="relative w-full aspect-video mb-4 bg-brand-800 rounded overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
      <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
      <p className="text-brand-300 text-xs line-clamp-2">{description}</p>
    </Link>
  )
}
```

- [ ] **Step 2: Create components/sections/ProductsSection.tsx**

```typescript
// components/sections/ProductsSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { getFeaturedProducts } from '@/lib/products'

export default function ProductsSection() {
  const t = useTranslations('products')
  const locale = useLocale()
  const featured = getFeaturedProducts()

  return (
    <section id="products" className="bg-brand-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-black">{t('title')}</h2>
          <Link
            href={`/${locale}/products`}
            className="text-brand-400 hover:text-white text-sm font-semibold transition-colors"
          >
            {t('see_all')}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to homepage**

```typescript
import ProductsSection from '@/components/sections/ProductsSection'
// ...
<AboutSection />
<ProductsSection />
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/ProductsSection.tsx components/products/ProductCard.tsx app/[locale]/page.tsx
git commit -m "feat: add ProductsSection with featured product cards"
```

---

## Task 11: ServicesSection

**Files:**
- Create: `components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create components/sections/ServicesSection.tsx**

```typescript
// components/sections/ServicesSection.tsx
import { useTranslations } from 'next-intl'

const ICONS = ['🏗️', '🎨', '🖌️', '💡']

export default function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]

  return (
    <section id="services" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-10">{t('title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-brand-800 rounded-xl p-6 border border-brand-700">
              <span className="text-3xl mb-4 block">{ICONS[i]}</span>
              <p className="text-white font-semibold text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to homepage**

```typescript
import ServicesSection from '@/components/sections/ServicesSection'
// ...
<ProductsSection />
<ServicesSection />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/ServicesSection.tsx app/[locale]/page.tsx
git commit -m "feat: add ServicesSection with 4 service cards"
```

---

## Task 12: BranchesSection

**Files:**
- Create: `components/sections/BranchesSection.tsx`

- [ ] **Step 1: Create components/sections/BranchesSection.tsx**

```typescript
// components/sections/BranchesSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import branches from '@/data/branches.json'

export default function BranchesSection() {
  const t = useTranslations('branches')
  const locale = useLocale()

  return (
    <section id="branches" className="bg-brand-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-8">{t('title')}</h2>

        {/* Google Maps embed — centered on Nador region */}
        <div className="rounded-xl overflow-hidden mb-8 border border-brand-700">
          <iframe
            title={t('map_label')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-2.9335!3d35.1740!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7510b29c47e80b%3A0x4a09e93d52b11e5a!2sNador!5e0!3m2!1sfr!2sma!4v1710000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Branch city tags */}
        <div className="flex flex-wrap gap-3">
          {branches.map(branch => (
            <a
              key={branch.city}
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-700 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-700 rounded-full px-4 py-2 text-sm transition-colors"
            >
              📍 {locale === 'ar' ? branch.cityAr : branch.city}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to homepage**

```typescript
import BranchesSection from '@/components/sections/BranchesSection'
// ...
<ServicesSection />
<BranchesSection />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/BranchesSection.tsx app/[locale]/page.tsx
git commit -m "feat: add BranchesSection with Google Maps embed and city tags"
```

---

## Task 13: ContactSection

**Files:**
- Create: `components/sections/ContactSection.tsx`

The form submits to Formspree. The owner must create a free account at formspree.io and get a form ID (format: `xyzabc12`). Use env var `NEXT_PUBLIC_FORMSPREE_ID`.

- [ ] **Step 1: Create .env.local**

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

Add `.env.local` to `.gitignore` (already done in Task 1).

- [ ] **Step 2: Create components/sections/ContactSection.tsx**

```typescript
// components/sections/ContactSection.tsx
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function ContactSection() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) (e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-10">{t('title')}</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href="tel:0665652991"
              className="flex items-center gap-4 bg-brand-800 rounded-xl p-5 border border-brand-700 hover:border-brand-400 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-brand-300 text-xs mb-1">{t('phone_label')}</p>
                <p className="text-white font-bold">0665 652 991 / 0661 827 712</p>
              </div>
            </a>
            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-brand-800 rounded-xl p-5 border border-brand-700 hover:border-whatsapp transition-colors"
            >
              <span className="text-2xl text-whatsapp">●</span>
              <div>
                <p className="text-brand-300 text-xs mb-1">{t('whatsapp_label')}</p>
                <p className="text-white font-bold">0665 652 991</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              required
              placeholder={t('form_name')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder={t('form_phone')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder={t('form_message')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400 resize-none"
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="w-full bg-brand-400 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {status === 'sending' ? '...' : t('form_submit')}
            </button>
            {status === 'success' && <p className="text-green-400 text-sm">{t('form_success')}</p>}
            {status === 'error' && <p className="text-red-400 text-sm">{t('form_error')}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to homepage**

```typescript
import ContactSection from '@/components/sections/ContactSection'
// ...
<BranchesSection />
<ContactSection />
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/ContactSection.tsx app/[locale]/page.tsx .env.local
git commit -m "feat: add ContactSection with Formspree form, phone, and WhatsApp links"
```

---

## Task 14: Product Catalog Page

**Files:**
- Create: `components/products/ProductGrid.tsx`
- Create: `app/[locale]/products/page.tsx`

- [ ] **Step 1: Create components/products/ProductGrid.tsx**

```typescript
// components/products/ProductGrid.tsx
'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

const CATEGORIES = ['all', 'platre', 'peinture', 'pasta', 'armstrong', 'led', 'visserie'] as const

interface Props { products: Product[] }

export default function ProductGrid({ products }: Props) {
  const t = useTranslations('products.categories')
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === cat
                ? 'bg-brand-400 text-white'
                : 'bg-brand-700 text-brand-300 hover:text-white'
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/[locale]/products/page.tsx**

```typescript
// app/[locale]/products/page.tsx
import { useTranslations, useLocale } from 'next-intl'
import { getProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import Navbar from '@/components/Navbar'

export default function ProductsPage() {
  const t = useTranslations('products')
  const products = getProducts()

  return (
    <main className="min-h-screen bg-brand-800 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h1 className="text-white text-4xl font-black mb-10">{t('title')}</h1>
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify catalog page**

```bash
npm run dev
```

Open http://localhost:3000/fr/products — grid with filter tabs. Click category tabs — products filter correctly. Stop.

- [ ] **Step 4: Commit**

```bash
git add components/products/ProductGrid.tsx app/[locale]/products/page.tsx
git commit -m "feat: add product catalog page with category filter"
```

---

## Task 15: Product Detail Page

**Files:**
- Create: `components/products/ProductDetail.tsx`
- Create: `app/[locale]/products/[slug]/page.tsx`

- [ ] **Step 1: Create components/products/ProductDetail.tsx**

```typescript
// components/products/ProductDetail.tsx
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale()
  const t = useTranslations()
  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description

  return (
    <main className="min-h-screen bg-brand-800 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${locale}/products`}
          className="text-brand-300 hover:text-white text-sm mb-8 inline-block transition-colors"
        >
          ← {t('products.label')}
        </Link>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-brand-700 rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-brand-400 text-xs font-bold tracking-widest uppercase">
              {product.category}
            </span>
            <h1 className="text-white text-3xl font-black mt-2 mb-4">{name}</h1>
            <p className="text-brand-300 leading-relaxed">{description}</p>
            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create app/[locale]/products/[slug]/page.tsx**

```typescript
// app/[locale]/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/products'
import ProductDetail from '@/components/products/ProductDetail'

const LOCALES = ['fr', 'ar']

// Must include both dynamic segments for SSG to generate all locale/slug combos
export async function generateStaticParams() {
  return LOCALES.flatMap(locale =>
    getProducts().map(p => ({ locale, slug: p.slug }))
  )
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
```

- [ ] **Step 3: Verify product detail**

```bash
npm run dev
```

Open http://localhost:3000/fr/products/platre-ba13 — product detail renders. Click back arrow — goes to catalog. Stop.

- [ ] **Step 4: Commit**

```bash
git add components/products/ProductDetail.tsx app/[locale]/products/[slug]/page.tsx
git commit -m "feat: add product detail page with static generation"
```

---

## Task 16: SEO & Build Verification

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/[locale]/products/page.tsx`
- Modify: `app/[locale]/products/[slug]/page.tsx`

- [ ] **Step 1: Add hreflang and per-page metadata to root layout**

In `app/[locale]/layout.tsx`, add `alternates` to metadata export:

```typescript
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'ar'
      ? 'بلاكو سوسي — أسياد الجبص والتشطيب'
      : 'Placo Sousi — Maîtres du Plâtre et de la Finition',
    description: locale === 'ar'
      ? 'شركة مغربية متخصصة في الجبص والطلاء والباستا. الناظور، بني أنصار، أريد.'
      : 'Société marocaine spécialisée dans le plâtre, peinture et pasta. Nador, Beni Ansar, Arrid.',
    alternates: {
      languages: {
        'fr': '/fr',
        'ar': '/ar',
      },
    },
  }
}
```

Remove the static `export const metadata` declaration.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. All routes listed as static (○).

- [ ] **Step 3: Run production server and final check**

```bash
npm run start
```

Verify: http://localhost:3000/fr and http://localhost:3000/ar both load correctly. Stop.

- [ ] **Step 4: Add Vercel deployment config**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

- [ ] **Step 5: Final commit**

```bash
git add app/ vercel.json
git commit -m "feat: add per-locale metadata with hreflang, verify production build"
```

---

## Deployment

Once code is pushed to GitHub:

1. Go to vercel.com → New Project → Import from GitHub
2. Framework: Next.js (auto-detected)
3. Add env var: `NEXT_PUBLIC_FORMSPREE_ID` = (from formspree.io)
4. Deploy

The owner also needs to:
- Create a free account at formspree.io
- Create a form and copy the form ID to Vercel env vars
- Replace placeholder `mapUrl` values in `data/branches.json` with real Google Maps URLs
- Add real product images to `public/images/products/`
