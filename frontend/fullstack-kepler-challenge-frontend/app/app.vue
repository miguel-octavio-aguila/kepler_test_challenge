<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth.store';

  // Dark mode state
  const isDarkMode = ref(false);

  // Initialize dark mode (client-side only)
  onMounted(async () => {
    if (process.client) {
      const saved = localStorage.getItem('darkMode');
      isDarkMode.value = saved === 'true';
      applyDarkMode(isDarkMode.value);

      // Restore user session if token exists
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && !authStore.user) {
        await authStore.fetchUser();
      }
    }
  });

  // Apply dark mode to document
  const applyDarkMode = (value: boolean) => {
    if (process.client) {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Watch for changes and update DOM
  watch(isDarkMode, async (newValue) => {
    if (process.client) {
      localStorage.setItem('darkMode', String(newValue));
      await nextTick();
      applyDarkMode(newValue);
    }
  });

  // Provide to children
  provide('isDarkMode', isDarkMode);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-light selection:text-primary transition-colors duration-200">
    <NuxtLoadingIndicator color="#4f46e5" />
    <NuxtPage />
  </div>
</template>

<style>
/* Global Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Custom Scrollbar for Webkit */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>