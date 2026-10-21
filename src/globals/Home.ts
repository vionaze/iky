import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'visual', type: 'upload', relationTo: 'media' },
        {
          name: 'ctaPrimary',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'ctaSecondary',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'heroStage',
      type: 'group',
      admin: { description: 'Teks besar di hero (small heading, ghost word, CTA).' },
      fields: [
        { name: 'small', type: 'text', localized: true },
        { name: 'ghost', type: 'text', localized: true },
        { name: 'cta', type: 'text', localized: true },
      ],
    },
    {
      name: 'showreel',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'title', type: 'text', localized: true },
        { name: 'media', type: 'relationship', relationTo: 'media' },
      ],
    },
    {
      name: 'works',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'intro', type: 'textarea', localized: true },
        {
          name: 'carousel',
          type: 'array',
          admin: { description: 'Kartu di section Selected Works (urutan sesuai tampil).' },
          fields: [
            { name: 'title', type: 'text', localized: true, required: true },
            { name: 'kicker', type: 'text', localized: true },
            { name: 'meta', type: 'text', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'impact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'intro', type: 'textarea', localized: true },
        { name: 'showUpdatedAt', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'aboutMe',
      type: 'group',
      admin: { description: 'Isi section About Me.' },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'lead', type: 'text', localized: true },
        { name: 'p1', type: 'textarea', localized: true },
        { name: 'p2', type: 'textarea', localized: true },
        { name: 'p3', type: 'textarea', localized: true },
        { name: 'closing', type: 'text', localized: true },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'richText', localized: true },
        {
          name: 'processWords',
          type: 'array',
          admin: { description: 'Kata-kata yang berputar di Process.' },
          fields: [{ name: 'word', type: 'text', localized: true, required: true }],
        },
        {
          name: 'partners',
          type: 'array',
          admin: { description: 'Logo Creative Partner.' },
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'invert', type: 'checkbox', defaultValue: false },
            { name: 'square', type: 'checkbox', defaultValue: false },
          ],
        },
        { name: 'skills', type: 'array', fields: [{ name: 'name', type: 'text', localized: true }] },
        { name: 'tools', type: 'array', fields: [{ name: 'name', type: 'text', localized: true }] },
        {
          name: 'process',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'body', type: 'richText', localized: true },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'email', type: 'email' },
        { name: 'ctaLabel', type: 'text', localized: true },
      ],
    },
    {
      name: 'footerMarquee',
      type: 'text',
      localized: true,
      admin: { description: 'Teks marquee besar di footer.' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
