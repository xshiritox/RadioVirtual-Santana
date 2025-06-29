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
      console.log('Auth state changed:', authUser ? 'Logged in' : 'Logged out')
    })

    // Return cleanup function
    return unsubscribe
  })

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email)
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful:', result.user.email)
      return result
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Provide user-friendly error messages
      let errorMessage = 'Error al iniciar sesión'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado'
          break
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta'
          break
        case 'auth/invalid-email':
          errorMessage = 'Email inválido'
          break
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Intenta más tarde'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Verifica tu internet'
          break
        case 'auth/invalid-credential':
          errorMessage = 'Credenciales inválidas'
          break
        default:
          errorMessage = error.message || 'Error desconocido'
      }
      
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      console.log('Logout successful')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return { user, loading, login, logout }
}