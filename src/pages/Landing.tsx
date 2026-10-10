import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Landing() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Tu abuelo tenía algo que tú no.<br />
          Y probablemente ni sabes que lo perdiste.
        </h1>

        <p style={styles.subtitle}>
          Estás cansado. Tu cuerpo se siente roto. Pero la verdad es diferente.
        </p>

        <p style={styles.body}>
          Tu abuelo se movía naturalmente. Tu cuerpo no está roto. Está confundido.
        </p>

        <p style={styles.highlight}>
          En 8 semanas recuperarás lo que perdiste.
        </p>

        <button
          onClick={() => navigate('/login')}
          style={styles.ctaButton}
        >
          Aplicar al programa
        </button>

        <p style={styles.scarcity}>
          ⚠️ Solo 5 espacios disponibles este mes
        </p>
      </div>

      <div style={styles.features}>
        <h2>Lo que incluye el programa:</h2>
        <ul style={styles.featureList}>
          <li>✓ Plan personalizado de 8 semanas</li>
          <li>✓ Ejercicios basados en movimiento natural</li>
          <li>✓ Videos instructivos de cada ejercicio</li>
          <li>✓ Acceso a tu entrenador personalizado</li>
          <li>✓ Garantía: resultados o tu dinero de vuelta</li>
        </ul>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    color: '#fff',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    maxWidth: '800px',
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#ccc',
    marginBottom: '1.5rem',
  },
  body: {
    fontSize: '1.1rem',
    color: '#bbb',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  highlight: {
    fontSize: '1.3rem',
    color: '#ff6b6b',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  ctaButton: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background 0.3s',
  },
  scarcity: {
    color: '#ff9999',
    fontSize: '0.95rem',
  },
  features: {
    maxWidth: '600px',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '8px',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
}
