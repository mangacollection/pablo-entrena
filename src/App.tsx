import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { CoachDashboard } from '@/pages/CoachDashboard'
import { ClientApp } from '@/pages/ClientApp'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/coach"
        element={
          <ProtectedRoute>
            <CoachDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <ClientApp />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
