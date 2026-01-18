export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // If the user is NOT authenticated and tries to access a protected route
  if (!authStore.isAuthenticated) {
    // Redirect them to the login page
    return navigateTo('/login');
  }
});