<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="mb-4 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <NuxtLink to="/dashboard/register" class="btn btn-secondary w-100 mt-2">
          Register
        </NuxtLink>
        <p class="text-danger mt-3" v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userAuth } from '~/composables/userAuth'

const email = ref('')
const password = ref('')
const error = ref('')

const { login } = userAuth()
const route = useRoute()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    error.value = ''
    const redirect = (route.query.redirect as string) || '/dashboard'
    navigateTo(redirect)
  } catch (err: any) {
    error.value = err.data?.message || 'Login failed'
  }
}
</script>
