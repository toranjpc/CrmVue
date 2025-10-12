export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return
  const loader = document.getElementById('page-loader')

  const show = () => loader && (loader.style.display = 'flex')
  const hide = () => loader && (loader.style.display = 'none')

  // برای useFetch
  nuxtApp.hook('app:fetch:before', show)
  nuxtApp.hook('app:fetch:after', hide)
  nuxtApp.hook('app:fetch:error', hide)

  // برای navigate بین صفحات (اختیاری)
  nuxtApp.hook('page:start', show)
  nuxtApp.hook('page:finish', hide)
})
