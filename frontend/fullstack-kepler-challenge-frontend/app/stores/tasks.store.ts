import { defineStore } from 'pinia';

// Interface matching the Backend/Prisma Schema
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[], // Local cache of tasks
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    // GET: Fetch all tasks from the API
    async fetchTasks() {
      this.isLoading = true;
      this.error = null;
      try {
        const { $api } = useNuxtApp();
        const response = await $api.get<Task[]>('/tasks');
        this.tasks = response.data;
      } catch (err: any) {
        this.error = 'Failed to load tasks';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // POST: Create a new task
    async createTask(title: string, description?: string) {
      try {
        const { $api } = useNuxtApp();
        // The backend expects title and description
        const response = await $api.post<Task>('/tasks', { title, description });
        
        // Optimistic UI: Add directly to the array without reloading
        this.tasks.push(response.data);
      } catch (err: any) {
        this.error = 'Failed to create task';
        throw err;
      }
    },

    // DELETE: Remove a task
    async deleteTask(id: number) {
      try {
        const { $api } = useNuxtApp();
        await $api.delete(`/tasks/${id}`);
        
        // Remove from local state
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err: any) {
        this.error = 'Failed to delete task';
        throw err;
      }
    },

    // PATCH: Update task status (Toggle Completed)
    async toggleTask(id: number, currentStatus: boolean) {
      try {
        const { $api } = useNuxtApp();
        // Use the /complete endpoint which toggles the status automatically
        const response = await $api.patch<Task>(`/tasks/${id}/complete`);

        // Update the specific task in the local array
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (err: any) {
        console.error('Failed to update task', err);
      }
    }
  },

  getters: {
    // Useful for showing "You have 3 pending tasks"
    pendingCount: (state) => state.tasks.filter(t => !t.completed).length,
  }
});