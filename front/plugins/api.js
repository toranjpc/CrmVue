export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiBase = config.public.apiBase

  const api = $fetch.create({
    baseURL: apiBase,
    headers: {
      'Accept': 'application/json'
    }
  })

  return {
    provide: {
      api
    }
  }
})
