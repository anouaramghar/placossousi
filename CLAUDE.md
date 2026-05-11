@AGENTS.md

## Tech Stack

- **Next.js 16.2.1** (App Router) — see AGENTS.md for breaking changes
- **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- **next-intl 4.8.3** — i18n via `i18n.ts` using `requestLocale` API (not `locale`)
- **Framer Motion 12** — animations
- **Jest 30** + Testing Library — tests in `__tests__/`

## Project Structure

```
app/
  [locale]/          # locale-scoped routes (fr | ar)
  globals.css
  manifest.ts / robots.ts / sitemap.ts
components/
  sections/          # page sections: Hero, About, Products, Services, Branches, Guide, Contact, Team
  products/          # ProductCard, ProductGrid, ProductDetail
  Navbar, Footer, WhatsAppButton, MagneticButton, ScrollReveal
data/
  products.json      # product catalog
  branches.json      # store locations
  services.json      # service offerings
messages/
  fr.json / ar.json  # all UI strings — add new copy here, never hardcode
i18n.ts              # next-intl config
```

## i18n

Two locales: `fr` (default) and `ar` (RTL). All strings live in `messages/`. The `[locale]` segment drives locale resolution. RTL layouts must be designed natively — not just mirrored.

## Design Context

### Users
Mixed audience of contractors/builders sourcing materials for construction projects AND homeowners/renovators selecting products for their spaces. Both groups visit with high intent — they know what they want and are evaluating quality and trustworthiness before making contact. The interface must feel credible to a professional while remaining legible and approachable to a first-time renovator. WhatsApp is the primary conversion channel, so friction to contact must be near-zero.

### Brand Personality
**Premium · Modern · Bold**

Voice: confident, direct, no filler. Tone: authoritative but not cold — a regional expert who takes pride in craft. Emotional goals: inspire confidence in quality, signal expertise without arrogance, and feel unmistakably Moroccan in spirit while being visually world-class.

### Aesthetic Direction
Deep dark aesthetic — navy blacks (#03060f → #081225) as the canvas. Electric blue accents (#2563eb, #60a5fa) for energy and modernity. Push further: richer atmospheric depth, more dramatic light/shadow contrast, premium material textures. Think high-end construction brand meets luxury architecture firm.

Bilingual FR/AR — Arabic must feel first-class, not mirrored as an afterthought. RTL layouts should have their own rhythm and feel native.

### Design Principles
1. **Depth over flatness** — Every surface should feel like it has weight. Use layered shadows, blur, and atmospheric glow to create spatial hierarchy.
2. **Bold typography as structure** — DM Serif display headings carry the visual load. Size them large, track them tight, let them breathe.
3. **Conversion at every scroll stop** — Contact/WhatsApp CTAs should be visible and reachable from any section. Never more than one scroll from a contact action.
4. **RTL as a first-class experience** — Arabic layouts must be designed, not just mirrored. Spacing, flow, and typographic rhythm should feel native in both directions.
5. **Premium through restraint** — More contrast, less clutter. Remove elements before adding. Whitespace (dark space) is as valuable as content.
