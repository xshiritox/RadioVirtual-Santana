<template>
  <section class="py-20 bg-dark-800 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,215,0,0.05),transparent_50%)]"></div>
    <div class="absolute top-10 left-10 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-4">
          <Megaphone class="w-8 h-8 text-gold-400 mr-3" />
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            Publicidad Efectiva
          </h2>
        </div>
        <div class="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-silver-400 max-w-2xl mx-auto">
          Haz crecer tu negocio con nuestras soluciones publicitarias personalizadas. 
          Llega a miles de oyentes comprometidos cada día.
        </p>
      </div>

      <!-- Benefits -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 text-center hover:border-gold-400/40 transition-all duration-300 group hover:scale-105"
        >
          <div class="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <component :is="benefit.icon" class="w-8 h-8 text-dark-900" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ benefit.title }}</h3>
          <p class="text-silver-400 text-sm">{{ benefit.description }}</p>
        </div>
      </div>

      <!-- Pricing Packages -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
        <div
          v-for="(pkg, index) in adPackages"
          :key="index"
          :class="[
            'relative flex flex-col h-full bg-dark-700/50 backdrop-blur-sm border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105',
            pkg.highlighted 
              ? 'border-gold-400 ring-2 ring-gold-400/30' 
              : 'border-gold-400/20 hover:border-gold-400/40'
          ]"
        >
          <div v-if="pkg.highlighted" class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full text-sm font-semibold">
            Más Popular
          </div>

          <h3 class="text-2xl font-bold text-white mb-2">{{ pkg.name }}</h3>
          
          <div class="mb-6">
            <span class="text-4xl font-bold text-gold-400">{{ pkg.price }}</span>
            <span class="text-silver-400">{{ pkg.period }}</span>
          </div>

          <ul class="space-y-3 mb-8">
            <li v-for="(feature, fIndex) in pkg.features" :key="fIndex" class="text-silver-300 flex items-start">
              <div class="flex-shrink-0 mt-1.5 mr-2 w-2 h-2 bg-gold-400 rounded-full"></div>
              <span class="leading-snug">{{ feature }}</span>
            </li>
          </ul>

          <div class="mt-auto pt-6">
            <button 
              @click="confirmPurchase(pkg)"
              :class="[
                'w-full py-3 rounded-full font-semibold transition-all duration-300',
                pkg.highlighted
                  ? 'bg-gradient-gold text-dark-900 hover:scale-105'
                  : 'border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900'
              ]"
            >
              Contratar Ahora
            </button>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Listo para Hacer Crecer tu Negocio?
        </h3>
        <p class="text-lg text-silver-400 mb-8 max-w-2xl mx-auto">
          Contacta con nuestro equipo comercial y descubre cómo podemos ayudarte a 
          alcanzar tus objetivos de marketing.
        </p>
        
        <div class="flex justify-center">
          <a 
            href="https://wa.me/+573106035384?text=Hola%20Radio%20Santana,%20me%20gustaría%20solicitar%20una%20cotización%20para%20publicidad." 
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gradient-gold text-dark-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform inline-block"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>
    </div>

    <!-- Diálogo de Confirmación -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-dark-800 rounded-2xl p-6 max-w-md w-full border border-gold-400/30">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-4">¿Estás seguro?</h3>
          <p class="text-silver-400 mb-6">
            Serás redirigido a WhatsApp para continuar con la solicitud del paquete 
            <span class="text-gold-400 font-semibold">{{ selectedPackage?.name }}</span>.
          </p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="showConfirmation = false"
              class="px-6 py-2 border border-silver-400 text-silver-400 rounded-full hover:bg-silver-400/10 transition-colors"
            >
              Cancelar
            </button>
            <button 
              @click="proceedToWhatsApp"
              class="px-6 py-2 bg-gradient-gold text-dark-900 font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Sí, continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Megaphone, TrendingUp, Target, BarChart3 } from 'lucide-vue-next'

interface AdPackage {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

const selectedPackage = ref<AdPackage | null>(null)
const showConfirmation = ref(false)

const confirmPurchase = (pkg: AdPackage) => {
  selectedPackage.value = pkg
  showConfirmation.value = true
}

const proceedToWhatsApp = () => {
  if (selectedPackage.value) {
    const pkg = selectedPackage.value
    const message = `Hola Radio Santana, estoy interesado en contratar el paquete ${pkg.name} (${pkg.price}${pkg.period}). Me gustaría más información.`
    window.open(`https://wa.me/+573106035384?text=${encodeURIComponent(message)}`, '_blank')
    showConfirmation.value = false
  }
}

const adPackages = [
  {
    name: 'Básico',
    price: '$80.000',
    period: 'COP',
    features: [
      'Spots Comercial',
    ],
    highlighted: false
  },
  {
    name: 'Estándar',
    price: '$150.000',
    period: 'COP',
    features: [
      'Spots Comercial',
      'Vídeo Publicitario'
    ],
    highlighted: true
  },
  {
    name: 'Premium',
    price: '500.000',
    period: 'COP',
    features: [
      'Spots Comercial',
      'Vídeo Publicitario',
      'Pauta Radial',
      'Flyer (Colombia)',
    ],
    highlighted: false
  },
  {
    name: 'VIP',
    price: '$1.000.000',
    period: 'COP',
    features: [
      'Spots Comercial',
      'Vídeo Publicitario HD',
      'Pauta Radial Premium',
      'Flyer (Colombia)',
      'Menciones Redes Sociales',
    ],
    highlighted: true
  }
]

const benefits = [
  {
    icon: Target,
    title: 'Audiencia Segmentada',
    description: 'Llega a tu público objetivo específico con precisión.'
  },
  {
    icon: TrendingUp,
    title: 'ROI Comprobado',
    description: 'Aumenta tus ventas con nuestra audiencia comprometida.'
  },
  {
    icon: BarChart3,
    title: 'Métricas Detalladas',
    description: 'Recibe reportes completos del rendimiento de tu campaña.'
  }
]
</script>