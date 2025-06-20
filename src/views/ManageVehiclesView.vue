<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Manage Vehicles
                </h2>
                <button
                    @click="openAddVehicleModal"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                    Add New Vehicle
                </button>
            </div>

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-10">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                ></div>
                <p class="mt-2">Loading vehicles...</p>
            </div>

            <div
                v-else-if="error"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
                {{ error }}
            </div>

            <!-- Vehicles List -->
            <div v-else>
                <!-- Simple Search -->
                <div class="mb-6">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search vehicles..."
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
                                    @click="toggleSort('make')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Make & Model
                                        <span
                                            v-if="sortField === 'make'"
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
                                    @click="toggleSort('license_plate')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        License Plate
                                        <span
                                            v-if="sortField === 'license_plate'"
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
                                    @click="toggleSort('status')"
                                    class="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                                >
                                    <div class="flex items-center">
                                        Status
                                        <span
                                            v-if="sortField === 'status'"
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
                                v-for="vehicle in filteredVehicles"
                                :key="vehicle.id"
                                class="border-t hover:bg-gray-50"
                            >
                                <td class="py-3 px-4">{{ vehicle.id }}</td>
                                <td class="py-3 px-4">
                                    <RouterLink
                                        :to="`/vehicles/${vehicle.id}`"
                                        class="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {{ vehicle.make }} {{ vehicle.model }}
                                    </RouterLink>
                                </td>
                                <td class="py-3 px-4">
                                    {{ vehicle.license_plate }}
                                </td>
                                <td class="py-3 px-4">
                                    <span
                                        :class="{
                                            'bg-green-100 text-green-800':
                                                vehicle.status === 'Available',
                                            'bg-blue-100 text-blue-800':
                                                vehicle.status === 'Reserved',
                                            'bg-purple-100 text-purple-800':
                                                vehicle.status === 'Rented',
                                            'bg-red-100 text-red-800':
                                                vehicle.status ===
                                                'Under Maintenance',
                                        }"
                                        class="inline-block px-2 py-1 text-sm font-semibold rounded-full"
                                    >
                                        {{ vehicle.status }}
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex space-x-2">
                                        <button
                                            @click="
                                                openEditVehicleModal(vehicle)
                                            "
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
                                                ></path>
                                            </svg>
                                        </button>

                                        <RouterLink
                                            :to="`/vehicles/${vehicle.id}`"
                                            class="text-green-600 hover:text-green-800 transition-colors duration-300 transform hover:scale-110"
                                            title="View Details"
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
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                ></path>
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                ></path>
                                            </svg>
                                        </RouterLink>

                                        <button
                                            @click="deleteVehicle(vehicle)"
                                            class="text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-300 transform hover:scale-110"
                                            title="Delete"
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
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <!-- Empty state -->
                            <tr v-if="filteredVehicles.length === 0">
                                <td
                                    colspan="5"
                                    class="py-6 text-center text-gray-500"
                                >
                                    No vehicles found matching your criteria
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Vehicle Modal (Add/Edit) -->
    <div
        v-if="showVehicleModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        {{ isEditMode ? 'Edit Vehicle' : 'Add New Vehicle' }}
                    </h3>
                    <button
                        @click="closeVehicleModal"
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

                <form @submit.prevent="saveVehicle">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Make -->
                        <div>
                            <label
                                for="make"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Make *</label
                            >
                            <input
                                id="make"
                                v-model="vehicleForm.make"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Model -->
                        <div>
                            <label
                                for="model"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Model *</label
                            >
                            <input
                                id="model"
                                v-model="vehicleForm.model"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Production Year -->
                        <div>
                            <label
                                for="production_year"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Production Year *</label
                            >
                            <input
                                id="production_year"
                                v-model="vehicleForm.production_year"
                                type="number"
                                required
                                min="1900"
                                :max="new Date().getFullYear() + 1"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- License Plate -->
                        <div>
                            <label
                                for="license_plate"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >License Plate *</label
                            >
                            <input
                                id="license_plate"
                                v-model="vehicleForm.license_plate"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Vehicle Type -->
                        <div>
                            <label
                                for="vehicleType"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Vehicle Type *</label
                            >
                            <select
                                id="vehicleType"
                                v-model="vehicleForm.vehicle_type"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Crossover">Crossover</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Electric">Electric</option>
                                <option value="Sports">Sports</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>

                        <!-- Engine Type -->
                        <div>
                            <label
                                for="engine_type"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Engine Type *</label
                            >
                            <select
                                id="engine_type"
                                v-model="vehicleForm.engine_type"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <!-- Mileage -->
                        <div>
                            <label
                                for="mileage"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Mileage *</label
                            >
                            <input
                                id="mileage"
                                v-model="vehicleForm.mileage"
                                type="number"
                                required
                                min="0"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Status -->
                        <div>
                            <label
                                for="status"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Status *</label
                            >
                            <select
                                id="status"
                                v-model="vehicleForm.status"
                                required
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Available">Available</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Rented">Rented</option>
                                <option value="Under Maintenance">
                                    Under Maintenance
                                </option>
                            </select>
                        </div>

                        <!-- Daily Rate -->
                        <div>
                            <label
                                for="daily_rate"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Daily Rate (PLN) *</label
                            >
                            <input
                                id="daily_rate"
                                v-model="vehicleForm.daily_rate"
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Weekly Rate -->
                        <div>
                            <label
                                for="weekly_rate"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Weekly Rate (PLN) *</label
                            >
                            <input
                                id="weekly_rate"
                                v-model="vehicleForm.weekly_rate"
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Monthly Rate -->
                        <div>
                            <label
                                for="monthly_rate"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Monthly Rate (PLN) *</label
                            >
                            <input
                                id="monthly_rate"
                                v-model="vehicleForm.monthly_rate"
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Image URL -->
                        <div class="md:col-span-2">
                            <label
                                for="imageUrl"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Image URL</label
                            >
                            <input
                                id="imageUrl"
                                v-model="vehicleForm.image_url"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Description -->
                        <div class="md:col-span-2">
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Description</label
                            >
                            <textarea
                                id="description"
                                v-model="vehicleForm.description"
                                rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <!-- Features -->
                        <div class="md:col-span-2">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Features</label
                            >
                            <div class="space-y-2">
                                <div
                                    v-for="(
                                        feature, index
                                    ) in vehicleForm.features"
                                    :key="index"
                                    class="flex items-center"
                                >
                                    <input
                                        type="text"
                                        v-model="vehicleForm.features[index]"
                                        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter vehicle feature"
                                    />
                                    <button
                                        type="button"
                                        @click="removeFeature(index)"
                                        class="ml-2 p-2 text-red-600 hover:text-red-800"
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
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    @click="addFeature"
                                    class="px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 w-full flex items-center justify-center"
                                >
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                    Add Feature
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            @click="closeVehicleModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            :disabled="isSaving"
                        >
                            {{
                                isSaving
                                    ? 'Saving...'
                                    : isEditMode
                                    ? 'Update Vehicle'
                                    : 'Save Vehicle'
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Hide spinner buttons for specific number inputs using their IDs */
#mileage::-webkit-inner-spin-button,
#mileage::-webkit-outer-spin-button,
#daily_rate::-webkit-inner-spin-button,
#daily_rate::-webkit-outer-spin-button,
#weekly_rate::-webkit-inner-spin-button,
#weekly_rate::-webkit-outer-spin-button,
#monthly_rate::-webkit-inner-spin-button,
#monthly_rate::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* For Firefox */
#mileage,
#daily_rate,
#weekly_rate,
#monthly_rate {
    -moz-appearance: textfield;
}

/* Keep spinner for production_year */
#production_year::-webkit-inner-spin-button,
#production_year::-webkit-outer-spin-button {
    -webkit-appearance: auto;
    margin: auto;
}

#production_year {
    -moz-appearance: auto;
}
</style>

<script>
import { ref, computed, onMounted } from 'vue';
import VehicleService from '../services/VehicleService';

export default {
    name: 'ManageVehiclesView',
    setup() {
        // State
        const vehicles = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const searchQuery = ref('');
        const showVehicleModal = ref(false);
        const isSaving = ref(false);
        const isEditMode = ref(false);

        // Vehicle form
        const vehicleForm = ref({
            id: null,
            make: '',
            model: '',
            production_year: new Date().getFullYear(),
            license_plate: '',
            vehicle_type: 'Sedan',
            engine_type: 'Petrol',
            mileage: 0,
            status: 'Available',
            daily_rate: 100,
            weekly_rate: 600,
            monthly_rate: 2400,
            image_url: '',
            description: '',
            features: ['GPS', 'Bluetooth'],
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

        // Filtered and sorted vehicles
        const filteredVehicles = computed(() => {
            // First apply search filtering
            let result = vehicles.value;

            if (searchQuery.value.trim() !== '') {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(vehicle => {
                    return (
                        vehicle.make?.toLowerCase().includes(query) ||
                        vehicle.model?.toLowerCase().includes(query) ||
                        vehicle.license_plate?.toLowerCase().includes(query) ||
                        vehicle.vehicle_type?.toLowerCase().includes(query)
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

        // Fetch vehicles
        const fetchVehicles = async () => {
            loading.value = true;
            error.value = null;

            try {
                const response = await VehicleService.getAllVehicles();
                console.log('Fetched vehicles:', response.data);
                vehicles.value = response.data;
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                error.value = 'Failed to load vehicles. Please try again.';
            } finally {
                loading.value = false;
            }
        };

        // Open modal to add new vehicle
        const openAddVehicleModal = () => {
            isEditMode.value = false;

            // Reset form with default values
            vehicleForm.value = {
                id: null,
                make: 'Toyota',
                model: 'Corolla',
                production_year: 2023,
                license_plate: 'KIE 12345',
                vehicle_type: 'Sedan',
                engine_type: 'Hybrid',
                mileage: 5800,
                status: 'Available',
                daily_rate: 120,
                weekly_rate: 700,
                monthly_rate: 2800,
                image_url:
                    'https://upload.wikimedia.org/wikipedia/commons/f/f6/Toyota_Corolla_Limousine_Hybrid_Genf_2019_1Y7A5576.jpg',
                description:
                    'Modern and fuel-efficient Toyota Corolla with hybrid engine. Features include automatic transmission, climate control, backup camera, and smartphone connectivity. Perfect for city driving and short trips. Regularly maintained with recent service.',
                features: [
                    'GPS Navigation',
                    'Bluetooth Connectivity',
                    'Backup Camera',
                    'Climate Control',
                    'USB Charging Ports',
                    'Cruise Control',
                ],
            };

            showVehicleModal.value = true;
        };

        // Open modal to edit an existing vehicle
        const openEditVehicleModal = vehicle => {
            isEditMode.value = true;

            // Deep clone vehicle data to avoid modifying the original before submitting
            vehicleForm.value = JSON.parse(
                JSON.stringify({
                    id: vehicle.id,
                    make: vehicle.make || '',
                    model: vehicle.model || '',
                    production_year:
                        vehicle.production_year || new Date().getFullYear(),
                    license_plate: vehicle.license_plate || '',
                    vehicle_type: vehicle.vehicle_type || 'Sedan',
                    engine_type: vehicle.engine_type || 'Petrol',
                    mileage: vehicle.mileage || 0,
                    status: vehicle.status || 'Available',
                    daily_rate: vehicle.daily_rate || 0,
                    weekly_rate: vehicle.weekly_rate || 0,
                    monthly_rate: vehicle.monthly_rate || 0,
                    image_url: vehicle.image_url || '',
                    description: vehicle.description || '',
                    // Ensure features is an array even if null or undefined
                    features: Array.isArray(vehicle.features)
                        ? [...vehicle.features]
                        : [],
                })
            );

            showVehicleModal.value = true;
        };

        // Add a new feature field
        const addFeature = () => {
            vehicleForm.value.features.push('');
        };

        // Remove a feature by index
        const removeFeature = index => {
            vehicleForm.value.features.splice(index, 1);
        };

        // Close vehicle modal
        const closeVehicleModal = () => {
            showVehicleModal.value = false;
        };
        // Delete vehicle
        const deleteVehicle = async vehicle => {
            if (
                confirm(
                    `Are you sure you want to delete "${vehicle.make} ${vehicle.model}" (${vehicle.license_plate})?`
                )
            ) {
                try {
                    await VehicleService.deleteVehicle(vehicle.id);
                    alert('Vehicle deleted successfully!');

                    // Refresh the vehicle list
                    await fetchVehicles();
                } catch (err) {
                    console.error('Error deleting vehicle:', err);
                    alert('Failed to delete vehicle. Please try again.');
                }
            }
        };
        // Save vehicle (create or update)
        const saveVehicle = async () => {
            isSaving.value = true;

            try {
                // Create a copy of the form data to ensure we're not sending any unexpected fields
                const vehicleData = { ...vehicleForm.value };

                // Ensure numeric fields are actually numbers, not strings
                vehicleData.production_year = Number(
                    vehicleData.production_year
                );
                vehicleData.mileage = Number(vehicleData.mileage);
                vehicleData.daily_rate = Number(vehicleData.daily_rate);
                vehicleData.weekly_rate = Number(vehicleData.weekly_rate);
                vehicleData.monthly_rate = Number(vehicleData.monthly_rate);

                // Remove any empty features
                vehicleData.features = vehicleData.features.filter(
                    feature => feature.trim() !== ''
                );

                console.log(
                    `${
                        isEditMode.value ? 'Updating' : 'Creating'
                    } vehicle data:`,
                    vehicleData
                );

                if (isEditMode.value) {
                    // Update existing vehicle
                    await VehicleService.updateVehicle(
                        vehicleData.id,
                        vehicleData
                    );
                    alert('Vehicle updated successfully!');
                } else {
                    // Create new vehicle
                    await VehicleService.createVehicle(vehicleData);
                    alert('Vehicle added successfully!');
                }

                if (vehicleData.status == 'Under Maintenance') {
                    const maintenanceData = {
                        id: null,
                        cost: null,
                        description: null,
                        end_date: null,
                        start_date: new Date().toISOString().split('T')[0],
                        status: 'planned',
                        vehicleId: vehicleData.id,
                        licensePlate: vehicleData.license_plate,
                        done: false,
                    };
                    await VehicleService.createMaintenanceTask(maintenanceData);
                }

                // Refresh vehicles list
                await fetchVehicles();

                // Close modal
                showVehicleModal.value = false;
            } catch (err) {
                console.error(
                    `Error ${
                        isEditMode.value ? 'updating' : 'creating'
                    } vehicle:`,
                    err
                );
                alert(
                    `Failed to ${
                        isEditMode.value ? 'update' : 'create'
                    } vehicle. Please try again.`
                );
            } finally {
                isSaving.value = false;
            }
        };

        // Load vehicles when component is mounted
        onMounted(() => {
            fetchVehicles();
        });

        return {
            vehicles,
            loading,
            error,
            searchQuery,
            filteredVehicles,
            showVehicleModal,
            isSaving,
            isEditMode,
            vehicleForm,
            sortField,
            sortDirection,
            toggleSort,
            openAddVehicleModal,
            openEditVehicleModal,
            closeVehicleModal,
            saveVehicle,
            deleteVehicle, // <-- Add this line
            addFeature,
            removeFeature,
        };
    },
};
</script>
