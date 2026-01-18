<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';
import TaskList from '~/components/TaskList.vue';
import TaskForm from '~/components/TaskForm.vue';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen pb-20">
    <Navigation />

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Welcome Section -->
      <div class="mb-10 text-center sm:text-left animate-[fadeIn_0.5s_ease-out]">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Good {{ new Date().getHours() < 12 ? 'morning' : 'evening' }}, 
          <span class="text-primary">{{ authStore.user?.name || 'User' }}</span>
        </h1>
        <p class="mt-3 text-lg text-gray-600">
          You have some tasks waiting for you today.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 animate-[slideUp_0.5s_ease-out_0.1s_both]">
        <!-- New Task Form -->
        <section>
          <TaskForm />
        </section>

        <!-- Task List -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Your Tasks</h2>
            <!-- Optional: Filter or Sort controls could go here -->
          </div>
          <TaskList />
        </section>
      </div>

    </main>
  </div>
</template>