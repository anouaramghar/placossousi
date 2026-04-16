// proxy.ts — Next.js 16: "middleware" is deprecated, use "proxy" instead
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
})

/**
 * Rewrite / → /fr with no redirect (no round-trip, no 308 cached in browsers).
 * All other paths go through next-intl for locale detection/routing.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/fr', request.url))
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
