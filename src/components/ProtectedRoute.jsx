/**
 * ProtectedRoute - Componente de proteção de rotas.
 * 
 * Redireciona para /login se o usuário não estiver autenticado.
 * Opcionalmente exige role 'admin'.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Verificando sessão...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
