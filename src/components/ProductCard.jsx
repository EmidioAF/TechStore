import { Link } from 'react-router-dom'

export default function ProductCard({ id, name, title, price, category, image }) {
  const productTitle = title || name || 'Produto sem nome'

  const formattedPrice =
    typeof price === 'number'
      ? `R$ ${price.toFixed(2).replace('.', ',')}`
      : price || 'Preço indisponível'

  return (
    <article className="product-card">
      <img
        src={image || 'https://via.placeholder.com/400x300?text=Produto'}
        alt={productTitle}
        className="product-image"
      />
      <div className="product-info">
        <span className="product-category">{category || 'Sem categoria'}</span>
        <h3>{productTitle}</h3>
        <p className="product-price">{formattedPrice}</p>
        <Link to={`/produtos/${id}`} className="primary-button details-link">
          Ver detalhes
        </Link>
      </div>
    </article>
  )
}