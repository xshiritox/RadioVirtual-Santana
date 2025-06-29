<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
    <div class="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gold-400/20">
        <div class="flex items-center space-x-3">
          <h2 class="text-2xl font-bold text-gold-400">Panel de Administración</h2>
          <!-- Real-time Status -->
          <div class="flex items-center space-x-2 bg-green-900/30 border border-green-500/30 rounded-full px-3 py-1">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-400 text-sm font-medium">Tiempo Real</span>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="text-silver-400 hover:text-gold-400 transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
        <!-- Rest of template content -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useSettings } from '../composables/useSettings'
import { useNewsletter } from '../composables/useNewsletter'
import { 
  X, Edit3, Save, Plus, Trash2, Eye, EyeOff, Settings, Calendar, 
  Mail, Download, UserX, UserCheck
} from 'lucide-vue-next'

// Rest of script content
</script>