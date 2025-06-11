<template>
  <form @submit.prevent="handleRegister" class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 space-y-6">
    <div>
      <label for="username" class="block mb-1 font-medium text-gray-700">Username</label>
      <input
          v-model="form.username"
          id="username"
          type="text"
          autocomplete="username"
          class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errorUsername }"
          required
      />
      <p v-if="errorUsername" class="text-red-600 text-sm mt-1">{{ errorUsername }}</p>
    </div>

    <div>
      <label for="email" class="block mb-1 font-medium text-gray-700">Email</label>
      <input
          v-model="form.email"
          id="email"
          type="email"
          autocomplete="email"
          class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errorEmail }"
          required
      />
      <p v-if="errorEmail" class="text-red-600 text-sm mt-1">{{ errorEmail }}</p>
    </div>

    <div>
      <label for="password" class="block mb-1 font-medium text-gray-700">Password</label>
      <input
          v-model="form.password"
          id="password"
          type="password"
          autocomplete="new-password"
          class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errorPassword }"
          required
      />
      <p v-if="errorPassword" class="text-red-600 text-sm mt-1">{{ errorPassword }}</p>
    </div>

    <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        :disabled="isLoading"
    >
      <span v-if="isLoading">Registering...</span>
      <span v-else>Register</span>
    </button>

    <div v-if="otherError" class="text-red-600 text-sm mt-2 text-center">
      {{ otherError }}
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'RegisterForm',
  emits: ['register-success', 'register-failure'],
  setup(props, { emit }) {
    const form = ref({
      username: '',
      email: '',
      password: '',
    });
    const isLoading = ref(false);
    const errorUsername = ref('');
    const errorEmail = ref('');
    const errorPassword = ref('');
    const otherError = ref('');

    // Frontend validation function
    const validate = () => {
      let valid = true;
      errorUsername.value = '';
      errorEmail.value = '';
      errorPassword.value = '';
      otherError.value = '';

      // Username
      if (!form.value.username.trim()) {
        errorUsername.value = 'Username is required.';
        valid = false;
      } else if (form.value.username.length < 3 || form.value.username.length > 20) {
        errorUsername.value = 'Username must be 3-20 characters.';
        valid = false;
      }
      // Email
      if (!form.value.email.trim()) {
        errorEmail.value = 'Email is required.';
        valid = false;
      } else if (form.value.email.length > 50) {
        errorEmail.value = 'Email must be less than 50 characters.';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errorEmail.value = 'Email format is invalid.';
        valid = false;
      }
      // Password
      if (!form.value.password) {
        errorPassword.value = 'Password is required.';
        valid = false;
      } else if (form.value.password.length < 6 || form.value.password.length > 40) {
        errorPassword.value = 'Password must be 6-40 characters.';
        valid = false;
      }
      return valid;
    };

    const handleRegister = async () => {
      if (!validate()) return;
      isLoading.value = true;

      try {
        await axios.post('/api/auth/signup', {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password,
        });
        emit('register-success');
        form.value.username = '';
        form.value.email = '';
        form.value.password = '';
      } catch (error) {
        emit('register-failure');
        // Backend validation errors
        const msg = error.response?.data?.message || error.response?.data || error.message || '';
        if (msg.includes('Username is already taken')) {
          errorUsername.value = 'This username is already taken.';
        }
        if (msg.includes('Email is already in use')) {
          errorEmail.value = 'This email is already in use.';
        }
        if (msg.toLowerCase().includes('password')) {
          errorPassword.value = msg;
        }
        // Spring global validation error
        if (
            msg.includes('must be between 6 and 40') ||
            msg.includes('wielkość musi należeć do zakresu') ||
            msg.includes('password')
        ) {
          errorPassword.value = 'Password must be 6-40 characters.';
        }
        if (
            msg.includes('must be between 3 and 20') ||
            msg.includes('username')
        ) {
          errorUsername.value = 'Username must be 3-20 characters.';
        }
        if (
            msg.toLowerCase().includes('email') &&
            msg.toLowerCase().includes('invalid')
        ) {
          errorEmail.value = 'Email format is invalid.';
        }
        // Other errors
        if (!errorUsername.value && !errorEmail.value && !errorPassword.value) {
          otherError.value = msg || 'Registration failed. Try again.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      isLoading,
      handleRegister,
      errorUsername,
      errorEmail,
      errorPassword,
      otherError,
    };
  },
};
</script>
