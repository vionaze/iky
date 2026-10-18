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
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'richText', localized: true },
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
      ],
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
