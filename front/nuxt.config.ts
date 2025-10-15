// nuxt-config.ts
let bakend = 'http://127.0.0.1:8000/';
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  devServer: {
    // host: '192.168.1.10',
    host: '0.0.0.0',
    port: 3000
  },

  runtimeConfig: {
    public: {
      apiBase: bakend
    }
  },





})
