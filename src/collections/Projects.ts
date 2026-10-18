import { APIError, type CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'order', 'updatedAt'],
  },
  versions: { drafts: true },
  access: {
    read: ({ req }) =>
      req.user ? true : { _status: { equals: 'published' } },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Series', value: 'series' },
        { label: 'Music Video', value: 'music-video' },
        { label: 'Short Film', value: 'short-film' },
        { label: 'Tutorial', value: 'tutorial' },
      ],
    },
    { name: 'context', type: 'textarea', localized: true },
    { name: 'role', type: 'text', localized: true },
    {
      name: 'tools',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'link', type: 'text' },
    { name: 'linkLabel', type: 'text', localized: true },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'preview',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'media', type: 'relationship', relationTo: 'media' },
        { name: 'durationSeconds', type: 'number' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number' },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (data?._status !== 'published') return data
        if (!data.media?.length) {
          throw new APIError('Karya yang dipublikasikan wajib punya minimal satu media.', 400)
        }
        const ids = data.media.map((m: unknown) =>
          typeof m === 'object' && m !== null ? (m as { id: string }).id : m,
        )
        const media = await req.payload.find({
          collection: 'media',
          where: { id: { in: ids } },
          limit: 100,
          depth: 0,
        })
        for (const item of media.docs) {
          if (item.mediaType === 'video' && !item.thumbnail) {
            throw new APIError(
              `Video "${item.title}" belum punya thumbnail. Simpan sebagai draft atau unggah thumbnail dulu.`,
              400,
            )
          }
        }
        return data
      },
    ],
  },
}
