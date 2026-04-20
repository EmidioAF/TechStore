/**
 * Este é o componente principal que estrutura toda a aplicação.
 * Responsabilidades:
 * - Renderiza Header (cabeçalho com navegação)
 * - Gerencia as rotas da aplicação usando React Router
 * - Renderiza Footer (rodapé)
 * - Mantem a estrutura geral (app-shell) consistente em todas as páginas
 */

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'

export default function App() {
  return (
    <div className="app-shell">
      {/* Header: Componente de navegação superior com logo e menu */}
      <Header />
      
      {/* Main: Container principal com as rotas dinâmicas */}
      <main className="container main-content">
        {/* Routes: Define os caminhos e componentes que serão renderizados */}
        <Routes>
          {/* Rota raiz: Página inicial com destaque de produtos */}
          <Route path="/" element={<Home />} />
          
          {/* Rota de produtos: Exibe todos os produtos do catálogo */}
          <Route path="/produtos" element={<Products />} />
          
          {/* Rota sobre: Informações sobre a empresa TechStore */}
          <Route path="/sobre" element={<About />} />
        </Routes>
      </main>
      
      {/* Footer: Componente de rodapé com informações da empresa */}
      <Footer />
    </div>
  )
}