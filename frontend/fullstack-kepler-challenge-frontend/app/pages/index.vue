<script setup lang="ts">
// Automatically redirect users from "/" to "/login"
// Use replace to avoid adding to history and reduce warnings
await navigateTo('/login', { replace: true });
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="flex flex-col items-center gap-4">
      <div class="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p class="text-sm text-gray-500 font-medium animate-pulse">Loading Kepler...</p>
    </div>
  </div>
</template>