<script setup>
  const { $api } = useNuxtApp()
  console.log('API Base URL:', $api.defaults.baseURL)
</script>

<template>
  <div class="p-10">
    <h1 class="text-2xl">Revisa la consola del navegador (F12)</h1>
  </div>
</template>