/**
 * Página principal da aplicação.
 * Responsabilidades:
 * - Exibe seção hero (boas-vindas) com informações sobre a TechStore
 * - Mostra card com categorias de produtos oferecidos
 * - Exibe os 3 primeiros produtos em destaque (featured products)
 * 
 * Conceitos utilizados:
 * - Importação de dados do arquivo products.js
 * - Manipulação de arrays (slice) para filtrar produtos em destaque
 * - Componentização com ProductList reutilizável
 */

import ProductList from '../components/ProductList'
import { products } from '../data/products'

export default function Home() {
  // Seleciona apenas os 3 primeiros produtos da lista para exibição em destaque
  // slice(0, 3) retorna um novo array sem modificar o original
  const featuredProducts = products.slice(0, 3)

  return (
    <>
      {/* SEÇÃO HERO: Apresentação principal da aplicação */}
      <section className="hero-section">
        {/* Texto de boas-vindas e descrição da TechStore */}
        <div>
          <p className="section-label">TechStore</p>
          <h2>Bem-vindo à TechStore</h2>
          <p>
            Sua loja virtual de tecnologia, onde você encontra os melhores produtos para equipar seu setup. 
            Navegue pelo nosso catálogo e descubra as últimas novidades em periféricos, monitores e acessórios para gamers e entusiastas de tecnologia.
          </p>
        </div>

        {/* Card destacado: Informações sobre categorias de produtos */}
        <div className="hero-card">
          <h3> O que oferecemos? </h3>
          <p> De tudo sobre tecnologia! </p>
          <ul>
            <li> Periféricos </li>
            <li> Monitores </li>
            <li> Acessórios </li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO DE PRODUTOS EM DESTAQUE */}
      <section className="section-spacing">
        {/* Header da seção com título descritivo */}
        <div className="section-header">
          <p className="section-label">Produtos em destaque</p>
          <h2>Os mais procurados!</h2>
        </div>
        
        {/* ProductList: Componente que renderiza os produtos em um grid */}
        {/* Passa apenas os 3 produtos em destaque (featuredProducts) */}
        <ProductList products={featuredProducts} />
      </section>
    </>
  )
}