<template>
  <section id="about" class="py-20 bg-dark-900 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_50%)]"></div>
    <div class="absolute top-20 left-10 w-40 h-40 bg-silver-400/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-20 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-4">
          <Heart class="w-8 h-8 text-gold-400 mr-3" />
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            Sobre Nosotros
          </h2>
        </div>
        <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-silver-400 max-w-2xl mx-auto">
          Somos más que una radio, somos una comunidad que conecta corazones a través de la música
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 text-center hover:border-gold-400/40 transition-all duration-300 group hover:scale-105"
        >
          <div class="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <component :is="feature.icon" class="w-8 h-8 text-dark-900" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-silver-400 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart, Radio, Users, Award, Headphones, Mic } from 'lucide-vue-next'

const features = [
  {
    icon: Radio,
    title: 'Transmisión 24/7',
    description: 'Música y programas sin interrupciones, las 24 horas del día.'
  },
  {
    icon: Headphones,
    title: 'Calidad HD',
    description: 'Audio de alta definición para la mejor experiencia sonora.'
  },
  {
    icon: Mic,
    title: 'Locutores Profesionales',
    description: 'Equipo de profesionales apasionados por la radio.'
  },
  {
    icon: Users,
    title: 'Comunidad Activa',
    description: 'Miles de oyentes fieles que nos acompañan cada día.'
  }
]
</script>