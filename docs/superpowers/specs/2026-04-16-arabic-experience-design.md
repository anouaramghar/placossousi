# Arabic Experience — Design Spec
**Date:** 2026-04-16  
**Scope:** Option B — Phone numbers + Typography  
**Effort:** ~1 hour  

---

## Problem

The Arabic version (`/ar`) has three silent-but-significant issues:

1. **Phone numbers appear reversed.** The browser applies RTL direction to digit strings, reading `0661-123456` right-to-left. Phone numbers must always read LTR.

2. **Arabic text renders in the wrong font.** Tailwind's `font-sans` and `font-display` utility classes explicitly set `font-family` (Inter and DM Serif respectively), overriding the `[dir="rtl"] body` rule in globals.css. Neither Inter nor DM Serif contains Arabic glyphs, so the browser falls back to whatever system font it finds — not Tajawal. Every heading, label, paragraph, and button in Arabic is affected.

3. **Letter spacing breaks Arabic script.** Arabic uses connected cursive letters. The site applies non-zero tracking utilities (`tracking-[0.2em]`, `tracking-[-0.01em]`, `tracking-[0.25em]`, etc.) on many elements. These insert space between connected letters, visually breaking the script.

---

## Changes

### 1. Phone numbers — `dir="ltr"` attribute

Find every phone number displayed as text or a link across all components. Add:
- `dir="ltr"` — forces the browser to treat the element as LTR; text naturally left-aligns within the element, digits read in correct order

**Files to update:** `components/sections/ContactSection.tsx`, `components/Footer.tsx`, and any other component that renders a phone number string.

### 2. Arabic font rendering — globals.css

Add two rules to the existing RTL section in `app/globals.css`:

```css
[dir="rtl"] .font-sans    { font-family: var(--font-family-arabic); }
[dir="rtl"] .font-display { font-family: var(--font-family-arabic); }
```

This makes Tajawal the active font for all text in RTL mode. No component files need to change.

`--font-family-arabic` is already defined in the `@theme` block as `var(--font-tajawal), sans-serif`, and Tajawal is already loaded in `app/[locale]/layout.tsx`.

### 3. Letter spacing reset — globals.css

Add one rule to the RTL section in `app/globals.css`:

```css
[dir="rtl"] * { letter-spacing: 0; }
```

Resets tracking to zero for all elements in RTL mode, preserving connected Arabic letterforms.

---

## What's Out of Scope

- Product spec keys (currently in French: `epaisseur`, `format`) — separate task
- Full component-by-component RTL layout audit — separate task
- Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) — not requested, Western digits are standard in Morocco

---

## Success Criteria

- [ ] Phone numbers on `/ar` display left-to-right in correct digit order
- [ ] All text on `/ar` renders in Tajawal (verify in browser DevTools → Computed → font-family)
- [ ] No visible letter-spacing gaps between Arabic letters anywhere on `/ar`
- [ ] Build passes, all tests green
- [ ] No visual regressions on `/fr`
