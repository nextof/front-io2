<!-- components/LoginForm.vue -->
<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['login-success', 'login-failure']);
const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});

const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  // Reset error state
  error.value = '';
  loading.value = true;
  
  // Basic validation
  if (!formData.email || !formData.password) {
    error.value = 'Email and password are required';
    loading.value = false;
    return;
  }
  
  try {
    // This would normally be an API call to your backend
    // For now, we'll just simulate a successful login with mock data
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    // Mock successful login for specific credentials
    if (formData.email === 'admin@example.com' && formData.password === 'password') {
      const userData = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'administrator'
      };
      
      // Store user data in localStorage (temporary solution until we have a backend)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      emit('login-success', userData);
      router.push('/');
    } else {
      error.value = 'Invalid email or password';
      emit('login-failure', error.value);
    }
  } catch (err) {
    error.value = 'Something went wrong. Please try again.';
    emit('login-failure', error.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Login to Car Rental System</h2>
    
    <form @submit.prevent="handleSubmit">
      <!-- Error Alert -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input 
          v-model="formData.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="email" 
          type="email" 
          placeholder="your@email.com"
        >
      </div>
      
      <!-- Password Field -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input 
          v-model="formData.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="password" 
          type="password" 
          placeholder="******************"
        >
      </div>
      
      <!-- Submit Button -->
      <div class="flex items-center justify-between">
        <button 
          class="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          <span>{{ loading ? 'Logging in...' : 'Sign In' }}</span>
        </button>
      </div>
    </form>
    
    <!-- Additional Info -->
    <p class="text-center text-gray-600 text-sm mt-6">
      Demo Access: <br>
      Email: admin@example.com <br>
      Password: password
    </p>
  </div>
</template>