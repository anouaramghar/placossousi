// i18n.ts — next-intl v4 API: use requestLocale, not locale
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'fr'
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
