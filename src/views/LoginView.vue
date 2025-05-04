<!-- views/LoginView.vue -->
<script setup>
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginStatus = ref('');

const handleLoginSuccess = (userData) => {
  loginStatus.value = 'success';
  // You would normally update your global state here
  // We'll use localStorage for now
  
  // Simulate event emission to update navbar
  window.dispatchEvent(new CustomEvent('user-login', { detail: userData }));
  
  // Redirect after a short delay to show the success message
  setTimeout(() => {
    router.push('/');
  }, 1000);
};

const handleLoginFailure = (error) => {
  loginStatus.value = 'failure';
  // Additional failure handling if needed
};
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Success message -->
      <div v-if="loginStatus === 'success'" class="max-w-md mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        Login successful! Redirecting you...
      </div>
      
      <LoginForm 
        @login-success="handleLoginSuccess" 
        @login-failure="handleLoginFailure" 
      />
    </div>
  </section>
</template>