<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <Navigation />

    <main class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Hello, {{ authStore.user?.name || 'User' }}
        </h1>
        <p class="text-gray-600 mt-2">Here is your agenda for today.</p>
      </div>

      <TaskForm />

      <TaskList />
      
    </main>
  </div>
</template>