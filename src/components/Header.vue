<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-gold-400/20">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="relative">
            <Radio class="w-8 h-8 text-gold-400 animate-pulse-gold" />
            <div class="absolute inset-0 bg-gold-400/20 rounded-full animate-ping"></div>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Radio Santana
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            class="flex items-center space-x-2 text-silver-400 hover:text-gold-400 transition-colors duration-300 group"
          >
            <component :is="item.icon" class="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{{ item.label }}</span>
          </a>
          
          <div v-if="user" class="flex items-center space-x-4">
            <button
              @click="emit('admin-click')"
              class="flex items-center space-x-2 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full hover:scale-105 transition-transform font-medium"
            >
              <Settings class="w-4 h-4" />
              <span>Admin</span>
            </button>
            <button
              @click="logout"
              class="text-silver-400 hover:text-gold-400 transition-colors"
            >
              Salir
            </button>
          </div>
          <button
            v-else
            @click="emit('admin-click')"
            class="text-silver-400 hover:text-gold-400 transition-colors duration-300"
          >
            Admin
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden text-gold-400 hover:text-gold-500 transition-colors"
        >
          <X v-if="isMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav v-if="isMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gold-400/20 pt-4">
        <div class="flex flex-col space-y-4">
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            class="flex items-center space-x-3 text-silver-400 hover:text-gold-400 transition-colors duration-300 py-2"
            @click="closeMenu"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </a>
          
          <div v-if="user" class="flex flex-col space-y-3 pt-4 border-t border-gold-400/20">
            <button
              @click="handleAdminClick"
              class="flex items-center space-x-3 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full font-medium"
            >
              <Settings class="w-4 h-4" />
              <span>Panel Admin</span>
            </button>
            <button
              @click="logout"
              class="text-left text-silver-400 hover:text-gold-400 transition-colors py-2"
            >
              Cerrar Sesión
            </button>
          </div>
          <button
            v-else
            @click="handleAdminClick"
            class="text-left text-silver-400 hover:text-gold-400 transition-colors py-2"
          >
            Acceso Admin
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio, Menu, X, Users, Calendar, Phone, Settings, Newspaper } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth'

const emit = defineEmits<{
  'admin-click': []
}>()

const { user, logout } = useAuth()
const isMenuOpen = ref(false)

const navItems = [
  { label: 'Inicio', href: '#home', icon: Radio },
  { label: 'Noticias', href: '#noticias', icon: Newspaper },
  { label: 'Programas', href: '#programs', icon: Calendar },
  { label: 'Nosotros', href: '#about', icon: Users },
  { label: 'Contacto', href: '#contact', icon: Phone },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleAdminClick = () => {
  closeMenu()
  emit('admin-click')
}
</script>