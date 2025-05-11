<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '../assets/logo3.png';
import { getCurrentUser, logoutUser } from '../services/UserService';

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const isLoggedIn = ref(false);
const userData = ref(null);

const isActiveLink = (routePath) => {
  return route.path === routePath;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleLogout = async () => {
  await logoutUser();
  isLoggedIn.value = false;
  userData.value = null;
  router.push('/login');
};

const navigateToProfile = () => {
  router.push('/profile');
};

// Function to update auth state
const updateAuthState = async () => {
  const user = await getCurrentUser();
  if (user) {
    isLoggedIn.value = true;
    userData.value = user;
  } else {
    isLoggedIn.value = false;
    userData.value = null;
  }
};

// Login event handler
const handleUserLogin = (event) => {
  isLoggedIn.value = true;
  userData.value = event.detail;
  console.log('Login event received in NavBar:', event.detail);
};

// Initialize authentication state and add event listeners
onMounted(async () => {
  // Initial auth check
  await updateAuthState();
  
  // Listen for login events
  window.addEventListener('user-login', handleUserLogin);
});

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  window.removeEventListener('user-login', handleUserLogin);
});

// Check if user is admin
const isAdmin = () => {
  return userData.value?.roles?.includes('ROLE_ADMIN') || false;
};

// Get random pastel color for user avatar
const getUserAvatarColor = () => {
  // Using username to generate a consistent color for each user
  if (!userData.value || !userData.value.username) return 'bg-indigo-200';
  
  const colors = [
    'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 
    'bg-purple-200', 'bg-pink-200', 'bg-indigo-200'
  ];
  
  // Simple hash function to select a color based on username
  const hash = userData.value.username.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return colors[hash % colors.length];
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
          <!-- Main navigation links -->
          <div class="flex space-x-6 mr-8">
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
          </div>
          
          <!-- User-specific links and info -->
          <div class="flex items-center">
            <div class="flex space-x-6 mr-4">
              <RouterLink
              v-if="isLoggedIn"
              to="/profile"
              :class="[
                isActiveLink('/profile') || isActiveLink('/client') ? 'bg-teal-600 text-white' : 'text-white hover:bg-teal-500 hover:text-white', 
                'rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
              ]"
            >
              Profile
            </RouterLink>
              <RouterLink
                v-if="isLoggedIn && isAdmin()"
                to="/admin"
                :class="[
                  isActiveLink('/admin') ? 'bg-cyan-600 text-white' : 'text-white hover:bg-cyan-500 hover:text-white', 
                  'rounded-md px-5 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow'
                ]"
              >
                Staff Portal
              </RouterLink>
            </div>

            <!-- User Avatar and Logout -->
            <div v-if="isLoggedIn && userData" class="flex items-center border-l border-white border-opacity-20 pl-4 ml-4">
              <!-- Clickable avatar that navigates to profile -->
              <div 
                @click="navigateToProfile" 
                :class="[
                  getUserAvatarColor(), 
                  'rounded-full h-8 w-8 flex items-center justify-center font-bold shadow-sm text-gray-700 cursor-pointer hover:shadow-md transition-all duration-300'
                ]"
                title="Go to Profile"
              >
                {{ userData.username ? userData.username.charAt(0).toUpperCase() : 'U' }}
              </div>
              <span class="ml-2 mr-4 text-white text-sm font-medium">{{ userData.username }}</span>
              <button 
                @click="handleLogout" 
                class="bg-red-400 bg-opacity-30 hover:bg-opacity-50 text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300"
              >
                Logout
              </button>
            </div>
            
            <!-- Login Button (when not logged in) -->
            <RouterLink
              v-if="!isLoggedIn"
              to="/login"
              class="bg-green-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow hover:bg-green-600"
            >
              Login
            </RouterLink>
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
          v-if="isLoggedIn"
          to="/profile"
          @click="toggleMenu"
          :class="[
            isActiveLink('/profile') || isActiveLink('/client') ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Profile
        </RouterLink>
        <RouterLink
          v-if="isLoggedIn && isAdmin()"
          to="/admin"
          @click="toggleMenu"
          :class="[
            isActiveLink('/admin') ? 'bg-cyan-700 text-white' : 'text-white hover:bg-cyan-500',
            'block rounded-md px-3 py-2 text-base font-medium transition-colors'
          ]"
        >
          Staff Portal
        </RouterLink>
        
        <!-- User Info & Logout (Mobile) -->
        <div v-if="isLoggedIn && userData" class="mt-4 border-t border-blue-400 pt-3">
          <div class="flex items-center justify-between px-3 py-2">
            <div class="flex items-center">
              <!-- Clickable avatar for mobile -->
              <div 
                @click="() => { navigateToProfile(); toggleMenu(); }" 
                :class="[
                  getUserAvatarColor(), 
                  'rounded-full h-7 w-7 flex items-center justify-center font-bold mr-2 text-gray-700 cursor-pointer'
                ]"
                title="Go to Profile"
              >
                {{ userData.username ? userData.username.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="text-white font-medium">{{ userData.username }}</div>
            </div>
            <button 
              @click="() => { handleLogout(); toggleMenu(); }" 
              class="bg-red-400 bg-opacity-30 hover:bg-opacity-50 text-white rounded-md px-3 py-1 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <!-- Mobile Login Button -->
        <RouterLink
          v-if="!isLoggedIn"
          to="/login"
          @click="toggleMenu"
          class="block w-full text-center text-white bg-green-600 hover:bg-green-700 rounded-md px-3 py-2 text-base font-medium transition-colors mt-3"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>