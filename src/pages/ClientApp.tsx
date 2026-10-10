import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export function ClientApp() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'sessions' | 'exercises'>('sessions')

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>💪 Tu entrenamiento</h1>
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
            onClick={() => setActiveTab('sessions')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'sessions' ? styles.activeTab : {}),
            }}
          >
            Mis sesiones
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'exercises' ? styles.activeTab : {}),
            }}
          >
            Ejercicios
          </button>
        </div>

        {activeTab === 'sessions' && (
          <div style={styles.section}>
            <h2>Sesiones de entrenamiento</h2>
            <p style={styles.placeholder}>
              Aún no has recibido ninguna sesión. Tu entrenador te enviará un plan pronto.
            </p>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div style={styles.section}>
            <h2>Ejercicios básicos del gym</h2>
            <div style={styles.exerciseGrid}>
              <div style={styles.exerciseCard}>
                <h3>Sentadillas</h3>
                <p>Fortalece las piernas y glúteos</p>
                <button style={styles.watchButton}>Ver video →</button>
              </div>
              <div style={styles.exerciseCard}>
                <h3>Flexiones</h3>
                <p>Trabaja pecho, brazos y core</p>
                <button style={styles.watchButton}>Ver video →</button>
              </div>
              <div style={styles.exerciseCard}>
                <h3>Dominadas</h3>
                <p>Ejercicio completo de espalda</p>
                <button style={styles.watchButton}>Ver video →</button>
              </div>
              <div style={styles.exerciseCard}>
                <h3>Burpees</h3>
                <p>Cardio y fuerza combinados</p>
                <button style={styles.watchButton}>Ver video →</button>
              </div>
            </div>
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
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  exerciseCard: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    borderLeft: '4px solid #ff6b6b',
  },
  watchButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
}
