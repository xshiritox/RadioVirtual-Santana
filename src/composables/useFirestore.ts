import { ref, onMounted } from 'vue'
import { collection, getDocs, updateDoc, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useFirestore = (collectionName: string) => {
  const data = ref<any[]>([])
  const loading = ref(true)

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      data.value = docs
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  const addDocument = async (docData: any) => {
    try {
      await addDoc(collection(db, collectionName), docData)
      fetchData()
    } catch (error) {
      console.error('Error adding document:', error)
    }
  }

  const updateDocument = async (id: string, docData: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), docData)
      fetchData()
    } catch (error) {
      console.error('Error updating document:', error)
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
      fetchData()
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  return { data, loading, addDocument, updateDocument, deleteDocument, refetch: fetchData }
}