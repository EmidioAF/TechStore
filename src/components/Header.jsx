import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuth, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="brand">
          <span className="brand-kicker">⚡ TechStore</span>
          <p className="brand-sub">Sua loja de tecnologia</p>
        </div>

        <nav>
          <ul className="nav-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/produtos">Produtos</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
            {isAuth ? (
              <>
                <li><NavLink to="/admin-produtos">Admin</NavLink></li>
                <li>
                  <button className="nav-logout" onClick={handleLogout}>
                    Sair ({user?.username})
                  </button>
                </li>
              </>
            ) : (
              <li><NavLink to="/login">Login</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
