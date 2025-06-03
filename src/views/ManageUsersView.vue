<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Manage Users</h2>
            </div>

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-10">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                ></div>
                <p class="mt-2">Loading users...</p>
            </div>

            <div
                v-else-if="error"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
                {{ error }}
            </div>

            <!-- users List -->
            <div v-else>
                <!-- Simple Search -->
                <div class="mb-6">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search for a user..."
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white">
                        <thead class="bg-gray-100">
                            <tr>
                                <th
                                    @click="toggleSort('id')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        ID
                                        <span
                                            v-if="sortField === 'id'"
                                            class="ml-1"
                                        >
                                            <svg
                                                v-if="sortDirection === 'asc'"
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 15l7-7 7 7"
                                                ></path>
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th
                                    @click="toggleSort('username')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Username
                                        <span
                                            v-if="sortField === 'username'"
                                            class="ml-1"
                                        >
                                            <svg
                                                v-if="sortDirection === 'asc'"
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 15l7-7 7 7"
                                                ></path>
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th
                                    @click="toggleSort('email')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        E-mail
                                        <span
                                            v-if="sortField === 'email'"
                                            class="ml-1"
                                        >
                                            <svg
                                                v-if="sortDirection === 'asc'"
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 15l7-7 7 7"
                                                ></path>
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th
                                    @click="toggleSort('role')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Role
                                        <span
                                            v-if="sortField === 'role'"
                                            class="ml-1"
                                        >
                                            <svg
                                                v-if="sortDirection === 'asc'"
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 15l7-7 7 7"
                                                ></path>
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </span>
                                    </div>
                                </th>
                                <th class="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="user in filteredUsers"
                                :key="user.id"
                                class="border-t hover:bg-gray-50"
                            >
                                <td class="py-3 px-4">{{ user.id }}</td>
                                <td class="py-3 px-4">
                                    <span>
                                        {{ user.username }}
                                        <span
                                            v-if="user.id === currentUser?.id"
                                            class="text-m text-gray-500 font-semibold ml-2"
                                        >
                                            (You)
                                        </span>
                                    </span>
                                </td>
                                <td class="py-3 px-4">{{ user.email }}</td>
                                <td class="py-3 px-4">
                                    <span
                                        :class="[
                                            'px-2 py-1 rounded-full text-sm font-semibold',
                                            {
                                                'bg-blue-100 text-blue-800':
                                                    user.role === 'ROLE_USER',
                                                'bg-green-100 text-green-800':
                                                    user.role ===
                                                    'ROLE_MODERATOR',
                                                'bg-yellow-100 text-yellow-800':
                                                    user.role ===
                                                    'ROLE_MECHANIC',
                                                'bg-red-100 text-red-800':
                                                    user.role === 'ROLE_ADMIN',
                                            },
                                        ]"
                                    >
                                        {{
                                            roleEmojis[user.role] +
                                            ' ' +
                                            rolesDict[user.role]
                                        }}
                                    </span>
                                </td>
                                <td class="py-3 px-8">
                                    <div class="flex space-x-2">
                                        <button
                                            @click="openEditUserModal(user)"
                                            class="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300 transform hover:scale-110"
                                            title="Edit"
                                        >
                                            <svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <!-- Empty state -->
                            <tr v-if="filteredUsers.length === 0">
                                <td
                                    colspan="7"
                                    class="py-6 text-center text-gray-500"
                                >
                                    No users found matching your criteria
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- User Modal (Edit) -->
    <div
        v-if="showUserModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Edit User</h3>
                    <button
                        @click="closeUserModal"
                        class="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="saveUser" class="space-y-6">
                    <!-- Username -->
                    <div>
                        <label
                            for="username"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Username</label
                        >
                        <input
                            id="username"
                            v-model="userForm.username"
                            type="text"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Email -->
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Email</label
                        >
                        <input
                            id="email"
                            v-model="userForm.email"
                            type="email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <!-- Role Dropdown -->
                    <div>
                        <label
                            for="role"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Role</label
                        >
                        <select
                            id="role"
                            v-model="userForm.role"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                            :disabled="userForm.id === currentUser.id"
                        >
                            <option
                                v-for="(label, key) in rolesDict"
                                :key="key"
                                :value="key"
                            >
                                {{ label }}
                            </option>
                        </select>
                    </div>

                    <!-- Form Actions -->
                    <div class="mt-6 flex justify-between items-center">
                        <!-- Delete button -->
                        <button
                            type="button"
                            @click="handleDeleteUser(userForm)"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="
                                isDeleting ||
                                isSaving ||
                                userForm.id === currentUser.id
                            "
                        >
                            {{ isDeleting ? 'Deleting...' : 'Delete User' }}
                        </button>

                        <!-- Save/Cancel -->
                        <div class="flex space-x-3">
                            <button
                                type="button"
                                @click="closeUserModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                @click="saveUser(userForm)"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                :disabled="isSaving || isDeleting"
                            >
                                {{ isSaving ? 'Saving...' : 'Update User' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import {
    getUsersWithRoles,
    getCurrentUser,
    deleteUser,
    updateUser,
} from '../services/UserService';

export default {
    name: 'ManageUsersView',
    setup() {
        // roles mapping
        const rolesDict = ref({
            ROLE_USER: 'User',
            ROLE_MODERATOR: 'Employee',
            ROLE_MECHANIC: 'Mechanic',
            ROLE_ADMIN: 'Admin',
        });
        const roleEmojis = ref({
            ROLE_USER: '👤',
            ROLE_MODERATOR: '📋',
            ROLE_MECHANIC: '🛠️',
            ROLE_ADMIN: '👑',
        });

        // State
        const currentUser = ref(null);
        const users = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const searchQuery = ref('');
        const showUserModal = ref(false);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        // User form
        const userForm = ref({
            id: null,
            username: null,
            email: null,
            role: null,
        });

        // Sorting
        const sortField = ref('id');
        const sortDirection = ref('asc');

        // Toggle sort on column
        const toggleSort = field => {
            if (sortField.value === field) {
                // If already sorting by this field, toggle direction
                sortDirection.value =
                    sortDirection.value === 'asc' ? 'desc' : 'asc';
            } else {
                // New field, default to ascending
                sortField.value = field;
                sortDirection.value = 'asc';
            }
        };

        // Filtered and sorted users
        const filteredUsers = computed(() => {
            let result = users.value;

            // Search
            if (searchQuery.value.trim() !== '') {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(user => {
                    return (
                        user.username?.toLowerCase().includes(query) ||
                        user.email?.toLowerCase().includes(query) ||
                        user.role?.toLowerCase().includes(query)
                    );
                });
            }

            // Sort
            result = [...result].sort((a, b) => {
                const aValue = a[sortField.value];
                const bValue = b[sortField.value];

                if (aValue == null)
                    return sortDirection.value === 'asc' ? -1 : 1;
                if (bValue == null)
                    return sortDirection.value === 'asc' ? 1 : -1;

                if (typeof aValue === 'string') {
                    const comparison = aValue.localeCompare(bValue);
                    return sortDirection.value === 'asc'
                        ? comparison
                        : -comparison;
                } else {
                    const comparison = aValue - bValue;
                    return sortDirection.value === 'asc'
                        ? comparison
                        : -comparison;
                }
            });

            // Move current user to the top
            if (currentUser.value) {
                const index = result.findIndex(
                    u => u.id === currentUser.value.id
                );
                if (index !== -1) {
                    const [adminUser] = result.splice(index, 1);
                    result.unshift(adminUser);
                }
            }

            return result;
        });

        // Fetch users
        const fetchUsers = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await getUsersWithRoles();
                console.log('Fetched users:', response.data);
                users.value = response.data;
            } catch (err) {
                console.error('Error fetching users:', err);
                error.value = 'Failed to load users. Please try again.';
            } finally {
                loading.value = false;
            }
        };

        // Open modal to edit user
        const openEditUserModal = user => {
            // Deep clone user data to avoid modifying the original before submitting
            userForm.value = JSON.parse(
                JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                })
            );

            showUserModal.value = true;
        };

        // Close user modal
        const closeUserModal = () => {
            showUserModal.value = false;
        };

        // Save user (update)
        const saveUser = async user => {
            isSaving.value = true;

            try {
                await updateUser(user);
                alert('User updated successfully!');

                await fetchUsers();

                // Close modal
                showUserModal.value = false;
            } catch (err) {
                console.error(`Error updating user:`, err);
                alert(`Failed to update user. Please try again.`);
            } finally {
                isSaving.value = false;
            }
        };

        // Completly Delete user
        const handleDeleteUser = async user => {
            if (confirm('Are you sure you want to delete this user?')) {
                isDeleting.value = true;
                try {
                    await deleteUser(user.id);
                    alert('User deleted successfully!');

                    await fetchUsers();
                    // Close modal
                    showUserModal.value = false;
                } catch (err) {
                    console.error(`Error deleting user:`, err);
                    alert(`Failed to delete user. Please try again.`);
                } finally {
                    isDeleting.value = false;
                }
            }
        };

        // Load vehicles when component is mounted
        onMounted(async () => {
            await fetchUsers();
            currentUser.value = await getCurrentUser();
        });

        return {
            rolesDict,
            roleEmojis,
            currentUser,
            users,
            loading,
            error,
            searchQuery,
            filteredUsers,
            isSaving,
            isDeleting,
            sortField,
            sortDirection,
            toggleSort,
            showUserModal,
            closeUserModal,
            userForm,
            openEditUserModal,
            saveUser,
            handleDeleteUser,
        };
    },
};
</script>
