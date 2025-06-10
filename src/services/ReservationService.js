import axios from 'axios';

const API_URL = '/api/reservations';

export default {
    /**
     * Get all reservations
     * @returns {Promise} Promise with reservations data
     */
    getAllReservations() {
        return axios.get(`${API_URL}/get`);
    },

    /**
     * Get a specific reservation by ID
     * @param {number} id Reservation ID
     * @returns {Promise} Promise with reservation data
     */
    getReservationById(id) {
        return axios.get(`${API_URL}/get/${id}`);
    },

    /**
     * Create a new reservation
     * @param {Object} reservationData Reservation data
     * @returns {Promise} Promise with created reservation data
     */
    createReservation(reservationData) {
        return axios.post(`${API_URL}`, reservationData);
    },

    /**
     * Update an existing reservation
     * @param {number} id Reservation ID
     * @param {Object} reservationData Updated reservation data
     * @returns {Promise} Promise with updated reservation data
     */
    updateReservation(id, reservationData) {
        return axios.put(`${API_URL}/${id}`, reservationData);
    },

    /**
     * Delete a reservation
     * @param {number} id Reservation ID
     * @returns {Promise} Promise with delete operation status
     */
    deleteReservation(id) {
        return axios.delete(`${API_URL}/${id}`);
    },

    /**
     * Mark reservation as manually paid
     * @param {number} id Reservation ID
     * @returns {Promise} Promise with operation status
     */
    markAsManualPaid(id) {
        return axios.put(`${API_URL}/${id}/pay-manual`);
    }
};
