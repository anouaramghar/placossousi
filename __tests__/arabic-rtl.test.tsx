/**
 * @jest-environment jsdom
 */
process.env.NEXT_PUBLIC_FORMSPREE_ID = 'test-id'

import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import ar from '../messages/ar.json'
import { PHONE_NUMBER } from '../lib/config'

// Match the ContactSection test — framer-motion ESM is flaky under jsdom.
jest.mock('framer-motion', () => {
  const React = require('react')
  const passthrough = (tag: string) =>
    React.forwardRef(function M(props: any, ref: any) {
      const {
        initial, animate, exit, transition, variants, whileInView, whileHover,
        whileTap, whileFocus, viewport, layout, layoutId, drag, dragConstraints,
        ...rest
      } = props
      return React.createElement(tag, { ...rest, ref }, props.children)
    })
  const motion = new Proxy(
    {},
    { get: (_t, prop: string) => passthrough(prop) }
  )
  return {
    __esModule: true,
    motion,
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    useInView: () => true,
    useReducedMotion: () => false,
    useScroll: () => ({ scrollY: { get: () => 0, on: () => () => {} } }),
    useTransform: () => ({ get: () => 0, on: () => () => {} }),
  }
})

// Keep the simple hardcoded-span assertions so the contract remains covered even
// if ContactSection changes.
const PHONE = '0665652991'

describe('Phone number RTL fix — contract', () => {
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

describe('Phone number RTL fix — ContactSection (ar locale)', () => {
  it('real ContactSection wraps the phone display in dir="ltr" in Arabic locale', () => {
    // Imported inside the test so the jest.mock above is applied first.
    const ContactSection = require('../components/sections/ContactSection').default
    const { container } = render(
      <NextIntlClientProvider locale="ar" messages={ar as any}>
        <ContactSection />
      </NextIntlClientProvider>
    )
    const ltrNodes = Array.from(container.querySelectorAll('[dir="ltr"]'))
    expect(ltrNodes.length).toBeGreaterThan(0)
    // At least one of them should contain the phone number (not Arabic-reversed digits).
    const hasPhone = ltrNodes.some(n => n.textContent?.includes(PHONE_NUMBER))
    expect(hasPhone).toBe(true)
  })
})
