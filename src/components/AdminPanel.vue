<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
    <div class="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gold-400/20">
        <h2 class="text-2xl font-bold text-gold-400">Panel de Administración</h2>
        <button
          @click="$emit('close')"
          class="text-silver-400 hover:text-gold-400 transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
        <!-- Login Form -->
        <div v-if="!user" class="max-w-md mx-auto">
          <h3 class="text-xl font-semibold text-white mb-6 text-center">
            Iniciar Sesión
          </h3>
          
          <form @submit="handleLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-silver-400 mb-2">
                Email
              </label>
              <input
                type="email"
                v-model="loginData.email"
                class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                placeholder="admin@radiosantana.com"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-silver-400 mb-2">
                Contraseña
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="loginData.password"
                  class="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-400 hover:text-gold-400 transition-colors"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              class="w-full bg-gradient-gold text-dark-900 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              Iniciar Sesión
            </button>
          </form>

          <div class="mt-6 p-4 bg-dark-700/50 rounded-lg border border-gold-400/20">
            <p class="text-silver-400 text-sm text-center">
              <strong>Credenciales de Demo:</strong><br />
              Email: admin@radiosantana.com<br />
              Contraseña: admin123
            </p>
          </div>
        </div>

        <!-- Admin Dashboard -->
        <div v-else>
          <!-- User Info & Logout -->
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-gold-400/20">
            <div>
              <h3 class="text-lg font-semibold text-white">
                Bienvenido, {{ user.email }}
              </h3>
              <p class="text-silver-400 text-sm">Panel de administración de Radio Santana</p>
            </div>
            <button
              @click="logout"
              class="bg-dark-700 border border-gold-400/30 text-gold-400 px-4 py-2 rounded-lg hover:bg-gold-400 hover:text-dark-900 transition-all duration-300"
            >
              Cerrar Sesión
            </button>
          </div>

          <!-- Tabs -->
          <div class="flex space-x-4 mb-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-gradient-gold text-dark-900'
                  : 'bg-dark-700 text-silver-400 hover:text-gold-400'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Programs Tab -->
          <div v-if="activeTab === 'programs'" class="space-y-6">
            <!-- Add New Program -->
            <div class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
                <Plus class="w-5 h-5 mr-2" />
                Agregar Nuevo Programa
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Título del programa"
                  v-model="newProgram.title"
                  class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Presentador"
                  v-model="newProgram.host"
                  class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Horario (ej: 14:00 - 18:00)"
                  v-model="newProgram.time"
                  class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                />
                <input
                  type="url"
                  placeholder="URL de imagen"
                  v-model="newProgram.image"
                  class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                />
              </div>
              
              <textarea
                placeholder="Descripción del programa"
                v-model="newProgram.description"
                class="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm mb-4"
                rows="3"
              />
              
              <button
                @click="handleAddProgram"
                class="bg-gradient-gold text-dark-900 px-4 py-2 rounded font-medium hover:scale-105 transition-transform"
              >
                Agregar Programa
              </button>
            </div>

            <!-- Programs List -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-white">Programas Existentes</h4>
              <div v-for="program in programs" :key="program.id" class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-4">
                <div v-if="editingProgram?.id === program.id" class="space-y-3">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      v-model="editingProgram.title"
                      class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                    />
                    <input
                      type="text"
                      v-model="editingProgram.host"
                      class="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                    />
                  </div>
                  <textarea
                    v-model="editingProgram.description"
                    class="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                    rows="2"
                  />
                  <div class="flex space-x-2">
                    <button
                      @click="handleSaveProgram"
                      class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform flex items-center space-x-1"
                    >
                      <Save class="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      @click="editingProgram = null"
                      class="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                <div v-else class="flex items-center justify-between">
                  <div>
                    <h5 class="font-semibold text-white">{{ program.title }}</h5>
                    <p class="text-silver-400 text-sm">{{ program.host }} - {{ program.time }}</p>
                    <p class="text-silver-300 text-sm mt-1">{{ program.description }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="editingProgram = { ...program }"
                      class="bg-blue-600 text-white p-2 rounded hover:scale-105 transition-transform"
                    >
                      <Edit3 class="w-4 h-4" />
                    </button>
                    <button
                      @click="handleDeleteProgram(program.id)"
                      class="bg-red-600 text-white p-2 rounded hover:scale-105 transition-transform"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-white mb-6 flex items-center">
              <Settings class="w-5 h-5 mr-2" />
              Configuración General
            </h4>
            
            <div class="space-y-6">
              <!-- Stream URL -->
              <div>
                <label class="block text-sm font-medium text-silver-400 mb-2">
                  URL del Stream de Radio
                </label>
                <input
                  type="url"
                  v-model="settingsForm.streamUrl"
                  placeholder="https://stream.zeno.fm/your-stream"
                  class="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                />
                <p class="text-silver-500 text-xs mt-1">URL del stream de audio de la radio</p>
              </div>

              <!-- YouTube Video ID -->
              <div>
                <label class="block text-sm font-medium text-silver-400 mb-2">
                  ID del Video Promocional de YouTube
                </label>
                <div class="space-y-2">
                  <input
                    type="text"
                    v-model="settingsForm.youtubeVideoId"
                    placeholder="dQw4w9WgXcQ"
                    class="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  />
                  <p class="text-silver-500 text-xs">
                    Ingresa solo el ID del video. Por ejemplo, si tu video está en 
                    <code class="bg-dark-600 px-1 rounded text-gold-400">https://www.youtube.com/watch?v=ABC123XYZ</code>, 
                    usa solo <code class="bg-dark-600 px-1 rounded text-gold-400">ABC123XYZ</code>
                  </p>
                  
                  <!-- Video Preview -->
                  <div v-if="settingsForm.youtubeVideoId" class="mt-4">
                    <p class="text-sm text-silver-400 mb-2">Vista previa:</p>
                    <div class="aspect-video max-w-md rounded-lg overflow-hidden bg-dark-600">
                      <img
                        :src="`https://img.youtube.com/vi/${settingsForm.youtubeVideoId}/maxresdefault.jpg`"
                        :alt="'Preview del video ' + settingsForm.youtubeVideoId"
                        class="w-full h-full object-cover"
                        @error="onImageError"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="flex items-center space-x-4 pt-4 border-t border-gold-400/20">
                <button 
                  @click="handleSaveSettings"
                  :disabled="settingsLoading"
                  class="bg-gradient-gold text-dark-900 px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Save class="w-4 h-4" />
                  <span>{{ settingsLoading ? 'Guardando...' : 'Guardar Configuración' }}</span>
                </button>
                
                <div v-if="settingsSaved" class="flex items-center space-x-2 text-green-400">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-sm">Configuración guardada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useSettings } from '../composables/useSettings'
import { X, Edit3, Save, Plus, Trash2, Eye, EyeOff, Settings } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
}>()

const { user, login, logout } = useAuth()
const { data: programs, updateDocument, addDocument, deleteDocument } = useFirestore('programs')
const { settings, updateSettings } = useSettings()

const loginData = reactive({ email: '', password: '' })
const showPassword = ref(false)
const editingProgram = ref<any>(null)
const newProgram = reactive({
  title: '',
  host: '',
  time: '',
  description: '',
  days: [],
  image: '',
  featured: false
})
const activeTab = ref('programs')
const settingsLoading = ref(false)
const settingsSaved = ref(false)

// Settings form
const settingsForm = reactive({
  streamUrl: '',
  youtubeVideoId: ''
})

// Watch settings changes and update form
watch(settings, (newSettings) => {
  settingsForm.streamUrl = newSettings.streamUrl
  settingsForm.youtubeVideoId = newSettings.youtubeVideoId
}, { immediate: true })

const tabs = [
  { id: 'programs', label: 'Programas' },
  { id: 'settings', label: 'Configuración' }
]

const handleLogin = async (e: Event) => {
  e.preventDefault()
  try {
    await login(loginData.email, loginData.password)
  } catch (error) {
    alert('Error al iniciar sesión. Verifica tus credenciales.')
  }
}

const handleSaveProgram = async () => {
  if (editingProgram.value) {
    await updateDocument(editingProgram.value.id, editingProgram.value)
    editingProgram.value = null
  }
}

const handleAddProgram = async () => {
  if (newProgram.title && newProgram.host) {
    await addDocument(newProgram)
    Object.assign(newProgram, {
      title: '',
      host: '',
      time: '',
      description: '',
      days: [],
      image: '',
      featured: false
    })
  }
}

const handleDeleteProgram = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este programa?')) {
    await deleteDocument(id)
  }
}

const handleSaveSettings = async () => {
  settingsLoading.value = true
  settingsSaved.value = false
  
  try {
    const success = await updateSettings({
      streamUrl: settingsForm.streamUrl,
      youtubeVideoId: settingsForm.youtubeVideoId
    })
    
    if (success) {
      settingsSaved.value = true
      setTimeout(() => {
        settingsSaved.value = false
      }, 3000)
    } else {
      alert('Error al guardar la configuración')
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error al guardar la configuración')
  } finally {
    settingsLoading.value = false
  }
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjEyNTI5Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IiM2Qzc1N0QiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmlkZW8gbm8gZW5jb250cmFkbzwvdGV4dD4KPC9zdmc+'
}
</script>