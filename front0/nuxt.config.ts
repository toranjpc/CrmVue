// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

//  srcDir: 'front/',
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://192.168.1.7/'
    }
  }
})
