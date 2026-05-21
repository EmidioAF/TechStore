import { Link, useParams } from 'react-router-dom'
import { useProductsContext } from '../context/ProductsContext'
import FeedbackMessage from '../components/FeedbackMessage'

export default function ProductDetails() {
  const { id } = useParams()
  const { getProductById, loading } = useProductsContext()

  const product = getProductById(id)

  if (loading) {
    return (
      <section className="section-spacing">
        <FeedbackMessage type="info" message="Carregando detalhes do produto..." />
      </section>
    )
  }

  if (!product) {
    return (
      <section className="section-spacing">
        <FeedbackMessage type="error" message="Produto não encontrado." />
        <Link to="/produtos" className="primary-button back-button">
          Voltar para produtos
        </Link>
      </section>
    )
  }

  const title = product.title || product.name
  const formattedPrice =
    typeof product.price === 'number'
      ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
      : product.price

  return (
    <section className="section-spacing">
      <div className="product-details-card">
        <div className="product-details-image-area">
          <img
            src={product.image}
            alt={title}
            className="product-details-image"
          />
        </div>

        <div className="product-details-content">
          <p className="section-label">{product.category}</p>
          <h2>{title}</h2>
          <p className="product-details-price">{formattedPrice}</p>
          <p className="product-details-description">
            {product.description || 'Produto sem descrição cadastrada.'}
          </p>

          <Link to="/produtos" className="primary-button back-button">
            Voltar para produtos
          </Link>
        </div>
      </div>
    </section>
  )
}