'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import type { Locale } from '@/lib/i18n'

export function LangToggle({ locale }: { locale: Locale }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function setLang(next: Locale) {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => router.refresh())
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-line bg-white/50 p-0.5"
      role="group"
      aria-label="Language"
      data-pending={pending ? 'true' : undefined}
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
