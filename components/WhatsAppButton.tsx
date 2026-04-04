// components/WhatsAppButton.tsx
import { useLocale } from 'next-intl'

export default function WhatsAppButton() {
  const locale = useLocale()

  return (
    <div className="fixed bottom-4 end-4 md:bottom-6 md:end-6 z-50 group scale-90 md:scale-100 origin-bottom-right">
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-[ping_3s_ease-in-out_infinite]"></div>
      <a
        href="https://wa.me/212665652991"
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-gradient-to-br from-whatsapp to-whatsapp-dark text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 block border border-white/20"
        aria-label={locale === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contactez-nous sur WhatsApp'}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-md relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  )
}
