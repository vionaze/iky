import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Header } from './globals/Header'
import { Home } from './globals/Home'
import { Footer } from './globals/Footer'
import { Stats } from './globals/Stats'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Ikymian Studios' },
  },
  routes: { admin: '/adminku' },
  collections: [Users, Media, Projects],
  globals: [Header, Home, Footer, Stats],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./data/ikymian.db' },
    push: process.env.NODE_ENV !== 'production',
  }),
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'id', label: 'Indonesia' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  sharp,
  upload: { limits: { fileSize: 50_000_000 } },
})
