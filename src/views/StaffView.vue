<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800">Staff Portal</h1>
        <p class="text-gray-600">Welcome, {{ user.username || 'Staff Member' }}</p>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Staff Actions</h2>
              <nav class="space-y-2">
                <RouterLink
                  to="/staff/vehicles"
                  class="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-600 font-medium"
                  :class="{ 'bg-blue-50': currentRoute === '/staff/vehicles' }"
                  @click="hidePlaceholder"
                >
                  Manage Vehicles
                </RouterLink>
                <a
                  href="#"
                  @click.prevent="showPlaceholder('Maintenance Tasks')"
                  class="block px-4 py-2 rounded-md hover:bg-blue-50"
                  :class="placeholderTitle === 'Maintenance Tasks' && showingPlaceholder ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 font-medium'"
                >
                  Maintenance Tasks
                </a>
                <a
                  href="#"
                  @click.prevent="showPlaceholder('Reservations')"
                  class="block px-4 py-2 rounded-md hover:bg-blue-50" 
                  :class="placeholderTitle === 'Reservations' && showingPlaceholder ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 font-medium'"
                >
                  Reservations
                </a>
                <a
                  v-if="isAdmin"
                  href="#"
                  @click.prevent="showPlaceholder('User Management')"
                  class="block px-4 py-2 rounded-md hover:bg-blue-50"
                  :class="placeholderTitle === 'User Management' && showingPlaceholder ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 font-medium'"
                >
                  Manage Users
                </a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="md:col-span-3">
          <router-view v-if="!showingPlaceholder"></router-view>
          
          <!-- Placeholder for features not yet implemented -->
          <div v-if="showingPlaceholder" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">{{ placeholderTitle }}</h2>
                <!-- Back button to return to vehicles view -->
                <button 
                  @click="goToVehicles" 
                  class="px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Vehicles
                </button>
              </div>
              
              <div class="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-700 mb-2">Coming Soon</h3>
                <p class="text-gray-500 max-w-md mx-auto">
                  This feature is currently in development and will be available soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCurrentUser } from '../services/UserService';

export default {
  name: 'StaffView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref({
      username: '',
      roles: []
    });

    // Placeholder state
    const showingPlaceholder = ref(false);
    const placeholderTitle = ref('');
    const currentRoute = ref(route.path);

    // Watch for route changes
    watch(() => route.path, (newPath) => {
      currentRoute.value = newPath;
      // If the route changes and we're not on the placeholder, hide it
      if (route.name && route.name !== 'staff') {
        showingPlaceholder.value = false;
      }
    });

    // Check if user is admin
    const isAdmin = computed(() => {
      return user.value.roles?.includes('ROLE_ADMIN') || false;
    });

    // Show placeholder for unimplemented features
    const showPlaceholder = (title) => {
      placeholderTitle.value = title;
      showingPlaceholder.value = true;
    };

    // Hide placeholder and show router view
    const hidePlaceholder = () => {
      showingPlaceholder.value = false;
    };

    // Go back to vehicles view
    const goToVehicles = () => {
      showingPlaceholder.value = false;
      router.push('/staff/vehicles');
    };

    // Load user data when component is mounted
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        user.value = currentUser;
      }
    };

    loadUser();

    return {
      user,
      isAdmin,
      currentRoute,
      showingPlaceholder,
      placeholderTitle,
      showPlaceholder,
      hidePlaceholder,
      goToVehicles
    };
  }
};
</script>