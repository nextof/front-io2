<script setup>
import { ref } from "vue";
import CarListing from "./CarListing.vue";
import { RouterLink } from "vue-router";
import { onMounted, computed } from "vue";
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
    }
});

const filteredVehicles = computed(() => {
  if (props.filterStatus) {
    return vehicles.value.filter(vehicle => vehicle.status === props.filterStatus);
  }
  return vehicles.value;
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
            
            <!-- Vehicle Listings -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CarListing 
                  v-for="vehicle in vehicles.slice(0, limit )" 
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