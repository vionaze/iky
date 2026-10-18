#!/usr/bin/env node
/**
 * Best-effort stats sync using free, unofficial sources.
 *
 * - YouTube: public Innertube "videos" tab (sums view counts of long-form uploads)
 *   plus a free subscriber counter endpoint.
 * - TikTok: public profile page markup (followers, likes, video count).
 * - Instagram: attempted via the public web profile endpoint; usually requires
 *   login, so it is skipped when blocked.
 *
 * Coverage is intentionally partial: total views only sums platforms that
 * expose view counts. This is not an official API and may break without notice.
 *
 * Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/sync-stats.mjs
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD
const YT_CHANNEL_ID = process.env.YT_CHANNEL_ID || 'UCnrT9YuYWe2kgxAHDNjZ7Ag'
const TIKTOK_USER = process.env.TIKTOK_USER || 'caisarttfelix'
const IG_USER = process.env.IG_USER || 'ikymianvt'
const WEB_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
const UA_DESKTOP =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'

if (!EMAIL || !PASSWORD) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD')
  process.exit(1)
}

let token = ''

async function api(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${text.slice(0, 300)}`)
  return data
}

async function login() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`login failed: ${await res.text()}`)
  token = (await res.json()).token
}

function parseCount(value) {
  if (!value) return null
  const normalized = value.replace(/,/g, '').trim()
  const match = normalized.match(/([\d.]+)\s*([KMB])?/i)
  if (!match) return null
  const number = Number.parseFloat(match[1])
  if (!Number.isFinite(number)) return null
  const suffix = (match[2] || '').toUpperCase()
  const factor = suffix === 'K' ? 1e3 : suffix === 'M' ? 1e6 : suffix === 'B' ? 1e9 : 1
  return Math.round(number * factor)
}

async function innertube(body) {
  const res = await fetch(
    `https://www.youtube.com/youtubei/v1/browse?key=${WEB_KEY}&prettyPrint=false`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': UA_DESKTOP },
      body: JSON.stringify({
        context: {
          client: { clientName: 'WEB', clientVersion: '2.20240101.00.00', hl: 'en', gl: 'US' },
        },
        ...body,
      }),
    },
  )
  if (!res.ok) throw new Error(`innertube ${res.status}`)
  return res.json()
}

function collectViewCounts(raw) {
  const counts = []
  for (const match of raw.matchAll(/"([\d.,]+\s*[KMB]?)\s+views"/gi)) {
    const value = parseCount(match[1])
    if (value !== null) counts.push(value)
  }
  return counts
}

function findContinuation(payload) {
  let found = null
  const walk = (node) => {
    if (!node || found) return
    if (Array.isArray(node)) return node.forEach(walk)
    if (typeof node !== 'object') return
    if (typeof node.continuationCommand?.token === 'string') {
      found = node.continuationCommand.token
      return
    }
    Object.values(node).forEach(walk)
  }
  walk(payload)
  return found
}

async function syncYouTube() {
  const first = await innertube({ browseId: YT_CHANNEL_ID, params: 'EgZ2aWRlb3M=' })
  const pages = [JSON.stringify(first)]
  let continuation = findContinuation(first)
  let page = 1

  while (continuation && page < 8) {
    const next = await innertube({ continuation })
    pages.push(JSON.stringify(next))
    continuation = findContinuation(next)
    page += 1
  }

  const views = pages.flatMap(collectViewCounts)
  // Each video can expose its view count more than once (label + accessibility).
  // Keep the larger half as a conservative estimate of unique videos.
  const uniqueEstimate = Math.ceil(views.length / 2)
  const sorted = [...views].sort((a, b) => b - a).slice(0, uniqueEstimate)
  const totalViews = sorted.reduce((sum, value) => sum + value, 0)

  let subscribers = null
  try {
    const res = await fetch(
      `https://api.socialcounts.org/youtube-live-subscriber-count/${YT_CHANNEL_ID}`,
      { headers: { 'User-Agent': UA_DESKTOP } },
    )
    if (res.ok) {
      const data = await res.json()
      subscribers = data?.counters?.estimation?.subscriberCount ?? null
    }
  } catch {
    /* optional */
  }

  return { totalViews, subscribers, pages: pages.length, viewEntries: views.length, videos: uniqueEstimate }
}

async function syncTikTok() {
  const res = await fetch(`https://www.tiktok.com/@${TIKTOK_USER}`, {
    headers: { 'User-Agent': UA_MOBILE, 'Accept-Language': 'en-US,en;q=0.9' },
  })
  if (!res.ok) throw new Error(`tiktok ${res.status}`)
  const html = await res.text()

  const pick = (key) => {
    const match = html.match(new RegExp(`"${key}":(\\d+)`))
    return match ? Number(match[1]) : null
  }

  return {
    followers: pick('followerCount'),
    likes: pick('heartCount'),
    videos: pick('videoCount'),
  }
}

async function syncInstagram() {
  const res = await fetch(
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${IG_USER}`,
    {
      headers: {
        'User-Agent': UA_DESKTOP,
        'x-ig-app-id': '936619743392459',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    },
  )
  if (!res.ok) throw new Error(`instagram ${res.status}`)
  const data = await res.json()
  const user = data?.data?.user
  if (!user) throw new Error('instagram: empty payload')
  return {
    followers: user.edge_followed_by?.count ?? null,
    posts: user.edge_owner_to_timeline_media?.count ?? null,
  }
}

async function main() {
  await login()

  const now = new Date().toISOString()
  const platforms = []
  let totalViews = 0
  let viewCoverage = []

  const yt = await syncYouTube().catch((error) => {
    console.error('youtube failed:', error.message)
    return null
  })
  if (yt) {
    platforms.push({
      name: 'YouTube',
      url: `https://www.youtube.com/channel/${YT_CHANNEL_ID}`,
      followers: yt.subscribers,
      metricsUpdatedAt: now,
      source: `unofficial: innertube videos, ${yt.videos} long-form videos / ${yt.pages} pages`,
    })
    totalViews += yt.totalViews
    viewCoverage.push(`YouTube long-form (${yt.videos} videos)`)
  }

  const tt = await syncTikTok().catch((error) => {
    console.error('tiktok failed:', error.message)
    return null
  })
  if (tt) {
    platforms.push({
      name: 'TikTok',
      url: `https://www.tiktok.com/@${TIKTOK_USER}`,
      followers: tt.followers,
      metricsUpdatedAt: now,
      source: `unofficial: profile page (${tt.videos ?? '?'} videos, ${tt.likes ?? '?'} likes)`,
    })
  }

  const ig = await syncInstagram().catch((error) => {
    console.error('instagram skipped:', error.message)
    return null
  })
  if (ig) {
    platforms.push({
      name: 'Instagram',
      url: `https://instagram.com/${IG_USER}`,
      followers: ig.followers,
      metricsUpdatedAt: now,
      source: `unofficial: web profile (${ig.posts ?? '?'} posts)`,
    })
  }

  const current = await api('/api/globals/stats?depth=0')
  const doc = {
    ...current,
    metricsUpdatedAt: now,
    totalViews: totalViews > 0 ? totalViews : null,
    platforms,
    note: viewCoverage.length ? `Coverage: ${viewCoverage.join(', ')}` : undefined,
  }
  delete doc.id
  delete doc.updatedAt
  delete doc.createdAt
  delete doc.globalType

  await api('/api/globals/stats', { method: 'POST', body: JSON.stringify(doc) })

  console.log('Sync complete')
  console.log('  totalViews:', totalViews || 'n/a', `(${viewCoverage.join(' + ') || 'no coverage'})`)
  console.log('  platforms:', platforms.map((p) => `${p.name}:${p.followers ?? '?'}`).join(', '))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
