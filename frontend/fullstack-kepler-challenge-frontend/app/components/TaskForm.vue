<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!title.value.trim()) return;

  isSubmitting.value = true;
  try {
    // Call the store action
    await tasksStore.createTask(title.value, description.value);
    
    // Reset form
    title.value = '';
    description.value = '';
  } catch (error) {
    alert('Error creating task');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Create New Task</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input 
          v-model="title"
          type="text" 
          placeholder="What needs to be done?" 
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <textarea 
          v-model="description"
          placeholder="Description (optional)" 
          rows="2"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        :disabled="isSubmitting"
        class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {{ isSubmitting ? 'Adding...' : 'Add Task' }}
      </button>
    </form>
  </div>
</template>