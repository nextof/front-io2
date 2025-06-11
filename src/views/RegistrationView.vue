<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Success message -->
      <div
          v-if="registerStatus === 'success'"
          class="max-w-md mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
      >
        User registered successfully! You can now log in.
      </div>
      <RegisterForm
          @register-success="handleRegisterSuccess"
          @register-failure="handleRegisterFailure"
      />
    </div>
  </section>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'RegistrationView',
  components: { RegisterForm },
  data() {
    return {
      registerStatus: '',
    };
  },
  methods: {
    handleRegisterSuccess() {
      this.registerStatus = 'success';
    },
    handleRegisterFailure() {
      this.registerStatus = 'failure';
    },
  },
};
</script>