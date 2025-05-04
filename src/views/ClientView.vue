<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Banner from '../components/Banner.vue';

// Client state
const client = ref(null);
const reservations = ref([]);
const loading = ref(true);
const error = ref(null);

// For demonstration purposes, we'll use client ID 1
const clientId = 1 ;


// Format date for better display
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


onMounted(async () => {
  try {
    const response = await axios.get("/api/clients/"+ clientId);
    client.value = response.data;

     // Fetch reservations for this client
    const reservationResponse = await axios.get(`/api/reservations?clientID=${clientId}`);
    reservations.value = reservationResponse.data;


    loading.value = false;
  } catch (err) {
    error.value = "Failed to load client. Please try again later.";
    loading.value = false;
    console.error("Error fetching client:", err);
  }
});
</script>

<template>


  
<section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p class="mt-2">Loading your information...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {{ error }}
      </div>
      
      <!-- Client Profile -->
      <div v-else-if="client" class="mb-8">
        <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-semibold text-gray-700">Name:</p>
              <p class="text-gray-600 mb-2">{{ client.name }}</p>
              
              <p class="font-semibold text-gray-700">Email:</p>
              <p class="text-gray-600 mb-2">{{ client.email }}</p>
              
              <p class="font-semibold text-gray-700">Phone:</p>
              <p class="text-gray-600 mb-2">{{ client.phone }}</p>
            </div>
            
            <div>
              <p class="font-semibold text-gray-700">Address:</p>
              <p class="text-gray-600 mb-2">{{ client.address }}</p>
              
              <p class="font-semibold text-gray-700">License Number:</p>
              <p class="text-gray-600 mb-2">{{ client.licenseNumber }}</p>
              
              <p class="font-semibold text-gray-700">Restrictions:</p>
              <p class="text-gray-600 mb-2">{{ client.restrictions || 'None' }}</p>
            </div>
          </div>
          
          <div class="mt-4">
            <RouterLink 
              to="/client/profile/edit"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors inline-block"
            >
              Edit Profile
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- Client Reservations -->
      <div v-if="!loading && !error">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Reservations</h2>
        
        <div v-if="reservations.length === 0" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          You don't have any reservations yet.
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-xl shadow-md">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-3 px-4 text-left">Reservation ID</th>
                <th class="py-3 px-4 text-left">Vehicle</th>
                <th class="py-3 px-4 text-left">Start Date</th>
                <th class="py-3 px-4 text-left">End Date</th>
                <th class="py-3 px-4 text-left">Cost</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservation in reservations" :key="reservation.id" class="border-t">
                <td class="py-3 px-4">{{ reservation.reservationID }}</td>
                <td class="py-3 px-4">
                  <!-- In a real implementation, you would fetch the vehicle details or have them included in the reservation data -->
                  Vehicle #{{ reservation.vehicleID }}
                </td>
                <td class="py-3 px-4">{{ formatDate(reservation.startDate) }}</td>
                <td class="py-3 px-4">{{ formatDate(reservation.endDate) }}</td>
                <td class="py-3 px-4">${{ reservation.cost.toFixed(2) }}</td>
                <td class="py-3 px-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': reservation.status === 'Active',
                      'bg-yellow-100 text-yellow-800': reservation.status === 'Pending',
                      'bg-red-100 text-red-800': reservation.status === 'Canceled'
                    }"
                    class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ reservation.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <button 
                    v-if="reservation.status !== 'Canceled'"
                    class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <RouterLink
                    :to="`/client/reservations/${reservation.id}`"
                    class="bg-blue-500 text-white px-3 py-1 rounded text-sm ml-2 hover:bg-blue-600 transition-colors inline-block"
                  >
                    Details
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="mt-6">
          <RouterLink
            to="/vehicles"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors inline-block"
          >
            Make New Reservation
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>