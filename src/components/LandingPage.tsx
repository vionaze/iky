'use client'

import { useState } from 'react'
import { flushSync } from 'react-dom'
import { LangToggle } from '@/components/LangToggle'
import { getDict, type Locale } from '@/lib/i18n'
import HeroStage from '@/components/HeroStage'

type AnyRecord = Record<string, any>

const partners = [
  { name: 'CapCut', src: '/images/partners/capcut.svg', invert: true },
  { name: 'OiiOii', src: '/images/partners/oiioii.png' },
  { name: 'Pixmax', src: '/images/partners/pixmax.svg' },
  { name: 'TopMediai', src: '/images/partners/topmediai.png', square: true },
  { name: 'OpenArt', src: '/images/partners/openart.png', invert: true, square: true },
  { name: 'AKOOL', src: '/images/partners/akool.png' },
  { name: 'Nemo Video', src: '/images/partners/nemo.png' },
  { name: 'Wizstar', src: '/images/partners/wizstar.png' },
  { name: 'Pollo AI', src: '/images/partners/pollo.png' },
]

function LexicalParagraphs({ data }: { data: AnyRecord }) {
  const paragraphs = (data?.root?.children ?? [])
    .filter((node: AnyRecord) => node?.type === 'paragraph')
    .map((node: AnyRecord) =>
      (node?.children ?? [])
        .map((child: AnyRecord) => (typeof child?.text === 'string' ? child.text : ''))
        .join(''),
    )
    .filter(Boolean)

  return (
    <>
      {paragraphs.map((text: string, index: number) => (
        <p key={index}>{text}</p>
      ))}
    </>
  )
}

type LandingProps = {
  initialLocale: Locale
  cmsEn: AnyRecord
  cmsId: AnyRecord
}

export default function LandingPage({ initialLocale, cmsEn, cmsId }: LandingProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const t = getDict(locale)
  const cms = locale === 'id' ? cmsId : cmsEn

  function changeLocale(next: Locale) {
    if (next === locale) return

    const apply = () => {
      flushSync(() => setLocale(next))
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`
      document.documentElement.lang = next
    }

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => unknown
    }

    if (typeof doc.startViewTransition === 'function') {
      try {
        doc.startViewTransition(apply)
        return
      } catch {
        /* fall through to a plain swap */
      }
    }

    apply()
  }

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

  const formatDocs = Array.isArray(cms.formats) ? cms.formats : []
  const formats =
    formatDocs.length > 0
      ? formatDocs.map((item: AnyRecord) => ({
          name: item.title,
          href: item.link,
          poster: item.media?.[0]?.url ?? null,
        }))
      : t.works.formats

  const stats = cms.stats
  const updatedAt = stats?.metricsUpdatedAt ? new Date(stats.metricsUpdatedAt) : null
  const updatedLabel = updatedAt
    ? new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(updatedAt)
    : null

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
        <div className="mx-auto flex min-h-[76px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Ikymian Studios">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-pink to-blue font-display text-[15px] font-semibold text-cream">
              I
            </span>
            <span className="font-display text-[15px] font-semibold uppercase leading-none tracking-[0.14em]">
              Ikymian Studios
            </span>
          </a>

          <nav
            className="flex items-center gap-1 rounded-full border border-line bg-white/[0.04] p-1 sm:pl-3"
            aria-label="Main"
          >
            {navItems.map((item: AnyRecord) => (
              <a
                key={item.href}
                className="hidden rounded-full px-3 py-2 text-[13px] text-muted transition-colors hover:bg-white/[0.06] hover:text-pink sm:block"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
            <LangToggle locale={locale} onChange={changeLocale} />
          </nav>
        </div>
      </header>

      <main>
        <HeroStage
          small={t.heroStage.small}
          ghost={t.heroStage.ghost}
          subline={t.heroStage.subline}
          cta={t.heroStage.cta}
        />

        <section id="work" className="border-t border-line bg-cream-deep py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {worksLabel}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-pink">
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
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
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

            <p className="mt-16 text-[10px] uppercase tracking-[0.2em] text-pink">{t.works.other}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-12">
              {formats.map((format: AnyRecord, index: number) => {
                const span = ['md:col-span-5', 'md:col-span-4', 'md:col-span-3'][index]
                const tint = ['bg-milk/15', 'bg-pink/20', 'bg-indigo/10'][index]
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

        <section id="impact" className="border-t border-line bg-pink/[0.16] py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {impactLabel}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-pink">
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
            {Array.isArray(stats?.platforms) && stats.platforms.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-muted">
                {stats.platforms.map((platform: AnyRecord) => (
                  <li key={platform.name}>
                    {platform.name}
                    {typeof platform.followers === 'number'
                      ? ` · ${platform.followers.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US')}`
                      : ''}
                  </li>
                ))}
              </ul>
            ) : null}
            {updatedLabel ? (
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-muted">
                {locale === 'id' ? 'Diperbarui' : 'Updated'} {updatedLabel}
              </p>
            ) : null}
          </div>
        </section>

        <section id="about" className="border-t border-line py-20 md:py-28">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {t.about.label}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-pink">
                {t.about.index} / About
              </span>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.03em]">
                  {aboutHeadline}
                </p>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed">{t.about.lead}</p>
                {cms.home?.about?.body ? (
                  <div className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted [&_p]:mt-3">
                    <LexicalParagraphs data={cms.home.about.body} />
                  </div>
                ) : (
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">{t.about.body}</p>
                )}
              </div>

              <aside className="lg:col-span-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-pink">{t.about.processLabel}</p>
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

            <div className="mt-16 border-t border-line pt-12">
              <p className="text-center text-[10px] uppercase tracking-[0.24em] text-pink">
                {t.about.partnersLabel}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {partners.map((partner, index) => (
                  <span
                    key={partner.name}
                    className="partner-float inline-flex items-center justify-center px-2"
                    style={{
                      animationDelay: `${index * 0.45}s`,
                      animationDuration: `${6.5 + (index % 3)}s`,
                    }}
                  >
                    <img
                      src={partner.src}
                      alt={partner.name}
                      loading="lazy"
                      className={`h-10 w-auto max-w-[210px] object-contain ${partner.square ? 'sm:h-16' : 'sm:h-14'} ${partner.invert ? 'invert' : ''}`}
                    />
                  </span>
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
              'radial-gradient(ellipse 55% 75% at 85% 18%, rgba(255,138,193,0.3), transparent 62%), radial-gradient(ellipse 50% 70% at 6% 92%, rgba(111,141,255,0.22), transparent 64%), #0f1438',
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
                    className="text-[13px] text-muted transition-colors hover:text-pink"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-pink">{t.contact.index} / Contact</span>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-line bg-cream-deep">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-pink/[0.18] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-[min(1160px,calc(100%-32px))] py-14">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <a href="#top" className="inline-flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-pink to-blue font-display text-[15px] font-semibold text-cream">
                  I
                </span>
                <span className="font-display text-lg font-semibold uppercase tracking-[0.14em]">
                  Ikymian Studios
                </span>
              </a>
              <p className="mt-4 max-w-[36ch] text-sm text-muted">{t.hero.eyebrow}.</p>
              <a
                href={`mailto:${email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-pink/60 hover:text-pink"
              >
                {email} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-12 sm:gap-20">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-pink">{t.footerNav}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {navItems.map((item: AnyRecord) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-muted transition-colors hover:text-pink">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-pink">{t.footerSocial}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {socials.map((social: AnyRecord) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-pink"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
            <span>{footerCopyright}</span>
            <div className="flex items-center gap-5">
              <span>Caisart Felix</span>
              <a href="#top" className="text-pink transition-colors hover:text-ink">
                {t.footerTop} ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
