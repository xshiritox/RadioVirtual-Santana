<template>
  <div class="relative">
    <!-- Fallback: Direct Link to YouTube -->
    <div class="aspect-video rounded-2xl overflow-hidden bg-dark-600 flex items-center justify-center cursor-pointer group">
      <!-- Thumbnail -->
      <div class="absolute inset-0">
        <img
          :src="thumbnailUrl"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @error="onThumbnailError"
        />
        <div class="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors duration-300"></div>
      </div>
      
      <!-- Play Button - Opens YouTube directly -->
      <div class="relative z-10 text-center" @click="openInYouTube">
        <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
          <Play class="w-10 h-10 text-white ml-1" fill="currentColor" />
        </div>
        <h4 class="text-xl font-semibold text-white mb-2">{{ title }}</h4>
        <p class="text-silver-400 mb-4">{{ description }}</p>
        <div class="bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
          <ExternalLink class="w-4 h-4" />
          <span>Ver en YouTube</span>
        </div>
      </div>
    </div>

    <!-- Alternative: Show video info -->
    <div class="mt-4 bg-dark-700/50 border border-gold-400/20 rounded-lg p-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
          <Play class="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <div class="flex-1">
          <h5 class="text-white font-medium">{{ title }}</h5>
          <p class="text-silver-400 text-sm">{{ description }}</p>
        </div>
        <button
          @click="openInYouTube"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center space-x-2"
        >
          <ExternalLink class="w-4 h-4" />
          <span>Ver Video</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const thumbnailUrl = computed(() => {
  return `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
})

const onThumbnailError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Fallback to lower quality thumbnail
  if (img.src.includes('maxresdefault')) {
    img.src = `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
  } else if (img.src.includes('hqdefault')) {
    img.src = `https://img.youtube.com/vi/${props.videoId}/mqdefault.jpg`
  } else {
    // Use a placeholder image
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjEyNTI5Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmlkZW8gUHJvbW9jaW9uYWw8L3RleHQ+Cjwvc3ZnPg=='
  }
}

const openInYouTube = () => {
  // Open YouTube in a new tab with proper security attributes
  const youtubeUrl = `https://www.youtube.com/watch?v=${props.videoId}`
  window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
}
</script>