// i18n.ts — next-intl v4 API: use requestLocale, not locale
import { getRequestConfig } from 'next-intl/server'
import { LOCALES, type Locale } from './lib/config'

export default getRequestConfig(async ({ requestLocale }) => {
  const candidate = await requestLocale
  const locale: Locale = (LOCALES as readonly string[]).includes(candidate ?? '')
    ? (candidate as Locale)
    : 'fr'
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
