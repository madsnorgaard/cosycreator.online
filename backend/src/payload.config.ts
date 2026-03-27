import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import Artworks from './collections/Artworks'
import Categories from './collections/Categories'
import Media from './collections/Media'
import Users from './collections/Users'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',

  admin: {
    bundler: webpackBundler(),
    user: Users.slug,
  },

  cors: [
    process.env.NUXT_PUBLIC_SITE_URL || 'https://cosycreator.online',
    'http://localhost:3000',
  ],

  collections: [Artworks, Categories, Media, Users],
})
