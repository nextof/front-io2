<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Maintenance Tasks
                </h2>
            </div>

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-10">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                ></div>
                <p class="mt-2">Loading tasks...</p>
            </div>

            <div
                v-else-if="error"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
                {{ error }}
            </div>

            <!-- tasks List -->
            <div v-else>
                <!-- Simple Search -->
                <div class="mb-6">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search tasks..."
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
                                    @click="toggleSort('start_date')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Start Date
                                        <span
                                            v-if="sortField === 'start_date'"
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
                                    @click="toggleSort('end_date')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        End Date
                                        <span
                                            v-if="sortField === 'end_date'"
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
                                    @click="toggleSort('cost')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Cost
                                        <span
                                            v-if="sortField === 'cost'"
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
                                    @click="toggleSort('description')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Description
                                        <span
                                            v-if="sortField === 'description'"
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

                                <th class="py-3 px-4 text-left">Vehicle</th>
                                <th class="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="task in filteredTasks"
                                :key="task.id"
                                :class="[
                                    'border-t',
                                    task.done
                                        ? 'hover:bg-gray-300 bg-gray-200 text-gray-600 line-through'
                                        : 'hover:bg-gray-50',
                                ]"
                            >
                                <td class="py-3 px-4">{{ task.id }}</td>
                                <td class="py-3 px-4">{{ task.start_date }}</td>
                                <td class="py-3 px-4">{{ task.end_date }}</td>
                                <td class="py-3 px-4">
                                    {{ task.cost ? task.cost + 'PLN' : '' }}
                                </td>
                                <td class="py-3 px-4">
                                    {{
                                        task.description
                                            ? task.description.slice(0, 50) +
                                              '...'
                                            : ''
                                    }}
                                </td>
                                <td class="py-3 px-4">
                                    <RouterLink
                                        :to="`/vehicles/${task.vehicleId}`"
                                        class="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {{ task.licensePlate }}
                                    </RouterLink>
                                </td>
                                <td class="py-3 px-5">
                                    <div class="flex space-x-2">
                                        <button
                                            @click="openEditTaskModal(task)"
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
                                        <button
                                            @click="setTaskToDone(task)"
                                            :class="[
                                                task.done ||
                                                task.end_date == null
                                                    ? ''
                                                    : 'text-green-600 hover:text-green-800 cursor-pointer transition-colors duration-300 transform hover:scale-110',
                                            ]"
                                            title="Done"
                                            :disabled="
                                                task.done ||
                                                task.end_date == null
                                            "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <!-- Empty state -->
                            <tr v-if="filteredTasks.length === 0">
                                <td
                                    colspan="7"
                                    class="py-6 text-center text-gray-500"
                                >
                                    No tasks found matching your criteria
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Task Modal (Edit) -->
    <div
        v-if="showTaskModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Edit Task</h3>
                    <button
                        @click="closeTaskModal"
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

                <form @submit.prevent="saveTask" class="space-y-6">
                    <!-- Start Date -->
                    <div>
                        <label
                            for="start_date"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Start Date</label
                        >
                        <input
                            id="start_date"
                            v-model="taskForm.start_date"
                            type="date"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- End Date -->
                    <div>
                        <label
                            for="end_date"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >End Date</label
                        >
                        <input
                            id="end_date"
                            v-model="taskForm.end_date"
                            type="date"
                            :min="today"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Cost -->
                    <div>
                        <label
                            for="cost"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Cost (PLN) *</label
                        >
                        <input
                            id="cost"
                            v-model="taskForm.cost"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <!-- Description -->
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Description</label
                        >
                        <textarea
                            id="description"
                            v-model="taskForm.description"
                            rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <!-- Form Actions -->
                    <div class="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            @click="closeTaskModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            :disabled="isSaving"
                        >
                            {{ isSaving ? 'Saving...' : 'Update Task' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import VehicleService from '../services/VehicleService';

export default {
    name: 'MaintenanceTasksView',
    setup() {
        // State
        const tasks = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const searchQuery = ref('');
        const showTaskModal = ref(false);
        const isSaving = ref(false);
        const today = new Date().toISOString().split('T')[0];

        // Task form
        const taskForm = ref({
            id: null,
            cost: null,
            description: '',
            start_date: null,
            end_date: null,
            vehicleId: null,
            licensePlate: null,
            done: false,
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

        // Filtered and sorted tasks
        const filteredTasks = computed(() => {
            // First apply search filtering
            let result = tasks.value;

            if (searchQuery.value.trim() !== '') {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(task => {
                    return (
                        task.start_date?.includes(query) ||
                        task.end_date?.includes(query) ||
                        task.licensePlate?.toLowerCase().includes(query) ||
                        String(task.cost)?.includes(query)
                    );
                });
            }

            // Then apply sorting
            return [...result].sort((a, b) => {
                const aValue = a[sortField.value];
                const bValue = b[sortField.value];

                // Handle null or undefined values
                if (aValue == null)
                    return sortDirection.value === 'asc' ? -1 : 1;
                if (bValue == null)
                    return sortDirection.value === 'asc' ? 1 : -1;

                // Compare based on data type
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
        });

        // Fetch maintenance tasks
        const fetchMaintenanceTasks = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await VehicleService.getAllMaintenanceTasks();
                console.log('Fetched tasks:', response.data);
                tasks.value = response.data;
            } catch (err) {
                console.error('Error fetching tasks:', err);
                error.value =
                    'Failed to load maintenance tasks. Please try again.';
            } finally {
                loading.value = false;
            }
        };

        // Open modal to edit an existing task
        const openEditTaskModal = task => {
            // Deep clone task data to avoid modifying the original before submitting
            taskForm.value = JSON.parse(
                JSON.stringify({
                    id: task.id,
                    cost: task.cost,
                    description: task.description,
                    end_date: task.end_date,
                    start_date: task.start_date,
                    vehicleId: task.vehicleId,
                    licensePlate: task.licensePlate,
                    done: task.done,
                })
            );

            showTaskModal.value = true;
        };

        // Close task modal
        const closeTaskModal = () => {
            showTaskModal.value = false;
        };

        // Set task to done
        const setTaskToDone = async task => {
            const updatedTask = { ...task, done: true };
            // const updatedVehicle = { ...task.vehicle, status: 'Available' };

            try {
                await VehicleService.updateMaintenanceTask(
                    task.id,
                    updatedTask
                );

                // await VehicleService.updateVehicle(
                //     updatedVehicle.id,
                //     updatedVehicle
                // );

                // alert('Task marked as done, vehicle is available again!');
                await fetchMaintenanceTasks();
            } catch (err) {
                console.error('Failed to mark task as done:', err);
                alert('Failed to mark task as done. Try again.');
            }
        };

        // Save task (update)
        const saveTask = async () => {
            isSaving.value = true;

            try {
                // Create a copy of the form data to ensure we're not sending any unexpected fields
                const taskData = { ...taskForm.value };

                // Update existing maintenance task
                await VehicleService.updateMaintenanceTask(
                    taskData.id,
                    taskData
                );
                alert('Task updated successfully!');

                // Refresh tasks list
                await fetchMaintenanceTasks();

                // Close modal
                showTaskModal.value = false;
            } catch (err) {
                console.error(`Error updating task:`, err);
                alert(`Failed to update task. Please try again.`);
            } finally {
                isSaving.value = false;
            }
        };

        // Load vehicles when component is mounted
        onMounted(() => {
            fetchMaintenanceTasks();
        });

        return {
            tasks,
            loading,
            error,
            searchQuery,
            filteredTasks,
            showTaskModal,
            isSaving,
            today,
            taskForm,
            sortField,
            sortDirection,
            toggleSort,
            openEditTaskModal,
            closeTaskModal,
            setTaskToDone,
            saveTask,
        };
    },
};
</script>
