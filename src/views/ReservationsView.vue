<template>
  <div class="container">
    <h1>Manage Reservations</h1>

    <button @click="showAddReservationForm = true">Add Reservation</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehicle ID</th>
          <th>User ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.vehicle_id }}</td>
          <td>{{ reservation.user_id }}</td>
          <td>{{ reservation.start_date }}</td>
          <td>{{ reservation.end_date }}</td>
          <td>
            <button @click="editReservation(reservation)">Edit</button>
            <button @click="deleteReservation(reservation.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Reservation Form -->
    <div v-if="showAddReservationForm || editedReservation">
      <h2>{{ editedReservation ? 'Edit Reservation' : 'Add Reservation' }}</h2>
      <form @submit.prevent="saveReservation">
        <label>Vehicle ID:</label>
        <input v-model="reservationForm.vehicle_id" required />

        <label>User ID:</label>
        <input v-model="reservationForm.user_id" required />

        <label>Start Date:</label>
        <input type="date" v-model="reservationForm.start_date" required />

        <label>End Date:</label>
        <input type="date" v-model="reservationForm.end_date" required />

        <button type="submit">Save</button>
        <button type="button" @click="cancelForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import ReservationService from '../services/ReservationService';

export default {
  name: 'ReservationsView',
  data() {
    return {
      reservations: [],
      showAddReservationForm: false,
      editedReservation: null,
      reservationForm: {
        vehicle_id: '',
        user_id: '',
        start_date: '',
        end_date: ''
      }
    };
  },
  created() {
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await ReservationService.getAllReservations();
        this.reservations = response.data;
      } catch (error) {
        console.error('Error fetching reservations:', error);
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
          // Update existing reservation
          await ReservationService.updateReservation(
            this.editedReservation.id,
            this.reservationForm
          );
        } else {
          // Create new reservation
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
        user_id: '',
        start_date: '',
        end_date: ''
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
}

form {
  margin-top: 20px;
}

form label {
  display: block;
  margin-top: 10px;
}

form input {
  width: 100%;
  padding: 5px;
}
</style>
