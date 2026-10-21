import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { getDict, type Locale } from '@/lib/i18n'
import { getCmsContent } from '@/lib/cms'
import LandingPage from '@/components/LandingPage'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale: Locale = cookieStore.get('lang')?.value === 'id' ? 'id' : 'en'
  const t = getDict(locale)

  return {
    title: 'Ikymian Studios — AI Filmmaker & Content Creator',
    description:
      locale === 'id'
        ? 'Portfolio Ikymian Studios — series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.'
        : 'Portfolio of Ikymian Studios — series, music video, short film, and tutorial with an AI-driven creative approach.',
    alternates: { canonical: 'https://ikymianstudios.si/' },
    openGraph: {
      title: 'Ikymian Studios — AI Filmmaker & Content Creator',
      description: t.hero.lead,
      type: 'website',
      url: 'https://ikymianstudios.si/',
    },
  }
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale: Locale = cookieStore.get('lang')?.value === 'id' ? 'id' : 'en'

  const [cmsEn, cmsId] = await Promise.all([getCmsContent('en'), getCmsContent('id')])

  return <LandingPage initialLocale={locale} cmsEn={cmsEn} cmsId={cmsId} />
}
