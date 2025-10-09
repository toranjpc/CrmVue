<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.password" type="password" placeholder="Password" />
      <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />
      <button>Register</button>
    </form>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const { register } = useAuth()

const submit = async () => {
  try {
    await register(form)
    navigateTo('/profile')
  } catch (err) {
    console.error(err)
  }
}
</script>
