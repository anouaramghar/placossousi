# Placo Sousi — Website

> Site vitrine officiel de **Placo Sousi**, entreprise marocaine spécialisée dans le plâtre, la peinture et la pasta — Nador, Béni Ansar, Arrid.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Private-red)](#)

---

## ✨ Features

- 🌍 **Bilingual** — Full French & Arabic support with RTL layout for Arabic
- ⚡ **Next.js 16 App Router** — Server components, streaming, and static generation
- 🎨 **Premium UI** — Glassmorphism, aurora backgrounds, magnetic buttons, scroll-reveal animations
- 📱 **Fully Responsive** — Mobile-first, optimised for all screen sizes
- ♿ **Accessible** — Skip-link, `:focus-visible`, `prefers-reduced-motion`, ARIA labels
- 🔍 **SEO-Ready** — Sitemap, robots.txt, Open Graph, Twitter cards, JSON-LD structured data
- 🛡️ **Security Headers** — HSTS, X-Frame-Options, Permissions-Policy via `vercel.json`
- 🧪 **Tested** — Jest + Testing Library, i18n key parity tests

---

## 🗂️ Project Structure

```
placossousi/
├── app/
│   ├── [locale]/           # Locale-aware pages (fr / ar)
│   │   ├── layout.tsx      # Root layout with fonts, metadata, providers
│   │   ├── page.tsx        # Home page
│   │   └── products/       # Products catalogue pages
│   ├── globals.css         # Design system — tokens, animations, utilities
│   ├── sitemap.ts          # Dynamic XML sitemap
│   ├── robots.ts           # robots.txt generation
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── sections/           # Page sections (Hero, About, Team, Contact …)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── MagneticButton.tsx
│   ├── ScrollReveal.tsx
│   └── StructuredData.tsx
├── messages/
│   ├── fr.json             # French translations
│   └── ar.json             # Arabic translations
├── lib/                    # Shared utilities & config
├── data/                   # Static product/team data
├── public/                 # Static assets (images, icons)
└── __tests__/              # Jest test suite
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/anouaramghar/placossousi.git
cd placossousi
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app auto-redirects to the default locale (`/fr`). Switch to Arabic via the language toggle in the navbar.

### Build & Preview

```bash
npm run build
npm run start
```

### Lint & Test

```bash
npm run lint      # ESLint
npm run test      # Jest
```

---

## 🌐 Internationalisation

The site supports two locales configured via [`next-intl`](https://next-intl.dev):

| Locale | Language | Direction |
|--------|----------|-----------|
| `fr`   | French   | LTR       |
| `ar`   | Arabic   | RTL       |

Translation files live in `messages/`. Add a new key to **both** `fr.json` and `ar.json` — the i18n parity test in `__tests__/i18n-key-parity.test.ts` will catch any missing keys automatically.

---

## 🎨 Design System

All design tokens are declared in `app/globals.css` using Tailwind v4's `@theme` block:

| Token group | Description |
|-------------|-------------|
| `--color-brand-*` | 9-step brand blue palette |
| `--font-family-*` | Inter (sans), DM Serif Display (display), Tajawal (Arabic) |
| `--animate-*` | Named animation shorthands (fade-in-up, float, aurora …) |

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Framer Motion + CSS keyframes |
| i18n | next-intl v4 |
| Icons | Lucide React |
| Testing | Jest 30 + Testing Library |
| Deployment | Vercel |

---

## 🚢 Deployment

The project is deployed on **Vercel** with automatic deployments on push to `main`.

Production URL: [https://placossousi.vercel.app](https://placossousi.vercel.app)

Security headers (HSTS, CSP, Referrer-Policy …) are applied globally via `vercel.json`.

---

## 📄 License

Private — All rights reserved © Placo Sousi
