<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.fetchTasks();
});
</script>

<template>
  <div>
    <div v-if="tasksStore.isLoading" class="space-y-3 py-4">
      <div v-for="i in 3" :key="i" class="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
    </div>

    <div v-else-if="tasksStore.tasks.length === 0" class="text-center py-16 px-4">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
        <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-gray-900">No tasks yet</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new task above.</p>
    </div>

    <TransitionGroup 
      v-else 
      name="list" 
      tag="ul" 
      class="space-y-3"
    >
      <li 
        v-for="task in tasksStore.filteredTasks" 
        :key="task.id"
        class="group relative flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200"
        :class="{ 'opacity-60 bg-gray-50/80': task.completed }"
      >
        <button 
          @click="tasksStore.toggleTask(task.id, task.completed)"
          class="mt-1 flex-shrink-0 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          :class="[
            task.completed 
              ? 'bg-primary border-primary text-white' 
              : 'border-gray-300 bg-white hover:border-primary text-transparent'
          ]"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        <div class="flex-1 min-w-0 pt-0.5">
          <h4 
            class="text-sm font-medium text-gray-900 transition-all duration-200"
            :class="{ 'line-through text-gray-500': task.completed }"
          >
            {{ task.title }}
          </h4>
          <p v-if="task.description" class="mt-1 text-xs text-gray-500 line-clamp-2">
            {{ task.description }}
          </p>
        </div>

        <button 
          @click="tasksStore.deleteTask(task.id)"
          class="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
          title="Delete task"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </li>
    </TransitionGroup>

    <div 
      v-if="!tasksStore.isLoading && tasksStore.filteredTasks.length === 0 && tasksStore.tasks.length > 0" 
      class="text-center py-12 px-4"
    >
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4">
        <span class="text-2xl">🔍</span>
      </div>
      <h3 class="text-sm font-medium text-gray-900">No matching tasks found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
    </div>

  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>