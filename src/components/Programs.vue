<template>
  <section id="programs" class="py-20 bg-dark-800 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.05),transparent_50%)]"></div>
    <div class="absolute top-10 right-10 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-40 h-40 bg-silver-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-4">
          <Calendar class="w-8 h-8 text-gold-400 mr-3" />
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            Nuestra Programación
          </h2>
        </div>
        <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-silver-400 max-w-2xl mx-auto">
          Descubre nuestros programas especializados, diseñados para acompañarte en cada momento del día
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center space-x-2 text-gold-400">
          <div class="w-4 h-4 bg-gold-400 rounded-full animate-pulse"></div>
          <span>Cargando programación...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-400 mb-4">Error al cargar la programación</p>
          <button 
            @click="refetch"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>

      <!-- Programs Grid -->
      <div v-else-if="programs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(program, index) in programs"
          :key="program.id"
          :class="[
            'group relative bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl overflow-hidden hover:border-gold-400/40 transition-all duration-500 hover:scale-105',
            program.featured ? 'ring-2 ring-gold-400/30' : ''
          ]"
        >
          <!-- Featured Badge -->
          <div v-if="program.featured" class="absolute top-4 right-4 z-20 bg-gradient-gold text-dark-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Star class="w-3 h-3" />
            <span>Destacado</span>
          </div>

          <!-- Program Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="program.image || 'https://images.pexels.com/photos/3714513/pexels-photo-3714513.jpeg?auto=compress&cs=tinysrgb&w=800'"
              :alt="program.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              @error="onImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
            
            <!-- Live Badge -->
            <div class="absolute bottom-4 left-4 flex items-center space-x-2">
              <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span class="text-white text-sm font-medium">EN VIVO</span>
            </div>

            <!-- Real-time Update Indicator -->
            <div v-if="isRecentlyUpdated(program)" class="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Actualizado</span>
            </div>
          </div>

          <!-- Program Info -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
              {{ program.title }}
            </h3>
            
            <div class="flex items-center space-x-4 mb-3 text-silver-400 text-sm">
              <div class="flex items-center space-x-1">
                <Mic class="w-4 h-4" />
                <span>{{ program.host }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Clock class="w-4 h-4" />
                <span>{{ program.time }}</span>
              </div>
            </div>

            <p class="text-silver-300 mb-4 text-sm leading-relaxed">
              {{ program.description }}
            </p>

            <!-- Days -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="day in (program.days || [])"
                :key="day"
                class="bg-gold-400/20 text-gold-400 px-2 py-1 rounded-lg text-xs font-medium"
              >
                {{ day }}
              </span>
            </div>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-gold-400/0 to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="bg-dark-700/50 border border-gold-400/20 rounded-2xl p-8 max-w-md mx-auto">
          <Calendar class="w-16 h-16 text-gold-400 mx-auto mb-4 opacity-50" />
          <h3 class="text-xl font-semibold text-white mb-2">No hay programas disponibles</h3>
          <p class="text-silver-400 text-sm">Los programas aparecerán aquí una vez que sean agregados desde el panel de administración.</p>
        </div>
      </div>

      <!-- View All Button -->
      <div v-if="programs.length > 0" class="text-center mt-12">
        <button class="bg-dark-700 border border-gold-400/30 text-gold-400 px-8 py-3 rounded-full hover:bg-gold-400 hover:text-dark-900 transition-all duration-300 font-medium">
          Ver Programación Completa
        </button>
      </div>

      <!-- Real-time Status Indicator -->
      <div class="fixed bottom-20 left-6 z-40 bg-dark-800/90 backdrop-blur-md border border-gold-400/30 rounded-full px-4 py-2 flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span class="text-green-400 text-sm font-medium">Tiempo Real</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Mic, Calendar, Star } from 'lucide-vue-next'
import { useFirestore } from '../composables/useFirestore'

const { data: programs, loading, error, refetch } = useFirestore('programs')

// Check if a program was recently updated (within last 5 minutes)
const isRecentlyUpdated = (program: any) => {
  if (!program.updatedAt) return false
  
  const updatedAt = program.updatedAt.toDate ? program.updatedAt.toDate() : new Date(program.updatedAt)
  const now = new Date()
  const diffInMinutes = (now.getTime() - updatedAt.getTime()) / (1000 * 60)
  
  return diffInMinutes < 5
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://images.pexels.com/photos/3714513/pexels-photo-3714513.jpeg?auto=compress&cs=tinysrgb&w=800'
}
</script>