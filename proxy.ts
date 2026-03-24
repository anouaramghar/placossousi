// proxy.ts — Next.js 16: "middleware" is deprecated, use "proxy" instead
import createMiddleware from 'next-intl/middleware'

export const proxy = createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
