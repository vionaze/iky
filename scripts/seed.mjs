#!/usr/bin/env node
/**
 * Seeds the local dev database with the portfolio content.
 * Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/seed.mjs
 */
import { readFile } from 'node:fs/promises'

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const EMAIL = process.env.ADMIN_EMAIL
const PASSWORD = process.env.ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD')
  process.exit(1)
}

const seriesHref =
  'https://www.tiktok.com/@damiann101/playlist/BerondongSebelahRumah-7692418796472109844'

const episodes = {
  en: [
    ['EP 01', 'Episode 01', '1:59', 'https://www.tiktok.com/@damiann101/video/7692173774682131733'],
    ['EP 02', 'Too Close', '2:01', 'https://www.tiktok.com/@damiann101/video/7692619848244890900'],
    ['EP 03', 'The Ex-Husband', '2:03', 'https://www.tiktok.com/@damiann101/video/7692863785836678421'],
    ['EP 04', "Don't Make Me Comfortable", '2:03', 'https://www.tiktok.com/@damiann101/video/7693810204948974869'],
    ['EP 05', 'Not My Place', '1:56', 'https://www.tiktok.com/@damiann101/video/7695612157299379476'],
  ],
  id: [
    ['EP 01', 'Episode 01', '1:59', 'https://www.tiktok.com/@damiann101/video/7692173774682131733'],
    ['EP 02', 'Terlalu Dekat', '2:01', 'https://www.tiktok.com/@damiann101/video/7692619848244890900'],
    ['EP 03', 'Mantan Suami', '2:03', 'https://www.tiktok.com/@damiann101/video/7692863785836678421'],
    ['EP 04', 'Jangan Bikin Gue Nyaman', '2:03', 'https://www.tiktok.com/@damiann101/video/7693810204948974869'],
    ['EP 05', 'Bukan Tempat Gue', '1:56', 'https://www.tiktok.com/@damiann101/video/7695612157299379476'],
  ],
}

const socials = [
  ['instagram', 'Instagram', 'https://instagram.com/ikymianvt'],
  ['tiktok', 'TikTok', 'https://www.tiktok.com/@caisarttfelix'],
  ['youtube', 'YouTube', 'https://www.youtube.com/@ikymian_dramas'],
  ['x', 'X', 'https://x.com/ikymianstudios'],
  ['threads', 'Threads', 'https://www.threads.com/@ikymian_series'],
].map(([platform, label, url]) => ({ platform, label, url, visible: true }))

const globals = {
  en: {
    header: {
      studioName: 'Ikymian Studios',
      tagline: 'Caisart Felix',
      navItems: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    home: {
      hero: {
        title: 'Stories, music, and ideas turned into visuals.',
        subtitle: 'Series, music videos, short films, and tutorials with an AI-driven creative approach.',
        ctaPrimary: { label: 'View Work', href: '#work' },
        ctaSecondary: { label: 'Start a Project', href: '#contact' },
      },
      works: { title: 'Selected Works', intro: 'One series, one music video, one short film, and one tutorial.' },
      impact: {
        title: 'Reach',
        intro:
          'Numbers are not connected yet. Views will sync automatically from official APIs; other metrics come from verified records.',
      },
      about: {
        title: 'A small studio for big feelings.',
        body: paragraph(
          'I make series, music videos, short films, and tutorials — small stories about people who almost say what they mean.',
        ),
      },
      contact: { title: "Let's make something." },
      seo: {
        metaTitle: 'Ikymian Studios — AI Filmmaker & Content Creator',
        metaDescription:
          'Portfolio of Ikymian Studios — series, music video, short film, and tutorial with an AI-driven creative approach.',
      },
    },
    footer: { copyright: '© 2026 Ikymian Studios', email: 'ariesiky8@gmail.com', socials },
  },
  id: {
    header: {
      studioName: 'Ikymian Studios',
      tagline: 'Caisart Felix',
      navItems: [
        { label: 'Karya', href: '#work' },
        { label: 'Tentang', href: '#about' },
        { label: 'Kontak', href: '#contact' },
      ],
    },
    home: {
      hero: {
        title: 'Cerita, musik, dan ide yang menjadi visual.',
        subtitle: 'Series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.',
        ctaPrimary: { label: 'Lihat Karya', href: '#work' },
        ctaSecondary: { label: 'Diskusi Kolaborasi', href: '#contact' },
      },
      works: { title: 'Karya Pilihan', intro: 'Satu series, satu music video, satu short film, dan satu tutorial.' },
      impact: {
        title: 'Jangkauan',
        intro:
          'Angka belum terhubung. Views akan diisi otomatis dari API resmi; metrik lain diisi dari data terverifikasi.',
      },
      about: {
        title: 'Studio kecil untuk cerita yang besar.',
        body: paragraph(
          'Saya membuat series, music video, short film, dan tutorial — cerita kecil tentang orang-orang yang hampir mengatakan isi hatinya.',
        ),
      },
      contact: { title: 'Mari buat sesuatu.' },
      seo: {
        metaTitle: 'Ikymian Studios — AI Filmmaker & Content Creator',
        metaDescription:
          'Portfolio Ikymian Studios — series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.',
      },
    },
    footer: { copyright: '© 2026 Ikymian Studios', email: 'ariesiky8@gmail.com', socials },
  },
}

function paragraph(text) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
          children: [
            { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 },
          ],
        },
      ],
    },
  }
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
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${text.slice(0, 400)}`)
  return data
}

async function authenticate() {
  const login = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })

  if (login.ok) {
    token = (await login.json()).token
    return
  }

  const register = await fetch(`${BASE}/api/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, name: 'Caisart Felix' }),
  })

  if (!register.ok) throw new Error(`auth failed: ${await register.text()}`)
  token = (await register.json()).token
}

async function upsertProject(slug, data) {
  const found = await api(`/api/projects?where[slug][equals]=${slug}&limit=1&depth=0`)
  if (found.docs[0]) {
    return api(`/api/projects/${found.docs[0].id}`, { method: 'PATCH', body: JSON.stringify(data) })
  }
  return api('/api/projects', { method: 'POST', body: JSON.stringify(data) })
}

async function seed() {
  await authenticate()

  const mediaList = await api('/api/media?where[title][equals]=Berondong%20key%20art&limit=1')
  let mediaId = mediaList.docs[0]?.id

  if (!mediaId) {
    const file = await readFile('images/works/berondong/ep01.jpg')
    const form = new FormData()
    form.append(
      '_payload',
      JSON.stringify({
        title: 'Berondong key art',
        sourceType: 'upload',
        mediaType: 'image',
        alt: 'Berondong Sebelah Rumah key art',
      }),
    )
    form.append('file', new Blob([file], { type: 'image/jpeg' }), 'berondong-key-art.jpg')
    const upload = await fetch(`${BASE}/api/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: form,
    })
    const uploaded = await upload.json()
    if (!upload.ok) throw new Error(`media upload failed: ${JSON.stringify(uploaded)}`)
    mediaId = uploaded.doc.id
  }

  const seriesBase = {
    title: 'Berondong Sebelah Rumah',
    slug: 'berondong-sebelah-rumah',
    category: 'series',
    link: seriesHref,
    linkLabel: 'Tonton series',
    media: [mediaId],
    _status: 'published',
  }

  const contextEn =
    'A five-episode AI micro-drama. Elian and Aurelia, two worlds meeting in one house. Made with CapCut and Seedance 2.5.'
  const contextId =
    'AI micro-drama lima episode. Elian dan Aurelia, dua dunia yang bertemu di satu rumah. Dibuat dengan CapCut dan Seedance 2.5.'

  const toRows = (list, ids = []) =>
    list.map(([label, title, duration, href], index) => ({
      ...(ids[index] ? { id: ids[index] } : {}),
      label,
      title,
      duration,
      href,
    }))

  const existingSeries = await api(
    '/api/projects?where[slug][equals]=berondong-sebelah-rumah&limit=1&depth=0',
  ).catch(() => ({ docs: [] }))

  let seriesId = existingSeries.docs[0]?.id

  if (seriesId) {
    // Update base fields only; the episodes array is patched per locale below
    // so localized titles are not wiped by replacing the rows.
    await api(`/api/projects/${seriesId}`, {
      method: 'PATCH',
      body: JSON.stringify(seriesBase),
    })
  } else {
    const created = await api('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        ...seriesBase,
        context: contextEn,
        episodes: toRows(episodes.en),
      }),
    })
    seriesId = created.doc.id
  }

  const afterCreate = await api(`/api/projects/${seriesId}?locale=en&depth=0`)
  const rowIds = (afterCreate.episodes ?? []).map((row) => row.id)

  await api(`/api/projects/${seriesId}?locale=en`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...seriesBase,
      context: contextEn,
      episodes: toRows(episodes.en, rowIds),
    }),
  })

  const afterEn = await api(`/api/projects/${seriesId}?locale=en&depth=0`)
  const stableIds = (afterEn.episodes ?? []).map((row) => row.id)

  await api(`/api/projects/${seriesId}?locale=id`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...seriesBase,
      context: contextId,
      episodes: toRows(episodes.id, stableIds),
    }),
  })

  const formats = [
    { title: 'Tutorial', slug: 'tutorial', category: 'tutorial', order: 1, link: 'https://www.instagram.com/reel/Dd89pg1SnHS/' },
    { title: 'Short Film', slug: 'short-film', category: 'short-film', order: 2, link: 'https://www.instagram.com/reel/DcfJ7wEyVAA/' },
    { title: 'Music Video', slug: 'music-video', category: 'music-video', order: 3, link: 'https://www.instagram.com/reel/DejefTNSRs7/' },
  ]

  for (const format of formats) {
    await upsertProject(format.slug, {
      ...format,
      linkLabel: 'Instagram',
      _status: 'published',
    })
  }

  for (const locale of ['en', 'id']) {
    for (const slug of ['header', 'home', 'footer']) {
      const current = await api(`/api/globals/${slug}?locale=${locale}&depth=0`)
      const doc = { ...current, ...globals[locale][slug] }
      delete doc.id
      delete doc.updatedAt
      delete doc.createdAt
      delete doc.globalType
      await api(`/api/globals/${slug}?locale=${locale}`, {
        method: 'POST',
        body: JSON.stringify(doc),
      })
    }
  }

  console.log('Seed complete: series, formats, header/home/footer (en, id)')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
