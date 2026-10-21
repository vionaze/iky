'use client'

import { useState } from 'react'
import { flushSync } from 'react-dom'
import { LangToggle } from '@/components/LangToggle'
import { getDict, type Locale } from '@/lib/i18n'
import HeroStage from '@/components/HeroStage'
import Jellyfish from '@/components/Jellyfish'
import WorksCarousel from '@/components/WorksCarousel'
import LoopingWords from '@/components/LoopingWords'
import ContactCta from '@/components/ContactCta'
import MagicDust from '@/components/MagicDust'
import CountUp from '@/components/CountUp'

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

type LandingProps = {
  initialLocale: Locale
  cmsEn: AnyRecord
  cmsId: AnyRecord
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'X') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 3h4.2l4.4 5.9L17.8 3H20l-6.1 7.2L21 21h-4.2l-4.8-6.4L6.2 21H4l6.5-7.7L4 3z" />
      </svg>
    )
  }

  if (name === 'TikTok') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    )
  }

  if (name === 'Threads') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
      </svg>
    )
  }

  if (name === 'YouTube') {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
        <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return null
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

  const cmsNavItems = Array.isArray(cms.header?.navItems)
    ? cms.header.navItems.filter(
        (item: AnyRecord) => typeof item?.label === 'string' && item.label.trim().length > 0,
      )
    : []

  const navItems =
    cmsNavItems.length > 0
      ? cmsNavItems
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
  const impactLabel = t.impact.label
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
  const statValues: Array<number | null> = [
    typeof stats?.totalViews === 'number' ? stats.totalViews : null,
    followersTotal,
    typeof stats?.videosCreated === 'number' ? stats.videosCreated : null,
    typeof stats?.completedCampaigns === 'number' ? stats.completedCampaigns : null,
  ]

  const nominationItems =
    typeof stats?.nominationsText === 'string'
      ? stats.nominationsText
          .split('\n')
          .map((item: string) => item.trim())
          .filter(Boolean)
      : []

  const formatStat = (value: number | null) =>
    typeof value === 'number'
      ? value.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US')
      : t.impact.empty
  const email = cms.home?.contact?.email || cms.footer?.email || t.contact.email
  const footerCopyright = cms.footer?.copyright || t.footer
  const socials =
    Array.isArray(cms.footer?.socials) && cms.footer.socials.length > 0
      ? cms.footer.socials
          .filter((item: AnyRecord) => item.visible !== false)
          .map((item: AnyRecord) => ({ name: item.label || item.platform, href: item.url }))
      : t.socials

  const heroStage = {
    small: cms.home?.heroStage?.small || t.heroStage.small,
    ghost: cms.home?.heroStage?.ghost || t.heroStage.ghost,
    cta: cms.home?.heroStage?.cta || t.heroStage.cta,
  }

  const aboutMe = {
    title: cms.home?.aboutMe?.title || t.aboutMe.title,
    lead: cms.home?.aboutMe?.lead || t.aboutMe.lead,
    p1: cms.home?.aboutMe?.p1 || t.aboutMe.p1,
    p2: cms.home?.aboutMe?.p2 || t.aboutMe.p2,
    p3: cms.home?.aboutMe?.p3 || t.aboutMe.p3,
    closing: cms.home?.aboutMe?.closing || t.aboutMe.closing,
  }

  const processWords =
    Array.isArray(cms.home?.about?.processWords) && cms.home.about.processWords.length > 0
      ? cms.home.about.processWords.map((item: AnyRecord) => item.word).filter(Boolean)
      : t.about.process

  const cmsPartners = Array.isArray(cms.home?.about?.partners)
    ? cms.home.about.partners.filter((item: AnyRecord) => item?.name && item?.logo?.url)
    : []

  const partnerItems =
    cmsPartners.length > 0
      ? cmsPartners.map((item: AnyRecord) => ({
          name: item.name,
          src: item.logo.url,
          invert: Boolean(item.invert),
          square: Boolean(item.square),
        }))
      : partners

  const carouselFallbackImages = [
    seriesPoster,
    seriesPoster,
    seriesPoster,
    seriesPoster,
    seriesPoster,
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.webp',
  ]

  const cmsCarousel = Array.isArray(cms.home?.works?.carousel) ? cms.home.works.carousel : []

  const categoryLabels: Record<string, string> = {
    series: 'Series',
    tutorial: 'Tutorial AI',
    'short-film': 'Short Film',
    'music-video': 'Music Video',
  }

  const categoryFallback: Record<string, string> = {
    series: seriesPoster,
    tutorial: '/images/hero-1.png',
    'short-film': '/images/hero-2.png',
    'music-video': '/images/hero-3.webp',
  }

  const cmsProjects = Array.isArray(cms.portfolios) ? cms.portfolios : []

  const portfolioCards = cmsProjects
    .filter((item: AnyRecord) => item?.title)
    .map((item: AnyRecord) => {
      const firstMedia = Array.isArray(item.media) ? item.media[0] : item.media
      const episodeCount = Array.isArray(item.episodes) ? item.episodes.length : 0

      return {
        img: firstMedia?.url || categoryFallback[item.category] || seriesPoster,
        kicker: categoryLabels[item.category] || '',
        meta: item.category === 'series' ? (episodeCount > 0 ? `${episodeCount} Episodes` : 'Series') : '',
        title: item.title,
        href: item.link || '#work',
      }
    })

  const carouselCards =
    portfolioCards.length > 0
      ? portfolioCards.length >= 8
        ? portfolioCards
        : Array.from({ length: Math.ceil(8 / portfolioCards.length) }).flatMap(() => portfolioCards)
      : cmsCarousel.length > 0
      ? cmsCarousel.map((item: AnyRecord, index: number) => ({
          img: item.image?.url || carouselFallbackImages[index % carouselFallbackImages.length],
          kicker: item.kicker || '',
          meta: item.meta || '',
          title: item.title || '',
          href: item.href || '#work',
        }))
      : [
          { img: seriesPoster, kicker: 'Series', meta: '05 Episodes', title: seriesTitle, href: seriesHref },
          ...episodeList.slice(1).map((episode: AnyRecord) => ({
            img: seriesPoster,
            kicker: 'Series',
            meta: episode.ep,
            title: episode.title,
            href: seriesHref,
          })),
          { img: '/images/hero-1.png', kicker: 'Tutorial AI', title: 'AI Tutorial', href: '#work' },
          { img: '/images/hero-2.png', kicker: 'Short Film', title: 'Short Film', href: '#work' },
          { img: '/images/hero-3.webp', kicker: 'Music Video', title: 'Music Video', href: '#work' },
        ]

  const marqueeText = cms.home?.footerMarquee || 'Ikymian Studios • Caisart Felix •'

  const contactCtaLabel = cms.home?.contact?.ctaLabel || t.contact.cta

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-0 focus:top-0 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
      >
        Skip to work
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/70 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[84px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-4">
          <a href="#top" className="flex items-center" aria-label="Ikymian Studios">
            <span className="font-display text-[clamp(18px,2.1vw,30px)] font-semibold uppercase leading-none tracking-[0.12em]">
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
          small={heroStage.small}
          ghost={heroStage.ghost}
          cta={heroStage.cta}
        />


        <WorksCarousel
          label={worksLabel}
          index={t.works.index}
          cards={carouselCards}
        />

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

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-3">
              {t.impact.metrics.map((metric, index) => {
                const isNominations = index === t.impact.metrics.length - 1
                const value = statValues[index]

                return (
                  <div key={metric}>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">{metric}</dt>
                    {isNominations ? (
                      nominationItems.length > 0 ? (
                        <dd className="mt-3 space-y-1.5">
                          {nominationItems.map((nomination: string) => (
                            <span
                              key={nomination}
                              className="block font-display text-[clamp(0.95rem,1.3vw,1.15rem)] leading-snug"
                            >
                              {nomination}
                            </span>
                          ))}
                        </dd>
                      ) : (
                        <dd className="mt-3 text-[clamp(1rem,1.4vw,1.15rem)] text-muted">{t.impact.empty}</dd>
                      )
                    ) : (
                      <dd className="mt-3 font-display text-[clamp(2rem,4.8vw,4.25rem)] font-medium leading-none tracking-[-0.04em]">
                        {typeof value === 'number' ? (
                          <CountUp value={value} locale={locale === 'id' ? 'id-ID' : 'en-US'} />
                        ) : (
                          <span className="text-[clamp(1rem,1.4vw,1.15rem)] font-normal tracking-normal text-muted">
                            {t.impact.empty}
                          </span>
                        )}
                      </dd>
                    )}
                  </div>
                )
              })}
            </dl>

          </div>
        </section>

        <section id="about" className="border-t border-line py-16 md:py-20">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium tracking-[-0.035em]">
                {aboutMe.title}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.22em] text-pink">
                {t.about.index} / About
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="font-display text-[clamp(1.15rem,1.7vw,1.4rem)] leading-snug text-pink">
                  {aboutMe.lead}
                </p>
                <div className="mt-5 max-w-[58ch] space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>{aboutMe.p1}</p>
                  <p>{aboutMe.p2}</p>
                  <p>{aboutMe.p3}</p>
                </div>
                <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-pink">
                  {aboutMe.closing}
                </p>

                <div className="mt-10 border-t border-line pt-8">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-pink">
                    {t.about.processLabel}
                  </p>
                  <div className="mt-5">
                    <LoopingWords words={processWords} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-[22px] border border-line lg:sticky lg:top-28">
                  <img
                    src="/images/about/caisart.jpg"
                    alt="M. Rizki Firmansyah — Ikymian Studios"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 mb-6 border-t border-line p-6">
              <p className="text-center text-[13px] uppercase tracking-[0.24em] text-pink">
                {t.about.partnersLabel}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {partnerItems.map((partner: AnyRecord, index: number) => (
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
                      className={`h-12 w-auto max-w-[240px] object-contain ${partner.square ? 'sm:h-20' : 'sm:h-16'} ${partner.invert ? 'invert' : ''}`}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-t border-line py-20 md:py-28"
          style={{
            background:
              'radial-gradient(ellipse 55% 75% at 85% 18%, rgba(255,138,193,0.3), transparent 62%), radial-gradient(ellipse 50% 70% at 6% 92%, rgba(111,141,255,0.22), transparent 64%), #0f1438',
          }}
        >
          <MagicDust />

          <div className="relative z-10 mx-auto flex w-[min(1160px,calc(100%-32px))] flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.22em] text-pink">
              {t.contact.index} / Contact
            </span>

            <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
              <h2 className="max-w-[13ch] font-display text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.045em]">
                {contactTitle}
              </h2>
              <ContactCta href={`mailto:${email}`} label={contactCtaLabel} />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
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
        </section>
      </main>

      <Jellyfish />

      <footer className="relative overflow-hidden border-t border-line bg-cream-deep">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-pink/[0.18] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative w-full overflow-hidden px-5 pt-10 md:px-0 md:pt-14">
          <div className="footer-marquee flex w-max items-center whitespace-nowrap" aria-hidden="true">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="font-display text-[11vw] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.055] select-none"
              >
                {marqueeText}{' '}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full px-6 pb-12 pt-8 md:px-12 md:pb-16">
          <div className="flex flex-col gap-6 pb-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.footerStatus}
              </span>
              <nav className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.2em] text-muted" aria-label="Footer">
                {navItems.map((item: AnyRecord) => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
                    {item.label}
                  </a>
                ))}
                <a href="#top" className="transition-colors hover:text-ink">
                  {t.footerTop}
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {['Instagram', 'TikTok', 'X', 'YouTube', 'Threads']
                .map((name) => socials.find((social: AnyRecord) => social.name === name))
                .filter(Boolean)
                .map((social: AnyRecord) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-pink/60 hover:text-ink"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
            </div>
          </div>

          <div className="border-t border-line pt-6 text-center text-[10px] uppercase tracking-[0.32em] text-muted/60">
            {t.hero.eyebrow} • {footerCopyright}
          </div>
        </div>
      </footer>
    </>
  )
}
