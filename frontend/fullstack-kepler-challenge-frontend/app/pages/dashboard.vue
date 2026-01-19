<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';
import TaskList from '~/components/TaskList.vue';
import TaskForm from '~/components/TaskForm.vue';
import TaskFilters from '~/components/TaskFilters.vue';

definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen pb-20">
    <Navigation />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Welcome Section - Centered and Full Width -->
      <div class="mb-12 text-center animate-[fadeIn_0.5s_ease-out]">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Good {{ new Date().getHours() < 12 ? 'morning' : 'evening' }}, 
          <span class="text-primary">{{ authStore.user?.name || 'User' }}</span>
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          You have some tasks waiting for you today. Stay organized and productive.
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-[slideUp_0.5s_ease-out_0.1s_both]">
        
        <!-- Left Column - Task Form -->
        <section class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New Task</h2>
            <TaskForm />
          </div>
        </section>

        <!-- Right Column - Filters and Task List -->
        <section class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Tasks</h2>
            <TaskFilters />
            <div class="mt-6">
              <TaskList />
            </div>
          </div>
        </section>

      </div>

    </main>
  </div>
</template>