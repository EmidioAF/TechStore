import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAuth } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuth) {
    navigate('/admin-produtos')
    return null
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    const result = login(form.username, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/admin-produtos')
    } else {
      setError(result.error)
    }
  }

  return (
    <section className="section-spacing login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="section-label">Área Restrita</span>
          <h2>Acesso Administrativo</h2>
          <p>Faça login para gerenciar os produtos da TechStore.</p>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="feedback-message feedback-error">{error}</div>
          )}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-hint">
          Demo: usuário <strong>admin</strong> / senha <strong>admin123</strong>
        </p>

        <div className="login-back">
          <Link to="/">← Voltar para a loja</Link>
        </div>
      </div>
    </section>
  )
}
