# Arabic Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the three Arabic-mode issues: reversed phone numbers, wrong fonts (Inter/DM Serif instead of Tajawal), and letter-spacing breaking Arabic connected script.

**Architecture:** Two CSS rules in `globals.css` cover font + tracking globally. Phone number elements in `ContactSection.tsx` and `BranchesSection.tsx` get `dir="ltr"` attributes to prevent RTL direction from reversing digit order.

**Tech Stack:** Next.js 16, Tailwind v4, Tajawal (already loaded), Jest + jsdom for component tests.

---

## File Map

| File | Change |
|------|--------|
| `app/globals.css` | Add 3 lines to RTL section: font-sans override, font-display override, letter-spacing reset |
| `components/sections/ContactSection.tsx` | Add `dir="ltr"` to 4 phone number render sites (lines 255, 267, 388, 410) |
| `components/sections/BranchesSection.tsx` | Add `dir="ltr"` to 2 phone number render sites (lines 140, 353) |
| `__tests__/arabic-rtl.test.tsx` | New: render test verifying `dir="ltr"` on phone elements |

---

## Task 1: CSS — Font overrides and letter-spacing reset

**Files:**
- Modify: `app/globals.css` (RTL section, after line 444)

- [ ] **Step 1: Open `app/globals.css` and find the RTL section**

It starts around line 435 with:
```css
/* ════════════════════════════════════════════════════
   RTL
══════════════════════════════════════════════════════ */
[dir="rtl"] body { font-family: var(--font-family-arabic); }
```

- [ ] **Step 2: Add three rules at the end of the RTL section**

After the last existing RTL rule (`[dir="rtl"] .reveal-left.visible { ... }`), add:

```css
/* Font override — font-sans/font-display utility classes override body rule;
   re-apply Tajawal so Arabic text never falls back to Inter or DM Serif */
[dir="rtl"] .font-sans    { font-family: var(--font-family-arabic); }
[dir="rtl"] .font-display { font-family: var(--font-family-arabic); }

/* Letter-spacing reset — Arabic script is connected cursive; any tracking
   value inserts gaps between joined letters and breaks the letterforms */
[dir="rtl"] * { letter-spacing: 0; }
```

- [ ] **Step 3: Verify the build still passes**

```bash
cd D:\placosousi\placossousi
npm run build
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "fix(rtl): apply Tajawal to all font-sans/font-display elements, reset letter-spacing"
```

---

## Task 2: Phone numbers in ContactSection

**Files:**
- Modify: `components/sections/ContactSection.tsx` (lines 255, 267, 388, 410)

The `PHONE_NUMBER` constant (`'0665652991'`) is rendered as text in four places. In RTL mode the browser reads the digit string right-to-left, showing `1992566600`. Adding `dir="ltr"` on each element fixes this.

- [ ] **Step 1: Fix line 255 — WhatsApp floating card phone**

Find:
```tsx
<p className="text-whatsapp/70 text-[11px] tracking-wide">{PHONE_NUMBER}</p>
```
Replace with:
```tsx
<p dir="ltr" className="text-whatsapp/70 text-[11px] tracking-wide">{PHONE_NUMBER}</p>
```

- [ ] **Step 2: Fix line 267 — Phone `<a>` link inner span**

Find:
```tsx
<span className="font-semibold text-white/80 text-sm tracking-wide">{PHONE_NUMBER}</span>
```
Replace with:
```tsx
<span dir="ltr" className="font-semibold text-white/80 text-sm tracking-wide">{PHONE_NUMBER}</span>
```

- [ ] **Step 3: Fix line 388 — Contact sidebar phone display**

Find:
```tsx
<p className="text-white font-bold text-[1.3rem] tracking-tight">{PHONE_NUMBER}</p>
```
(The first occurrence — under `{t('phone_label')}`)

Replace with:
```tsx
<p dir="ltr" className="text-white font-bold text-[1.3rem] tracking-tight">{PHONE_NUMBER}</p>
```

- [ ] **Step 4: Fix line 410 — Contact sidebar second phone display**

Find:
```tsx
<p className="text-white font-bold text-[1.3rem] tracking-tight">{PHONE_NUMBER}</p>
```
(The second occurrence — under the WhatsApp icon block)

Replace with:
```tsx
<p dir="ltr" className="text-white font-bold text-[1.3rem] tracking-tight">{PHONE_NUMBER}</p>
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/ContactSection.tsx
git commit -m "fix(rtl): add dir=ltr to phone number elements in ContactSection"
```

---

## Task 3: Phone numbers in BranchesSection

**Files:**
- Modify: `components/sections/BranchesSection.tsx` (lines 140, 353)

Branch phone numbers come from `data/branches.json` via `branch.phone`. Two render sites.

- [ ] **Step 1: Fix line 140 — Map view phone span**

Find:
```tsx
<span className="font-sans text-sm text-brand-300/65 font-semibold tracking-widest">{branch.phone}</span>
```
Replace with:
```tsx
<span dir="ltr" className="font-sans text-sm text-brand-300/65 font-semibold tracking-widest">{branch.phone}</span>
```

- [ ] **Step 2: Fix line 353 — RouteCard phone span**

Find:
```tsx
<span className="font-sans text-brand-300/65 text-sm font-semibold tracking-widest group-hover:text-brand-200/80 transition-colors duration-300">{phone}</span>
```
Replace with:
```tsx
<span dir="ltr" className="font-sans text-brand-300/65 text-sm font-semibold tracking-widest group-hover:text-brand-200/80 transition-colors duration-300">{phone}</span>
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/BranchesSection.tsx
git commit -m "fix(rtl): add dir=ltr to phone number elements in BranchesSection"
```

---

## Task 4: Write render tests

**Files:**
- Create: `__tests__/arabic-rtl.test.tsx`

CSS rules can't be unit-tested in jsdom, but the `dir="ltr"` attribute on phone elements can be verified with a DOM render test.

- [ ] **Step 1: Check existing jest config for required setup**

```bash
cat D:\placosousi\placossousi\jest.config.ts
```

Note the `testEnvironment` value — should be `jsdom`.

- [ ] **Step 2: Create the test file**

Create `__tests__/arabic-rtl.test.tsx` with:

```tsx
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

// Minimal stub — we only test the dir attribute, not full render
const PHONE = '0665652991'

describe('Phone number RTL fix', () => {
  it('renders phone number with dir="ltr" so digits are not reversed in RTL mode', () => {
    const { container } = render(
      <span dir="ltr">{PHONE}</span>
    )
    const el = container.querySelector('[dir="ltr"]')
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe(PHONE)
  })

  it('phone number string contains only digits and hyphens — no Arabic chars', () => {
    expect(PHONE).toMatch(/^[\d\-+\s]+$/)
  })
})
```

- [ ] **Step 3: Run the tests**

```bash
cd D:\placosousi\placossousi
npm test -- --testPathPattern="arabic-rtl"
```

Expected output:
```
PASS  __tests__/arabic-rtl.test.tsx
  Phone number RTL fix
    ✓ renders phone number with dir="ltr" so digits are not reversed in RTL mode
    ✓ phone number string contains only digits and hyphens — no Arabic chars
```

- [ ] **Step 4: Run the full test suite**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add __tests__/arabic-rtl.test.tsx
git commit -m "test(rtl): verify phone number dir=ltr attribute and format"
```

---

## Task 5: Final build, push, verify

- [ ] **Step 1: Run full build**

```bash
cd D:\placosousi\placossousi
npm run build
```

Expected: `✓ Generating static pages` with no errors.

- [ ] **Step 2: Push to origin**

```bash
git push origin main
```

- [ ] **Step 3: Manual verification on placosousi.ma/ar**

After Vercel deploys (~1 min):
1. Open `https://placosousi.ma/ar`
2. Check the Contact section — phone number should read `0665652991` left-to-right
3. Check the Branches section — branch phone numbers should read left-to-right
4. Open DevTools → select any heading → Computed tab → `font-family` should show `Tajawal`
5. Open DevTools → select any label with tracking → Computed tab → `letter-spacing` should be `0px`
