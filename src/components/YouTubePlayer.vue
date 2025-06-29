<template>
  <div class="relative">
    <!-- Video Thumbnail Container -->
    <div class="aspect-video rounded-2xl overflow-hidden bg-dark-600 flex items-center justify-center cursor-pointer group relative">
      <!-- Thumbnail Image with Multiple Fallbacks -->
      <img
        :src="currentThumbnailUrl"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleThumbnailError"
        @load="onThumbnailLoad"
        loading="lazy"
      />
      
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors duration-300"></div>
      
      <!-- Play Button Overlay -->
      <div class="absolute inset-0 flex items-center justify-center z-10" @click="openInYouTube">
        <div class="text-center">
          <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
            <Play class="w-10 h-10 text-white ml-1" fill="currentColor" />
          </div>
          <h4 class="text-xl font-semibold text-white mb-2">{{ title }}</h4>
          <p class="text-silver-400 mb-4 max-w-md">{{ description }}</p>
          <div class="bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center space-x-2">
            <ExternalLink class="w-4 h-4" />
            <span>Ver en YouTube</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 bg-dark-600 flex items-center justify-center">
        <div class="text-center">
          <div class="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p class="text-silver-400 text-sm">Cargando miniatura...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="hasError && !isLoading" class="absolute inset-0 bg-dark-600 flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play class="w-8 h-8 text-red-400" />
          </div>
          <h4 class="text-white font-medium mb-2">{{ title }}</h4>
          <p class="text-silver-400 text-sm mb-4">{{ description }}</p>
          <button
            @click="openInYouTube"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm inline-flex items-center space-x-2"
          >
            <ExternalLink class="w-4 h-4" />
            <span>Ver en YouTube</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Video Info Card -->
    <div class="mt-4 bg-dark-700/50 border border-gold-400/20 rounded-lg p-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Play class="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="text-white font-medium truncate">{{ title }}</h5>
          <p class="text-silver-400 text-sm line-clamp-2">{{ description }}</p>
          <p class="text-gold-400 text-xs mt-1">ID: {{ videoId }}</p>
        </div>
        <button
          @click="openInYouTube"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center space-x-2 flex-shrink-0"
        >
          <ExternalLink class="w-4 h-4" />
          <span>Ver Video</span>
        </button>
      </div>
    </div>

    <!-- Debug Info (only in development) -->
    <div v-if="isDev" class="mt-2 bg-dark-800/50 border border-gold-400/10 rounded p-2 text-xs">
      <p class="text-silver-500">Debug Info:</p>
      <p class="text-silver-400">Video ID: {{ videoId }}</p>
      <p class="text-silver-400">Current URL: {{ currentThumbnailUrl }}</p>
      <p class="text-silver-400">Attempt: {{ thumbnailAttempt }}/{{ thumbnailUrls.length }}</p>
      <p class="text-silver-400">Loading: {{ isLoading }}</p>
      <p class="text-silver-400">Error: {{ hasError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Play, ExternalLink } from 'lucide-vue-next'

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

const isLoading = ref(true)
const hasError = ref(false)
const thumbnailAttempt = ref(0)
const isDev = ref(import.meta.env.DEV)

// Multiple thumbnail URLs with different qualities as fallbacks
const thumbnailUrls = computed(() => [
  `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/mqdefault.jpg`,
  `https://img.youtube.com/vi/${props.videoId}/default.jpg`,
  // Fallback placeholder
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjMjEyNTI5Ii8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiNGRjAwMDAiLz4KPHN2ZyB4PSIzMTAiIHk9IjE3MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHA+PHBhdGggZD0ibTcgNCA5IDUuNS05IDUuNXoiLz48L3N2Zz4KPHR4dCB4PSIzMjAiIHk9IjI0MCIgZmlsbD0iIzZDNzU3RCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WaWRlbyBQcm9tb2Npb25hbDwvdGV4dD4KPC9zdmc+'
])

const currentThumbnailUrl = computed(() => {
  return thumbnailUrls.value[thumbnailAttempt.value] || thumbnailUrls.value[thumbnailUrls.value.length - 1]
})

const handleThumbnailError = () => {
  console.log(`Thumbnail failed to load: ${currentThumbnailUrl.value}`)
  
  if (thumbnailAttempt.value < thumbnailUrls.value.length - 1) {
    thumbnailAttempt.value++
    console.log(`Trying fallback thumbnail: ${currentThumbnailUrl.value}`)
  } else {
    hasError.value = true
    isLoading.value = false
    console.log('All thumbnail attempts failed')
  }
}

const onThumbnailLoad = () => {
  console.log(`Thumbnail loaded successfully: ${currentThumbnailUrl.value}`)
  isLoading.value = false
  hasError.value = false
}

const openInYouTube = () => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${props.videoId}`
  console.log(`Opening YouTube video: ${youtubeUrl}`)
  window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
}

// Reset state when videoId changes
watch(() => props.videoId, () => {
  isLoading.value = true
  hasError.value = false
  thumbnailAttempt.value = 0
  console.log(`Video ID changed to: ${props.videoId}`)
}, { immediate: true })
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>