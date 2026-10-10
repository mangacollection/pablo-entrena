import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export function CoachDashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'clients' | 'sessions'>('clients')

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>👨‍🏫 Panel del Entrenador</h1>
        <div style={styles.userInfo}>
          <span>{currentUser?.name}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Salir
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('clients')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'clients' ? styles.activeTab : {}),
            }}
          >
            Clientes
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'sessions' ? styles.activeTab : {}),
            }}
          >
            Sesiones
          </button>
        </div>

        {activeTab === 'clients' && (
          <div style={styles.section}>
            <h2>Mis clientes</h2>
            <p style={styles.placeholder}>Aún no tienes clientes. Comparte tu link de invitación.</p>
            <button style={styles.primaryButton}>
              + Añadir cliente
            </button>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div style={styles.section}>
            <h2>Sesiones de entrenamiento</h2>
            <p style={styles.placeholder}>Crea una nueva sesión para tus clientes.</p>
            <button style={styles.primaryButton}>
              + Nueva sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '2px solid #ddd',
  },
  tabButton: {
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  activeTab: {
    borderBottomColor: '#ff6b6b',
    color: '#ff6b6b',
  },
  section: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
  },
  placeholder: {
    color: '#999',
    marginBottom: '1.5rem',
  },
  primaryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}
