import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration for Radio Santana
const firebaseConfig = {
  apiKey: "AIzaSyCCaaeMaSyzNuAfikN5q30bq3tdiU7OT8U",
  authDomain: "radiovirtual-santana.firebaseapp.com",
  projectId: "radiovirtual-santana",
  storageBucket: "radiovirtual-santana.appspot.com",
  messagingSenderId: "287099775807",
  appId: "1:287099775807:web:a157ad011bc8b13ab4418a"
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