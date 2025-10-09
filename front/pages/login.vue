<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.password" placeholder="Password" type="password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const form = reactive({ email: '', password: '' })
const { login } = useAuth()

const submit = async () => {
  try {
    await login(form)
    navigateTo('/profile')
  } catch (err) {
    console.error(err)
  }
}
</script>
