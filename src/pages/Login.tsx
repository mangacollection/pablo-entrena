import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { signInWithEmail, signInWithGoogle, signUpWithEmail } = useAuth()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'trainer' | 'client'>('client')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name, role)
      } else {
        await signInWithEmail(email, password)
      }

      // Redirect based on role
      navigate(role === 'trainer' ? '/coach' : '/app')
    } catch (err: any) {
      setError(err.message || 'Error en la autenticación')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
      navigate('/app') // Google users default to client
    } catch (err: any) {
      setError(err.message || 'Error con Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {isSignUp && (
            <div style={styles.roleSelect}>
              <label>
                <input
                  type="radio"
                  value="client"
                  checked={role === 'client'}
                  onChange={(e) => setRole(e.target.value as 'trainer' | 'client')}
                />
                {' '}Soy cliente
              </label>
              <label>
                <input
                  type="radio"
                  value="trainer"
                  checked={role === 'trainer'}
                  onChange={(e) => setRole(e.target.value as 'trainer' | 'client')}
                />
                {' '}Soy entrenador
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? 'Cargando...' : (isSignUp ? 'Crear cuenta' : 'Iniciar sesión')}
          </button>
        </form>

        <div style={styles.divider}>O</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={styles.googleButton}
        >
          🔵 Continuar con Google
        </button>

        <p style={styles.toggle}>
          {isSignUp ? 'Ya tienes cuenta? ' : 'No tienes cuenta? '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            style={styles.toggleButton}
          >
            {isSignUp ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>

        <button
          onClick={() => navigate('/')}
          style={styles.backButton}
        >
          ← Volver
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  roleSelect: {
    display: 'flex',
    gap: '1rem',
    padding: '0.5rem 0',
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#cc0000',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  divider: {
    textAlign: 'center',
    color: '#999',
    margin: '1.5rem 0',
  },
  googleButton: {
    padding: '0.75rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  toggle: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  backButton: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '1rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
