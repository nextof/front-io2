<script setup>
import { ref, computed } from "vue";  
import { RouterLink } from "vue-router";
import def from '../assets/holder.jpg';

const props = defineProps({
  vehicle: {
    type: Object,
    required: true
  },
});

// Status badge color
const statusColor = computed(() => {
  switch(props.vehicle.status) {
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
const formatCurrency = (amount) => {
  if (!amount) return '0.00';
  return parseFloat(amount).toFixed(2);
};

// Add a hover state
const isHovered = ref(false);
</script>

<template>
  <!-- Add @mouseenter and @mouseleave events to track hover state -->
  <div 
    class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
    :class="{ 'shadow-xl translate-y-[-4px]': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Vehicle Image -->
    <div class="h-48 w-full overflow-hidden">
      <img 
        :src="vehicle.imageUrl || def" 
        :alt="vehicle.make + ' ' + vehicle.model"
        class="w-full h-full object-cover transition-all duration-500"
        :class="{ 'scale-110': isHovered }"
      />
    </div>
    
    <div class="p-6">
      <!-- Status Badge -->
      <div class="mb-2">
        <span :class="[statusColor, 'inline-block px-2 py-1 text-xs font-semibold rounded-full']">
          {{ vehicle.status }}
        </span>
      </div>
      
      <!-- Vehicle Info -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-800">{{ vehicle.make }} {{ vehicle.model }}</h3>
        <p class="text-gray-600">{{ vehicle.productionYear }} • {{ vehicle.vehicleType }}</p>
      </div>
      
      <!-- Features/Details -->
      <div class="mb-4">
        <div class="flex items-center text-sm text-gray-600 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{{ vehicle.engineType }}</span>
        </div>
        
        <div class="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ vehicle.mileage?.toLocaleString() || 0 }} km</span>
        </div>
      </div>
      
      <!-- Price and CTA -->
      <div class="flex items-center justify-between mt-6">
        <div class="text-lg font-bold text-indigo-600">
          {{ formatCurrency(vehicle.dailyRate) }}<span class="text-sm font-normal"> PLN/day</span>
        </div>
        
        <RouterLink
          :to="`/vehicles/${vehicle.id}`"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="{ 'bg-indigo-500 shadow-md shadow-indigo-200 scale-105': isHovered }"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add explicit CSS to ensure hover effects work */
.translate-y-\[-4px\] {
  transform: translateY(-4px);
}

.scale-110 {
  transform: scale(1.1);
}

.scale-105 {
  transform: scale(1.05);
}
</style>