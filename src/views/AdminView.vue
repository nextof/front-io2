<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div class="bg-white shadow-md rounded-lg p-6">
        <p>Welcome to the Admin Dashboard, {{ username }}</p>
        <p class="mt-4">This is a protected area for administrators only.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getCurrentUser } from '../services/UserService';
  
  export default {
    name: 'AdminView',
    data() {
      return {
        username: ''
      }
    },
    async mounted() {
      const user = await getCurrentUser();
      if (user) {
        this.username = user.username;
      }
    }
  }
  </script>