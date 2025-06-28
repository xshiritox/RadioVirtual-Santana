import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'general')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        settings.value = { ...defaultSettings, ...docSnap.data() as Settings }
      } else {
        // Create default settings if they don't exist
        await setDoc(docRef, defaultSettings)
        settings.value = { ...defaultSettings }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      // Use default settings if Firebase fails
      settings.value = { ...defaultSettings }
    } finally {
      loading.value = false
    }
  }

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const docRef = doc(db, 'settings', 'general')
      const updatedSettings = { ...settings.value, ...newSettings }
      
      await setDoc(docRef, updatedSettings, { merge: true })
      settings.value = updatedSettings
      
      return true
    } catch (error) {
      console.error('Error updating settings:', error)
      return false
    }
  }

  onMounted(() => {
    fetchSettings()
  })

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings
  }
}