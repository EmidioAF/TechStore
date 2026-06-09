import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import AdminProducts from './pages/AdminProducts'
import { useAuth } from './context/AuthContext'

function Header() {
  const { user, logout, isAdmin } = useAuth()

  return (
    <header className="site-header">
      <div className="container header-content">
        <div>
          <p className="brand-kicker">TechStore</p>
          <h1 className="brand-title">Mini E-commerce Acadêmico</h1>
        </div>

        <nav>
          <ul className="nav-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/produtos">Produtos</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
            {isAdmin && <li><NavLink to="/admin-produtos">Admin</NavLink></li>}
          </ul>
        </nav>

        <div className="header-auth">
          {user ? (
            <>
              <div className="header-user">
                <span className="badge badge-user">{user.role}</span>
                <span className="header-user-name">{user.name}</span>
              </div>
              <button className="logout-btn-sm" onClick={logout}>Sair</button>
            </>
          ) : (
            <NavLink to="/login" className="login-link-btn">
              Entrar
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>TechStore • Projeto acadêmico</p>
      </div>
    </footer>
  )
}

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="main-content">
        <div className="container">
          <p>Carregando...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetails />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route
            path="/admin-produtos"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}