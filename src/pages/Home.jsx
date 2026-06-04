import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { products } from '../data/products'

export default function Home() {
  const featured = products.slice(0, 3)

  return (
    <>
      <section className="hero-section">
        <div className="hero-text">
          <span className="section-label">Bem-vindo à TechStore</span>
          <h2>Equipe seu setup com o melhor da tecnologia</h2>
          <p>
            Periféricos, monitores e acessórios gamer selecionados para quem leva o setup a sério.
            Navegue pelo catálogo, explore os detalhes e encontre o que você precisa.
          </p>
          <Link to="/produtos" className="primary-button hero-cta">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="hero-card">
          <h3>Categorias</h3>
          <ul className="hero-categories">
            <li>🖱️ Periféricos</li>
            <li>🖥️ Monitores</li>
            <li>🎧 Áudio</li>
            <li>🔌 Acessórios</li>
          </ul>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-header">
          <span className="section-label">Destaques</span>
          <h2>Os mais procurados</h2>
        </div>
        <ProductList products={featured} />
      </section>
    </>
  )
}
