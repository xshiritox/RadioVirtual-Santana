<template>
  <div class="relative">
    <!-- Video Container -->
    <div 
      v-if="!isPlaying" 
      class="aspect-video rounded-2xl overflow-hidden bg-dark-600 flex items-center justify-center cursor-pointer group relative"
      @click="playVideo"
    >
      <!-- Thumbnail with multiple fallbacks -->
      <div class="absolute inset-0">
        <img
          :src="currentThumbnailUrl"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div class="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors duration-300"></div>
      </div>
      
      <!-- Fallback content when image fails -->
      <div v-if="imageError" class="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div class="text-center p-8">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-white mb-2">{{ title }}</h4>
          <p class="text-red-100 text-sm">{{ description }}</p>
        </div>
      </div>
      
      <!-- Play Button -->
      <div class="relative z-10 text-center">
        <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
          <Play class="w-10 h-10 text-white ml-1" fill="currentColor" />
        </div>
        <h4 v-if="!imageError" class="text-xl font-semibold text-white mb-2">{{ title }}</h4>
        <p v-if="!imageError" class="text-silver-400 mb-4">{{ description }}</p>
        <div class="bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
          ▶ Reproducir Video
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="imageLoading" class="absolute top-4 right-4 z-20">
        <div class="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
      </div>
    </div>

    <!-- YouTube Embed -->
    <div v-else class="aspect-video rounded-2xl overflow-hidden">
      <iframe
        :src="embedUrl"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        @load="onVideoLoad"
      ></iframe>
    </div>

    <!-- Close Button (when video is playing) -->
    <button
      v-if="isPlaying"
      @click="closeVideo"
      class="absolute top-4 right-4 z-20 bg-dark-800/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-dark-700 transition-colors"
    >
      <X class="w-5 h-5" />
    </button>

    <!-- Debug info (only in development) -->
    <div v-if="showDebug" class="mt-4 bg-dark-800/50 border border-gold-400/20 rounded-lg p-4 text-xs">
      <p class="text-gold-400 mb-2">🔧 Debug Info:</p>
      <p class="text-silver-400">Video ID: {{ videoId }}</p>
      <p class="text-silver-400">Thumbnail URL: {{ currentThumbnailUrl }}</p>
      <p class="text-silver-400">Fallback Index: {{ fallbackIndex }}</p>
      <p class="text-silver-400">Image Error: {{ imageError ? 'Yes' : 'No' }}</p>
      <p class="text-silver-400">Image Loading: {{ imageLoading ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play, X } from 'lucide-vue-next'

interface Props {
  videoId: string
  title?: string
  description?: string
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Video Promocional',
  description: 'Descubre el poder de la publicidad en Radio Santana',
  autoplay: true
})

const isPlaying = ref(false)
const imageError = ref(false)
const imageLoading = ref(true)
const fallbackIndex = ref(0)
const showDebug = ref(false) // Set to true for debugging

// Multiple thumbnail URL options for better reliability
const thumbnailUrls = computed(() => [
  `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/mqdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/sddefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/default.jpg`
])

const currentThumbnailUrl = computed(() => 
  thumbnailUrls.value[fallbackIndex.value] || thumbnailUrls.value[0]
)

const embedUrl = computed(() => {
  const baseUrl = `https://www.youtube.com/embed/${props.videoId}`
  const params = new URLSearchParams({
    autoplay: props.autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    fs: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
    autohide: '0'
  })
  return `${baseUrl}?${params.toString()}`
})

const handleImageError = () => {
  console.log(`Thumbnail failed for ${currentThumbnailUrl.value}`)
  
  // Try next fallback URL
  if (fallbackIndex.value < thumbnailUrls.value.length - 1) {
    fallbackIndex.value++
    imageLoading.value = true
    console.log(`Trying fallback ${fallbackIndex.value}: ${currentThumbnailUrl.value}`)
  } else {
    // All thumbnails failed, show fallback design
    imageError.value = true
    imageLoading.value = false
    console.log('All thumbnail URLs failed, showing fallback design')
  }
}

const handleImageLoad = () => {
  console.log(`Thumbnail loaded successfully: ${currentThumbnailUrl.value}`)
  imageError.value = false
  imageLoading.value = false
}

const playVideo = () => {
  isPlaying.value = true
}

const closeVideo = () => {
  isPlaying.value = false
}

const onVideoLoad = () => {
  console.log('Video loaded successfully')
}

// Reset state when videoId changes
const resetState = () => {
  imageError.value = false
  imageLoading.value = true
  fallbackIndex.value = 0
  isPlaying.value = false
}

// Watch for videoId changes
import { watch } from 'vue'
watch(() => props.videoId, resetState, { immediate: true })
</script>