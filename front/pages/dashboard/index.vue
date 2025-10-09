<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Only logged in user can see this.</p>
  </div>
</template>
