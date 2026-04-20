/**
 * Componente de cabeçalho da aplicação.

 * - Exibe branding/logo da TechStore
 * - Fornece navegação para as principais páginas
 * - Mantem a consistência visual em toda a aplicação
 */

import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        {/* Seção de Branding: Logo e título da empresa */}
        <div>
          <p className="brand-kicker">TechStore</p>
          <h1 className="brand-title">Third Test Header</h1>
        </div>

        {/* Navegação Principal */}
        <nav>
          <ul className="nav-list">
            {/* NavLink: componente do React Router que navega sem recarregar */}
            {/* Aplica classe "active" automaticamente quando a rota atual corresponde */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/produtos">Produtos</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}