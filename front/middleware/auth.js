// ~/middleware/auth.ts
// import { userAuth } from '~/composables/userAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { token, fetchMe, user } = userAuth()

  // ۱. اگر توکن وجود ندارد → ریدایرکت به لاگین
  if (!token.value) {
    return navigateTo('/login')
  }

  // ۲. اگر user هنوز خالی است → fetchMe برای پر کردن user
  if (!user.value) {
    try {
      await fetchMe()
    } catch (err) {
      // اگر fetchMe خطا داد (مثلاً توکن نامعتبر) → پاک کردن توکن و ریدایرکت
      token.value = null
      user.value = null
      return navigateTo('/login')
    }
  }

  // ۳. در این حالت، user معتبر است و اجازه ورود به صفحه داده می‌شود
})
