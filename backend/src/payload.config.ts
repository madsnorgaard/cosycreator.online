import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Artworks } from './collections/Artworks'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001'
const siteOrigins = [process.env.NUXT_PUBLIC_SITE_URL || 'https://cosycreator.online', 'http://localhost:3000']

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' - Cosy Creator' },
  },
  collections: [Artworks, Categories, Media, Users],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/cosycreator',
    migrationDir: path.resolve(dirname, 'migrations'),
    // The database is a standalone mongod, not a replica set, and MongoDB
    // only supports transactions on replica sets.
    transactionOptions: false,
  }),
  cors: siteOrigins,
  csrf: [serverURL, ...siteOrigins],
  // The site reads the REST API only; nothing uses GraphQL.
  graphQL: { disable: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  endpoints: [
    {
      // Probed by the monitoring blackbox exporter at /api/health.
      path: '/health',
      method: 'get',
      handler: () => new Response('OK', { status: 200 }),
    },
  ],
})
