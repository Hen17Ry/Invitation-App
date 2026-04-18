export default defineNuxtConfig({
  compatibilityDate: '2026-03-20',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  supabase: {
  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    exclude: ['/**'],
  },
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
  },
  clientOptions: {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
    },
  },
},
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Avis — Faire-part Digital',
      short_name: 'Avis',
      description: 'Créez et partagez vos faire-parts en 2 minutes',
      theme_color: '#1a1a1a',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'fr',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    falApiKey: process.env.FAL_API_KEY,
    kkiapayPrivateKey: process.env.KKIAPAY_PRIVATE_KEY,
    public: {
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      auth0Audience: process.env.AUTH0_AUDIENCE,
      auth0CallbackUrl: process.env.AUTH0_CALLBACK_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      kkiapayPublicKey: process.env.KKIAPAY_PUBLIC_KEY,
    },
  },

  typescript: {
    strict: true,
  },
  css: ['~/assets/css/main.css'],
})