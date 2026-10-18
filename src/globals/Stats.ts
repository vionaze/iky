import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  access: { read: () => true },
  fields: [
    { name: 'updatedAt', type: 'date' },
    {
      name: 'totalViews',
      type: 'number',
      admin: { readOnly: true, description: 'Diisi proses sinkronisasi, bukan editor manual.' },
    },
    {
      name: 'platforms',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'followers', type: 'number' },
        { name: 'updatedAt', type: 'date' },
        { name: 'source', type: 'text' },
      ],
    },
    {
      name: 'engagement',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'value', type: 'number' },
        { name: 'formula', type: 'text' },
        { name: 'period', type: 'text' },
        { name: 'source', type: 'text' },
      ],
    },
    { name: 'videosCreated', type: 'number' },
    { name: 'completedCampaigns', type: 'number' },
    { name: 'nominations', type: 'number' },
  ],
}
