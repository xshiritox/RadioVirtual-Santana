<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Versión minimizada -->
    <div 
      v-if="isMinimized" 
      @click="toggleMinimize"
      class="bg-dark-800/95 backdrop-blur-md border border-gold-400/30 rounded-full p-3 shadow-2xl cursor-pointer hover:bg-dark-700/95 transition-all duration-300 flex items-center space-x-2"
    >
      <Radio class="w-5 h-5 text-gold-400" />
      <div v-if="isLive" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <Play v-if="!isPlaying" class="w-4 h-4 text-gold-400" />
      <Pause v-else class="w-4 h-4 text-gold-400" />
    </div>

    <!-- Versión completa -->
    <div 
      v-else
      class="bg-dark-800/95 backdrop-blur-md border border-gold-400/30 rounded-2xl p-4 shadow-2xl w-72 animate-float"
    >
      <audio ref="audioRef" :src="currentStreamUrl" />
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <div class="relative">
            <Radio class="w-4 h-4 text-gold-400" />
            <div v-if="isLive" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <span class="text-gold-400 text-sm font-medium">EN VIVO</span>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="toggleMinimize" class="text-silver-400 hover:text-gold-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Now Playing -->
      <div class="mb-3">
        <p class="text-white font-medium text-xs mb-0.5">Ahora Suena:</p>
        <p class="text-silver-400 text-xs">Música Selecta 24/7</p>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between">
        <button
          @click="togglePlay"
          class="bg-gradient-gold text-dark-900 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-glow"
        >
          <Pause v-if="isPlaying" class="w-4 h-4" />
          <Play v-else class="w-4 h-4 ml-0.5" />
        </button>

        <div class="flex items-center space-x-2 flex-1 ml-3">
          <button
            @click="toggleMute"
            class="text-silver-400 hover:text-gold-400 transition-colors"
          >
            <VolumeX v-if="isMuted" class="w-3.5 h-3.5" />
            <Volume2 v-else class="w-3.5 h-3.5" />
          </button>
          
          <div class="flex-1 relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              :value="isMuted ? 0 : volume"
              @input="handleVolumeChange"
              class="w-full h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      <!-- Visualizer Effect -->
      <div class="mt-3 flex items-center justify-center space-x-0.5">
        <div
          v-for="i in 5"
          :key="i"
          class="w-0.5 bg-gradient-gold rounded-full"
          :class="{ 'animate-pulse': isPlaying }"
          :style="{
            height: isPlaying ? `${Math.random() * 12 + 4}px` : '3px',
            animationDelay: `${(i - 1) * 0.1}s`,
            animationDuration: '0.5s'
          }"
        />
      </div>

      <!-- Real-time Settings Status -->
      <div v-if="settingsLoading" class="mt-3 flex items-center space-x-2 text-gold-400 text-xs">
        <div class="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
        <span>Actualizando configuración...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-vue-next'
import { useSettings } from '../composables/useSettings'

const { settings, loading: settingsLoading } = useSettings()

const isPlaying = ref(false)
const volume = ref(0.7)
const isMuted = ref(false)
const isLive = ref(true)
const isMinimized = ref(false)
const audioRef = ref<HTMLAudioElement>()

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

// Usar archivo de audio local
const currentStreamUrl = computed(() => 
  "/radiospot.mp3"
)

// Inicializar el reproductor con el archivo local
onMounted(() => {
  if (audioRef.value) {
    // Configurar el volumen inicial
    audioRef.value.volume = volume.value
    
    // Cargar el archivo de audio local
    audioRef.value.src = currentStreamUrl.value
    
    // Manejador para cuando el audio esté listo
    audioRef.value.addEventListener('canplay', () => {
      console.log('Audio listo para reproducir')
    })
    
    // Manejador de errores
    audioRef.value.addEventListener('error', (e) => {
      console.error('Error al cargar el audio:', audioRef.value?.error)
    })
  }
})



const toggleMute = () => {
  if (audioRef.value) {
    audioRef.value.muted = !isMuted.value
    isMuted.value = !isMuted.value
  }
}

const handleVolumeChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const newVolume = parseFloat(target.value)
  volume.value = newVolume
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
}

watch(volume, (newVolume) => {
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
})

// Manejador para el botón de reproducción/pausa
const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
      .then(() => {
        console.log('Reproduciendo audio local')
      })
      .catch(error => {
        console.error('Error al reproducir:', error)
        // Si hay un error, intentar cargar el audio nuevamente
        if (audioRef.value) {
          audioRef.value.load()
        }
      })
  }
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
  cursor: pointer;
  border: 2px solid #212529;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
  cursor: pointer;
  border: 2px solid #212529;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}
</style>