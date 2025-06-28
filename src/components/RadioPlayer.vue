<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div class="bg-dark-800/95 backdrop-blur-md border border-gold-400/30 rounded-2xl p-6 shadow-2xl min-w-[320px] animate-float">
      <audio ref="audioRef" :src="currentStreamUrl" />
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <div class="relative">
            <Radio class="w-5 h-5 text-gold-400" />
            <div v-if="isLive" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <span class="text-gold-400 font-medium">EN VIVO</span>
        </div>
        <div class="flex items-center space-x-1">
          <Disc :class="['w-4 h-4 text-silver-400', { 'animate-spin': isPlaying }]" />
          <span class="text-silver-400 text-sm">Radio Santana</span>
        </div>
      </div>

      <!-- Now Playing -->
      <div class="mb-4">
        <p class="text-white font-medium text-sm mb-1">Ahora Suena:</p>
        <p class="text-silver-400 text-xs">Música Selecta 24/7</p>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between">
        <button
          @click="togglePlay"
          class="bg-gradient-gold text-dark-900 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-glow"
        >
          <Pause v-if="isPlaying" class="w-5 h-5" />
          <Play v-else class="w-5 h-5 ml-0.5" />
        </button>

        <div class="flex items-center space-x-3 flex-1 ml-4">
          <button
            @click="toggleMute"
            class="text-silver-400 hover:text-gold-400 transition-colors"
          >
            <VolumeX v-if="isMuted" class="w-4 h-4" />
            <Volume2 v-else class="w-4 h-4" />
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
      <div class="mt-4 flex items-center justify-center space-x-1">
        <div
          v-for="i in 5"
          :key="i"
          :class="[
            'w-1 bg-gradient-gold rounded-full',
            { 'animate-pulse': isPlaying }
          ]"
          :style="{
            height: isPlaying ? `${Math.random() * 20 + 10}px` : '4px',
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
import { Play, Pause, Volume2, VolumeX, Radio, Disc } from 'lucide-vue-next'
import { useSettings } from '../composables/useSettings'

const { settings, loading: settingsLoading } = useSettings()

const isPlaying = ref(false)
const volume = ref(0.7)
const isMuted = ref(false)
const isLive = ref(true)
const audioRef = ref<HTMLAudioElement>()

// Use stream URL from settings with fallback
const currentStreamUrl = computed(() => 
  settings.value.streamUrl || "https://stream.zeno.fm/your-stream-url"
)

// Watch for stream URL changes and update audio source
watch(currentStreamUrl, (newUrl) => {
  if (audioRef.value && newUrl) {
    const wasPlaying = isPlaying.value
    if (wasPlaying) {
      audioRef.value.pause()
    }
    audioRef.value.src = newUrl
    if (wasPlaying) {
      audioRef.value.play().catch(console.error)
    }
    console.log('Stream URL updated:', newUrl)
  }
})

const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play().catch(console.error)
    }
    isPlaying.value = !isPlaying.value
  }
}

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

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
})
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