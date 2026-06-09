import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <p className="section-label">TechStore</p>
          <h2>Entrar na sua conta</h2>
          <p className="login-subtitle">
            Faça login para acessar a área administrativa
          </p>
        </div>

        {error && <div className="feedback-message feedback-error">{error}</div>}

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button login-btn"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-hints">
          <p className="login-hints-title">Credencial inicial de teste:</p>
          <div className="login-hint-row">
            <span className="badge badge-admin">Admin</span>
            <span>admin@techstore.com / admin123</span>
          </div>
        </div>

        <p className="login-back">
          <Link to="/">← Voltar para a loja</Link>
        </p>

        <p className="login-back">
          <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </div>
  )
}