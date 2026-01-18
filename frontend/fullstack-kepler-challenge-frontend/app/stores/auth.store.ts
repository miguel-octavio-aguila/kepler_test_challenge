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
}

export const useAuthStore = defineStore('auth', {
  // State: The reactive data
  state: () => ({
    user: null as User | null,
    // Automatically links this state to a cookie named 'auth_token'
    token: useCookie<string | null>('auth_token'),
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

        // Save the token. The cookie updates automatically due to useCookie binding
        this.token = response.data.access_token;
        
        // We set the user email temporarily since the login endpoint 
        this.user = { email }; 
        
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

    logout() {
      // Clear state and cookie
      this.token = null;
      this.user = null;
      
      // Redirect to login page
      const router = useRouter();
      router.push('/login');
    }
  },

  // Getters: Computed properties
  getters: {
    isAuthenticated: (state) => !!state.token,
  }
});