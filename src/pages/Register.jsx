import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      setLoading(true)
      await register(form.name, form.email, form.password)
      navigate('/')
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
          <h2>Criar conta</h2>
          <p className="login-subtitle">
            Cadastre um novo usuário para acessar o sistema
          </p>
        </div>

        {error && <div className="feedback-message feedback-error">{error}</div>}

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-button login-btn" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="login-back">
          <Link to="/login">Já tem conta? Entrar</Link>
        </p>
      </div>
    </div>
  )
}