import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    { name: 'copyright', type: 'text', localized: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            'Instagram', 'TikTok', 'YouTube', 'X', 'Threads', 'Facebook', 'WhatsApp', 'Email', 'Discord', 'Other',
          ].map((v) => ({ label: v, value: v.toLowerCase() })),
        },
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text', required: true },
        { name: 'visible', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'note', type: 'textarea', localized: true },
  ],
}
