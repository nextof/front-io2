<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="container mx-auto px-4 py-6">
                <h1 class="text-3xl font-bold text-gray-800">Staff Portal</h1>
                <p class="text-gray-600">
                    Welcome, {{ user.username || 'Staff Member' }}
                </p>
            </div>
        </header>

        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Sidebar -->
                <div class="md:col-span-1">
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="p-6">
                            <h2
                                class="text-xl font-semibold text-gray-800 mb-4"
                            >
                                Staff Actions
                            </h2>
                            <nav class="space-y-2">
                                <RouterLink
                                    v-if="isAdmin || isWorker"
                                    to="/staff/vehicles"
                                    class="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-600 font-medium"
                                    :class="{
                                        'bg-blue-50':
                                            currentRoute === '/staff/vehicles',
                                    }"
                                >
                                    Manage Vehicles
                                </RouterLink>
                                <RouterLink
                                    v-if="isAdmin || isMechanic"
                                    to="/staff/maintenance-tasks"
                                    class="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-600 font-medium"
                                    :class="{
                                        'bg-blue-50':
                                            currentRoute ===
                                            '/staff/maintenance-tasks',
                                    }"
                                >
                                    Maintenance Tasks
                                </RouterLink>
                                <RouterLink
                                    v-if="isAdmin"
                                    to="/staff/reservations"
                                    class="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-600 font-medium"
                                    :class="{
                                        'bg-blue-50':
                                            currentRoute ===
                                            '/staff/reservations',
                                    }"
                                >
                                    Reservations
                                </RouterLink>
                                <RouterLink
                                    v-if="isAdmin"
                                    to="/staff/users"
                                    class="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-600 font-medium"
                                    :class="{
                                        'bg-blue-50':
                                            currentRoute === '/staff/users',
                                    }"
                                >
                                    Manage Users
                                </RouterLink>
                            </nav>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="md:col-span-3">
                    <router-view></router-view>
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
            roles: [],
        });

        // Placeholder state
        const showingPlaceholder = ref(false);
        const placeholderTitle = ref('');
        const currentRoute = ref(route.path);

        // Watch for route changes
        watch(
            () => route.path,
            newPath => {
                currentRoute.value = newPath;
                // If the route changes and we're not on the placeholder, hide it
                if (route.name && route.name !== 'staff') {
                    showingPlaceholder.value = false;
                }
            }
        );

        // Check if user is admin
        const isAdmin = computed(() => {
            return user.value.roles?.includes('ROLE_ADMIN') || false;
        });
        // Check if user is a worker
        const isWorker = computed(() => {
            return user.value.roles?.includes('ROLE_MODERATOR') || false;
        });
        // Check if user is a mechanic
        const isMechanic = computed(() => {
            return user.value.roles?.includes('ROLE_MECHANIC') || false;
        });

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
            isWorker,
            isMechanic,
            currentRoute,
            showingPlaceholder,
            placeholderTitle,
        };
    },
};
</script>
