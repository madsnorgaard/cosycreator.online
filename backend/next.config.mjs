import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload admin is fully dynamic; no static export.
  async redirects() {
    // The CMS host has no page of its own: send the bare host to the admin.
    return [{ source: '/', destination: '/admin', permanent: false }]
  },
  async rewrites() {
    // Payload 1 served uploads at /media/<file>; Payload 3 serves them at
    // /api/media/file/<file>. Keep the old public URLs working (they are in
    // search indexes and shared links).
    return [{ source: '/media/:path*', destination: '/api/media/file/:path*' }]
  },
}

export default withPayload(nextConfig)
