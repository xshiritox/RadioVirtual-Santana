<template>
  <div class="relative">
    <!-- Simple Video Card -->
    <div class="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center cursor-pointer group relative" @click="openInYouTube">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="w-full h-full" style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px); background-size: 50px 50px;"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 text-center p-8">
        <!-- YouTube Play Button -->
        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
          <div class="w-0 h-0 border-l-[20px] border-l-red-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
        </div>
        
        <!-- Title and Description -->
        <h4 class="text-2xl font-bold text-white mb-4">{{ title }}</h4>
        <p class="text-red-100 mb-6 max-w-md mx-auto leading-relaxed">{{ description }}</p>
        
        <!-- YouTube Badge -->
        <div class="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium group-hover:bg-white/30 transition-colors">
          <svg class="w-6 h-6 text-red-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Ver en YouTube</span>
          <ExternalLink class="w-4 h-4" />
        </div>
      </div>
      
      <!-- Hover Effect -->
      <div class="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
    </div>

    <!-- Video Info Card -->
    <div class="mt-6 bg-dark-700/50 border border-gold-400/20 rounded-xl p-6">
      <div class="flex items-start space-x-4">
        <!-- YouTube Icon -->
        <div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        
        <!-- Video Details -->
        <div class="flex-1 min-w-0">
          <h5 class="text-white font-semibold text-lg mb-2">{{ title }}</h5>
          <p class="text-silver-400 text-sm leading-relaxed mb-3">{{ description }}</p>
          
          <!-- Video ID and Status -->
          <div class="flex items-center space-x-4 text-xs">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              <span class="text-green-400 font-medium">Video Disponible</span>
            </div>
            <span class="text-gold-400">ID: {{ videoId }}</span>
          </div>
        </div>
        
        <!-- Action Button -->
        <button
          @click="openInYouTube"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center space-x-2 flex-shrink-0"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Ver Video</span>
        </button>
      </div>
    </div>

    <!-- Additional Features -->
    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-dark-800/30 border border-gold-400/10 rounded-lg p-4 text-center">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-white text-sm font-medium">HD Quality</p>
        <p class="text-silver-400 text-xs">Alta definición</p>
      </div>
      
      <div class="bg-dark-800/30 border border-gold-400/10 rounded-lg p-4 text-center">
        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <p class="text-white text-sm font-medium">Seguro</p>
        <p class="text-silver-400 text-xs">Enlace verificado</p>
      </div>
      
      <div class="bg-dark-800/30 border border-gold-400/10 rounded-lg p-4 text-center">
        <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <p class="text-white text-sm font-medium">Rápido</p>
        <p class="text-silver-400 text-xs">Carga instantánea</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'

interface Props {
  videoId: string
  title?: string
  description?: string
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Video Promocional de Radio Santana',
  description: 'Descubre el poder de la publicidad en Radio Santana y cómo podemos ayudar a hacer crecer tu negocio con nuestras soluciones personalizadas.',
  autoplay: true
})

const openInYouTube = () => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${props.videoId}`
  console.log(`Abriendo video de YouTube: ${youtubeUrl}`)
  window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
}
</script>