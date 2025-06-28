import { ref, onMounted } from 'vue'
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

export const useAuth = () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user.value = authUser
      loading.value = false
    })

    // Return cleanup function
    return unsubscribe
  })

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  return { user, loading, login, logout }
}