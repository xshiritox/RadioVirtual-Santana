<template>
  <footer class="bg-dark-900 border-t border-gold-400/20 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,215,0,0.03),transparent_50%)]"></div>
    <div class="absolute top-0 right-0 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 py-16 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="relative">
              <Radio class="w-8 h-8 text-gold-400 animate-pulse-gold" />
              <div class="absolute inset-0 bg-gold-400/20 rounded-full animate-ping"></div>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              Radio Santana
            </h3>
          </div>
          <p class="text-silver-400 mb-6 leading-relaxed">
            Tu radio virtual que conecta corazones a través de la música. 
            Acompañándote las 24 horas del día con la mejor programación.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in quickLinks" :key="index">
              <a 
                :href="link.href"
                class="text-silver-400 hover:text-gold-400 transition-colors duration-300 flex items-center space-x-2 group"
              >
                <div class="w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span>{{ link.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">Contacto</h4>
          <ul class="space-y-4">
            <li v-for="(contact, index) in contactInfo" :key="index" class="flex items-center space-x-3">
              <component :is="contact.icon" class="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a 
                v-if="contact.isLink"
                :href="contact.href"
                class="text-silver-400 text-sm hover:text-gold-400 transition-colors"
              >
                {{ contact.text }}
              </a>
              <span v-else class="text-silver-400 text-sm">{{ contact.text }}</span>
            </li>
          </ul>
          
          <div class="mt-6 p-4 bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-lg">
            <p class="text-silver-400 text-sm mb-2">🟢 EN VIVO</p>
            <p class="text-white font-medium text-sm">Transmitiendo 24/7</p>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">Newsletter</h4>
          <p class="text-silver-400 text-sm mb-4">
            Suscríbete para recibir las últimas noticias y programación especial.
          </p>
          
          <form @submit="handleNewsletterSubmit" class="space-y-3">
            <input
              type="email"
              v-model="newsletterEmail"
              placeholder="Tu email"
              :disabled="newsletterLoading"
              class="w-full px-3 py-2 bg-dark-800 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 text-sm disabled:opacity-50"
              required
            />
            <button
              type="submit"
              :disabled="newsletterLoading || !newsletterEmail.trim()"
              class="w-full bg-gradient-gold text-dark-900 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              <Mail v-if="!newsletterLoading" class="w-4 h-4" />
              <div v-else class="w-4 h-4 bg-dark-900 rounded-full animate-pulse"></div>
              <span>{{ newsletterLoading ? 'Suscribiendo...' : 'Suscribirse' }}</span>
            </button>
          </form>

          <!-- Success/Error Messages -->
          <div v-if="newsletterMessage" class="mt-3 p-3 rounded-lg text-sm" :class="[
            newsletterSuccess 
              ? 'bg-green-900/30 border border-green-500/30 text-green-400' 
              : 'bg-red-900/30 border border-red-500/30 text-red-400'
          ]">
            <div class="flex items-center space-x-2">
              <CheckCircle v-if="newsletterSuccess" class="w-4 h-4 flex-shrink-0" />
              <AlertCircle v-else class="w-4 h-4 flex-shrink-0" />
              <span>{{ newsletterMessage }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gold-400/20 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <div class="flex items-center space-x-2 text-silver-400 text-sm">
            <span>© {{ currentYear }} Radio Santana. Todos los derechos reservados.</span>
          </div>

          <!-- Made with Love -->
          <div class="flex items-center space-x-2 text-silver-400 text-sm">
            <span>Hecho con</span>
            <Heart class="w-4 h-4 text-red-400 animate-pulse" />
            <span>para nuestros oyentes</span>
          </div>

          <!-- Legal Links -->
          <div class="flex space-x-6 text-silver-400 text-sm">
            <a href="#" class="hover:text-gold-400 transition-colors">Política de Privacidad</a>
            <a href="#" class="hover:text-gold-400 transition-colors">Términos de Uso</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Radio, Heart, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { useNewsletter } from '../composables/useNewsletter'

const { subscribe } = useNewsletter()

const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const newsletterMessage = ref('')
const newsletterSuccess = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const handleNewsletterSubmit = async (e: Event) => {
  e.preventDefault()
  
  if (!newsletterEmail.value.trim()) return
  
  newsletterLoading.value = true
  newsletterMessage.value = ''
  
  try {
    const result = await subscribe(newsletterEmail.value.trim(), 'footer')
    
    newsletterSuccess.value = result.success
    newsletterMessage.value = result.message
    
    if (result.success) {
      newsletterEmail.value = ''
    }
  } catch (error) {
    newsletterSuccess.value = false
    newsletterMessage.value = 'Error al procesar la suscripción. Inténtalo de nuevo.'
  } finally {
    newsletterLoading.value = false
    
    // Clear message after 5 seconds
    setTimeout(() => {
      newsletterMessage.value = ''
    }, 5000)
  }
}

const quickLinks = [
  { label: 'Inicio', href: '#home' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Programas', href: '#programs' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Publicidad', href: '#advertising' },
  { label: 'Contacto', href: '#contact' }
]

const contactInfo = [
  { 
    icon: Phone, 
    text: '+57 310 6035384',
    href: 'tel:+573106035384',
    isLink: true
  },
  { 
    icon: Mail, 
    text: 'radiosantana.nm@gmail.com',
    href: 'mailto:radiosantana.nm@gmail.com',
    isLink: true
  },
  { 
    icon: MapPin, 
    text: 'Colombia',
    isLink: false
  }
]
</script>