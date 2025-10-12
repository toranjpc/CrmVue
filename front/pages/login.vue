<template>
  <div class="login-page">
    <h1>ورود</h1>

    <form @submit.prevent="submit" class="login-form">
      <div class="field">
        <input v-model.trim="form.username" type="text" placeholder="نام کاربری" />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <div class="field">
        <input v-model.trim="form.password" type="password" placeholder="رمز عبور" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <button type="submit">ورود</button>
    </form>
    <nuxt-link to="/register">ثبت‌نام</nuxt-link>

    <p v-if="serverError" class="error-server">{{ serverError }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
// import { userAuth } from '~/composables/userAuth' 

const form = reactive({ username: '', password: '' })
const errors = reactive({ username: '', password: '' })
const serverError = ref('')
const { login } = userAuth()

const submit = async () => {
  errors.username = ''
  errors.password = ''
  serverError.value = ''

  if (!form.username) errors.username = 'نام کاربری الزامی است'
  if (!form.password) errors.password = 'رمز عبور الزامی است'

  if (errors.username || errors.password) return

  try {
    const res = await login(form)
    console.log('✅ Login successful:', res)
    navigateTo('/dashboard')
  } catch (err) {
    console.error('❌ Server error:', err)
    serverError.value = err.message || 'خطا در ورود، لطفاً دوباره تلاش کنید.'
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
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
  background: #007bff;
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
