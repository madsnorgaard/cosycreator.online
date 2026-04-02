export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    // Server-only: internal Docker container name on prod, Payload local URL on dev
    payloadBaseUrl: process.env.PAYLOAD_BASE_URL || 'http://cosycreator.online_payload:3001',
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
        { name: 'theme-color', content: '#fdf8f3' },
      ],
      script: [
        {
          defer: true,
          'data-domain': 'cosycreator.online',
          src: 'https://analytics.theazanianprepper.online/js/script.file-downloads.hash.outbound-links.js',
        },
        {
          innerHTML: "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap',
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
          "script-src 'self' 'unsafe-inline' https://analytics.theazanianprepper.online",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          "connect-src 'self' https://analytics.theazanianprepper.online",
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
