import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  access: { read: () => true },
  fields: [
    {
      name: 'metricsUpdatedAt',
      type: 'date',
      admin: { description: 'Kapan angka terakhir diperbarui (bisa manual).' },
    },
    {
      name: 'totalViews',
      type: 'number',
      label: 'Total views',
      admin: {
        description:
          'Bisa diisi manual (mis. total views TikTok + YouTube). Sync otomatis tidak menimpanya kecuali SYNC_TOTAL_VIEWS=1.',
      },
    },
    {
      name: 'platforms',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'followers', type: 'number', admin: { description: 'Bisa diedit manual.' } },
        { name: 'metricsUpdatedAt', type: 'date' },
        { name: 'source', type: 'text' },
      ],
    },
    { name: 'videosCreated', type: 'number', admin: { description: 'Bisa diedit manual.' } },
    { name: 'completedCampaigns', type: 'number', admin: { description: 'Bisa diedit manual.' } },
    {
      name: 'nominationsText',
      type: 'textarea',
      label: 'Nominations',
      admin: { description: 'Satu nominasi per baris — berupa teks, bukan angka.' },
    },
  ],
}
