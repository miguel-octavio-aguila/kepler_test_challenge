<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary-light selection:text-primary">
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