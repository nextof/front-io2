<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="bg-red-50 py-20">
    <div class="container mx-auto px-4 text-center">
      <div class="mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p class="text-lg text-gray-600 mb-8">
        You do not have permission to access this page. Please log in with the appropriate account or contact an administrator.
      </p>
      
      <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <RouterLink to="/" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Go to Home
        </RouterLink>
        <RouterLink to="/login" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
          Log In
        </RouterLink>
      </div>
    </div>
  </section>
</template>