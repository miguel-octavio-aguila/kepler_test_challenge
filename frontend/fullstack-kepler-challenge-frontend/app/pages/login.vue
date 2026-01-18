<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

// Access the store and router
const authStore = useAuthStore();
const router = useRouter();

// Reactive state for the UI
const isLoginMode = ref(true); // Toggle between Login and Register
const isLoading = ref(false);
const errorMessage = ref('');

// Form data state
const form = reactive({
  name: '',
  email: '',
  password: ''
});

// Main handler for form submission
const handleSubmit = async () => {
  // Reset states
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (isLoginMode.value) {
      // --- LOGIN FLOW ---
      await authStore.login(form.email, form.password);
      // Redirect to dashboard on success
      router.push('/dashboard');
    } else {
      // --- REGISTER FLOW ---
      // 1. Register the user
      await authStore.register(form.name, form.email, form.password);
      
      // 2. Alert the user (Simple UX)
      alert('Registration successful! Please sign in.');
      
      // 3. Switch to login mode automatically
      isLoginMode.value = true;
    }
  } catch (error: any) {
    // Extract error message from Axios response if available
    errorMessage.value = error.response?.data?.message || 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
      
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          {{ isLoginMode ? 'Welcome Back' : 'Create Account' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLoginMode ? 'Sign in to access your tasks' : 'Get started with your task manager' }}
        </p>
      </div>

      <div v-if="errorMessage" class="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
        {{ errorMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4 rounded-md shadow-sm">
          
          <div v-if="!isLoginMode">
            <label for="name" class="sr-only">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              required
              class="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
            />
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 animate-spin text-indigo-300" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? 'Processing...' : (isLoginMode ? 'Sign in' : 'Register') }}
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
          <button @click="isLoginMode = !isLoginMode" class="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
            {{ isLoginMode ? 'Sign up' : 'Sign in' }}
          </button>
        </p>
      </div>

    </div>
  </div>
</template>