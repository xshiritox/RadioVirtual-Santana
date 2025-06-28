<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.1),transparent_50%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(192,192,192,0.05),transparent_50%)]"></div>
    
    <!-- Animated Background Elements -->
    <div class="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-ping"></div>
    <div class="absolute top-40 right-20 w-1 h-1 bg-silver-400 rounded-full animate-pulse"></div>
    <div class="absolute bottom-32 left-20 w-3 h-3 bg-gold-400/50 rounded-full animate-bounce"></div>
    <div class="absolute bottom-20 right-10 w-2 h-2 bg-silver-400/50 rounded-full animate-ping"></div>

    <div class="relative z-10 container mx-auto px-4 py-20 text-center">
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Logo & Title -->
        <div class="mb-8 animate-float">
          <div class="w-32 h-32 mx-auto mb-6 relative">
            <div class="absolute inset-0 bg-gradient-gold rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute inset-2 bg-gradient-gold rounded-full flex items-center justify-center overflow-hidden animate-glow">
              <img 
                src="/logo.WebP" 
                alt="Radio Santana" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-4">
            <span class="bg-gradient-gold bg-clip-text text-transparent">
              Radio Santana
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-silver-400 mb-2 font-light">
            Tu Radio Virtual
          </p>
          
          <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
        </div>

        <!-- Description -->
        <div class="relative inline-block group mb-12">
          <p class="text-xl md:text-2xl font-medium text-silver-300">
            <span class="relative">
              La forma <span class="text-gold-400 font-bold">+</span> fresca de escuchar radio.
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </span>
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex justify-center items-center mb-16">
          <button class="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-400 hover:text-dark-900 transition-all duration-300 flex items-center space-x-3">
            <Headphones class="w-5 h-5" />
            <span>Programación</span>
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-300 group"
          >
            <component :is="stat.icon" class="w-8 h-8 text-gold-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div class="text-2xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="text-silver-400 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Headphones, Clock, Users } from 'lucide-vue-next'

const listeners = ref(0)

// Función para formatear el número de oyentes
const formatListeners = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`
  }
  return count.toString()
}

const stats = ref([
  { 
    icon: Users, 
    value: '...', 
    label: 'Oyentes',
    description: 'En vivo ahora'
  },
  { 
    icon: Clock, 
    value: '24/7', 
    label: 'En Vivo',
    description: 'Transmisión continua'
  },
  { 
    icon: Headphones, 
    value: '100%', 
    label: 'Digital',
    description: 'Alta calidad'
  }
])

let interval: NodeJS.Timeout

// Simulación de actualización de oyentes
const fetchListeners = async () => {
  try {
    // Simulación temporal (eliminar cuando se implemente la API real)
    const simulatedListeners = Math.floor(Math.random() * 500) + 50
    listeners.value = simulatedListeners
    stats.value[0].value = formatListeners(simulatedListeners)
  } catch (error) {
    console.error('Error al obtener oyentes:', error)
  }
}

onMounted(() => {
  fetchListeners()
  interval = setInterval(fetchListeners, 30000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>