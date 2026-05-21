import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import FeedbackMessage from '../components/FeedbackMessage'
import { useProductsContext } from '../context/ProductsContext'
import { useState } from 'react'

export default function AdminProducts() {
  const { products, addProduct } = useProductsContext()
  const [message, setMessage] = useState('')

  function handleAddProduct(newProduct) {
    addProduct(newProduct)
    setMessage('Produto cadastrado com sucesso e adicionado ao catálogo.')
  }

  return (
    <section className="section-spacing">
      <div className="section-header">
        <p className="section-label">Área administrativa</p>
        <h2>Cadastro local de produtos</h2>
        <p>
          Esta tela demonstra formulário controlado, manipulação de estado e
          atualização dinâmica da lista sem persistência real.
        </p>
      </div>

      <div className="admin-layout">
        <div className="admin-form-card">
          <ProductForm onSubmit={handleAddProduct} />
        </div>

        <div className="admin-list-area">
          {message && (
            <FeedbackMessage
              type="success"
              message={message}
            />
          )}

          <h3 className="admin-subtitle">Produtos cadastrados</h3>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  )
}