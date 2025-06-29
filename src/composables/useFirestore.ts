import { ref, onMounted, onUnmounted } from 'vue'
import { 
  collection, 
  getDocs, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useFirestore = (collectionName: string) => {
  const data = ref<any[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  let unsubscribe: (() => void) | null = null

  const setupRealtimeListener = () => {
    try {
      // Create basic collection reference first
      const collectionRef = collection(db, collectionName)
      
      // Set up real-time listener without ordering initially
      unsubscribe = onSnapshot(
        collectionRef,
        (querySnapshot) => {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          
          // Sort on client side to avoid index requirements
          docs.sort((a, b) => {
            const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0)
            const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0)
            return bTime.getTime() - aTime.getTime()
          })
          
          data.value = docs
          loading.value = false
          error.value = null
          console.log(`Real-time update received for ${collectionName}:`, docs.length, 'documents')
        },
        (err) => {
          console.error(`Error in real-time listener for ${collectionName}:`, err)
          error.value = err.message
          loading.value = false
          // Fallback to one-time fetch
          fetchDataOnce()
        }
      )
    } catch (err) {
      console.error(`Error setting up real-time listener for ${collectionName}:`, err)
      // Fallback to one-time fetch
      fetchDataOnce()
    }
  }

  const fetchDataOnce = async () => {
    try {
      loading.value = true
      error.value = null
      
      const collectionRef = collection(db, collectionName)
      const querySnapshot = await getDocs(collectionRef)
      
      const docs = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }))
      
      // Sort on client side
      docs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt || 0)
        const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt || 0)
        return bTime.getTime() - aTime.getTime()
      })
      
      data.value = docs
      console.log(`Fetched ${docs.length} documents from ${collectionName}`)
    } catch (err) {
      console.error(`Error fetching data for ${collectionName}:`, err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      data.value = []
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
      console.log(`Real-time listener unsubscribed for ${collectionName}`)
    }
  })

  const addDocument = async (docData: any) => {
    try {
      const dataWithTimestamp = {
        ...docData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp)
      console.log(`Document added to ${collectionName} with ID:`, docRef.id)
      return docRef.id
    } catch (err) {
      console.error(`Error adding document to ${collectionName}:`, err)
      throw err
    }
  }

  const updateDocument = async (id: string, docData: any) => {
    try {
      const dataWithTimestamp = {
        ...docData,
        updatedAt: new Date()
      }
      
      await updateDoc(doc(db, collectionName, id), dataWithTimestamp)
      console.log(`Document updated in ${collectionName} with ID:`, id)
    } catch (err) {
      console.error(`Error updating document in ${collectionName}:`, err)
      throw err
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
      console.log(`Document deleted from ${collectionName} with ID:`, id)
    } catch (err) {
      console.error(`Error deleting document from ${collectionName}:`, err)
      throw err
    }
  }

  return { 
    data, 
    loading, 
    error,
    addDocument, 
    updateDocument, 
    deleteDocument, 
    refetch: fetchDataOnce 
  }
}