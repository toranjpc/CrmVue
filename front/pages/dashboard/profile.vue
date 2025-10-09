<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { user, fetchMe, logout } = useAuth()

onMounted(() => {
  fetchMe()
})
</script>
