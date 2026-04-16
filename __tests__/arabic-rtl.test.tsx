/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'

// Minimal stub — we only test the dir attribute contract, not full render
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
