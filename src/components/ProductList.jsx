import ProductCard from './ProductCard'

export default function ProductList({ products }) {
  return (
    <section className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          title={product.title}
          price={product.price}
          category={product.category}
          image={product.image}
          description={product.description}
        />
      ))}
    </section>
  )
}