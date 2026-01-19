<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');
const category = ref('General');
const dueDate = ref(''); // New: due date field
const isSubmitting = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);

const categories = ['General', 'Work', 'Personal', 'Urgent'];

// Watch for changes in editingTask
watch(() => tasksStore.editingTask, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description || '';
    category.value = newTask.category || 'General';
    // Format date string for input type="date"
    dueDate.value = newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : '';
    // Focus title input
    setTimeout(() => titleInput.value?.focus(), 100);
  } else {
    resetForm();
  }
});

const resetForm = () => {
  title.value = '';
  description.value = '';
  category.value = 'General';
  dueDate.value = '';
};

const handleCancel = () => {
  tasksStore.clearEditingTask();
  resetForm();
};

const handleSubmit = async () => {
  if (!title.value.trim()) return;

  isSubmitting.value = true;
  try {
    if (tasksStore.editingTask) {
       await tasksStore.updateTask(tasksStore.editingTask.id, {
        title: title.value,
        description: description.value,
        category: category.value,
        dueDate: dueDate.value
       });
    } else {
       await tasksStore.createTask(title.value, description.value, category.value, dueDate.value);
    }
    resetForm();
  } catch (error) {
    alert('Error saving task');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 dark:text-gray-100">
      {{ tasksStore.editingTask ? 'Edit Task' : 'Add New Task' }}
    </h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <div>
          <input 
            ref="titleInput"
            v-model="title"
            type="text" 
            placeholder="What needs to be done?" 
            class="block w-full border-0 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent px-0 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary focus:ring-0 sm:text-lg font-medium transition-colors"
            required
          />
        </div>
        
        <div>
          <textarea 
            v-model="description"
            placeholder="Add details (optional)" 
            rows="2"
            class="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary/30 sm:text-sm sm:leading-6 resize-none transition-all"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select 
            v-model="category"
            class="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary/30 sm:text-sm sm:leading-6 transition-all"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
          <input 
            v-model="dueDate"
            type="date"
            class="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-primary/30 sm:text-sm sm:leading-6 transition-all"
          />
        </div>
      </div>

      <div class="flex justify-end pt-2 gap-2">
        <button 
          v-if="tasksStore.editingTask"
          type="button"
          @click="handleCancel"
          class="inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
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
          {{ isSubmitting ? 'Saving...' : (tasksStore.editingTask ? 'Update Task' : 'Add Task') }}
        </button>
      </div>
    </form>
  </div>
</template>