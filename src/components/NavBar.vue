<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import logo from '../assets/logo3.png';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Authentication state (mock)
const isLoggedIn = ref(false);
const userData = ref(null);

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;
};


// Initialize authentication state from localStorage
onMounted(() => {
  const storedLoginState = localStorage.getItem('isLoggedIn');
  if (storedLoginState === 'true') {
    isLoggedIn.value = true;
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData);
    }
  }
  
  // Listen for login events from other components
  window.addEventListener('user-login', (event) => {
    isLoggedIn.value = true;
    userData.value = event.detail;
  });
});

const logout = () => {
  // Clear authentication data
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  isLoggedIn.value = false;
  userData.value = null;
  
  // Redirect to home page
  router.push('/');
};
</script>

<template>
  <nav class="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 border-b border-teal-300 shadow-lg">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <!-- Logo and Brand Name -->
        <div class="flex items-center">
          <RouterLink class="flex items-center group" to="/">
            <img class="h-12 w-auto rounded-full bg-green-200 p-1 shadow-md transition-transform duration-300 group-hover:scale-110" :src="logo" alt="Car Rental" />
            <span class="ml-3 text-green-200 text-2xl font-bold tracking-tight drop-shadow-md transition-all duration-300 group-hover:text-white">Tailwind Cars</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation Menu -->
        <div class="hidden md:flex md:items-center">
          <div class="flex space-x-4">
            <RouterLink
              to="/"
              :class="[
                isActiveLink('/') ? 'bg-indigo-600 text-white' : 'text-white hover:bg-indigo-500 hover:text-white', 
                'rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
              ]"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/vehicles"
              :class="[
                isActiveLink('/vehicles') ? 'bg-purple-600 text-white' : 'text-white hover:bg-purple-500 hover:text-white', 
                'rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
              ]"
            >
              Our Fleet
            </RouterLink>
            <RouterLink
              to="/client"
              :class="[
                isActiveLink('/client') ? 'bg-teal-600 text-white' : 'text-white hover:bg-teal-500 hover:text-white', 
                'rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
              ]"
            >
              Client Area
            </RouterLink>
            <RouterLink
              v-if="isLoggedIn"
              to="/admin"
              :class="[
                isActiveLink('/admin') ? 'bg-cyan-600 text-white' : 'text-white hover:bg-cyan-500 hover:text-white', 
                'rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
              ]"
            >
              Staff Portal
            </RouterLink>
            
             <!-- Login/Logout Button -->
             <RouterLink
              v-if="!isLoggedIn"
              to="/login"
              class="text-white hover:bg-green-500 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              Login
            </RouterLink>
            <button 
              v-else
              @click="logout" 
              class="text-white hover:bg-red-500 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button @click="toggleMenu" type="button" class="text-white hover:bg-indigo-500 p-2 rounded-md transition-colors">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="isOpen" class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 bg-gradient-to-b from-purple-600 to-blue-500">
        <RouterLink
          to="/"
          @click="toggleMenu"
          :class="[
            isActiveLink('/') ? 'bg-indigo-700 text-white' : 'text-white hover:bg-indigo-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/vehicles"
          @click="toggleMenu"
          :class="[
            isActiveLink('/vehicles') ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Our Fleet
        </RouterLink>
        <RouterLink
          to="/client"
          @click="toggleMenu"
          :class="[
            isActiveLink('/client') ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Client Area
        </RouterLink>
        <RouterLink
          v-if="isLoggedIn"
          to="/admin"
          @click="toggleMenu"
          :class="[
            isActiveLink('/admin') ? 'bg-cyan-700 text-white' : 'text-white hover:bg-cyan-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Staff Portal
        </RouterLink>
        
        <!-- Mobile Login/Logout Button -->
        <RouterLink
          v-if="!isLoggedIn"
          to="/login"
          @click="toggleMenu"
          class="block w-full text-white hover:bg-green-500 rounded-md px-3 py-2 text-base font-medium transition-colors"
        >
          Login
        </RouterLink>
        <button 
          v-else
          @click="logout" 
          class="block w-full text-white hover:bg-red-500 rounded-md px-3 py-2 text-base font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>