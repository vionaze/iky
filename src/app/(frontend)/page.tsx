import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { LangToggle } from '@/components/LangToggle'
import { getDict, type Locale } from '@/lib/i18n'
import { getCmsContent } from '@/lib/cms'
import LiquidScene from '@/components/LiquidScene'

type AnyRecord = Record<string, any>

export const metadata: Metadata = {
  title: 'Ikymian Studios — AI Filmmaker & Content Creator',
  description:
    'Portfolio of Ikymian Studios — series, music video, short film, and tutorial with an AI-driven creative approach.',
}

const partners = [
  { name: 'CapCut', src: '/images/partners/capcut.svg', className: 'brightness-0' },
  { name: 'OiiOii', src: '/images/partners/oiioii.png', className: 'grayscale' },
  { name: 'Pixmax', src: '/images/partners/pixmax.svg', className: 'brightness-0' },
  { name: 'TopMediai', src: '/images/partners/topmediai.png', className: 'grayscale' },
  { name: 'OpenArt', src: '/images/partners/openart.png', className: 'brightness-0' },
  { name: 'AKOOL', src: '/images/partners/akool.png', className: 'brightness-0' },
]

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale: Locale = cookieStore.get('lang')?.value === 'id' ? 'id' : 'en'
  const t = getDict(locale)
  const cms = await getCmsContent(locale)

  const navItems =
    Array.isArray(cms.header?.navItems) && cms.header.navItems.length > 0
      ? cms.header.navItems
      : [
          { label: t.nav.work, href: '#work' },
          { label: t.nav.about, href: '#about' },
          { label: t.nav.contact, href: '#contact' },
        ]

  const heroTitle = cms.home?.hero?.title || t.hero.title
  const heroLead = cms.home?.hero?.subtitle || t.hero.lead
  const ctaPrimaryLabel = cms.home?.hero?.ctaPrimary?.label || t.hero.primary
  const ctaSecondaryLabel = cms.home?.hero?.ctaSecondary?.label || t.hero.secondary
  const worksLabel = cms.home?.works?.title || t.works.label
  const worksIntro = cms.home?.works?.intro || t.works.intro
  const impactLabel = cms.home?.impact?.title || t.impact.label
  const impactNote = cms.home?.impact?.intro || t.impact.note
  const aboutHeadline = cms.home?.about?.title || t.about.title
  const contactTitle = cms.home?.contact?.title || t.contact.title

  const seriesDoc = cms.series
  const seriesTitle = seriesDoc?.title || t.works.series.title
  const seriesDesc = seriesDoc?.context || t.works.series.desc
  const seriesHref = seriesDoc?.link || t.works.series.href
  const seriesPoster = seriesDoc?.media?.[0]?.url || '/images/works/berondong/ep01.jpg'
  const episodeList =
    Array.isArray(seriesDoc?.episodes) && seriesDoc.episodes.length > 0
      ? seriesDoc.episodes.map((episode: AnyRecord) => ({
          ep: episode.label,
          title: episode.title,
          duration: episode.duration,
          href: episode.href,
        }))
      : t.works.episodes
  const seriesMeta =
    locale === 'id'
      ? `Series \u00b7 ${episodeList.length} episode`
      : `Series \u00b7 ${episodeList.length} episodes`

  const stats = cms.stats
  const followersTotal =
    Array.isArray(stats?.platforms) && stats.platforms.length > 0
      ? stats.platforms.reduce(
          (sum: number, platform: AnyRecord) =>
            sum + (typeof platform.followers === 'number' ? platform.followers : 0),
          0,
        )
      : null
  const engagementValue =
    Array.isArray(stats?.engagement) && typeof stats.engagement[0]?.value === 'number'
      ? stats.engagement[0].value
      : null

  const statValues: Array<number | null> = [
    typeof stats?.totalViews === 'number' ? stats.totalViews : null,
    followersTotal,
    engagementValue,
    typeof stats?.videosCreated === 'number' ? stats.videosCreated : null,
    typeof stats?.completedCampaigns === 'number' ? stats.completedCampaigns : null,
    typeof stats?.nominations === 'number' ? stats.nominations : null,
  ]

  const formatStat = (value: number | null) =>
    typeof value === 'number'
      ? value.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US')
      : t.impact.empty
  const email = cms.footer?.email || t.contact.email
  const footerCopyright = cms.footer?.copyright || t.footer
  const socials =
    Array.isArray(cms.footer?.socials) && cms.footer.socials.length > 0
      ? cms.footer.socials
          .filter((item: AnyRecord) => item.visible !== false)
          .map((item: AnyRecord) => ({ name: item.label || item.platform, href: item.url }))
      : t.socials

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-0 focus:top-0 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
      >
        Skip to work
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/70 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-6">
          <a href="#top" className="flex flex-col leading-none" aria-label="Ikymian Studios">
            <span className="font-display text-[17px] font-semibold tracking-tight">Ikymian Studios</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">Caisart Felix</span>
          </a>

          <nav className="flex items-center gap-6 sm:gap-7" aria-label="Main">
            {navItems.map((item: AnyRecord) => (
              <a
                key={item.href}
                className="hidden text-[13px] text-muted transition-colors hover:text-ink sm:block"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
            <LangToggle locale={locale} />
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -left-48 -top-64 size-[38rem] rounded-full bg-milk/70 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-6 size-[34rem] rounded-full bg-pink/70 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12rem] left-1/3 size-[30rem] rounded-full bg-indigo/10 blur-3xl" />

          <div className="relative mx-auto grid w-[min(1160px,calc(100%-32px))] items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-4 lg:py-20">
            <div className="lg:col-span-7">
              <p className="animate-rise flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-indigo" />
                {t.hero.eyebrow}
              </p>
              <h1 className="animate-rise mt-7 max-w-[13ch] font-display text-[clamp(2.6rem,6.2vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.045em] [animation-delay:90ms]">
                {heroTitle}
              </h1>
              <p className="animate-rise mt-7 max-w-[42ch] text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-muted [animation-delay:180ms]">
                {heroLead}
              </p>
              <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:270ms]">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink active:translate-y-px"
                >
                  {ctaPrimaryLabel}
                  <span aria-hidden="true" className="text-xs">↗</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-indigo hover:text-indigo active:translate-y-px"
                >
                  {ctaSecondaryLabel}
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[380px] items-end justify-center sm:min-h-[460px] lg:col-span-5 lg:min-h-[560px]">
              <LiquidScene />
              <img
                src="/images/hero-1.png"
                alt="Portrait of an Ikymian Studios visual character"
                width={1200}
                height={896}
                className="relative z-10 mx-auto h-auto w-auto max-h-[48vh] object-contain drop-shadow-[0_36px_60px_rgba(37,37,65,0.18)] lg:max-h-[66vh]"
              />
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-line bg-[#e9f1fb] py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {worksLabel}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                {t.works.index} / Work
              </span>
            </div>
            <p className="mt-3 max-w-[54ch] text-muted">{worksIntro}</p>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <a
                    href={seriesHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-[20px] border border-ink/10 bg-cream"
                  >
                    <img
                      src={seriesPoster}
                      alt={seriesTitle}
                      className="aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-cream/30 bg-ink/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur">
                      {seriesMeta}
                    </span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-display text-[clamp(1.7rem,2.8vw,2.25rem)] font-medium tracking-[-0.03em]">
                  {seriesTitle}
                </h3>
                <p className="mt-3 max-w-[48ch] text-muted">{seriesDesc}</p>

                <ol className="mt-8 divide-y divide-line border-y border-line">
                  {episodeList.map((episode: AnyRecord) => (
                    <li key={episode.ep}>
                      <a
                        href={episode.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-[52px_1fr_auto] items-center gap-4 py-4 transition-[padding,background-color] duration-300 hover:bg-indigo/[0.04] hover:pl-2 sm:grid-cols-[52px_1fr_auto_auto]"
                      >
                        <span className="text-[10px] uppercase tracking-[0.16em] text-indigo">{episode.ep}</span>
                        <span className="text-[15px] tracking-[-0.01em]">{episode.title}</span>
                        <span className="hidden text-xs text-muted sm:block">{episode.duration}</span>
                        <span
                          aria-hidden="true"
                          className="text-sm text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="mt-16 text-[10px] uppercase tracking-[0.2em] text-muted">{t.works.other}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-12">
              {t.works.formats.map((format, index) => {
                const span = ['md:col-span-5', 'md:col-span-4', 'md:col-span-3'][index]
                const tint = ['bg-milk/50', 'bg-pink/55', 'bg-indigo/[0.09]'][index]
                return (
                  <a
                    key={format.name}
                    href={format.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex min-h-[190px] flex-col justify-between rounded-[18px] border border-ink/10 p-6 transition-transform duration-300 hover:-translate-y-1 ${span} ${tint}`}
                  >
                    <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
                      <span>0{index + 1}</span>
                      <span>{t.works.platform}</span>
                    </span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium tracking-[-0.03em]">
                        {format.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-base transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        <section id="impact" className="border-t border-line bg-pink/40 py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {impactLabel}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                {t.impact.index} / Impact
              </span>
            </div>

            <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {t.impact.metrics.map((metric, index) => (
                <div key={metric} className="border-t border-ink/15 py-5">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink/60">{metric}</dt>
                  <dd className="mt-2 text-sm text-muted">{formatStat(statValues[index] ?? null)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[62ch] text-[13px] leading-relaxed text-muted">{impactNote}</p>
          </div>
        </section>

        <section id="about" className="border-t border-line py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {t.about.label}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                {t.about.index} / About
              </span>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.03em]">
                  {aboutHeadline}
                </p>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed">{t.about.lead}</p>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">{t.about.body}</p>
              </div>

              <aside className="lg:col-span-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{t.about.processLabel}</p>
                <ol className="mt-4 divide-y divide-line border-y border-line">
                  {t.about.process.map((step, index) => (
                    <li key={step} className="flex items-center justify-between gap-6 py-3 text-sm">
                      <span>{step}</span>
                      <span className="text-[11px] text-indigo">0{index + 1}</span>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>

            <div className="mt-16 border-t border-line pt-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{t.about.partnersLabel}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
                {partners.map((partner) => (
                  <img
                    key={partner.name}
                    src={partner.src}
                    alt={partner.name}
                    loading="lazy"
                    className={`h-5 w-auto object-contain opacity-60 transition-opacity hover:opacity-100 ${partner.className}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-line py-20 md:py-28"
          style={{
            background:
              'radial-gradient(ellipse 55% 75% at 85% 18%, rgba(240,203,220,0.9), transparent 62%), radial-gradient(ellipse 50% 70% at 6% 92%, rgba(184,212,242,0.9), transparent 64%), #faf7f2',
          }}
        >
          <div className="mx-auto flex w-[min(1160px,calc(100%-32px))] flex-wrap items-end justify-between gap-10">
            <div>
              <h2 className="max-w-[13ch] font-display text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.045em]">
                {contactTitle}
              </h2>
              <a
                href={`mailto:${email}`}
                className="mt-7 inline-block border-b border-indigo pb-1 text-[clamp(1.125rem,2.2vw,1.625rem)] transition-colors hover:text-indigo"
              >
                {email}
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((social: AnyRecord) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted transition-colors hover:text-ink"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted">{t.contact.index} / Contact</span>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-7">
        <div className="mx-auto flex w-[min(1160px,calc(100%-32px))] flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span>{footerCopyright}</span>
          <span>Caisart Felix</span>
        </div>
      </footer>
    </>
  )
}
