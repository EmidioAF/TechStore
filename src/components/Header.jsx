/**
 * Header - Cabeçalho da aplicação.
 * 
 * RA3: Exibe estado de autenticação do usuário.
 * Mostra botão Login/Logout e nome do usuário logado.
 */

import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()

  return (
    <header className="site-header">
      <div className="container header-content">
        <div>
          <p className="brand-kicker">TechStore</p>
          <h1 className="brand-title">Sua loja de tecnologia</h1>
        </div>

        <nav>
          <ul className="nav-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/produtos">Produtos</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
            {isAdmin && (
              <li><NavLink to="/admin-produtos">Admin</NavLink></li>
            )}
          </ul>
        </nav>

        <div className="header-auth">
          {isAuthenticated ? (
            <div className="header-user">
              <span className="header-user-name">Olá, {user.name.split(' ')[0]}</span>
              <button className="logout-btn-sm" onClick={logout}>Sair</button>
            </div>
          ) : (
            <Link to="/login" className="login-link-btn">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  )
}
