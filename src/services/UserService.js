import axios from 'axios';
import config from '../config';

export async function loginUser(credentials) {
    try {
        const response = await axios.post(config.apiUrl + config.authEndpoints.login, credentials);
        if (response.data.accessToken) {
            // Store user details and JWT token in localStorage
            localStorage.setItem(config.tokenStorageKey, JSON.stringify(response.data));
            
            // Log the user data that is being stored
            console.log('User data stored in localStorage:', response.data);
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
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
        console.error("Error parsing user from localStorage:", e);
        return null;
    }
}

export async function logoutUser() {
    localStorage.removeItem(config.tokenStorageKey);
}

// Add an axios interceptor to add the JWT token to all requests
axios.interceptors.request.use(
    (axiosConfig) => {
        const userStr = localStorage.getItem(config.tokenStorageKey);
        if (!userStr) return axiosConfig;
        
        try {
            const user = JSON.parse(userStr);
            if (user && user.accessToken) {
                axiosConfig.headers['Authorization'] = 'Bearer ' + user.accessToken;
            }
        } catch (e) {
            console.error("Error parsing user for request interceptor:", e);
        }
        return axiosConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);