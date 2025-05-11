<script setup>
import { ref, computed } from "vue";
import CarListing from "./CarListing.vue";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import VehicleService from "../services/VehicleService";

const vehicles = ref([]);
const loading = ref(true);
const error = ref(null);

const props = defineProps({
    limit: {
        type: Number,
    },
    showButton: {
        type: Boolean,
        default: false,
    },
    filterStatus: {
      type: String,
      default: "Available"
    },
    filterVehicleType: {
      type: String,
      default: "All"
    },
    filterEngineType: {
      type: String,
      default: "All"
    },
    filterMake: {
      type: String,
      default: "All"
    },

    filterPrice: {
      type: String,
      default: "All"
    },
    filterMileage: {
      type: String,
      default: "All"
    }
});

const filteredVehicles = computed(() => {
  return vehicles.value.filter(vehicle => {
    // If filter value is 'All', don't filter on that property
    return (
      (props.filterStatus === 'All' || vehicle.status === props.filterStatus) &&
      (props.filterVehicleType === 'All' || vehicle.vehicle_type === props.filterVehicleType) &&
      (props.filterEngineType === 'All' || vehicle.engine_type === props.filterEngineType) &&
      (props.filterMake === 'All' || vehicle.make === props.filterMake) &&

      (props.filterPrice === 'All' || 
        (vehicle.daily_rate && parseFloat(vehicle.daily_rate) <= parseFloat(props.filterPrice))) &&
      (props.filterMileage === 'All' || 
        (vehicle.mileage && vehicle.mileage <= parseFloat(props.filterMileage)))
    );
  });
});

// For displaying "no results" message
const noResults = computed(() => {
  return filteredVehicles.value.length === 0 && !loading.value && !error.value;
});

onMounted(async () => {
  try {
    const response = await VehicleService.getAllVehicles();
    vehicles.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load vehicles. Please try again later.";
    loading.value = false;
    console.error("Error fetching vehicles:", err);
  }
});
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            
            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-10">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p class="mt-2">Loading vehicles...</p>
            </div>

            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {{ error }}
            </div>
            
            <!-- No Results Message -->
            <div v-else-if="noResults" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="text-xl font-semibold mb-2">No vehicles match your filters</h3>
                <p class="text-yellow-700">Try adjusting your filter criteria to see more results.</p>
            </div>
            
            <!-- Vehicle Listings -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CarListing 
                  v-for="vehicle in filteredVehicles.slice(0, limit || filteredVehicles.length)" 
                  :key="vehicle.id" 
                  :vehicle="vehicle">
                </CarListing>
            </div>
            

        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
            to="/vehicles"
            class="block bg-indigo-600 text-white text-center py-4 px-6 rounded-xl hover:bg-indigo-700 transition duration-300"
        >
            View All Vehicles
        </RouterLink>
    </section>
</template>