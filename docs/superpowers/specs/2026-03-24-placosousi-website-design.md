# Placo Sousi — Website Design Spec
**Date:** 2026-03-24
**Status:** Approved

---

## 1. Overview

A bilingual (French + Arabic) brand showcase website for **Placo Sousi**, a Moroccan construction company based in Nador specializing in plaster (plâtre), painting (peinture), and pasta finishing. Founded by Abdelghani Aganchich.

**Primary goal:** Brand showcase — reinforce professional credibility and present the company, products, and services to potential clients.

**Not in scope (v1):** E-commerce, user accounts, CMS, blog, gallery/réalisations.

---

## 2. Language & Internationalization

- **Languages:** French (primary) and Arabic (Darija/MSA)
- **Routing strategy:** Separate URL prefixes — `/fr/` and `/ar/`
- **RTL support:** `<html dir="rtl">` applied automatically on `/ar/` routes via `next-intl`
- **Translation files:** `/messages/fr.json` and `/messages/ar.json` — all UI strings externalized
- **Language toggle:** Visible in Navbar on all pages

---

## 3. Pages & Routes

### 3.1 Homepage — `/[locale]/`

Single long-scroll page containing all main sections in order:

| # | Section | Content |
|---|---|---|
| 1 | **Navbar** | Logo, nav links (anchors), FR↔AR toggle, hamburger mobile |
| 2 | **Hero** | Main headline, tagline (Plâtre · Peinture · Pasta), 3 stats (10+ ans, 6 villes, 100% qualité), 2 CTA buttons |
| 3 | **About** | Company description, founding story, Abdelghani Aganchich as founder |
| 4 | **Products** | 5 featured product cards (BA13, Peinture, Pasta, Armstrong, LED) + "Voir tout" link to catalog |
| 5 | **Services** | 4 service items: pose/installation plâtre BA13, décoration marocaine & égyptienne, peinture intérieure & extérieure, conseil & accompagnement |
| 6 | **Branches** | Google Maps embed + tagged list of cities (Nador, Beni Ansar, Arrid, Driouech, + others) |
| 7 | **Contact** | Phone numbers (0665 652 991 / 0661 827 712), WhatsApp link, contact form (name, phone, message) |
| 8 | **Footer** | Brand name, tagline, social links (Instagram, Facebook), copyright |

### 3.2 Product Catalog — `/[locale]/products/`

Grid of all products with category filtering. Each product card shows: image, name, category, short description.

### 3.3 Product Detail — `/[locale]/products/[slug]/`

Individual product page with: full name, description, technical details, related products. Static generation from `/data/products.json`.

---

## 4. Visual Design

### 4.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `brand-900` | `#060e1c` | Footer, darkest backgrounds |
| `brand-800` | `#0a1628` | Main page background, Hero |
| `brand-700` | `#0f1e36` | Card backgrounds, alternate sections |
| `brand-600` | `#111e35` | Subtle containers |
| `brand-500` | `#1a2d4a` | Input fields, form elements |
| `brand-400` | `#1e4fa3` | Primary blue, CTAs, accents |
| `brand-300` | `#7fa8e0` | Muted text, labels, subtitles |
| `white` | `#ffffff` | Headings, primary text |
| `whatsapp` | `#25d366` | WhatsApp button only |

### 4.2 Typography

- **Font:** Inter (Latin/French) + Cairo (Arabic) — both from Google Fonts
- **Headings:** Bold/Black weight, white
- **Body:** Regular weight, `brand-300`
- **Letter-spacing:** Generous on uppercase labels (`tracking-widest`)

### 4.3 Design Principles

- Dark navy backgrounds throughout (consistent with existing brand identity)
- Blue accent (`#1e4fa3`) for CTAs, borders-top on cards, active states
- Subtle section alternation between `brand-800` and `brand-700`
- Rounded corners (`rounded-lg`) on cards and inputs
- No gradients on body text — high contrast only

---

## 5. Component Architecture

### 5.1 Global Components

| Component | File | Description |
|---|---|---|
| `Navbar` | `components/Navbar.tsx` | Sticky top navbar: logo, nav links (anchor scroll), language toggle, mobile hamburger menu |
| `Footer` | `components/Footer.tsx` | Brand info, social links (Instagram, Facebook), copyright |
| `WhatsAppButton` | `components/WhatsAppButton.tsx` | Fixed bottom-right floating button, links to `https://wa.me/212665652991` |

### 5.2 Homepage Sections

| Component | File |
|---|---|
| `HeroSection` | `components/sections/HeroSection.tsx` |
| `AboutSection` | `components/sections/AboutSection.tsx` |
| `ProductsSection` | `components/sections/ProductsSection.tsx` |
| `ServicesSection` | `components/sections/ServicesSection.tsx` |
| `BranchesSection` | `components/sections/BranchesSection.tsx` |
| `ContactSection` | `components/sections/ContactSection.tsx` |

### 5.3 Products Pages

| Component | File |
|---|---|
| `ProductCard` | `components/products/ProductCard.tsx` |
| `ProductGrid` | `components/products/ProductGrid.tsx` |
| `ProductDetail` | `components/products/ProductDetail.tsx` |

---

## 6. Data Layer

All content is stored as static JSON files — no database required for v1.

```
/data/
  products.json       # array of product objects
  services.json       # array of service objects
  branches.json       # array of branch/city objects
```

### Product schema:
```json
{
  "slug": "platre-ba13",
  "nameKey": "products.ba13.name",
  "category": "platre",
  "descriptionKey": "products.ba13.description",
  "image": "/images/products/ba13.jpg",
  "featured": true
}
```

### Branch schema:
```json
{
  "city": "Nador",
  "address": "Quartier Al Mouhit, Arrid",
  "phone": "0665652991",
  "mapUrl": "https://maps.google.com/?q=..."
}
```

---

## 7. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/SSR, SEO, routing |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first, RTL support via `rtl:` prefix |
| i18n | next-intl | Industry standard for Next.js, RTL support |
| Fonts | next/font (Google Fonts) | Optimized loading, no layout shift |
| Images | next/image | Automatic optimization, lazy loading |
| Maps | Google Maps Embed API | Free, no API key needed for embed |
| Contact form | Client-side only (v1) | No backend needed — WhatsApp/phone as primary contact |
| Deployment | Vercel (recommended) | Native Next.js hosting |

---

## 8. File Structure

```
D:/PS/
├── app/
│   └── [locale]/
│       ├── layout.tsx           # Root layout with locale/dir/fonts
│       ├── page.tsx             # Homepage
│       └── products/
│           ├── page.tsx         # Catalog
│           └── [slug]/
│               └── page.tsx     # Product detail
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── BranchesSection.tsx
│   │   └── ContactSection.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       └── ProductDetail.tsx
├── data/
│   ├── products.json
│   ├── services.json
│   └── branches.json
├── messages/
│   ├── fr.json
│   └── ar.json
├── public/
│   └── images/
│       ├── logo.png
│       └── products/
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 9. SEO & Performance

- Static generation (SSG) for all pages — fast load, fully indexable
- `<title>` and `<meta description>` per page via Next.js `generateMetadata`
- `hreflang` tags for FR/AR alternates
- `next/image` for all images — WebP conversion, lazy loading
- Lighthouse target: 90+ on mobile

---

## 10. Out of Scope (v1)

- User authentication
- CMS / admin panel
- Blog / actualités
- Réalisations / project gallery
- Online ordering / e-commerce
- Newsletter
