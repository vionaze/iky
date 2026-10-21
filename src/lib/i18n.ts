export type Locale = 'en' | 'id'

const seriesHref = 'https://www.tiktok.com/@damiann101/playlist/BerondongSebelahRumah-7692418796472109844'

const en = {
  langLabel: 'Language',
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  footerNav: 'Explore',
  footerSocial: 'Social',
  footerTop: 'Back to top',
  heroStage: {
    small: 'Small studio,',
    ghost: 'big stories',
    cta: 'Meet the work',
  },
  hero: {
    eyebrow: 'AI Filmmaker & Content Creator',
    title: 'Stories, music, and ideas turned into visuals.',
    lead: 'Series, music videos, short films, and tutorials with an AI-driven creative approach.',
    primary: 'View Work',
    secondary: 'Start a Project',
  },
  works: {
    label: 'Selected Works',
    index: '01',
    title: 'Work',
    intro: 'One series, one music video, one short film, and one tutorial.',
    series: {
      title: 'Berondong Sebelah Rumah',
      meta: 'Series · 5 episodes',
      desc: 'A five-episode AI micro-drama. Elian and Aurelia, two worlds meeting in one house. Made with CapCut and Seedance 2.5.',
      href: seriesHref,
    },
    episodes: [
      { ep: 'EP 01', title: 'Episode 01', duration: '1:59', href: 'https://www.tiktok.com/@damiann101/video/7692173774682131733' },
      { ep: 'EP 02', title: 'Too Close', duration: '2:01', href: 'https://www.tiktok.com/@damiann101/video/7692619848244890900' },
      { ep: 'EP 03', title: 'The Ex-Husband', duration: '2:03', href: 'https://www.tiktok.com/@damiann101/video/7692863785836678421' },
      { ep: 'EP 04', title: "Don't Make Me Comfortable", duration: '2:03', href: 'https://www.tiktok.com/@damiann101/video/7693810204948974869' },
      { ep: 'EP 05', title: 'Not My Place', duration: '1:56', href: 'https://www.tiktok.com/@damiann101/video/7695612157299379476' },
    ],
    other: 'Other formats',
    platform: 'Instagram',
    formats: [
      { name: 'Tutorial', href: 'https://www.instagram.com/reel/Dd89pg1SnHS/' },
      { name: 'Short Film', href: 'https://www.instagram.com/reel/DcfJ7wEyVAA/' },
      { name: 'Music Video', href: 'https://www.instagram.com/reel/DejefTNSRs7/' },
    ],
  },
  impact: {
    label: 'Reach',
    index: '02',
    empty: 'Not available yet',
    note: 'Numbers are not connected yet. Views will sync automatically from official APIs; other metrics come from verified records.',
    metrics: [
      'Total views',
      'Followers',
      'Engagement',
      'Videos created',
      'Completed campaigns',
      'Nominations',
    ],
  },
  about: {
    label: 'About',
    index: '03',
    title: 'A small studio for big feelings.',
    lead: 'Series, music videos, short films, and tutorials — exploring how ideas become stories and visuals through AI.',
    body: 'Berondong Sebelah Rumah is a five-episode AI micro-drama, made with CapCut and Seedance 2.5.',
    processLabel: 'Process',
    process: ['Story direction', 'Visuals & characters', 'Editing & sound', 'Publishing'],
    partnersLabel: 'Creative Partner',
  },
  contact: {
    label: 'Contact',
    index: '04',
    title: "Let's make something.",
    email: 'ariesiky8@gmail.com',
  },
  socials: [
    { name: 'Instagram', href: 'https://instagram.com/ikymianvt' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@caisarttfelix' },
    { name: 'YouTube', href: 'https://www.youtube.com/@ikymian_dramas' },
    { name: 'X', href: 'https://x.com/ikymianstudios' },
    { name: 'Threads', href: 'https://www.threads.com/@ikymian_series' },
  ],
  footer: '© 2026 Ikymian Studios',
}

export type Dict = typeof en

const id: Dict = {
  langLabel: 'Bahasa',
  nav: { work: 'Karya', about: 'Tentang', contact: 'Kontak' },
  footerNav: 'Jelajahi',
  footerSocial: 'Sosial',
  footerTop: 'Kembali ke atas',
  heroStage: {
    small: 'Studio kecil,',
    ghost: 'cerita besar',
    cta: 'Lihat karya',
  },
  hero: {
    eyebrow: 'AI Filmmaker & Content Creator',
    title: 'Cerita, musik, dan ide yang menjadi visual.',
    lead: 'Series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.',
    primary: 'Lihat Karya',
    secondary: 'Diskusi Kolaborasi',
  },
  works: {
    label: 'Karya Pilihan',
    index: '01',
    title: 'Karya',
    intro: 'Satu series, satu music video, satu short film, dan satu tutorial.',
    series: {
      title: 'Berondong Sebelah Rumah',
      meta: 'Series · 5 episode',
      desc: 'AI micro-drama lima episode. Elian dan Aurelia, dua dunia yang bertemu di satu rumah. Dibuat dengan CapCut dan Seedance 2.5.',
      href: seriesHref,
    },
    episodes: [
      { ep: 'EP 01', title: 'Episode 01', duration: '1:59', href: 'https://www.tiktok.com/@damiann101/video/7692173774682131733' },
      { ep: 'EP 02', title: 'Terlalu Dekat', duration: '2:01', href: 'https://www.tiktok.com/@damiann101/video/7692619848244890900' },
      { ep: 'EP 03', title: 'Mantan Suami', duration: '2:03', href: 'https://www.tiktok.com/@damiann101/video/7692863785836678421' },
      { ep: 'EP 04', title: 'Jangan Bikin Gue Nyaman', duration: '2:03', href: 'https://www.tiktok.com/@damiann101/video/7693810204948974869' },
      { ep: 'EP 05', title: 'Bukan Tempat Gue', duration: '1:56', href: 'https://www.tiktok.com/@damiann101/video/7695612157299379476' },
    ],
    other: 'Format lain',
    platform: 'Instagram',
    formats: [
      { name: 'Tutorial', href: 'https://www.instagram.com/reel/Dd89pg1SnHS/' },
      { name: 'Short Film', href: 'https://www.instagram.com/reel/DcfJ7wEyVAA/' },
      { name: 'Music Video', href: 'https://www.instagram.com/reel/DejefTNSRs7/' },
    ],
  },
  impact: {
    label: 'Jangkauan',
    index: '02',
    empty: 'Belum tersedia',
    note: 'Angka belum terhubung. Views akan diisi otomatis dari API resmi; metrik lain diisi dari data terverifikasi.',
    metrics: [
      'Total views',
      'Followers',
      'Engagement',
      'Videos created',
      'Completed campaigns',
      'Nominations',
    ],
  },
  about: {
    label: 'Tentang',
    index: '03',
    title: 'Studio kecil untuk cerita yang besar.',
    lead: 'Series, music video, short film, dan tutorial — mengeksplorasi cara ide berkembang menjadi cerita dan visual melalui AI.',
    body: 'Berondong Sebelah Rumah adalah AI micro-drama lima episode, dibuat dengan CapCut dan Seedance 2.5.',
    processLabel: 'Proses',
    process: ['Arah cerita', 'Visual & karakter', 'Editing & suara', 'Publikasi'],
    partnersLabel: 'Mitra Kreatif',
  },
  contact: {
    label: 'Kontak',
    index: '04',
    title: 'Mari buat sesuatu.',
    email: 'ariesiky8@gmail.com',
  },
  socials: en.socials,
  footer: '© 2026 Ikymian Studios',
}

export const dictionaries: Record<Locale, Dict> = { en, id }

export function getDict(locale: Locale): Dict {
  return dictionaries[locale]
}
