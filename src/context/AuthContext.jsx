import { createContext, useContext, useEffect, useState } from 'react'
import { getUser, isAuthenticated, login, logout } from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser())
    }
    setAuthReady(true)
  }, [])

  function handleLogin(username, password) {
    const result = login(username, password)
    if (result.success) setUser(getUser())
    return result
  }

  function handleLogout() {
    logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isAuth: !!user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
