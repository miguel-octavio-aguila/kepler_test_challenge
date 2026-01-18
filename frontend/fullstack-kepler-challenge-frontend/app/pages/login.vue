<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();

const isLoginMode = ref(true);
const isLoading = ref(false);
const errorMessage = ref('');

const form = reactive({
  name: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (isLoginMode.value) {
      await authStore.login(form.email, form.password);
      router.push('/dashboard');
    } else {
      await authStore.register(form.name, form.email, form.password);
      alert('Registration successful! Please sign in.');
      isLoginMode.value = true;
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {{ isLoginMode ? 'Welcome back' : 'Create an account' }}
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ isLoginMode ? 'Enter your details to access your workspace.' : 'Start organizing your tasks efficiently.' }}
        </p>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 p-3 rounded-md text-sm text-center">
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="handleSubmit">
        
        <div v-if="!isLoginMode" class="space-y-1">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          <svg v-if="isLoading" class="mr-2 h-5 w-5 animate-spin text-white/90" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Processing...' : (isLoginMode ? 'Sign in' : 'Create account') }}
        </button>
      </form>

      <!-- Toggle Mode -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ isLoginMode ? "New here?" : "Already have an account?" }}
          <button @click="isLoginMode = !isLoginMode" class="font-medium text-primary hover:text-primary-hover transition-colors ml-1">
            {{ isLoginMode ? 'Create an account' : 'Sign in' }}
          </button>
        </p>
      </div>

    </div>
  </div>
</template>