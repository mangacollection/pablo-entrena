export interface User {
  id: string
  email: string
  role: 'trainer' | 'client'
  name: string
  photoURL?: string
}

export interface Trainer extends User {
  role: 'trainer'
  clients: string[] // Array de client IDs
}

export interface Client extends User {
  role: 'client'
  trainerId: string
  joinDate: number
}

export interface Session {
  id: string
  trainerId: string
  clientId: string
  title: string
  description: string
  exercises: Exercise[]
  createdAt: number
  dueDate?: number
}

export interface Exercise {
  id: string
  name: string
  reps?: number
  sets?: number
  weight?: string
  duration?: number // segundos
  videoUrl?: string // URL de Banana
  notes?: string
}

export interface Report {
  id: string
  trainerId: string
  clientId: string
  sessionId: string
  completed: boolean
  notes?: string
  timestamp: number
}
