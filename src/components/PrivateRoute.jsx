import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { isAuth, authReady } = useAuth()

  if (!authReady) return null
  if (!isAuth) return <Navigate to="/login" replace />

  return children
}
