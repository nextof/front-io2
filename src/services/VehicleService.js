// src/services/VehicleService.js
import axios from 'axios';

const API_URL = '/api/vehicles';

export default {
  /**
   * Get all vehicles
   * @returns {Promise} Promise with vehicles data
   */
  getAllVehicles() {
    return axios.get(`${API_URL}/get`);
  },

  /**
   * Get a specific vehicle by ID
   * @param {number} id Vehicle ID
   * @returns {Promise} Promise with vehicle data
   */
  getVehicleById(id) {
    return axios.get(`${API_URL}/get/${id}`);
  },

  /**
   * Get vehicles by status
   * @param {string} status Vehicle status (e.g., 'Available', 'Reserved')
   * @returns {Promise} Promise with filtered vehicles data
   */
  getVehiclesByStatus(status) {
    // Implement client-side filtering since there's no specific endpoint
    return axios.get(`${API_URL}/get`).then(response => {
      const filteredVehicles = response.data.filter(vehicle => vehicle.status === status);
      return { data: filteredVehicles };
    });
  },

  /**
   * Create a new vehicle
   * @param {Object} vehicleData Vehicle data
   * @returns {Promise} Promise with created vehicle data
   */
  createVehicle(vehicleData) {
    // Ensure we don't send an ID for a new vehicle
    const newVehicleData = { ...vehicleData };
    if (newVehicleData.id) {
      delete newVehicleData.id;
    }
    
    return axios.post(`${API_URL}/add`, newVehicleData);
  },

  /**
   * Update an existing vehicle
   * @param {number} id Vehicle ID
   * @param {Object} vehicleData Updated vehicle data
   * @returns {Promise} Promise with updated vehicle data
   */
  updateVehicle(id, vehicleData) {
    return axios.put(`${API_URL}/update/${id}`, vehicleData);
  },

  /**
   * Delete a vehicle
   * @param {number} id Vehicle ID
   * @returns {Promise} Promise with delete operation status
   */
  deleteVehicle(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
};