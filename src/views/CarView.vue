<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { computed } from 'vue';
import BackButton from '../components/BackButton.vue';
import def from '../assets/holder.jpg';
import VehicleService from '../services/VehicleService';

const route = useRoute();
const vehicleId = route.params.id;
const vehicle = ref({});
const loading = ref(true);
const error = ref(null);
const isReservationFormOpen = ref(false);
const today = new Date().toISOString().split('T')[0];

// Form data for reservation
const reservationData = ref({
    startDate: '',
    endDate: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
});

// Status badge color
const statusColor = computed(() => {
    if (!vehicle.value || !vehicle.value.status)
        return 'bg-gray-100 text-gray-800';

    switch (vehicle.value.status) {
        case 'Available':
            return 'bg-green-100 text-green-800';
        case 'Reserved':
            return 'bg-blue-100 text-blue-800';
        case 'Rented':
            return 'bg-purple-100 text-purple-800';
        case 'Under Maintenance':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
});

// Format currency
const formatCurrency = amount => {
    if (!amount) return '0.00';
    return parseFloat(amount).toFixed(2);
};

const toggleReservationForm = () => {
    isReservationFormOpen.value = !isReservationFormOpen.value;
};

const handleReservation = () => {
    // Here would be the code to submit the reservation to the backend
    alert('Reservation submitted successfully!');
    isReservationFormOpen.value = false;
};

onMounted(async () => {
    try {
        const response = await VehicleService.getVehicleById(vehicleId);
        vehicle.value = response.data;
        loading.value = false;
    } catch (err) {
        error.value = 'Failed to load vehicle details. Please try again later.';
        loading.value = false;
        console.error('Error fetching vehicle:', err);
    }
});
</script>

<template>
    <section class="bg-blue-50">
        <div class="container mx-auto py-10 px-6">
            <BackButton />

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-10">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
                ></div>
                <p class="mt-2">Loading vehicle details...</p>
            </div>

            <div
                v-else-if="error"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
                {{ error }}
            </div>

            <!-- Vehicle Details -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Vehicle Image and Basic Info -->
                <div class="md:col-span-2">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <!-- Vehicle Image -->
                        <div class="h-64 w-full overflow-hidden bg-gray-200">
                            <img
                                :src="vehicle.image_url || def"
                                :alt="vehicle.make + ' ' + vehicle.model"
                                class="w-full h-full object-cover"
                            />
                        </div>

                        <!-- Vehicle Details -->
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h1
                                        class="text-3xl font-bold text-gray-800"
                                    >
                                        {{ vehicle.make }} {{ vehicle.model }}
                                    </h1>
                                    <p class="text-gray-600">
                                        {{ vehicle.production_year }} •
                                        {{ vehicle.vehicle_type }}
                                    </p>
                                </div>
                                <span
                                    :class="[
                                        statusColor,
                                        'px-3 py-1 text-sm font-semibold rounded-full',
                                    ]"
                                >
                                    {{ vehicle.status }}
                                </span>
                            </div>

                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                            >
                                <div class="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-indigo-600 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                                        />
                                        <path
                                            d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3z"
                                        />
                                    </svg>
                                    <span class="text-gray-700"
                                        >License Plate:
                                        {{ vehicle.license_plate }}</span
                                    >
                                </div>
                                <div class="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-indigo-600 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span class="text-gray-700"
                                        >Mileage:
                                        {{
                                            vehicle.mileage?.toLocaleString() ||
                                            0
                                        }}
                                        km</span
                                    >
                                </div>
                                <div class="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-indigo-600 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span class="text-gray-700"
                                        >Engine Type:
                                        {{ vehicle.engine_type }}</span
                                    >
                                </div>
                                <div class="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-indigo-600 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-0.257-0.257A6 6 0 1118 8zm-6-4a1 1 0 10-2 0v1a1 1 0 102 0V4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span class="text-gray-700"
                                        >Vehicle Type:
                                        {{ vehicle.vehicle_type }}</span
                                    >
                                </div>
                            </div>

                            <div class="border-t border-gray-200 pt-6">
                                <h2
                                    class="text-xl font-semibold text-gray-800 mb-3"
                                >
                                    Vehicle Description
                                </h2>
                                <p class="text-gray-600">
                                    {{ vehicle.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar - Pricing and Reservation -->
                <div>
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">
                            Rental Information
                        </h2>

                        <div class="mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-600">Daily Rate:</span>
                                <span class="text-xl font-bold text-indigo-600"
                                    >{{
                                        formatCurrency(vehicle.daily_rate)
                                    }}
                                    PLN</span
                                >
                            </div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-600">Weekly Rate:</span>
                                <span
                                    class="text-lg font-semibold text-indigo-600"
                                    >{{
                                        formatCurrency(vehicle.weekly_rate)
                                    }}
                                    PLN</span
                                >
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Monthly Rate:</span>
                                <span
                                    class="text-lg font-semibold text-indigo-600"
                                    >{{
                                        formatCurrency(vehicle.monthly_rate)
                                    }}
                                    PLN</span
                                >
                            </div>
                        </div>

                        <div class="border-t border-gray-200 py-4">
                            <h3
                                class="text-lg font-semibold text-gray-800 mb-3"
                            >
                                Features
                            </h3>
                            <ul
                                v-if="
                                    vehicle.features &&
                                    vehicle.features.length > 0
                                "
                                class="space-y-2"
                            >
                                <li
                                    v-for="(feature, index) in vehicle.features"
                                    :key="index"
                                    class="flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-green-500 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span class="text-gray-600">{{
                                        feature
                                    }}</span>
                                </li>
                            </ul>
                            <p v-else class="text-gray-500 italic">
                                No features listed for this vehicle.
                            </p>
                        </div>

                        <div class="mt-6">
                            <button
                                v-if="vehicle.status === 'Available'"
                                @click="toggleReservationForm"
                                class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
                            >
                                {{
                                    isReservationFormOpen
                                        ? 'Close Form'
                                        : 'Reserve Now'
                                }}
                            </button>
                            <div
                                v-else
                                class="bg-gray-100 text-center py-3 px-4 rounded-lg text-gray-700"
                            >
                                This vehicle is currently
                                {{ vehicle.status.toLowerCase() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reservation Form -->
            <div
                v-if="isReservationFormOpen"
                class="mt-8 bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out"
            >
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    Reserve {{ vehicle.make }} {{ vehicle.model }}
                </h2>

                <form
                    @submit.prevent="handleReservation"
                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label
                            for="startDate"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Pickup Date</label
                        >
                        <input
                            type="date"
                            :min="today"
                            id="startDate"
                            v-model="reservationData.startDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="endDate"
                            class="block text-sm font-medium text-gray-700 mb-1"
                            >Return Date</label
                        >
                        <input
                            type="date"
                            :min="today"
                            id="endDate"
                            v-model="reservationData.endDate"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div class="md:col-span-2 flex justify-end space-x-4">
                        <button
                            type="button"
                            @click="toggleReservationForm"
                            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Submit Reservation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
