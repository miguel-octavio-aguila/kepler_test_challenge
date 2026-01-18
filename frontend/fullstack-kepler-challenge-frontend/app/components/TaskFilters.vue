<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
    
    <div class="relative w-full md:w-1/2">
      <input 
        :value="tasksStore.searchQuery"
        @input="e => tasksStore.setSearch((e.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search tasks..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>

    <div class="flex bg-gray-100 p-1 rounded-lg">
      <button 
        @click="tasksStore.setFilter('all')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'all' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
      >
        All
      </button>
      <button 
        @click="tasksStore.setFilter('pending')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'pending' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
      >
        Pending
      </button>
      <button 
        @click="tasksStore.setFilter('completed')"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
        :class="tasksStore.filterStatus === 'completed' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
      >
        Completed
      </button>
    </div>
  </div>
</template>