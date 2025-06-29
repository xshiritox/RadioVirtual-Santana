<template>
  <div class="relative">
    <!-- Video Container -->
    <div 
      v-if="!isPlaying" 
      class="aspect-video rounded-2xl overflow-hidden bg-dark-600 flex items-center justify-center cursor-pointer group"
      @click="playVideo"
    >
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
      
      <!-- Play Button -->
      <div class="relative z-10 text-center">
        <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
          <Play class="w-10 h-10 text-white ml-1" fill="currentColor" />
        </div>
        <h4 class="text-xl font-semibold text-white mb-2">{{ title }}</h4>
        <p class="text-silver-400 mb-4">{{ description }}</p>
        <div class="bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
          ▶ Reproducir Video
        </div>
      </div>
    </div>

    <!-- YouTube Embed with improved parameters -->
    <div v-else class="aspect-video rounded-2xl overflow-hidden">
      <iframe
        :src="embedUrl"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        @load="onVideoLoad"
        @error="onVideoError"
      ></iframe>
    </div>

    <!-- Error State -->
    <div v-if="hasError" class="aspect-video rounded-2xl bg-dark-600 flex items-center justify-center">
      <div class="text-center p-8">
        <div class="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-red-400" />
        </div>
        <h4 class="text-lg font-semibold text-white mb-2">Video no disponible</h4>
        <p class="text-silver-400 text-sm mb-4">
          El video no se puede reproducir debido a restricciones de YouTube
        </p>
        <button
          @click="openInYouTube"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Ver en YouTube
        </button>
      </div>
    </div>

    <!-- Close Button (when video is playing) -->
    <button
      v-if="isPlaying && !hasError"
      @click="closeVideo"
      class="absolute top-4 right-4 z-20 bg-dark-800/80 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-dark-700 transition-colors"
    >
      <X class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play, X, AlertCircle } from 'lucide-vue-next'

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
const hasError = ref(false)

const thumbnailUrl = computed(() => {
  // Try multiple thumbnail qualities
  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default']
  return `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
})

const embedUrl = computed(() => {
  const baseUrl = `https://www.youtube-nocookie.com/embed/${props.videoId}`
  const params = new URLSearchParams({
    autoplay: props.autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    fs: '1',
    cc_load_policy: '0',
    iv_load_policy: '3',
    autohide: '0',
    origin: window.location.origin,
    enablejsapi: '1',
    playsinline: '1'
  })
  return `${baseUrl}?${params.toString()}`
})

const playVideo = () => {
  isPlaying.value = true
  hasError.value = false
}

const closeVideo = () => {
  isPlaying.value = false
  hasError.value = false
}

const onVideoLoad = () => {
  console.log('Video loaded successfully')
  hasError.value = false
}

const onVideoError = () => {
  console.error('Error loading YouTube video')
  hasError.value = true
}

const onThumbnailError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Fallback to lower quality thumbnail
  if (img.src.includes('maxresdefault')) {
    img.src = `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
  } else if (img.src.includes('hqdefault')) {
    img.src = `https://img.youtube.com/vi/${props.videoId}/mqdefault.jpg`
  } else {
    // Use a placeholder image
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjEyNTI5Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmlkZW8gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+'
  }
}

const openInYouTube = () => {
  window.open(`https://www.youtube.com/watch?v=${props.videoId}`, '_blank', 'noopener,noreferrer')
}
</script>