import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'sourceType', 'mediaType'] },
  access: { read: () => true },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768 },
      { name: 'poster', width: 1080 },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      defaultValue: 'upload',
      options: [
        { label: 'Upload', value: 'upload' },
        { label: 'URL', value: 'url' },
      ],
    },
    {
      name: 'mediaType',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: { condition: (data) => data?.sourceType === 'url' },
    },
    {
      name: 'provider',
      type: 'select',
      defaultValue: 'direct-file',
      options: [
        { label: 'Direct file', value: 'direct-file' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Other', value: 'other' },
      ],
      admin: { condition: (data) => data?.sourceType === 'url' },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (data) => data?.mediaType === 'video' },
    },
    { name: 'alt', type: 'text', localized: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}
