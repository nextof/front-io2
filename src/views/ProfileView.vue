<template>
  <section class="max-w-3xl mx-auto mt-8">
    <!-- Dane klienta -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">My Profile</h2>
      <p class="mb-1"><span class="font-medium text-gray-700">Username:</span> {{ user?.username }}</p>
      <p class="mb-1"><span class="font-medium text-gray-700">Email:</span> {{ user?.email }}</p>
      <button
          class="mt-4 bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700 transition"
          @click="showPasswordModal = true"
      >Change Password</button>
    </div>

    <!-- MODAL do zmiany hasła -->
    <div v-if="showPasswordModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 relative">
        <button @click="closeModal" class="absolute right-3 top-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h3 class="text-lg font-bold mb-4 text-gray-800">Change Password</h3>
        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label for="oldPassword" class="block text-gray-700 font-medium mb-1">Current Password</label>
            <input
                id="oldPassword"
                type="password"
                v-model="passwordForm.oldPassword"
                required
                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': passwordError }"
            />
          </div>
          <div>
            <label for="newPassword" class="block text-gray-700 font-medium mb-1">New Password</label>
            <input
                id="newPassword"
                type="password"
                v-model="passwordForm.newPassword"
                required
                minlength="6"
                maxlength="40"
                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': passwordError }"
            />
          </div>
          <button
              type="submit"
              :disabled="isChanging"
              class="bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
          >
            <span v-if="isChanging">Changing...</span>
            <span v-else>Change Password</span>
          </button>
          <div v-if="passwordSuccess" class="text-green-600 text-sm mt-2 text-center">{{ passwordSuccess }}</div>
          <div v-if="passwordError" class="text-red-600 text-sm mt-2 text-center">{{ passwordError }}</div>
        </form>
      </div>
    </div>

    <!-- Lista rezerwacji użytkownika -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">My Reservations</h2>
      <div v-if="loading" class="text-center py-6">
        <span class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
        <p>Loading reservations...</p>
      </div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {{ error }}
      </div>
      <div v-else>
        <table class="min-w-full bg-white mb-4">
          <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-3">ID</th>
            <th class="py-2 px-3">Vehicle</th>
            <th class="py-2 px-3">Start Date</th>
            <th class="py-2 px-3">End Date</th>
            <th class="py-2 px-3">Status</th>
            <th class="py-2 px-3">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id" class="border-t">
            <td class="py-2 px-3">{{ reservation.id }}</td>
            <td class="py-2 px-3">
              <router-link :to="`/vehicles/${reservation.vehicle_id}`" class="text-blue-600 hover:underline">
                {{ vehicleMap[reservation.vehicle_id] || 'Loading...' }}
              </router-link>
            </td>
            <td class="py-2 px-3">{{ reservation.start_date }}</td>
            <td class="py-2 px-3">{{ reservation.end_date }}</td>
            <td class="py-2 px-3">
              <span v-if="reservation.status === 'PAID'" class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Paid</span>
              <span v-else-if="reservation.status === 'MANUAL'" class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Manual</span>
              <span v-else-if="reservation.status === 'PENDING'" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pending</span>
              <span v-else class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">Unknown</span>
            </td>
            <td class="py-2 px-3">
              <button
                  v-if="reservation.status === 'PENDING'"
                  @click="payWithStripe(reservation)"
                  class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-xs"
              >Pay</button>
            </td>
          </tr>
          <tr v-if="reservations.length === 0">
            <td colspan="6" class="py-6 text-center text-gray-500">No reservations found</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PaymentService from '../services/PaymentService';

const user = ref(null);
const reservations = ref([]);
const vehicleMap = ref({});
const loading = ref(true);
const error = ref(null);

const showPasswordModal = ref(false);

const closeModal = () => {
  showPasswordModal.value = false;
  passwordError.value = '';
  passwordSuccess.value = '';
  passwordForm.value.oldPassword = '';
  passwordForm.value.newPassword = '';
};

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/auth/me');
    user.value = res.data;
  } catch (e) {
    error.value = 'Error fetching user data';
  }
};

const fetchReservations = async () => {
  try {
    const res = await axios.get('/api/reservations/my');
    reservations.value = res.data;
    await fetchVehicleMap();
  } catch (e) {
    error.value = 'Error fetching reservations';
  } finally {
    loading.value = false;
  }
};

const fetchVehicleMap = async () => {
  try {
    const res = await axios.get('/api/vehicles/get');
    vehicleMap.value = {};
    res.data.forEach(vehicle => {
      vehicleMap.value[vehicle.id] = vehicle.license_plate;
    });
  } catch (e) {
    // Ignoruj
  }
};

const payWithStripe = async (reservation) => {
  try {
    const amount = reservation.cost || 0;
    const carName = vehicleMap.value[reservation.vehicle_id] || '';
    const response = await PaymentService.createCheckoutSession({
      reservationId: reservation.id,
      amount,
      carName,
    });
    window.location.href = response.data.url;
  } catch (err) {
    alert('Stripe payment failed: ' + (err.response?.data?.error || err.message));
  }
};

onMounted(async () => {
  loading.value = true;
  await fetchUser();
  await fetchReservations();
});

// ZMIANA HASŁA:
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
});
const isChanging = ref(false);
const passwordError = ref('');
const passwordSuccess = ref('');

const handleChangePassword = async () => {
  passwordError.value = '';
  passwordSuccess.value = '';
  isChanging.value = true;
  try {
    await axios.post('/api/auth/change-password', {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword,
    });
    passwordSuccess.value = 'Password changed successfully!';
    setTimeout(closeModal, 1500);
  } catch (error) {
    passwordError.value = error.response?.data?.message || 'Password change failed.';
  } finally {
    isChanging.value = false;
  }
};
</script>
