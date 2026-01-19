<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();

// Get unique categories from tasks
const categories = computed(() => {
  const cats = tasksStore.tasks
    .map(t => t.category)
    .filter((c): c is string => !!c);
  return ['all', ...new Set(cats)];
});
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
    
    <!-- Search Input with Reset Button -->
    <div class="flex gap-2">
      <div class="relative flex-1">
        <input 
          :value="tasksStore.searchQuery"
          @input="e => tasksStore.setSearch((e.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search tasks..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
        />
        <span class="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">🔍</span>
      </div>
      
      <!-- Reset Button (Icon Only) -->
      <button
        @click="tasksStore.resetFilters()"
        class="flex-shrink-0 p-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        title="Reset all filters"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- Filters Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      <!-- Status Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Status</label>
        <div class="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
          <button 
            @click="tasksStore.setStatus('all')"
            class="flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            :class="tasksStore.status === 'all' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            All
          </button>
          <button 
            @click="tasksStore.setStatus('pending')"
            class="flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            :class="tasksStore.status === 'pending' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Pending
          </button>
          <button 
            @click="tasksStore.setStatus('completed')"
            class="flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            :class="tasksStore.status === 'completed' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Done
          </button>
        </div>
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Category</label>
        <select 
          :value="tasksStore.category"
          @change="e => tasksStore.setCategory((e.target as HTMLSelectElement).value)"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none text-sm transition-colors"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat === 'all' ? 'All Categories' : cat }}
          </option>
        </select>
      </div>

      <!-- DueDate Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Due Date</label>
        <input 
          :value="tasksStore.dueDate"
          @input="e => tasksStore.setDueDate((e.target as HTMLInputElement).value)"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none text-sm transition-colors"
        />
      </div>

    </div>
  </div>
</template>