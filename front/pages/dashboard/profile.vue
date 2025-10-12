<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { userAuth } from '~/composables/userAuth'

const { user, fetchMe, logout } = userAuth()

onMounted(() => {
  fetchMe()
})
</script>
