<template>
  <section id="noticias" class="py-20 bg-dark-800 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,215,0,0.05),transparent_50%)]"></div>
    <div class="absolute top-10 left-10 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gold-400 mr-3">
            <path d="M4 22h16a2 2 0 0 0 2-2V7.5L17.5 2H6a2 2 0 0 0-2 2v4"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M10 18v-1a2 2 0 1 1 4 0v1"></path>
            <path d="M10 18H7a3 3 0 0 0-3 3v1"></path>
            <path d="M17 18h3a3 3 0 0 0 3-3v-1a2 2 0 1 0-4 0v1"></path>
          </svg>
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            Noticias
          </h2>
        </div>
        <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-silver-400 max-w-2xl mx-auto">
          Mantente informado con las últimas noticias y eventos de Radio Santana
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div v-for="i in 3" :key="i" class="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl overflow-hidden">
          <div class="h-48 bg-dark-600/50 animate-pulse"></div>
          <div class="p-6">
            <div class="h-4 bg-dark-600/50 rounded-full w-3/4 mb-4 animate-pulse"></div>
            <div class="h-6 bg-dark-600/50 rounded-full w-full mb-3 animate-pulse"></div>
            <div class="h-4 bg-dark-600/50 rounded-full w-5/6 mb-2 animate-pulse"></div>
            <div class="h-4 bg-dark-600/50 rounded-full w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && news.length === 0" class="text-center py-16">
        <div class="inline-block p-6 bg-dark-700/50 rounded-2xl border border-gold-400/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 text-gold-400/50 mx-auto mb-4">
            <path d="M4 22h16a2 2 0 0 0 2-2V7.5L17.5 2H6a2 2 0 0 0-2 2v4"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M10 18v-1a2 2 0 1 1 4 0v1"></path>
            <path d="M10 18H7a3 3 0 0 0-3 3v1"></path>
            <path d="M17 18h3a3 3 0 0 0 3-3v-1a2 2 0 1 0-4 0v1"></path>
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No hay noticias disponibles</h3>
          <p class="text-silver-400">Pronto publicaremos nuevas noticias. ¡Vuelve pronto!</p>
        </div>
      </div>

      <!-- News Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- News Card -->
        <div 
          v-for="item in news" 
          :key="item.id"
          class="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl overflow-hidden hover:border-gold-400/40 transition-all duration-300 group hover:-translate-y-1"
        >
          <div class="h-48 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-gold-600/30 to-yellow-500/30"></div>
            <img 
              v-if="item.imageUrl"
              :src="item.imageUrl" 
              :alt="item.title"
              class="w-full h-full object-cover object-center opacity-90"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-gold-900/30 to-yellow-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-gold-700/50">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-silver-400 mb-3">
              <span>{{ formatDate(item.date) }}</span>
              <span class="mx-2">•</span>
              <span>{{ getReadingTime(item.content) }} min lectura</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 line-clamp-2">{{ item.title }}</h3>
            <p class="text-silver-400 mb-4 line-clamp-3">{{ item.description || item.content.substring(0, 150) + '...' }}</p>
            <button 
              @click="openNewsModal(item)" 
              class="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center group"
            >
              Leer más
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Ad Space -->
        <div class="bg-gradient-to-br from-gold-400/5 to-yellow-400/5 backdrop-blur-sm border-2 border-dashed border-gold-400/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-gold-400/60 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-dark-900">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">Espacio Publicitario</h3>
          <p class="text-silver-400 mb-6 max-w-xs mx-auto">Anúnciate con nosotros y llega a miles de oyentes en nuestra región.</p>
          <a href="#publicidad" class="bg-gradient-gold text-dark-900 hover:opacity-90 px-6 py-3 rounded-full font-medium inline-flex items-center transition-all duration-300 hover:scale-105">
            Más información
          </a>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-8">
        <a href="#" class="inline-flex items-center text-gold-400 hover:text-gold-300 font-medium group">
          Ver todas las noticias
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- News Modal -->
  <div v-if="selectedNews" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" @click.self="closeNewsModal">
    <div class="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-dark-800 z-10 p-4 border-b border-gold-400/20 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gold-400">{{ selectedNews.title }}</h3>
        <button @click="closeNewsModal" class="text-silver-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="relative h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
          <img 
            v-if="selectedNews.imageUrl"
            :src="selectedNews.imageUrl" 
            :alt="selectedNews.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-gold-900/30 to-yellow-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 text-gold-700/50">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <span class="inline-block bg-gold-600 text-dark-900 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {{ selectedNews.category || 'General' }}
              </span>
              <p class="text-sm text-white/80">{{ formatDate(selectedNews.date) }}</p>
            </div>
            <span v-if="selectedNews.isFeatured" class="inline-flex items-center bg-gold-600/90 text-dark-900 text-xs font-semibold px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 mr-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Destacado
            </span>
          </div>
        </div>
        
        <div class="prose prose-invert max-w-none">
          <h2 class="text-2xl font-bold text-white mb-4">{{ selectedNews.title }}</h2>
          <div class="text-silver-300 space-y-4" v-html="formatContent(selectedNews.content)"></div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gold-400/20">
          <p class="text-sm text-silver-400">Publicado el {{ formatFullDate(selectedNews.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNews, type NewsItem } from '../composables/useNews'

const { news, loading, error } = useNews()
const selectedNews = ref<NewsItem | null>(null)

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const formatFullDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const getReadingTime = (content: string) => {
  if (!content) return 2
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute) || 1
}

const formatContent = (content: string) => {
  if (!content) return ''
  // Convertir saltos de línea a párrafos
  return content.split('\n\n').map(paragraph => 
    `<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`
  ).join('')
}

const openNewsModal = (newsItem: NewsItem) => {
  selectedNews.value = newsItem
  // Bloquear el scroll del body cuando el modal está abierto
  document.body.style.overflow = 'hidden'
}

const closeNewsModal = () => {
  selectedNews.value = null
  // Restaurar el scroll del body
  document.body.style.overflow = ''
}

// Cerrar modal con la tecla Escape
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedNews.value) {
    closeNewsModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  // Asegurarse de restaurar el scroll al desmontar el componente
  document.body.style.overflow = ''
})
</script>
