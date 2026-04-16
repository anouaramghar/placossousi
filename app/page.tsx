import { redirect } from 'next/navigation'

// Fallback in case middleware is ever bypassed.
// Middleware rewrites / → /fr with no redirect (zero round-trip cost).
// Using redirect() here (307, never browser-cached) instead of
// permanentRedirect() (308, cached forever) as a safety net only.
export default function RootPage() {
  redirect('/fr')
}
