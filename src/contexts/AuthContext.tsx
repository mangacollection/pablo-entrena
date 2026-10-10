import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser
} from 'firebase/auth'
import { auth, db } from '@/config/firebase'
import { ref, set, get } from 'firebase/database'
import { User } from '@/types'

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  signUpWithEmail: (email: string, password: string, name: string, role: 'trainer' | 'client') => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Realtime DB
        const userRef = ref(db, `users/${firebaseUser.uid}`)
        const snapshot = await get(userRef)

        if (snapshot.exists()) {
          setCurrentUser(snapshot.val())
        } else {
          // Fallback if user data not in DB
          setCurrentUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            role: 'client',
          })
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUpWithEmail = async (email: string, password: string, name: string, role: 'trainer' | 'client') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)

      // Save user data to Realtime DB
      const userData: User = {
        id: result.user.uid,
        email,
        name,
        role,
      }

      await set(ref(db, `users/${result.user.uid}`), userData)
      setCurrentUser(userData)
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)

      // Get user data from Realtime DB
      const userRef = ref(db, `users/${result.user.uid}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        setCurrentUser(snapshot.val())
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Check if user exists in DB, if not create it
      const userRef = ref(db, `users/${result.user.uid}`)
      const snapshot = await get(userRef)

      if (!snapshot.exists()) {
        const userData: User = {
          id: result.user.uid,
          email: result.user.email || '',
          name: result.user.displayName || '',
          photoURL: result.user.photoURL || undefined,
          role: 'client', // Default role
        }
        await set(userRef, userData)
        setCurrentUser(userData)
      } else {
        setCurrentUser(snapshot.val())
      }
    } catch (error) {
      console.error('Google sign in error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, signUpWithEmail, signInWithEmail, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
