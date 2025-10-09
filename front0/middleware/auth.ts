export default defineNuxtRouteMiddleware(async (to, from) => {
  // فقط صفحات با meta authRequired=true نیاز به auth دارند
  if (!to.meta?.authRequired) return

  const auth = useAuth()

  // fetchUser قبل از هر بررسی
  await auth.fetchUser()

  if (!auth.user.value) {
    return navigateTo(`/dashboard/login?redirect=${to.fullPath}`)
  }
})
