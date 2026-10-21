import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from './i18n'

type AnyRecord = Record<string, any>

export type CmsContent = {
  header?: AnyRecord
  home?: AnyRecord
  footer?: AnyRecord
  stats?: AnyRecord
  series?: AnyRecord | null
  formats?: AnyRecord[]
  portfolios?: AnyRecord[]
}

/**
 * Reads published content for the active locale.
 * Returns an empty object when the database is unavailable so the page can
 * fall back to the dictionary defaults.
 */
export async function getCmsContent(locale: Locale): Promise<CmsContent> {
  try {
    const payload = await getPayload({ config })
    const [header, home, footer, stats, seriesResult, formatResult, portfolioResult] = await Promise.all([
      payload.findGlobal({ slug: 'header', locale, depth: 0 }),
      payload.findGlobal({ slug: 'home', locale, depth: 0 }),
      payload.findGlobal({ slug: 'footer', locale, depth: 0 }),
      payload.findGlobal({ slug: 'stats', locale, depth: 0 }),
      payload.find({
        collection: 'projects',
        where: {
          and: [{ category: { equals: 'series' } }, { _status: { equals: 'published' } }],
        },
        limit: 1,
        depth: 1,
        locale,
        sort: 'order',
      }),
      payload.find({
        collection: 'projects',
        where: {
          and: [
            { category: { in: ['tutorial', 'short-film', 'music-video'] } },
            { _status: { equals: 'published' } },
          ],
        },
        limit: 10,
        depth: 1,
        locale,
        sort: 'order',
      }),
      payload.find({
        collection: 'projects',
        where: { _status: { equals: 'published' } },
        limit: 50,
        depth: 1,
        locale,
        sort: 'order',
      }),
    ])

    return {
      header,
      home,
      footer,
      stats,
      series: seriesResult.docs[0] ?? null,
      formats: formatResult.docs,
      portfolios: portfolioResult.docs,
    }
  } catch (error) {
    console.error('[cms] unable to read content', error)
    return {}
  }
}
