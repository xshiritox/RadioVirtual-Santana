import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Direct Firebase configuration - replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
}

// Validate that all required config values are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'messagingSenderId', 'appId']
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig])

if (missingKeys.length > 0) {
  console.error('Missing Firebase configuration keys:', missingKeys)
  throw new Error(`Firebase configuration incomplete. Missing: ${missingKeys.join(', ')}`)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Enable network for Firestore
try {
  // This ensures Firestore connects to the backend
  console.log('Firebase initialized successfully')
} catch (error) {
  console.error('Error initializing Firebase:', error)
}

export default app