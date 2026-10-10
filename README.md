# Pablo Entrena - App v2

Aplicación React + Firebase para entrenamiento personal con soporte para múltiples entrenadores y clientes.

## 🚀 Stack Tech

- **Frontend:** React 18 + TypeScript + Vite
- **Auth:** Firebase Authentication (Email/Password + Google)
- **Database:** Firebase Realtime Database
- **Hosting:** Cloudflare Pages
- **Videos:** Banana (integración lista)

## 📋 Requisitos previos

- Node.js 16+ (recomendado 18+)
- npm o yarn
- Cuenta Firebase con Realtime Database habilitada

## 🔧 Setup

### 1. Clonar el repo
```bash
git clone https://github.com/mangacollection/pablo-entrena.git
cd pablo-entrena
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase

**Paso A:** Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)

**Paso B:** Habilita:
- Authentication (Email/Password + Google)
- Realtime Database

**Paso C:** Copia `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

**Paso D:** Rellena las variables de entorno en `.env.local` con tus credenciales de Firebase:
```
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx
VITE_FIREBASE_DATABASE_URL=https://xxxxx.firebaseio.com
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## 📁 Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
├── config/           # Configuración (Firebase)
├── contexts/         # Context API (Auth)
├── pages/            # Páginas principales
├── types/            # Tipos TypeScript
├── App.tsx           # Router principal
├── main.tsx          # Entry point
└── index.css         # Estilos globales
```

## 🔑 Funcionalidades principales

### 1. **Landing Page**
- Página de inicio con propuesta de valor
- CTA "Aplicar al programa"
- Acceso a login

### 2. **Autenticación dual**
- Email + Contraseña
- Google OAuth
- Roles: Entrenador / Cliente

### 3. **Panel de Entrenador (Coach)**
- Ver mis clientes
- Crear sesiones de entrenamiento
- Enviar ejercicios a clientes

### 4. **App del Cliente**
- Ver mis sesiones
- Biblioteca de ejercicios básicos
- Videos desde Banana (integración lista)
- Reportar ejercicios completados

## 🎥 Integración con Banana (Videos)

Para añadir videos desde Banana:

1. Sube videos a Banana CDN
2. Obtén las URLs públicas
3. Actualiza los componentes `Exercise` con las URLs

Ejemplo:
```tsx
<video src="https://banana-cdn.com/tu-video.mp4" controls />
```

## 📱 Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/login` | Inicio de sesión / Registro |
| `/coach` | Panel del entrenador (protegido) |
| `/app` | App del cliente (protegida) |

## 🚀 Deploy a Cloudflare Pages

### 1. Build
```bash
npm run build
```

### 2. Conectar a Cloudflare Pages
- Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Conecta tu repo GitHub
- Build command: (vacío o `npm run build`)
- Deploy command: `echo "Deploying..."`
- Output directory: `dist`

### 3. Variables de entorno en Cloudflare
Añade las mismas variables `.env` en Cloudflare Pages settings.

## 📊 Estructura de datos Firebase

```
users/
  {uid}/
    - id: string
    - email: string
    - name: string
    - role: 'trainer' | 'client'
    - photoURL?: string

trainers/
  {trainerId}/
    - clients: {clientId: true}

clients/
  {trainerId}/
    {clientId}/
      - trainerId: string
      - joinDate: number

sessions/
  {trainerId}/
    {clientId}/
      {sessionId}/
        - exercises: Exercise[]
        - createdAt: number

reports/
  {trainerId}/
    {clientId}/
      {reportId}/
        - completed: boolean
        - notes: string
```

## 🛠️ Desarrollo futuro

- [ ] Chat en tiempo real entre entrenador y cliente
- [ ] Progreso visible con gráficos
- [ ] Pagos (Stripe integration)
- [ ] Notificaciones
- [ ] Análisis de movimiento (cámara)

## 📝 Notas

- Auth está completamente funcional
- Rutas protegidas implementadas
- Diseño responsive básico
- Listo para expandir componentes

---

**Creado con ❤️ para Pablo Entrena**
