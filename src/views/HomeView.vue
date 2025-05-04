<script setup>
import Banner from '../components/Banner.vue'
import CarListings from '../components/CarListings.vue'
</script>

<template>
  <Banner />
  
  <!-- Enhanced Best Deals Section -->
  <section class="py-12 bg-gradient-to-b from-white to-blue-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">Best Deals</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-600 to-teal-400 mx-auto mb-4 rounded-full"></div>
      </div>
      
      <CarListings :limit="3" :showButton="true" />
    </div>
  </section>
</template>