export const WHATSAPP_NUMBER = '212665652991'
export const PHONE_NUMBER = '0665652991'
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`

export const LOCALES = ['fr', 'ar'] as const
export type Locale = typeof LOCALES[number]
