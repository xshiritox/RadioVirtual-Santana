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

const thumbnailUrl = computed(() => 
  `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
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

const playVideo = () => {
  isPlaying.value = true
}

const closeVideo = () => {
  isPlaying.value = false
}

const onVideoLoad = () => {
  console.log('Video loaded successfully')
}
</script>