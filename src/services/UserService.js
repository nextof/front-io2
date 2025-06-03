import axios from 'axios';
import config from '../config';

// Add an axios interceptor to add the JWT token to all requests
axios.interceptors.request.use(
    axiosConfig => {
        const userStr = localStorage.getItem(config.tokenStorageKey);
        if (!userStr) return axiosConfig;

        try {
            const user = JSON.parse(userStr);
            if (user && user.accessToken) {
                axiosConfig.headers['Authorization'] =
                    'Bearer ' + user.accessToken;
            }
        } catch (e) {
            console.error('Error parsing user for request interceptor:', e);
        }
        return axiosConfig;
    },
    error => {
        return Promise.reject(error);
    }
);

export async function authorizeGoogleLogin(googleResponse) {
    try {
        const response = await axios.post(
            config.apiUrl + config.authEndpoints.google,
            googleResponse
        );
        if (response.data.accessToken) {
            // Store user details and JWT token in localStorage
            localStorage.setItem(
                config.tokenStorageKey,
                JSON.stringify(response.data)
            );

            // Log the user data that is being stored
            console.log('User data stored in localStorage:', response.data);
        }
        return response.data;
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        const response = await axios.post(
            config.apiUrl + config.authEndpoints.login,
            credentials
        );
        if (response.data.accessToken) {
            // Store user details and JWT token in localStorage
            localStorage.setItem(
                config.tokenStorageKey,
                JSON.stringify(response.data)
            );

            // Log the user data that is being stored
            console.log('User data stored in localStorage:', response.data);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function getCurrentUser() {
    // This checks if there's a logged in user in local storage
    const userStr = localStorage.getItem(config.tokenStorageKey);
    if (!userStr) return null;

    try {
        const user = JSON.parse(userStr);
        if (user && user.accessToken) {
            return user;
        } else {
            return null;
        }
    } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        return null;
    }
}

export async function logoutUser() {
    localStorage.removeItem(config.tokenStorageKey);
}

/**
 * Get all users joined with their roles
 * @returns {Promise} Promise with users data
 */
export async function getUsersWithRoles() {
    return axios.get(`/api/staff/users-with-roles`);
}

/**
 * Delete a user
 * @param {number} id user ID
 * @returns {Promise} Promise with delete operation status
 */
export async function deleteUser(id) {
    return axios.delete(`/api/staff/users/delete/${id}`);
}

/**
 * Update an user
 * @param {number} id user ID
 * @param {Object} userData Updated user data
 * @returns {Promise} Promise with updated user data
 */
export async function updateUser(userData) {
    return axios.put(`/api/staff/users/update`, userData);
}
