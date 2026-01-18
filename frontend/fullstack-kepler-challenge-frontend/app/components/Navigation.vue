<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth.store';

  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    authStore.logout();
    router.push('/login');
  };

  // Inject the dark mode ref
  const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false));
</script>

<template>
  <nav class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-md sticky top-0 z-50 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        
        <div class="flex items-center">
          <div class="flex items-center gap-2">
            <span class="w-2 h-8 bg-primary rounded-full"></span>
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Kepler</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span v-if="authStore.user" class="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
            {{ authStore.user.email }}
          </span>

          <button 
            @click="isDarkMode = !isDarkMode" 
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            {{ isDarkMode ? '☀️' : '🌙' }}
          </button>

          <button 
            @click="handleLogout"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>