<script setup lang="ts">
// Apply the 'auth' middleware to protect this page
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />

    <main class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">My Tasks</h2>
        <p class="text-gray-600">
          This is the protected dashboard. Tasks will appear here in Phase 5.
        </p>
      </div>
    </main>
  </div>
</template>