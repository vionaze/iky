/**
 * Seed editable Home content (hero stage, about, works carousel, footer marquee).
 * Idempotent: skips if the carousel already has entries.
 */
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const EMAIL = process.env.ADMIN_EMAIL || 'admin@ikymianstudios.si'
const PASSWORD = process.env.ADMIN_PASSWORD || 'Ikymian!2026#Studio'

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
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${text.slice(0, 300)}`)
  return data
}

async function login() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`login failed: ${await res.text()}`)
  const data = await res.json()
  token = data.token || ''
}

const EN_ABOUT = {
  title: 'About Me',
  lead: 'Where imagination meets cinematic innovation.',
  p1: "I'm M. Rizki Firmansyah, the creative mind behind Ikymian Studios — an independent AI Filmmaker, Creative Director, and Visual Storyteller dedicated to redefining how stories are imagined and brought to life.",
  p2: 'My expertise spans AI filmmaking, cinematic storytelling, short films, original series, music videos, creative advertising, character development, and generative visual production. I combine artistic direction, emotional storytelling, and advanced AI technology to create immersive, photorealistic cinematic experiences.',
  p3: 'Beyond filmmaking, I develop creative AI workflows, educational content, and visual concepts that empower creators to push the boundaries of digital storytelling.',
  closing: 'Crafting stories that connect, visuals that inspire, and experiences that stay with you.',
}

const ID_ABOUT = {
  title: 'Tentang Saya',
  lead: 'Tempat imajinasi bertemu inovasi sinematik.',
  p1: 'Saya M. Rizki Firmansyah, sosok kreatif di balik Ikymian Studios — AI Filmmaker, Creative Director, dan Visual Storyteller independen yang berdedikasi mendefinisikan ulang cara cerita dibayangkan dan diwujudkan.',
  p2: 'Keahlian saya mencakup AI filmmaking, cinematic storytelling, short film, series orisinal, music video, iklan kreatif, pengembangan karakter, dan produksi visual generatif. Saya memadukan arahan artistik, cerita yang emosional, dan teknologi AI untuk menghadirkan pengalaman sinematik yang imersif dan fotorealistis.',
  p3: 'Di luar filmmaking, saya mengembangkan alur kerja AI kreatif, konten edukasi, dan konsep visual yang membantu kreator mendorong batas storytelling digital.',
  closing: 'Merangkai cerita yang menyentuh, visual yang menginspirasi, dan pengalaman yang membekas.',
}

async function main() {
  await login()

  const media = await api('/api/media?where[title][equals]=Berondong%20key%20art&limit=1&depth=0')
  const posterId = media.docs?.[0]?.id ?? null

  const [projectEn, projectId] = await Promise.all([
    api('/api/projects?where[slug][equals]=berondong-sebelah-rumah&locale=en&depth=0&limit=1'),
    api('/api/projects?where[slug][equals]=berondong-sebelah-rumah&locale=id&depth=0&limit=1'),
  ])

  const seriesEn = projectEn.docs?.[0]
  const seriesId = projectId.docs?.[0]
  if (!seriesEn) throw new Error('series project not found')

  const homeEn = await api('/api/globals/home?locale=en&depth=0')
  if (Array.isArray(homeEn.works?.carousel) && homeEn.works.carousel.length > 0) {
    console.log('Editable home already seeded, skipping.')
    return
  }

  const episodesEn = Array.isArray(seriesEn.episodes) ? seriesEn.episodes : []
  const episodesId = Array.isArray(seriesId?.episodes) ? seriesId.episodes : []

  const baseCards = [
    {
      kicker: 'Series',
      meta: '05 Episodes',
      title: seriesEn.title,
      image: posterId,
      href: seriesEn.link,
    },
    ...episodesEn.slice(1).map((episode) => ({
      kicker: 'Series',
      meta: episode.label,
      title: episode.title,
      image: posterId,
      href: seriesEn.link,
    })),
    { kicker: 'Tutorial AI', title: 'AI Tutorial', meta: '', image: null, href: '#work' },
    { kicker: 'Short Film', title: 'Short Film', meta: '', image: null, href: '#work' },
    { kicker: 'Music Video', title: 'Music Video', meta: '', image: null, href: '#work' },
  ]

  const updateEn = {
    heroStage: { small: 'Small studio,', ghost: 'big stories', cta: 'Meet the work' },
    aboutMe: EN_ABOUT,
    about: {
      processWords: [
        { word: 'Story direction' },
        { word: 'Visuals & characters' },
        { word: 'Editing & sound' },
        { word: 'Publishing' },
      ],
    },
    works: { carousel: baseCards },
    contact: { ctaLabel: 'Start a collaboration', email: 'ariesiky8@gmail.com' },
    footerMarquee: 'Ikymian Studios • Caisart Felix •',
  }

  await api('/api/globals/home?locale=en', { method: 'POST', body: JSON.stringify(updateEn) })

  const afterEn = await api('/api/globals/home?locale=en&depth=0')
  const carouselRows = afterEn.works?.carousel ?? []
  const processRows = afterEn.about?.processWords ?? []

  const idCards = carouselRows.map((row, index) => ({
    id: row.id,
    kicker: row.kicker,
    meta: index === 0 ? '05 Episode' : row.meta,
    title:
      index === 0
        ? seriesId?.title || row.title
        : index <= episodesEn.length
          ? episodesId[index]?.title || row.title
          : row.title,
    image: row.image?.id ?? row.image ?? posterId,
    href: row.href,
  }))

  const updateId = {
    heroStage: { small: 'Studio kecil,', ghost: 'cerita besar', cta: 'Lihat karya' },
    aboutMe: ID_ABOUT,
    about: {
      processWords: processRows.map((row, index) => ({
        id: row.id,
        word: ['Arahan cerita', 'Visual & karakter', 'Editing & suara', 'Publikasi'][index],
      })),
    },
    works: { carousel: idCards },
    contact: { ctaLabel: 'Mulai kolaborasi', email: 'ariesiky8@gmail.com' },
    footerMarquee: 'Ikymian Studios • Caisart Felix •',
  }

  await api('/api/globals/home?locale=id', { method: 'POST', body: JSON.stringify(updateId) })

  console.log(`Editable home seeded: ${baseCards.length} carousel cards, about, hero, footer.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
