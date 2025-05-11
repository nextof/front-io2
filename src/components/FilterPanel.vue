<!-- FilterPanel.vue - Minimalistic horizontal filter bar -->
<script setup>
import { ref, onMounted } from 'vue';
import VehicleService from '../services/VehicleService';
import { getCurrentUser } from '../services/UserService';

const props = defineProps({
  onFilterChange: {
    type: Function,
    required: true
  }
});

// User state
const isAdminOrEmployee = ref(false);

// Filter states
const filters = ref({
  status: 'All', // Default for regular users
  vehicleType: 'All',
  engineType: 'All',
  make: 'All',
  price: 'All',
  mileage: 'All'
});

// Options for filters
const options = ref({
  statuses: ['All', 'Available', 'Reserved', 'Rented', 'Under Maintenance'],
  vehicleTypes: ['All', 'SUV', 'Sedan', 'Crossover', 'Electric', 'Hatchback', 'Sports'],
  engineTypes: ['All', 'Petrol', 'Diesel', 'Electric'],
  makes: ['All'],
  prices: ['All', '200', '400', '600'],
  mileages: ['All', '5000', '10000', '50000', '100000']
});

// Whether filters panel is expanded (for mobile)
const isFiltersVisible = ref(false);

// Apply filters
const applyFilters = () => {
  props.onFilterChange({ ...filters.value });
};

// Reset filters
const resetFilters = () => {
  filters.value = {
    // Keep status 'Available' for regular users
    status: isAdminOrEmployee.value ? 'All' : 'Available',
    vehicleType: 'All',
    engineType: 'All',
    make: 'All',
    price: 'All',
    mileage: 'All'
  };
  applyFilters();
};

// Toggle filters panel visibility on mobile
const toggleFilters = () => {
  isFiltersVisible.value = !isFiltersVisible.value;
};

onMounted(async () => {
  try {
    // Check if user is admin or employee
    const user = await getCurrentUser();
    if (user && user.roles) {
      isAdminOrEmployee.value = user.roles.some(role => 
        role === 'ROLE_ADMIN' || role === 'ROLE_SERVICE' || role === 'ROLE_EMPLOYEE'
      );
    }
    
    // For regular users, enforce 'Available' status
    if (!isAdminOrEmployee.value) {
      filters.value.status = 'Available';
    }
    
    // Fetch vehicles to populate make filter
    const response = await VehicleService.getAllVehicles();
    const vehicles = response.data;
    
    // Extract unique values for makes
    const carMakes = new Set(vehicles.map(v => v.make).filter(Boolean));
    
    // Update options
    options.value.makes = ['All', ...Array.from(carMakes)];
    
    // Apply initial filters
    applyFilters();
  } catch (err) {
    console.error("Error in filter initialization:", err);
  }
});
</script>

<template>
  <div class="w-full bg-white shadow-sm rounded-lg overflow-hidden">
    <!-- Mobile filter toggle -->
    <div class="lg:hidden p-3 border-b">
      <button 
        @click="toggleFilters"
        class="w-full flex items-center justify-center space-x-2 text-indigo-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
        <span>{{ isFiltersVisible ? 'Hide Filters' : 'Filter Vehicles' }}</span>
      </button>
    </div>
    
    <!-- Desktop filter bar - always visible on large screens -->
    <div class="hidden lg:flex lg:flex-wrap items-center gap-3 p-3 justify-between">
        <!-- Status Filter - Admin/Employee Only -->
        <div v-if="isAdminOrEmployee" class="min-w-40">
          <select 
            v-model="filters.status" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by status"
          >
            <option disabled value="">Status</option>
            <option v-for="status in options.statuses" :key="status" :value="status">
              {{ status === 'All' ? 'All Statuses' : status }}
            </option>
          </select>
        </div>
        
        <!-- Vehicle Type Filter -->
        <div class="min-w-40">
          <select 
            v-model="filters.vehicleType" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by vehicle type"
          >
            <option disabled value="">Vehicle Type</option>
            <option v-for="type in options.vehicleTypes" :key="type" :value="type">
              {{ type === 'All' ? 'All Types' : type }}
            </option>
          </select>
        </div>
        
        <!-- Make Filter -->
        <div class="min-w-40">
          <select 
            v-model="filters.make" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by make"
          >
            <option disabled value="">Make</option>
            <option v-for="make in options.makes" :key="make" :value="make">
              {{ make === 'All' ? 'All Makes' : make }}
            </option>
          </select>
        </div>
        
        <!-- Engine Type Filter -->
        <div class="min-w-40">
          <select 
            v-model="filters.engineType" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by engine type"
          >
            <option disabled value="">Engine</option>
            <option v-for="engine in options.engineTypes" :key="engine" :value="engine">
              {{ engine === 'All' ? 'All Engines' : engine }}
            </option>
          </select>
        </div>
        
        <!-- Price Filter -->
        <div class="min-w-40">
          <select 
            v-model="filters.price" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by price"
          >
            <option disabled value="">Price</option>
            <option v-for="price in options.prices" :key="price" :value="price">
              {{ price === 'All' ? 'Any Price' : '< ' + price + ' PLN' }}
            </option>
          </select>
        </div>
        
        <!-- Mileage Filter -->
        <div class="min-w-40">
          <select 
            v-model="filters.mileage" 
            @change="applyFilters"
            class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
            aria-label="Filter by mileage"
          >
            <option disabled value="">Mileage</option>
            <option v-for="mileage in options.mileages" :key="mileage" :value="mileage">
              {{ mileage === 'All' ? 'Any Mileage' : '< ' + Number(mileage).toLocaleString() + ' km' }}
            </option>
          </select>
        </div>
        
        <!-- Reset Button -->
        <div>
          <button
            @click="resetFilters"
            class="p-2 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
    </div>
    
    <!-- Mobile filter panel - conditionally visible -->
    <div 
      v-if="isFiltersVisible" 
      class="lg:hidden p-3 border-t border-gray-200 grid grid-cols-2 gap-3"
    >
      <!-- Status Filter - Admin/Employee Only -->
      <div v-if="isAdminOrEmployee" class="col-span-2">
        <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
        <select 
          v-model="filters.status" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="status in options.statuses" :key="status" :value="status">
            {{ status === 'All' ? 'All Statuses' : status }}
          </option>
        </select>
      </div>
      
      <!-- Vehicle Type Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Vehicle Type</label>
        <select 
          v-model="filters.vehicleType" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="type in options.vehicleTypes" :key="type" :value="type">
            {{ type === 'All' ? 'All Types' : type }}
          </option>
        </select>
      </div>
      
      <!-- Make Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Make</label>
        <select 
          v-model="filters.make" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="make in options.makes" :key="make" :value="make">
            {{ make === 'All' ? 'All Makes' : make }}
          </option>
        </select>
      </div>
      
      <!-- Engine Type Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Engine Type</label>
        <select 
          v-model="filters.engineType" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="engine in options.engineTypes" :key="engine" :value="engine">
            {{ engine === 'All' ? 'All Engines' : engine }}
          </option>
        </select>
      </div>
      
      <!-- Price Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Price</label>
        <select 
          v-model="filters.price" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="price in options.prices" :key="price" :value="price">
            {{ price === 'All' ? 'Any Price' : '< ' + price + ' PLN' }}
          </option>
        </select>
      </div>
      
      <!-- Mileage Filter -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Mileage</label>
        <select 
          v-model="filters.mileage" 
          @change="applyFilters"
          class="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
        >
          <option v-for="mileage in options.mileages" :key="mileage" :value="mileage">
            {{ mileage === 'All' ? 'Any Mileage' : '< ' + Number(mileage).toLocaleString() + ' km' }}
          </option>
        </select>
      </div>
      
      <!-- Reset Button -->
      <div class="col-span-2 mt-2">
        <button
          @click="resetFilters"
          class="w-full p-2 text-sm text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
        >
          Reset Filters
        </button>
      </div>
    </div>
    
    <!-- Active filters -->
    <div v-if="Object.values(filters).some(v => v !== 'All')" class="px-3 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
      <div v-if="isAdminOrEmployee && filters.status !== 'All'" class="inline-flex items-center px-2 py-1 bg-blue-50 text-xs text-blue-700 rounded-full">
        Status: {{ filters.status }}
        <button @click="() => { filters.status = 'All'; applyFilters(); }" class="ml-1 text-blue-500 hover:text-blue-700">
          &times;
        </button>
      </div>
      <div v-if="filters.vehicleType !== 'All'" class="inline-flex items-center px-2 py-1 bg-purple-50 text-xs text-purple-700 rounded-full">
        Type: {{ filters.vehicleType }}
        <button @click="() => { filters.vehicleType = 'All'; applyFilters(); }" class="ml-1 text-purple-500 hover:text-purple-700">
          &times;
        </button>
      </div>
      <div v-if="filters.make !== 'All'" class="inline-flex items-center px-2 py-1 bg-indigo-50 text-xs text-indigo-700 rounded-full">
        Make: {{ filters.make }}
        <button @click="() => { filters.make = 'All'; applyFilters(); }" class="ml-1 text-indigo-500 hover:text-indigo-700">
          &times;
        </button>
      </div>
      <div v-if="filters.engineType !== 'All'" class="inline-flex items-center px-2 py-1 bg-green-50 text-xs text-green-700 rounded-full">
        Engine: {{ filters.engineType }}
        <button @click="() => { filters.engineType = 'All'; applyFilters(); }" class="ml-1 text-green-500 hover:text-green-700">
          &times;
        </button>
      </div>
      <div v-if="filters.price !== 'All'" class="inline-flex items-center px-2 py-1 bg-red-50 text-xs text-red-700 rounded-full">
        Price: &lt; {{ filters.price }} PLN
        <button @click="() => { filters.price = 'All'; applyFilters(); }" class="ml-1 text-red-500 hover:text-red-700">
          &times;
        </button>
      </div>
      <div v-if="filters.mileage !== 'All'" class="inline-flex items-center px-2 py-1 bg-amber-50 text-xs text-amber-700 rounded-full">
        Mileage: &lt; {{ Number(filters.mileage).toLocaleString() }} km
        <button @click="() => { filters.mileage = 'All'; applyFilters(); }" class="ml-1 text-amber-500 hover:text-amber-700">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>