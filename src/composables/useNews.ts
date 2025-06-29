import { ref, onMounted, onUnmounted } from 'vue'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface NewsItem {
  id?: string
  title: string
  description: string
  content: string
  imageUrl: string
  date: string
  category: string
  isFeatured: boolean
  createdAt?: any
  updatedAt?: any
}

export const useNews = () => {
  const news = ref<NewsItem[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  let unsubscribe: (() => void) | null = null

  const setupRealtimeListener = () => {
    try {
      const q = query(
        collection(db, 'news'),
        orderBy('createdAt', 'desc')
      )
      
      unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const newsList: NewsItem[] = []
          querySnapshot.forEach((doc) => {
            newsList.push({ id: doc.id, ...doc.data() } as NewsItem)
          })
          news.value = newsList
          loading.value = false
        },
        (err) => {
          console.error('Error en la suscripción a noticias:', err)
          error.value = 'Error al cargar las noticias'
          loading.value = false
        }
      )
    } catch (err) {
      console.error('Error al configurar el listener de noticias:', err)
      error.value = 'Error al cargar las noticias'
      loading.value = false
    }
  }

  const addNews = async (newsItem: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'news'), {
        ...newsItem,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { success: true, id: docRef.id }
    } catch (err) {
      console.error('Error al agregar noticia:', err)
      return { success: false, error: 'Error al agregar la noticia' }
    }
  }

  const updateNews = async (id: string, updates: Partial<NewsItem>) => {
    try {
      const docRef = doc(db, 'news', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (err) {
      console.error('Error al actualizar noticia:', err)
      return { success: false, error: 'Error al actualizar la noticia' }
    }
  }

  const deleteNews = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'news', id))
      return { success: true }
    } catch (err) {
      console.error('Error al eliminar noticia:', err)
      return { success: false, error: 'Error al eliminar la noticia' }
    }
  }

  onMounted(() => {
    setupRealtimeListener()
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    news,
    loading,
    error,
    addNews,
    updateNews,
    deleteNews
  }
}
