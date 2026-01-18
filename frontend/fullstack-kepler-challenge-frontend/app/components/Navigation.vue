<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <nav class="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-14">
        
        <div class="flex items-center">
          <div class="flex items-center gap-2">
            <span class="w-2 h-8 bg-primary rounded-full"></span>
            <span class="text-lg font-semibold text-gray-900 tracking-tight">Kepler</span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <span v-if="authStore.user" class="hidden sm:block text-sm text-gray-500">
            {{ authStore.user.email }}
          </span>

          <button 
            @click="handleLogout"
            class="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>