<script setup>
import { ref } from 'vue';
import CarListings from '../components/CarListings.vue';
import FilterPanel from '../components/FilterPanel.vue';
import Banner from '../components/Banner.vue';

// State for filtered parameters
const filters = ref({
  status: 'Available', // Default for regular users, can be changed by admins
  vehicleType: 'All',
  engineType: 'All',
  make: 'All',
  price: 'All',
  mileage: 'All'
});

// Handle filter changes from FilterPanel
const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};
</script>

<template>
  <!-- Hero Banner for Cars Page -->
  <Banner 
    title="Our Fleet" 
    subtitle="Browse our wide selection of high-quality vehicles for any occasion"
    :showSearchBar="false"
  />

  <div class="container mx-auto px-4 py-8">
    <!-- Filter Panel at the top with same width as listings -->
    <div class="max-w-7xl mx-auto mb-8">
      <FilterPanel :onFilterChange="handleFilterChange" />
    </div>
    
    <!-- Car Listings -->
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Available Vehicles</h2>
      
      <CarListings
        :filterStatus="filters.status"
        :filterVehicleType="filters.vehicleType"
        :filterEngineType="filters.engineType"
        :filterMake="filters.make"
        :filterPrice="filters.price"
        :filterMileage="filters.mileage"
      />
    </div>
  </div>
</template>