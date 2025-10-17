<template>
  <div>
    <h1>صفحه اصلی</h1>
    <p>خوش آمدید به پروژه Nuxt + Laravel Sanctum ماژولار</p>
    <nuxt-link to="/dashboard">پنل مدیریت</nuxt-link>
    <br>
    <nuxt-link to="/register">ثبت‌نام</nuxt-link>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()


const check = async () => {
  try {
    var dd=await $fetch('/test', {
      baseURL: config.public.apiBase,
      method: 'get',
      // headers: headers.value
    })

    console.log(dd)
  } catch (err) {
    console.warn('Logout error ignored:', err)
  } finally {
    // token.value = null
    // user.value = null
  }
}
check()

</script>
