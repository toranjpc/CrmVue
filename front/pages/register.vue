<template>
  <div class="register-page">
    <h1>ثبت‌نام</h1>

    <form @submit.prevent="submit" class="register-form">
      <div class="field">
        <input
          v-model.trim="form.mobile"
          type="text"
          placeholder="شماره موبایل"
        />
        <span v-if="errors.mobile" class="error">{{ errors.mobile }}</span>
      </div>

      <div class="field">
        <input
          v-model.trim="form.password"
          type="password"
          placeholder="رمز عبور"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="field">
        <input
          v-model.trim="form.password_confirmation"
          type="password"
          placeholder="تکرار رمز عبور"
        />
        <span v-if="errors.password_confirmation" class="error">
          {{ errors.password_confirmation }}
        </span>
      </div>

      <button type="submit">ثبت‌نام</button>
    </form>
    <nuxt-link to="/login">ورود</nuxt-link>

    <p v-if="serverError" class="error-server">{{ serverError }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
// import { userAuth } from '~/composables/userAuth'

const form = reactive({
  mobile: '',
  password: '',
  password_confirmation: '',
})
const errors = reactive({
  mobile: '',
  password: '',
  password_confirmation: '',
})
const serverError = ref('')

const { register } = userAuth()

const submit = async () => {
  errors.mobile = ''
  errors.password = ''
  errors.password_confirmation = ''
  serverError.value = ''

  if (!form.mobile) errors.mobile = 'شماره موبایل الزامی است'
  if (!form.password) errors.password = 'رمز عبور الزامی است'
  if (!form.password_confirmation)
    errors.password_confirmation = 'تکرار رمز عبور الزامی است'
  if (form.password && form.password_confirmation && form.password !== form.password_confirmation)
    errors.password_confirmation = 'رمز عبور و تکرار آن یکسان نیست'

  if (errors.mobile || errors.password || errors.password_confirmation) return

  try {
    const res = await register(form)
    console.log('✅ Register response:', res)
    navigateTo('/dashboard')
  } catch (err) {
    console.error('❌ Register error:', err)
    serverError.value = err.message || 'خطا در ثبت‌نام، لطفاً دوباره تلاش کنید.'
  }
}
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
}
.field {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
input {
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 15px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
}
.error {
  color: #d32f2f;
  font-size: 13px;
  margin-top: 4px;
}
.error-server {
  color: #c2185b;
  margin-top: 12px;
}
</style>
