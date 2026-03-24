export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    // Server-only: internal Docker container name on prod, DDEV URL on local
    wpBaseUrl: process.env.WP_BASE_URL || 'http://cosycreator.online_wordpress',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://cosycreator.online',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0c0a14' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options':           'SAMEORIGIN',
        'X-Content-Type-Options':    'nosniff',
        'Referrer-Policy':           'strict-origin-when-cross-origin',
        'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    },
  },

  nitro: {
    routeRules: {
      '/api/**': { cors: false },
    },
  },
})
