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
        <!-- Login Form (when not authenticated) -->
        <div v-if="!user" class="max-w-md mx-auto">
          <div class="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-8">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings class="w-8 h-8 text-dark-900" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Acceso Administrativo</h3>
              <p class="text-silver-400">Ingresa tus credenciales para continuar</p>
            </div>

            <form @submit="handleLogin" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-silver-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  v-model="loginForm.email"
                  :disabled="loginLoading"
                  class="w-full px-4 py-3 bg-dark-800 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="Usuario/Correo"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-silver-300 mb-2">
                  Contraseña
                </label>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="loginForm.password"
                    :disabled="loginLoading"
                    class="w-full px-4 py-3 bg-dark-800 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 disabled:opacity-50 pr-12"
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

              <!-- Error Message -->
              <div v-if="loginError" class="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2">
                  <AlertCircle class="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span class="text-red-400 text-sm">{{ loginError }}</span>
                </div>
              </div>

              <button
                type="submit"
                :disabled="loginLoading || !loginForm.email || !loginForm.password"
                class="w-full bg-gradient-gold text-dark-900 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                <div v-if="loginLoading" class="w-5 h-5 bg-dark-900 rounded-full animate-pulse"></div>
                <LogIn v-else class="w-5 h-5" />
                <span>{{ loginLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
              </button>
            </form>

            <!-- Demo Credentials -->
            <div class="mt-6 p-4 bg-dark-800/50 border border-gold-400/20 rounded-lg">
              <p class="text-silver-400 text-sm mb-2">
                <strong class="text-gold-400">Solo para administradores !</strong>
              </p>
             
            </div>
          </div>
        </div>

        <!-- Admin Dashboard (when authenticated) -->
        <div v-else class="space-y-8">
          <!-- Welcome Section -->
          <div class="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-white mb-2">
                  Bienvenido, {{ user.email }}
                </h3>
                <p class="text-silver-400">Panel de administración de Radio Santana</p>
              </div>
              <button
                @click="handleLogout"
                class="flex items-center space-x-2 text-silver-400 hover:text-red-400 transition-colors"
              >
                <LogOut class="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex space-x-1 bg-dark-700/30 p-1 rounded-lg">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 flex-1 justify-center',
                activeTab === tab.id
                  ? 'bg-gradient-gold text-dark-900 font-semibold'
                  : 'text-silver-400 hover:text-gold-400 hover:bg-dark-700/50'
              ]"
            >
              <component :is="tab.icon" class="w-4 h-4" />
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="min-h-[400px]">
            <!-- News Tab -->
            <div v-if="activeTab === 'news'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">Gestión de Noticias</h3>
                <button
                  @click="openNewsForm()"
                  class="bg-gradient-gold text-dark-900 px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <Plus class="w-4 h-4" />
                  <span>Nueva Noticia</span>
                </button>
              </div>

              <!-- News List -->
              <div class="space-y-4">
                <div v-if="newsLoading" class="text-center py-8">
                  <div class="inline-flex items-center space-x-2 text-gold-400">
                    <div class="w-4 h-4 bg-gold-400 rounded-full animate-pulse"></div>
                    <span>Cargando noticias...</span>
                  </div>
                </div>

                <div v-else-if="news.length === 0" class="text-center py-8">
                  <Newspaper class="w-16 h-16 text-silver-400 mx-auto mb-4 opacity-50" />
                  <p class="text-silver-400">No hay noticias registradas</p>
                </div>

                <div v-else class="grid gap-4">
                  <div
                    v-for="item in news"
                    :key="item.id"
                    class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-4 hover:border-gold-400/40 transition-colors"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                          <span 
                            class="text-xs px-2 py-1 rounded-full"
                            :class="item.isFeatured ? 'bg-gold-900/30 text-gold-400' : 'bg-silver-900/30 text-silver-400'"
                          >
                            {{ item.isFeatured ? 'Destacado' : 'Común' }}
                          </span>
                          <span class="text-xs text-silver-500">{{ item.category }}</span>
                        </div>
                        <h4 class="text-lg font-semibold text-white mb-1">{{ item.title }}</h4>
                        <p class="text-silver-300 text-sm line-clamp-2 mb-2">{{ item.description }}</p>
                        <p class="text-xs text-silver-500">{{ new Date(item.date).toLocaleDateString() }}</p>
                      </div>
                      <div class="flex items-center space-x-2 ml-4">
                        <button
                          @click="openNewsForm(item)"
                          class="text-gold-400 hover:text-gold-300 transition-colors"
                          title="Editar"
                        >
                          <Edit3 class="w-4 h-4" />
                        </button>
                        <button
                          @click="handleDeleteNews(item.id!)"
                          class="text-red-400 hover:text-red-300 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Programs Tab -->
            <div v-else-if="activeTab === 'programs'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">Gestión de Programas</h3>
                <button
                  @click="showAddProgram = true"
                  class="bg-gradient-gold text-dark-900 px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <Plus class="w-4 h-4" />
                  <span>Nuevo Programa</span>
                </button>
              </div>

              <!-- Programs List -->
              <div class="space-y-4">
                <div v-if="programsLoading" class="text-center py-8">
                  <div class="inline-flex items-center space-x-2 text-gold-400">
                    <div class="w-4 h-4 bg-gold-400 rounded-full animate-pulse"></div>
                    <span>Cargando programas...</span>
                  </div>
                </div>

                <div v-else-if="programs.length === 0" class="text-center py-8">
                  <Calendar class="w-16 h-16 text-silver-400 mx-auto mb-4 opacity-50" />
                  <p class="text-silver-400">No hay programas registrados</p>
                </div>

                <div v-else class="grid gap-4">
                  <div
                    v-for="program in programs"
                    :key="program.id"
                    class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-4 hover:border-gold-400/40 transition-colors"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <h4 class="text-lg font-semibold text-white mb-1">{{ program.title }}</h4>
                        <p class="text-silver-400 text-sm mb-2">{{ program.host }} • {{ program.time }}</p>
                        <p class="text-silver-300 text-sm">{{ program.description }}</p>
                      </div>
                      <div class="flex items-center space-x-2 ml-4">
                        <button
                          @click="editProgram(program)"
                          class="text-gold-400 hover:text-gold-300 transition-colors"
                        >
                          <Edit3 class="w-4 h-4" />
                        </button>
                        <button
                          @click="deleteProgram(program.id)"
                          class="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Settings Tab -->
            <div v-if="activeTab === 'settings'" class="space-y-6">
              <h3 class="text-xl font-bold text-white">Configuración del Sistema</h3>

              <form @submit="handleSettingsUpdate" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">
                    URL del Stream de Radio
                  </label>
                  <input
                    type="url"
                    v-model="settingsForm.streamUrl"
                    class="w-full px-4 py-3 bg-dark-800 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 mb-6"
                    placeholder="https://tu-stream-url.com"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="settingsLoading"
                  class="bg-gradient-gold text-dark-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save class="w-4 h-4" />
                  <span>{{ settingsLoading ? 'Guardando...' : 'Guardar Configuración' }}</span>
                </button>
              </form>
            </div>

            <!-- Newsletter Tab -->
            <div v-if="activeTab === 'newsletter'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">Newsletter</h3>
                <button
                  @click="exportSubscribers"
                  class="bg-gradient-gold text-dark-900 px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <Download class="w-4 h-4" />
                  <span>Exportar</span>
                </button>
              </div>

              <!-- Newsletter Stats -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-dark-700/50 border border-gold-400/20 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-gold-400">{{ newsletterStats.total }}</div>
                  <div class="text-silver-400 text-sm">Total</div>
                </div>
                <div class="bg-dark-700/50 border border-green-500/20 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-green-400">{{ newsletterStats.active }}</div>
                  <div class="text-silver-400 text-sm">Activos</div>
                </div>
                <div class="bg-dark-700/50 border border-blue-500/20 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-blue-400">{{ newsletterStats.todayCount }}</div>
                  <div class="text-silver-400 text-sm">Hoy</div>
                </div>
                <div class="bg-dark-700/50 border border-purple-500/20 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-purple-400">{{ newsletterStats.thisWeekCount }}</div>
                  <div class="text-silver-400 text-sm">Esta Semana</div>
                </div>
              </div>

              <!-- Subscribers List -->
              <div class="bg-dark-700/50 border border-gold-400/20 rounded-lg overflow-hidden">
                <div class="p-4 border-b border-gold-400/20">
                  <h4 class="text-lg font-semibold text-white">Suscriptores</h4>
                </div>
                
                <div v-if="newsletterLoading" class="p-8 text-center">
                  <div class="inline-flex items-center space-x-2 text-gold-400">
                    <div class="w-4 h-4 bg-gold-400 rounded-full animate-pulse"></div>
                    <span>Cargando suscriptores...</span>
                  </div>
                </div>

                <div v-else-if="subscribers.length === 0" class="p-8 text-center">
                  <Mail class="w-16 h-16 text-silver-400 mx-auto mb-4 opacity-50" />
                  <p class="text-silver-400">No hay suscriptores registrados</p>
                </div>

                <div v-else class="max-h-64 overflow-y-auto">
                  <div
                    v-for="subscriber in subscribers"
                    :key="subscriber.id"
                    class="flex items-center justify-between p-4 border-b border-dark-600 last:border-b-0 hover:bg-dark-600/30 transition-colors"
                  >
                    <div class="flex items-center space-x-3">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        subscriber.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                      ]"></div>
                      <div>
                        <p class="text-white text-sm">{{ subscriber.email }}</p>
                        <p class="text-silver-400 text-xs">
                          {{ new Date(subscriber.subscribedAt).toLocaleDateString() }}
                        </p>
                      </div>
                    </div>
                    <button
                      @click="toggleSubscriberStatus(subscriber)"
                      :class="[
                        'text-xs px-2 py-1 rounded-full transition-colors',
                        subscriber.status === 'active'
                          ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                          : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                      ]"
                    >
                      {{ subscriber.status === 'active' ? 'Desactivar' : 'Activar' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add/Edit News Modal -->
        <div v-if="showNewsForm" class="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div class="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between p-6 border-b border-gold-400/20 sticky top-0 bg-dark-800 z-10">
              <h3 class="text-xl font-bold text-gold-400">
                {{ editingNews ? 'Editar Noticia' : 'Nueva Noticia' }}
              </h3>
              <button
                @click="closeNewsForm"
                class="text-silver-400 hover:text-gold-400 transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <form @submit="handleNewsSubmit" class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-silver-300 mb-2">Título</label>
                  <input
                    type="text"
                    v-model="newsForm.title"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-silver-300 mb-2">Descripción corta</label>
                  <input
                    type="text"
                    v-model="newsForm.description"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Fecha</label>
                  <input
                    type="date"
                    v-model="newsForm.date"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Categoría</label>
                  <select
                    v-model="newsForm.category"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  >
                    <option value="general">General</option>
                    <option value="eventos">Eventos</option>
                    <option value="programas">Programas</option>
                    <option value="anuncios">Anuncios</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-silver-300 mb-2">URL de la imagen</label>
                  <input
                    type="url"
                    v-model="newsForm.imageUrl"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <div v-if="newsForm.imageUrl" class="mt-2">
                    <img :src="newsForm.imageUrl" alt="Vista previa" class="h-32 w-full object-cover rounded-lg">
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-silver-300 mb-2">Contenido</label>
                  <textarea
                    v-model="newsForm.content"
                    rows="5"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  ></textarea>
                </div>

                <div class="flex items-center space-x-4">
                  <label class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      v-model="newsForm.isFeatured"
                      class="w-4 h-4 text-gold-400 bg-dark-700 border-gold-400/20 rounded focus:ring-gold-400/20"
                    />
                    <span class="text-silver-300 text-sm">Destacado</span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  @click="closeNewsForm"
                  class="px-4 py-2 text-silver-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="bg-gradient-gold text-dark-900 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save class="w-4 h-4" />
                  <span>{{ editingNews ? 'Actualizar' : 'Crear' }} Noticia</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Add Program Modal -->
        <div v-if="showAddProgram" class="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div class="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-2xl">
            <div class="flex items-center justify-between p-6 border-b border-gold-400/20">
              <h3 class="text-xl font-bold text-gold-400">
                {{ editingProgram ? 'Editar Programa' : 'Nuevo Programa' }}
              </h3>
              <button
                @click="closeAddProgram"
                class="text-silver-400 hover:text-gold-400 transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <form @submit="handleProgramSubmit" class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Título</label>
                  <input
                    type="text"
                    v-model="programForm.title"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Locutor</label>
                  <input
                    type="text"
                    v-model="programForm.host"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Horario</label>
                  <input
                    type="text"
                    v-model="programForm.time"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="ej: 10:00 - 12:00"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-silver-300 mb-2">Imagen URL</label>
                  <input
                    type="url"
                    v-model="programForm.image"
                    class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-silver-300 mb-2">Descripción</label>
                <textarea
                  v-model="programForm.description"
                  rows="3"
                  class="w-full px-3 py-2 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  required
                ></textarea>
              </div>

              <div class="flex items-center space-x-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    v-model="programForm.featured"
                    class="w-4 h-4 text-gold-400 bg-dark-700 border-gold-400/20 rounded focus:ring-gold-400/20"
                  />
                  <span class="text-silver-300 text-sm">Programa destacado</span>
                </label>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="closeAddProgram"
                  class="px-4 py-2 text-silver-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="programSubmitting"
                  class="bg-gradient-gold text-dark-900 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save class="w-4 h-4" />
                  <span>{{ programSubmitting ? 'Guardando...' : 'Guardar' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useSettings } from '../composables/useSettings'
import { useNewsletter } from '../composables/useNewsletter'
import { useNews } from '../composables/useNews'
import { 
  X, Edit3, Save, Plus, Trash2, Eye, EyeOff, Settings, 
  Mail, Download, LogIn, LogOut, AlertCircle, Newspaper, Calendar
} from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

defineProps<Props>()
defineEmits<{
  close: []
}>()

const { user, login, logout } = useAuth()
const { data: programs, loading: programsLoading, addDocument: addProgram, updateDocument: updateProgram, deleteDocument: deleteProgramDoc } = useFirestore('programs')
const { settings, updateSettings, loading: settingsLoading } = useSettings()
const { subscribers, stats: newsletterStats, loading: newsletterLoading, updateSubscriber, exportSubscribers } = useNewsletter()
const { 
  news, 
  loading: newsLoading, 
  addNews, 
  updateNews, 
  deleteNews 
} = useNews()

const showNewsForm = ref(false)
const editingNews = ref<any>(null)
const newsForm = reactive({
  title: '',
  description: '',
  content: '',
  imageUrl: '',
  date: new Date().toISOString().split('T')[0],
  category: 'general',
  isFeatured: false
})

const showAddProgram = ref(false)
const editingProgram = ref<any>(null)
const programForm = reactive({
  title: '',
  host: '',
  time: '',
  description: '',
  image: '',
  featured: false
})
const programSubmitting = ref(false)

const loginForm = reactive({
  email: '',
  password: ''
})
const loginLoading = ref(false)
const loginError = ref('')
const showPassword = ref(false)

const activeTab = ref('programs')
const tabs = [
  { id: 'programs', label: 'Programas', icon: Calendar },
  { id: 'news', label: 'Noticias', icon: Newspaper },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
  { id: 'settings', label: 'Configuración', icon: Settings }
]

const settingsForm = reactive({
  streamUrl: '',
  youtubeVideoId: ''
})

const openNewsForm = (newsItem: any = null) => {
  if (newsItem) {
    editingNews.value = newsItem
    Object.assign(newsForm, {
      title: newsItem.title,
      description: newsItem.description,
      content: newsItem.content,
      imageUrl: newsItem.imageUrl,
      date: newsItem.date.split('T')[0],
      category: newsItem.category,
      isFeatured: newsItem.isFeatured
    })
  } else {
    editingNews.value = null
    Object.assign(newsForm, {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      category: 'general',
      isFeatured: false
    })
  }
  showNewsForm.value = true
}

const closeNewsForm = () => {
  showNewsForm.value = false
  editingNews.value = null
}

const handleNewsSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const newsData = {
      title: newsForm.title,
      description: newsForm.description,
      content: newsForm.content,
      imageUrl: newsForm.imageUrl,
      date: newsForm.date,
      category: newsForm.category,
      isFeatured: newsForm.isFeatured
    }

    if (editingNews.value) {
      await updateNews(editingNews.value.id!, newsData)
    } else {
      await addNews(newsData)
    }
    
    closeNewsForm()
  } catch (error) {
    console.error('Error saving news:', error)
  }
}

const handleDeleteNews = async (id: string) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
    await deleteNews(id)
  }
}

const handleProgramSubmit = async (e: Event) => {
  e.preventDefault()
  programSubmitting.value = true

  try {
    const programData = {
      ...programForm,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if (editingProgram.value) {
      await updateProgram(editingProgram.value.id, programData)
    } else {
      await addProgram(programData)
    }

    // Reset form
    closeAddProgram()
  } catch (error) {
    console.error('Error saving program:', error)
  } finally {
    programSubmitting.value = false
  }
}

const editProgram = (program: any) => {
  editingProgram.value = program
  programForm.title = program.title
  programForm.host = program.host
  programForm.time = program.time
  programForm.description = program.description
  programForm.image = program.image || ''
  programForm.featured = program.featured || false
  showAddProgram.value = true
}

const closeAddProgram = () => {
  showAddProgram.value = false
  editingProgram.value = null
  Object.assign(programForm, {
    title: '',
    host: '',
    time: '',
    description: '',
    image: '',
    featured: false
  })
}

const handleLogin = async (e: Event) => {
  e.preventDefault()
  loginLoading.value = true
  loginError.value = ''

  try {
    await login(loginForm.email, loginForm.password)
    // Reset form
    loginForm.email = ''
    loginForm.password = ''
  } catch (error: any) {
    console.error('Login error:', error)
    loginError.value = error.message || 'Error al iniciar sesión'
  } finally {
    loginLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const handleSettingsUpdate = async (e: Event) => {
  e.preventDefault()
  
  try {
    await updateSettings({
      streamUrl: settingsForm.streamUrl,
      youtubeVideoId: settingsForm.youtubeVideoId
    })
    alert('Configuración actualizada correctamente')
  } catch (error) {
    console.error('Settings update error:', error)
    alert('Error al actualizar la configuración')
  }
}

const deleteProgram = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este programa?')) {
    try {
      await deleteProgramDoc(id)
      alert('Programa eliminado')
    } catch (error) {
      console.error('Delete program error:', error)
      alert('Error al eliminar el programa')
    }
  }
}

const toggleSubscriberStatus = async (subscriber: any) => {
  try {
    const newStatus = subscriber.status === 'active' ? 'inactive' : 'active'
    await updateSubscriber(subscriber.id, { status: newStatus })
  } catch (error) {
    console.error('Toggle subscriber status error:', error)
    alert('Error al cambiar el estado del suscriptor')
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>