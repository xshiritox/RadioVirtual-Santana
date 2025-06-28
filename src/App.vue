<template>
  <div class="min-h-screen bg-dark-900 text-white font-inter">
    <SEO />
    <Header @admin-click="openAdmin" />
    <main>
      <Hero />
      <Programs />
      <About />
      <Advertising />
      <Contact />
    </main>
    <Footer />
    <RadioPlayer />
    <AdminPanel 
      :is-open="isAdminOpen" 
      @close="closeAdmin" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SEO from './components/SEO.vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Programs from './components/Programs.vue'
import About from './components/About.vue'
import Advertising from './components/Advertising.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import RadioPlayer from './components/RadioPlayer.vue'
import AdminPanel from './components/AdminPanel.vue'

const isAdminOpen = ref(false)

const openAdmin = () => {
  isAdminOpen.value = true
}

const closeAdmin = () => {
  isAdminOpen.value = false
}
</script>