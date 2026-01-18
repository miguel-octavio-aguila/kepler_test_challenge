<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
    
    <div class="relative w-full md:w-1/2">
      <input 
        :value="tasksStore.searchQuery"
        @input="e => tasksStore.setSearch((e.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search tasks..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
      />
      <span class="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">🔍</span>
    </div>

    <div class="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
      <button 
        @click="tasksStore.setFilter('all')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'all' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        All
      </button>
      <button 
        @click="tasksStore.setFilter('pending')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'pending' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        Pending
      </button>
      <button 
        @click="tasksStore.setFilter('completed')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'completed' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        Completed
      </button>
    </div>
  </div>
</template>