<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Tailwind Cars'
  },
  subtitle: {
    type: String,
    default: 'Avaliable everywhere, anytime, just for you.'
  },
  showSearchBar: {
    type: Boolean,
    default: false
  }
});

const searchQuery = ref('');
const isAnimated = ref(false);

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true;
  }, 100);
});

const emits = defineEmits(['search']);

const handleSearch = () => {
  emits('search', searchQuery.value);
};
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Background with gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 opacity-90"></div>
    
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')"></div>
    </div>
    
    <!-- Content container - reduced height -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
      <div class="text-center">
        <!-- Title with animation -->
        <h1 
          :class="[
            'text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight', 
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          ]"
          class="transition-all duration-500 ease-out"
        >
          {{ title }}
        </h1>
        
        <!-- Subtitle with animation -->
        <p 
          :class="[
            'mt-4 text-lg md:text-xl text-green-100 max-w-3xl mx-auto', 
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          ]"
          class="transition-all duration-500 delay-100 ease-out"
        >
          {{ subtitle }}
        </p>
        
        <!-- Optional search bar with animation -->
        <div 
          v-if="showSearchBar"
          :class="[
            'mt-6 max-w-md mx-auto', 
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          ]"
          class="transition-all duration-500 delay-200 ease-out"
        >
          <div class="flex overflow-hidden rounded-lg shadow-lg focus-within:ring-2 focus-within:ring-white">
            <input
              v-model="searchQuery"
              type="text"
              class="w-full py-2 px-4 bg-white bg-opacity-20 backdrop-blur-sm placeholder-white placeholder-opacity-70 border-transparent focus:border-transparent focus:ring-0 text-white"
              placeholder="Search for vehicles..."
              @keyup.enter="handleSearch"
            />
            <button
              type="button"
              class="bg-white bg-opacity-20 backdrop-blur-sm px-4 flex items-center text-white hover:bg-opacity-30 transition-colors"
              @click="handleSearch"
            >
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Enhanced Fleet Button with animation and hover effects -->
        <div 
          :class="[
            'mt-6',
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          ]"
          class="transition-all duration-500 delay-300 ease-out"
        >
          <a 
            href="/vehicles" 
            class="inline-flex items-center px-6 py-3 shadow-lg text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
          >
            <span>Browse Our Fleet</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Smoother wave shape at the bottom -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="white">
        <path d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,48C672,32,768,32,864,37.3C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.bg-size-200 {
  background-size: 200% 200%;
}

.bg-pos-0 {
  background-position: 0% 0%;
}

.bg-pos-100 {
  background-position: 100% 100%;
}
</style>