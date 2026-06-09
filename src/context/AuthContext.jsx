import { createContext, useContext, useEffect, useState } from 'react'
import { request } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('techstore_token')

    if (!token) {
      setLoading(false)
      return
    }

    request('/auth/me')
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem('techstore_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    localStorage.setItem('techstore_token', data.token)
    setUser(data.user)
  }

  async function register(name, email, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    localStorage.setItem('techstore_token', data.token)
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem('techstore_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}