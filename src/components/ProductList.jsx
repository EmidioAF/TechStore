/**
 * Componente reutilizável para renderizar uma lista de produtos.
 * Responsabilidades:
 * - Recebe um array de produtos como prop
 * - Itera sobre o array e renderiza um ProductCard para cada produto
 * - Mantem layout em grid CSS
 * 
 * Conceitos utilizados:
 * - Array.map() para iterar sobre dados
 * - Prop drilling para passar dados ao componente filho (ProductCard)
 * - Key prop do React para otimização de renders
 * - Desestruturação de props
 */

import ProductCard from './ProductCard'

export default function ProductList({ products }) {
  return (
    <section className="products-grid">
      {/* 
        Usa .map() para converter array de produtos em array de componentes ProductCard
        
        O atributo "key" é essencial:
        - Ajuda React a identificar quais itens mudaram
        - Melhora performance ao atualizar listas
        - product.id funciona como identificador único
      */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          image={product.image}
        />
      ))}
    </section>
  )
}