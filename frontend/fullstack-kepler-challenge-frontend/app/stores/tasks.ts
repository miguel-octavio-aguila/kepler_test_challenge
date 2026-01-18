import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  categoryId?: number;
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const { $api } = useNuxtApp();
        const response = await $api.get('/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        this.loading = false;
      }
    },

    async createTask(taskData: any) {
      try {
        const { $api } = useNuxtApp();
        const response = await $api.post('/tasks', taskData);
        // Update the local state without having to reload everything (Optimistic UI)
        this.tasks.push(response.data);
      } catch (error) {
        throw error;
      }
    },

    async updateTask(id: number, updates: Partial<Task>) {
      try {
        const { $api } = useNuxtApp();
        const response = await $api.put(`/tasks/${id}`, updates);
        
        // Find the task in the array and update it
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async deleteTask(id: number) {
      try {
        const { $api } = useNuxtApp();
        await $api.delete(`/tasks/${id}`);
        
        // Filter out the deleted task
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (error) {
        throw error;
      }
    },
    
    // Method to toggle task completion (Bonus UX)
    async toggleTaskCompletion(id: number, currentStatus: boolean) {
      return this.updateTask(id, { completed: !currentStatus });
    }
  },
  
  getters: {
    // Getters to filter tasks by completion status
    pendingTasks: (state) => state.tasks.filter(t => !t.completed),
    completedTasks: (state) => state.tasks.filter(t => t.completed),
  }
});