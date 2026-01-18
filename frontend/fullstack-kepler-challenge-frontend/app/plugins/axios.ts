import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Create axios instance with the base URL from nuxt.config.ts
  const api = axios.create({
    baseURL: config.public.apiBase, 
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Auto-attach JWT token if it exists
  api.interceptors.request.use((config) => {
    // useCookie is a Nuxt composable to handle cookies reactively
    const token = useCookie('auth_token'); 
    
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Response Interceptor: Handle global errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // If token expires (401), redirect to login ONLY if not already on login page
      if (error.response?.status === 401) {
        // Don't redirect if we're already on the login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          const router = useRouter();
          router.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  // Inject $api to be available across the app
  return {
    provide: {
      api: api,
    },
  };
});