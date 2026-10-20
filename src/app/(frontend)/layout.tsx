import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Bricolage_Grotesque, DM_Sans, Instrument_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/Preloader'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const dm = DM_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-dm',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ikymian Studios — AI Filmmaker & Content Creator',
  description:
    'Portfolio of Ikymian Studios — series, music video, short film, and tutorial with an AI-driven creative approach.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('lang')?.value === 'id' ? 'id' : 'en'

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${dm.variable} ${montserrat.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('iky-intro-seen')==='1'){document.documentElement.classList.add('intro-seen')}}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`[data-preloader]{display:none}`}</style>
        </noscript>
        <Preloader />
        {children}
      </body>
    </html>
  )
}
