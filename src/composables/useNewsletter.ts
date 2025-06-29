import { ref, onMounted, onUnmounted } from 'vue'
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs
} from 'firebase/firestore'
import { db } from '../lib/firebase'

interface NewsletterSubscriber {
  id: string
  email: string
  status: 'active' | 'inactive'
  subscribedAt: Date
  source?: string
}

interface NewsletterStats {
  total: number
  active: number
  todayCount: number
  thisWeekCount: number
}

export const useNewsletter = () => {
  const subscribers = ref<NewsletterSubscriber[]>([])
  const stats = ref<NewsletterStats>({
    total: 0,
    active: 0,
    todayCount: 0,
    thisWeekCount: 0
  })
  const loading = ref(true)
  const error = ref<string | null>(null)
  let unsubscribe: (() => void) | null = null

  const setupRealtimeListener = () => {
    try {
      const collectionRef = collection(db, 'newsletter')
      
      // Set up real-time listener
      unsubscribe = onSnapshot(
        collectionRef,
        (querySnapshot) => {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            subscribedAt: doc.data().subscribedAt?.toDate() || new Date()
          })) as NewsletterSubscriber[]
          
          // Sort by subscription date (newest first)
          docs.sort((a, b) => b.subscribedAt.getTime() - a.subscribedAt.getTime())
          
          subscribers.value = docs
          updateStats(docs)
          loading.value = false
          error.value = null
          console.log(`Newsletter real-time update: ${docs.length} subscribers`)
        },
        (err) => {
          console.error('Error in newsletter real-time listener:', err)
          error.value = err.message
          loading.value = false
          fetchSubscribersOnce()
        }
      )
    } catch (err) {
      console.error('Error setting up newsletter real-time listener:', err)
      fetchSubscribersOnce()
    }
  }

  const fetchSubscribersOnce = async () => {
    try {
      loading.value = true
      error.value = null
      
      const collectionRef = collection(db, 'newsletter')
      const querySnapshot = await getDocs(collectionRef)
      
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        subscribedAt: doc.data().subscribedAt?.toDate() || new Date()
      })) as NewsletterSubscriber[]
      
      // Sort by subscription date (newest first)
      docs.sort((a, b) => b.subscribedAt.getTime() - a.subscribedAt.getTime())
      
      subscribers.value = docs
      updateStats(docs)
      console.log(`Fetched ${docs.length} newsletter subscribers`)
    } catch (err) {
      console.error('Error fetching newsletter subscribers:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      subscribers.value = []
    } finally {
      loading.value = false
    }
  }

  const updateStats = (docs: NewsletterSubscriber[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    stats.value = {
      total: docs.length,
      active: docs.filter(sub => sub.status === 'active').length,
      todayCount: docs.filter(sub => sub.subscribedAt >= today).length,
      thisWeekCount: docs.filter(sub => sub.subscribedAt >= weekAgo).length
    }
  }

  onMounted(() => {
    setupRealtimeListener()
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
      console.log('Newsletter real-time listener unsubscribed')
    }
  })

  const subscribe = async (email: string, source: string = 'website') => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Formato de email inválido')
      }

      // Check if email already exists
      const existingSubscriber = subscribers.value.find(
        sub => sub.email.toLowerCase() === email.toLowerCase()
      )

      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          throw new Error('Este email ya está suscrito')
        } else {
          // Reactivate inactive subscriber
          await updateSubscriber(existingSubscriber.id, { status: 'active' })
          return { success: true, message: 'Suscripción reactivada exitosamente' }
        }
      }

      // Add new subscriber
      const subscriberData = {
        email: email.toLowerCase().trim(),
        status: 'active' as const,
        subscribedAt: new Date(),
        source,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'newsletter'), subscriberData)
      console.log('New newsletter subscriber added:', docRef.id)
      
      return { success: true, message: '¡Suscripción exitosa! Gracias por unirte.' }
    } catch (err) {
      console.error('Error subscribing to newsletter:', err)
      const message = err instanceof Error ? err.message : 'Error al suscribirse'
      return { success: false, message }
    }
  }

  const updateSubscriber = async (id: string, updates: Partial<NewsletterSubscriber>) => {
    try {
      const docRef = doc(db, 'newsletter', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
      console.log('Newsletter subscriber updated:', id)
    } catch (err) {
      console.error('Error updating newsletter subscriber:', err)
      throw err
    }
  }

  const deleteSubscriber = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'newsletter', id))
      console.log('Newsletter subscriber deleted:', id)
    } catch (err) {
      console.error('Error deleting newsletter subscriber:', err)
      throw err
    }
  }

  const exportSubscribers = () => {
    const activeSubscribers = subscribers.value.filter(sub => sub.status === 'active')
    const csvContent = [
      'Email,Fecha de Suscripción,Estado,Fuente',
      ...activeSubscribers.map(sub => 
        `${sub.email},${sub.subscribedAt.toLocaleDateString()},${sub.status},${sub.source || 'website'}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    subscribers,
    stats,
    loading,
    error,
    subscribe,
    updateSubscriber,
    deleteSubscriber,
    exportSubscribers,
    refetch: fetchSubscribersOnce
  }
}