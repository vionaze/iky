import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from './i18n'

type AnyRecord = Record<string, any>

export type CmsContent = {
  header?: AnyRecord
  home?: AnyRecord
  footer?: AnyRecord
}

/**
 * Reads published globals for the active locale.
 * Falls back to an empty object so the page can render dictionary defaults
 * when the database is unavailable (e.g. first run before seeding).
 */
export async function getCmsContent(locale: Locale): Promise<CmsContent> {
  try {
    const payload = await getPayload({ config })
    const [header, home, footer] = await Promise.all([
      payload.findGlobal({ slug: 'header', locale, depth: 0 }),
      payload.findGlobal({ slug: 'home', locale, depth: 0 }),
      payload.findGlobal({ slug: 'footer', locale, depth: 0 }),
    ])
    return { header, home, footer }
  } catch (error) {
    console.error('[cms] unable to read globals', error)
    return {}
  }
}
