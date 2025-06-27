import axios from 'axios';
import config from '../config';
import { jwtDecode } from 'jwt-decode';

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

        if (response.data.exists == false) return response.data;
        else {
            const token = response.data;
            const decoded = jwtDecode(token);
            const user = {
                accessToken: token,
                username: decoded.sub,
                id: decoded.id,
                email: decoded.email,
                roles: decoded.roles,
            };
            localStorage.setItem(config.tokenStorageKey, JSON.stringify(user));
            return user;
        }
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

        const token = response.data.accessToken;
        const decoded = jwtDecode(token);

        const user = {
            accessToken: token,
            username: decoded.sub,
            id: decoded.id,
            email: decoded.email,
            roles: decoded.roles,
        };

        localStorage.setItem(config.tokenStorageKey, JSON.stringify(user));

        return user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function registerUser(payload) {
    try {
        const response = await axios.post('/api/auth/signup', {
            username: payload.username,
            email: payload.email,
            password: payload.password,
        });

        if (response.status === 200) {
            return response;
        }

        throw new Error('Unexpected response status: ' + response.status);
    } catch (error) {
        let errorValue = '';

        const msg =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            'Unknown error occurred';
        console.log(msg);
        if (msg.includes('Username is already taken')) {
            errorValue = 'This username is already taken.';
        } else if (msg.includes('Email is already in use')) {
            errorValue = 'This email is already in use.';
        } else if (msg.toLowerCase().includes('password')) {
            errorValue = msg;
        } else if (
            msg.includes('must be between 6 and 40') ||
            msg.includes('wielkość musi należeć do zakresu') ||
            msg.includes('password')
        ) {
            errorValue = 'Password must be 6-40 characters.';
        } else if (
            msg.includes('must be between 3 and 20') ||
            msg.includes('username')
        ) {
            errorValue = 'Username must be 3-20 characters.';
        } else if (
            msg.toLowerCase().includes('email') &&
            msg.toLowerCase().includes('invalid')
        ) {
            errorValue = 'Email format is invalid.';
        } else {
            errorValue = msg || 'Registration failed. Try again.';
        }

        return errorValue;
    }
}

export function getCurrentUser() {
    const userStr = localStorage.getItem(config.tokenStorageKey);
    if (!userStr) return null;

    try {
        const user = JSON.parse(userStr);
        return user && user.accessToken ? user : null;
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
