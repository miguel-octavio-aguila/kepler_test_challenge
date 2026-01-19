import { defineStore } from 'pinia';

// Interface for the User object (matches Prisma schema partially)
interface User {
  id?: number;
  email: string;
  name?: string;
}

// Interface for the Login response from NestJS
interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const useAuthStore = defineStore('auth', {
  // State: The reactive data
  state: () => ({
    user: null as User | null,
  }),

  // Actions: Methods to modify state or async operations
  actions: {
    async login(email: string, pass: string) {
      try {
        const { $api } = useNuxtApp(); // Get the axios instance
        
        // POST request to NestJS backend
        const response = await $api.post<AuthResponse>('/auth/login', { 
          email, 
          password: pass 
        });

        // Save the token to cookies
        const tokenCookie = useCookie<string>('auth_token', {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
        tokenCookie.value = response.data.access_token;
        
        // Save the user data from the response
        this.user = response.data.user; 
        
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw to handle UI feedback later
      }
    },

    async register(name: string, email: string, pass: string) {
      try {
        const { $api } = useNuxtApp();
        
        // POST request to register endpoint
        await $api.post('/auth/register', { 
          name, 
          email, 
          password: pass 
        });
        
        // After registration, we don't auto-login in this flow,
        // we will ask the user to sign in.
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    async fetchUser() {
      const tokenCookie = useCookie('auth_token');
      // If no token, nothing to fetch
      if (!tokenCookie.value) return;

      try {
        const { $api } = useNuxtApp();
        // We expect the backend to return { id, email, name }
        // The return type should match Partial<User> or similar
        const response = await $api.get<User>('/auth/profile');
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // If 401, the interceptor will handle redirect
      }
    },

    logout() {
      // Clear state and cookie
      const tokenCookie = useCookie<string | null>('auth_token');
      tokenCookie.value = null;
      this.user = null;
      
      // Redirect to login page
      const router = useRouter();
      router.push('/login');
    }
  },

  // Getters: Computed properties
  getters: {
    isAuthenticated: (state) => {
      const tokenCookie = useCookie<string | null>('auth_token');
      return !!tokenCookie.value;
    },
  }
});