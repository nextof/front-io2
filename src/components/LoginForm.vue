<template>
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
            Login to Car Rental System
        </h2>

        <form @submit.prevent="login">
            <!-- Error Alert -->
            <div
                v-if="errorMessage"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            >
                <span class="block sm:inline">{{ errorMessage }}</span>
            </div>

            <!-- Username Field -->
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                >
                    Username
                </label>
                <input
                    v-model="username"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                />
            </div>

            <!-- Password Field -->
            <div class="mb-6">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                >
                    Password
                </label>
                <input
                    v-model="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    required
                />
            </div>

            <!-- Submit Button and Google button -->
            <div class="flex flex-col gap-3 items-center justify-center">
                <button
                    class="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
                    type="submit"
                >
                    <span>Sign In</span>
                </button>
                <GoogleLogin
                    :callback="handleGoogleLogin"
                    class="google-button flex items-center justify-center bg-white border border-gray-300 text-gray-600 font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out w-full hover:bg-gray-100"
                    type="button"
                >
                    <div class="flex items-center justify-center gap-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google logo"
                            class="w-5 h-5"
                        />
                        <span>Use Google</span>
                    </div>
                </GoogleLogin>
            </div>
        </form>

        <!-- Additional Info -->
        <div class="mt-6">
            <p class="text-center text-gray-600 text-sm mb-2">Demo Access:</p>
            <button
                @click="useDemoCredentials"
                class="w-full text-center text-indigo-600 text-sm hover:text-indigo-800 transition-colors"
            >
                Use Demo Credentials
            </button>
        </div>
    </div>
</template>

<script>
import { loginUser, authorizeGoogleLogin } from '../services/UserService';
import { GoogleLogin } from 'vue3-google-login';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password,
                };
                const userData = await loginUser(credentials);

                this.changeToMainViewAfterLogin(userData);
            } catch (error) {
                this.errorMessage = 'Login error. Please try again.';
                console.error('Login error:', error);
                this.$emit('login-failure', this.errorMessage);
            }
        },

        // For development purposes - prefill with demo credentials
        useDemoCredentials() {
            this.username = 'king';
            this.password = 'ass';
        },

        async handleGoogleLogin(googleResponse) {
            // console.log(googleResponse);
            const userData = await authorizeGoogleLogin(googleResponse);

            this.changeToMainViewAfterLogin(userData);
        },

        changeToMainViewAfterLogin(userData) {
            try {
                if (userData && userData.accessToken) {
                    // Emit event for navbar update
                    window.dispatchEvent(
                        new CustomEvent('user-login', { detail: userData })
                    );

                    // Emit login success event
                    this.$emit('login-success', userData);

                    // Navigate to appropriate page based on role
                    if (
                        userData.roles &&
                        userData.roles.includes('ROLE_ADMIN')
                    ) {
                        this.$router.push({ name: 'staff-vehicles' });
                    } else {
                        this.$router.push({ name: 'home' });
                    }
                } else {
                    this.errorMessage = 'Incorrect credentials.';
                    this.$emit('login-failure', this.errorMessage);
                }
            } catch (error) {
                this.errorMessage = 'Login error. Please try again.';
                console.error('Change to main view error:', error);
                this.$emit('Past logging process error: ', this.errorMessage);
            }
        },
    },
};
</script>
