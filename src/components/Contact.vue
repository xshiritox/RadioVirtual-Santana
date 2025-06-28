<template>
  <section id="contact" class="py-20 bg-dark-900 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,215,0,0.05),transparent_50%)]"></div>
    <div class="absolute top-20 right-10 w-40 h-40 bg-silver-400/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-20 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-4">
          <Phone class="w-8 h-8 text-gold-400 mr-3" />
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            Contáctanos
          </h2>
        </div>
        <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-silver-400 max-w-2xl mx-auto">
          ¿Tienes alguna pregunta o propuesta? Estamos aquí para escucharte. 
          Contáctanos y hagamos algo increíble juntos.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <!-- Contact Information -->
        <div class="space-y-8">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-8">
            Información de
            <span class="block text-gold-400">Contacto</span>
          </h3>

          <!-- Contact Items -->
          <div class="space-y-6">
            <div
              v-for="(item, index) in contactInfo"
              :key="index"
              class="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-300 group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <component :is="item.icon" class="w-6 h-6 text-dark-900" />
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-white mb-2">{{ item.title }}</h4>
                  <p v-for="(detail, dIndex) in item.details" :key="dIndex" class="text-silver-400 text-sm mb-1">
                    <a 
                      v-if="!item.action.startsWith('#')"
                      :href="item.action" 
                      class="hover:text-gold-400 transition-colors"
                    >
                      {{ detail }}
                    </a>
                    <span v-else>{{ detail }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-dark-800/30 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6">
            <h4 class="text-lg font-semibold text-white mb-4">Síguenos en Redes Sociales</h4>
            <div class="flex space-x-4">
              <a
                v-for="(social, index) in socialLinks"
                :key="index"
                :href="social.url"
                :target="social.target || '_self'"
                :rel="social.rel || ''"
                :class="[
                  'w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center text-silver-400 transition-all duration-300 hover:scale-110',
                  social.color
                ]"
                :title="social.name"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-white mb-6">
            Envíanos un Mensaje
          </h3>

          <form @submit="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-silver-400 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-silver-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-silver-400 mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                v-model="formData.subject"
                required
                class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                placeholder="¿De qué quieres hablarnos?"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-silver-400 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows="5"
                v-model="formData.message"
                required
                class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 resize-none"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-gold text-dark-900 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-glow"
            >
              <Send class="w-5 h-5" />
              <span>Enviar Mensaje</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Phone, Mail, MapPin, Send, Facebook, Instagram, MessageCircle } from 'lucide-vue-next'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  // Aquí se integraría con Firebase o el backend
  console.log('Form submitted:', formData)
  alert('¡Mensaje enviado correctamente! Te contactaremos pronto.')
  Object.assign(formData, { name: '', email: '', subject: '', message: '' })
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Teléfono',
    details: ['+57 310 6035384'],
    action: 'tel:+573106035384'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['radiosantana.nm@gmail.com'],
    action: 'mailto:radiosantana.nm@gmail.com'
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    details: ['Colombia'],
    action: '#'
  },
]

const socialLinks = [
  { 
    icon: Facebook, 
    name: 'Facebook', 
    url: 'https://www.facebook.com/profile.php?id=61577153733772', 
    color: 'hover:text-blue-400',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  { 
    icon: Instagram, 
    name: 'Instagram', 
    url: '#', 
    color: 'hover:text-pink-400',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  { 
    icon: MessageCircle, 
    name: 'WhatsApp', 
    url: 'https://wa.me/573106035384', 
    color: 'hover:text-green-400',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
]
</script>