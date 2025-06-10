<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Manage Reservations</h2>
        <button
            @click="showAddReservationForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Reservation
        </button>
      </div>

      <!-- Loading and Error -->
      <div v-if="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2">Loading reservations...</p>
      </div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {{ error }}
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Search -->
        <div class="mb-6">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search reservations..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
            <tr>
              <th @click="toggleSort('id')" class="py-3 px-4 cursor-pointer hover:bg-gray-200">ID</th>
              <th @click="toggleSort('vehicle_id')" class="py-3 px-4 cursor-pointer hover:bg-gray-200">Vehicle</th>
              <th @click="toggleSort('client_id')" class="py-3 px-4 cursor-pointer hover:bg-gray-200">User</th>
              <th @click="toggleSort('start_date')" class="py-3 px-4 cursor-pointer hover:bg-gray-200">Start Date</th>
              <th @click="toggleSort('end_date')" class="py-3 px-4 cursor-pointer hover:bg-gray-200">End Date</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="reservation in filteredReservations"
                :key="reservation.id"
                class="border-t hover:bg-gray-50"
            >
              <td class="py-3 px-4">{{ reservation.id }}</td>
              <td class="py-3 px-4">
                <router-link
                    :to="`/vehicles/${reservation.vehicle_id}`"
                    class="text-blue-600 hover:underline"
                >
                  {{ vehicleMap[reservation.vehicle_id] || 'Loading...' }}
                </router-link>
              </td>
              <td class="py-3 px-4">
                {{ userMap[reservation.client_id] || 'Loading...' }}
              </td>
              <td class="py-3 px-4">{{ reservation.start_date }}</td>
              <td class="py-3 px-4">{{ reservation.end_date }}</td>
              <td class="py-3 px-4">
                <span v-if="reservation.status === 'PAID'" class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Paid</span>
                <span v-else-if="reservation.status === 'MANUAL'" class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Manual</span>
                <span v-else-if="reservation.status === 'PENDING'" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pending</span>
                <span v-else class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">Unknown</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button
                      @click="editReservation(reservation)"
                      class="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                      title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                      @click="deleteReservation(reservation.id)"
                      class="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                      title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                  <!-- Stripe płatność tylko dla PENDING -->
                  <button
                      v-if="reservation.status === 'PENDING'"
                      @click="payWithStripe(reservation)"
                      class="text-indigo-600 hover:text-indigo-800 transition transform hover:scale-110"
                      title="Pay with Stripe"
                  >Pay</button>
                  <!-- Manualne oznaczanie (dla admina) -->
                  <button
                      v-if="reservation.status === 'PENDING'"
                      @click="markManualPaid(reservation.id)"
                      class="text-gray-600 hover:text-gray-800 transition transform hover:scale-110"
                      title="Mark as Paid"
                  >Manual</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredReservations.length === 0">
              <td colspan="7" class="py-6 text-center text-gray-500">
                No reservations found
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal / Form -->
  <div
      v-if="showAddReservationForm || editedReservation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">
            {{ editedReservation ? 'Edit Reservation' : 'Add Reservation' }}
          </h3>
          <button @click="cancelForm" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveReservation" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Vehicle ID</label>
            <input v-model="reservationForm.vehicle_id" type="text" class="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
            <input v-model="reservationForm.client_id" type="text" class="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input v-model="reservationForm.start_date" type="date" class="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input v-model="reservationForm.end_date" type="date" class="input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="flex justify-between items-center mt-6">
            <button
                type="button"
                @click="cancelForm"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationService from '../services/ReservationService';
import PaymentService from '../services/PaymentService';
import axios from 'axios';

export default {
  name: 'ReservationsView',
  data() {
    return {
      reservations: [],
      showAddReservationForm: false,
      editedReservation: null,
      reservationForm: {
        vehicle_id: '',
        client_id: '',
        start_date: '',
        end_date: ''
      },
      searchQuery: '',
      sortField: 'id',
      sortDirection: 'asc',
      loading: false,
      error: null,
      vehicleMap: {},
      userMap: {},
    };
  },

  computed: {
    filteredReservations() {
      const query = this.searchQuery.toLowerCase();
      return this.reservations
          .filter(r =>
              (this.vehicleMap[r.vehicle_id]?.toLowerCase().includes(query)) ||
              (this.userMap[r.client_id]?.toLowerCase().includes(query)) ||
              (r.start_date && r.start_date.toLowerCase().includes(query)) ||
              (r.end_date && r.end_date.toLowerCase().includes(query))
          )
          .sort((a, b) => {
            const fieldA = a[this.sortField];
            const fieldB = b[this.sortField];
            if (fieldA == null || fieldB == null) return 0;
            return this.sortDirection === 'asc'
                ? String(fieldA).localeCompare(String(fieldB))
                : String(fieldB).localeCompare(String(fieldA));
          });
    }
  },

  created() {
    this.fetchReservations();
    this.fetchVehicles();
    this.fetchUsers();
  },

  methods: {
    async fetchReservations() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ReservationService.getAllReservations();
        this.reservations = response.data;
      } catch (error) {
        this.error = 'Error fetching reservations.';
        console.error('Error fetching reservations:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchVehicles() {
      try {
        const response = await axios.get('/api/vehicles/get');
        this.vehicleMap = {};
        response.data.forEach(vehicle => {
          this.vehicleMap[vehicle.id] = vehicle.license_plate;
        });
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get('/api/staff/users');
        this.userMap = {};
        response.data.forEach(user => {
          this.userMap[user.id] = user.username;
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async deleteReservation(id) {
      if (confirm('Are you sure you want to delete this reservation?')) {
        try {
          await ReservationService.deleteReservation(id);
          this.fetchReservations();
        } catch (error) {
          console.error('Error deleting reservation:', error);
        }
      }
    },

    editReservation(reservation) {
      this.editedReservation = reservation;
      this.reservationForm = { ...reservation };
      this.showAddReservationForm = false;
    },

    async saveReservation() {
      try {
        if (this.editedReservation) {
          await ReservationService.updateReservation(
              this.editedReservation.id,
              this.reservationForm
          );
        } else {
          await ReservationService.createReservation(this.reservationForm);
        }
        this.fetchReservations();
        this.cancelForm();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('Reservation failed: Vehicle is already reserved for this period.');
        } else {
          console.error('Error saving reservation:', error);
        }
      }
    },

    cancelForm() {
      this.editedReservation = null;
      this.showAddReservationForm = false;
      this.reservationForm = {
        vehicle_id: '',
        client_id: '',
        start_date: '',
        end_date: ''
      };
    },

    toggleSort(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    },

    // STRIPE & MANUAL
    async payWithStripe(reservation) {
      try {
        const amount = reservation.cost || 0;
        const carName = this.vehicleMap[reservation.vehicle_id] || '';
        const response = await PaymentService.createCheckoutSession({
          reservationId: reservation.id,
          amount,
          carName
        });
        window.location.href = response.data.url; // przekieruj do Stripe
      } catch (err) {
        alert('Stripe payment failed: ' + (err.response?.data?.error || err.message));
      }
    },
    async markManualPaid(reservationId) {
      if (confirm('Czy na pewno oznaczyć tę rezerwację jako opłaconą ręcznie?')) {
        try {
          await ReservationService.markAsManualPaid(reservationId);
          this.fetchReservations();
        } catch (err) {
          alert('Błąd oznaczania jako opłacone: ' + (err.response?.data?.error || err.message));
        }
      }
    }
  }
};
</script>
