<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');
const isSubmitting = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);

const handleSubmit = async () => {
  if (!title.value.trim()) return;

  isSubmitting.value = true;
  try {
    await tasksStore.createTask(title.value, description.value);
    title.value = '';
    description.value = '';
    titleInput.value?.focus();
  } catch (error) {
    alert('Error creating task');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 dark:text-gray-100">Add New Task</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <input 
          ref="titleInput"
          v-model="title"
          type="text" 
          placeholder="What needs to be done?" 
          class="block w-full border-0 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent px-0 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-0 sm:text-lg font-medium transition-colors"
          required
        />
        
        <textarea 
          v-model="description"
          placeholder="Add details (optional)" 
          rows="2"
          class="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary/30 sm:text-sm sm:leading-6 resize-none transition-all"
        ></textarea>
      </div>

      <div class="flex justify-end pt-2">
        <button 
          type="submit" 
          :disabled="isSubmitting || !title.trim()"
          class="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <span v-if="isSubmitting" class="mr-2">
            <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isSubmitting ? 'Adding...' : 'Add Task' }}
        </button>
      </div>
    </form>
  </div>
</template>