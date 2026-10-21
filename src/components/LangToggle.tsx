'use client'

import type { Locale } from '@/lib/i18n'

export function LangToggle({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (next: Locale) => void
}) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full bg-white/[0.06] p-0.5"
      role="group"
      aria-label="Language"
    >
      {(['en', 'id'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
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
