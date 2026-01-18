<script setup lang="ts">
// Automatically redirect users from "/" to "/login"
// Use replace to avoid adding to history and reduce warnings
await navigateTo('/login', { replace: true });
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500">Redirecting to login...</p>
  </div>
</template>