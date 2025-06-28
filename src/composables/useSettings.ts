import { ref, onMounted, onUnmounted } from 'vue'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface Settings {
  streamUrl: string
  youtubeVideoId: string
  siteTitle: string
}

const defaultSettings: Settings = {
  streamUrl: 'https://stream.zeno.fm/your-stream',
  youtubeVideoId: 'dQw4w9WgXcQ',
  siteTitle: 'Radio Santana - Tu Radio Virtual'
}

export const useSettings = () => {
  const settings = ref<Settings>({ ...defaultSettings })
  const loading = ref(true)
  const error = ref<string | null>(null)
  let unsubscribe: (() => void) | null = null

  const setupRealtimeListener = () => {
    try {
      const docRef = doc(db, 'settings', 'general')
      
      // Set up real-time listener for settings
      unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Settings
            settings.value = { ...defaultSettings, ...data }
            console.log('Real-time settings update received:', data)
          } else {
            // Create default settings if they don't exist
            setDoc(docRef, defaultSettings).then(() => {
              settings.value = { ...defaultSettings }
              console.log('Default settings created')
            })
          }
          loading.value = false
          error.value = null
        },
        (err) => {
          console.error('Error in settings real-time listener:', err)
          error.value = err.message
          loading.value = false
          // Fallback to one-time fetch
          fetchSettingsOnce()
        }
      )
    } catch (err) {
      console.error('Error setting up settings real-time listener:', err)
      // Fallback to one-time fetch
      fetchSettingsOnce()
    }
  }

  const fetchSettingsOnce = async () => {
    try {
      loading.value = true
      const docRef = doc(db, 'settings', 'general')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        settings.value = { ...defaultSettings, ...docSnap.data() as Settings }
      } else {
        // Create default settings if they don't exist
        await setDoc(docRef, defaultSettings)
        settings.value = { ...defaultSettings }
      }
      error.value = null
    } catch (err) {
      console.error('Error fetching settings:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      // Use default settings if Firebase fails
      settings.value = { ...defaultSettings }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    setupRealtimeListener()
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
      console.log('Settings real-time listener unsubscribed')
    }
  })

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const docRef = doc(db, 'settings', 'general')
      const updatedSettings = { 
        ...settings.value, 
        ...newSettings,
        updatedAt: new Date()
      }
      
      await setDoc(docRef, updatedSettings, { merge: true })
      console.log('Settings updated successfully:', newSettings)
      
      return true
    } catch (err) {
      console.error('Error updating settings:', err)
      error.value = err instanceof Error ? err.message : 'Error al actualizar configuración'
      return false
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettingsOnce
  }
}