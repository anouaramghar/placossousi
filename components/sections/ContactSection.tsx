// components/sections/ContactSection.tsx
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function ContactSection() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) (e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="bg-brand-700 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h2 className="text-white text-3xl md:text-4xl font-black mb-10">{t('title')}</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href="tel:0665652991"
              className="flex items-center gap-4 bg-brand-800 rounded-xl p-5 border border-brand-700 hover:border-brand-400 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-brand-300 text-xs mb-1">{t('phone_label')}</p>
                <p className="text-white font-bold">0665 652 991 / 0661 827 712</p>
              </div>
            </a>
            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-brand-800 rounded-xl p-5 border border-brand-700 hover:border-whatsapp transition-colors"
            >
              <span className="text-2xl text-whatsapp">●</span>
              <div>
                <p className="text-brand-300 text-xs mb-1">{t('whatsapp_label')}</p>
                <p className="text-white font-bold">0665 652 991</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              required
              placeholder={t('form_name')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder={t('form_phone')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder={t('form_message')}
              className="w-full bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder-brand-300 focus:outline-none focus:border-brand-400 resize-none"
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="w-full bg-brand-400 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {status === 'sending' ? '...' : t('form_submit')}
            </button>
            {status === 'success' && <p className="text-green-400 text-sm">{t('form_success')}</p>}
            {status === 'error' && <p className="text-red-400 text-sm">{t('form_error')}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
