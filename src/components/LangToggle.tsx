'use client'

import type { Locale } from '@/lib/i18n'

export function LangToggle({ locale }: { locale: Locale }) {
  function setLang(next: Locale) {
    if (next === locale) return
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`
    window.location.reload()
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-line bg-white/50 p-0.5"
      role="group"
      aria-label="Language"
    >
      {(['en', 'id'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={locale === code}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
            locale === code ? 'bg-ink text-cream' : 'text-muted hover:text-ink'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
