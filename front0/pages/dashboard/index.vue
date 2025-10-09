<template>
  <div class="container mt-5">
    <h1>Dashboard</h1>
    <p>Welcome, {{ user?.name }}</p>
    <button class="btn btn-secondary mt-3" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  authRequired: true // اضافه کردن flag برای middleware
})

const { user, logout } = useAuth()
</script>
