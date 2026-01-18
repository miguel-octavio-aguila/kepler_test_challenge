<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks.store';

// We access the store directly
const tasksStore = useTasksStore();

// Fetch tasks when component mounts
onMounted(() => {
  tasksStore.fetchTasks();
});
</script>

<template>
  <div>
    <div v-if="tasksStore.isLoading" class="text-center py-10 text-gray-500">
      Loading tasks...
    </div>

    <div v-else-if="tasksStore.tasks.length === 0" class="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
      No tasks yet. Start by creating one!
    </div>

    <ul v-else class="space-y-4">
      <li 
        v-for="task in tasksStore.tasks" 
        :key="task.id"
        class="bg-white p-4 rounded-lg shadow flex items-center justify-between group transition-all hover:shadow-md"
        :class="{ 'opacity-75 bg-gray-50': task.completed }"
      >
        <div class="flex items-center gap-4">
          <button 
            @click="tasksStore.toggleTask(task.id, task.completed)"
            class="w-6 h-6 rounded border flex items-center justify-center transition-colors"
            :class="task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-500'"
          >
            <span v-if="task.completed">✓</span>
          </button>

          <div>
            <h4 
              class="font-medium text-gray-900"
              :class="{ 'line-through text-gray-500': task.completed }"
            >
              {{ task.title }}
            </h4>
            <p v-if="task.description" class="text-sm text-gray-500">
              {{ task.description }}
            </p>
          </div>
        </div>

        <button 
          @click="tasksStore.deleteTask(task.id)"
          class="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete task"
        >
          🗑
        </button>
      </li>
    </ul>
  </div>
</template>