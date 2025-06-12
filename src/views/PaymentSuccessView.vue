<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-500">
    <div class="bg-white/80 backdrop-blur-md text-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center border border-white/30">
      <h2 class="text-3xl font-bold mb-4">Dziękujemy za płatność!</h2>
      <p class="text-base mb-6">
        Twoja transakcja została pomyślnie zakończona.
      </p>
      <router-link
          to="/"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
      >
        Powrót do strony głównej
      </router-link>
    </div>
  </div>
</template>