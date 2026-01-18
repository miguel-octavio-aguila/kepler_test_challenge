<script setup lang="ts">
// Automatically redirect users from "/" to "/login"
await navigateTo('/login');
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500">Redirecting to login...</p>
  </div>
</template>