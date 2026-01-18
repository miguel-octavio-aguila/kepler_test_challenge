<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  // 1. Clear state/cookies
  authStore.logout();
  // 2. Redirect to login
  router.push('/login');
};
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-indigo-600">
            TaskApp
          </h1>
        </div>

        <div class="flex items-center gap-4">
          <span v-if="authStore.user" class="text-sm text-gray-500">
            {{ authStore.user.email }}
          </span>

          <button 
            @click="handleLogout"
            class="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>