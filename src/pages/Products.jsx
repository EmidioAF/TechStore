/**
 * Página de catálogo da aplicação.
 * Responsabilidades:
 * - Exibe todos os produtos disponíveis em um grid
 * - Demonstra uso de dados importados e componentização
 * - Fornece informações sobre como os dados são renderizados
 * 
 * Conceitos utilizados:
 * - Importação e reutilização de dados
 * - Props drilling para passar dados aos componentes filhos
 * - Componente ProductList reutilizável
 */

import ProductList from '../components/ProductList'
import { products } from '../data/products'

export default function Products() {
  return (
    <section className="section-spacing">
      {/* Header da página com título e descrição */}
      <div className="section-header">
        <p className="section-label">Catálogo</p>
        <h2>Lista simples de produtos</h2>
        <p>
          Nesta página os produtos são renderizados a partir de um array local,
          demonstrando componentização e uso de props.
        </p>
      </div>
      
      {/* ProductList: Componente que renderiza TODOS os produtos do catálogo em um grid */}
      {/* Diferentemente da Home, aqui passamos o array completo sem filtros */}
      <ProductList products={products} />
    </section>
  )
}