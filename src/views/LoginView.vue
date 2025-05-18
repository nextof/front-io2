<template>
    <section class="bg-gray-50 py-12">
        <div class="container mx-auto px-4">
            <!-- Success message -->
            <div
                v-if="loginStatus === 'success'"
                class="max-w-md mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
            >
                Login successful! Redirecting you...
            </div>

            <LoginForm
                @login-success="handleLoginSuccess"
                @login-failure="handleLoginFailure"
            />
        </div>
    </section>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'LoginView',
    components: {
        LoginForm,
    },
    data() {
        return {
            loginStatus: '',
        };
    },
    methods: {
        handleLoginSuccess(userData) {
            this.loginStatus = 'success';
            // Additional success handling if needed
        },
        handleLoginFailure(error) {
            this.loginStatus = 'failure';
            // Additional failure handling if needed
        },
    },
};
</script>
