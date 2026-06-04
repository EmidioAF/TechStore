import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import FeedbackMessage from '../components/FeedbackMessage'
import { useProductsContext } from '../context/ProductsContext'
import { useAuth } from '../context/AuthContext'

export default function AdminProducts() {
  const { customProducts, addProduct, removeProduct, updateProduct } = useProductsContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  function handleAdd(newProduct) {
    addProduct(newProduct)
    setMessage({ type: 'success', text: `"${newProduct.title}" cadastrado e salvo com sucesso!` })
    setTimeout(() => setMessage(null), 4000)
  }

  function handleUpdate(updatedProduct) {
    updateProduct(editingProduct.id, updatedProduct)
    setEditingProduct(null)
    setMessage({ type: 'success', text: `"${updatedProduct.title}" atualizado com sucesso!` })
    setTimeout(() => setMessage(null), 4000)
  }

  function handleDelete(product) {
    if (!window.confirm(`Remover "${product.title || product.name}"?`)) return
    removeProduct(product.id)
    setMessage({ type: 'warning', text: `"${product.title || product.name}" removido.` })
    setTimeout(() => setMessage(null), 4000)
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <section className="section-spacing">
      <div className="admin-page-header">
        <div>
          <span className="section-label">Área Administrativa</span>
          <h2>Gerenciador de Produtos</h2>
          <p>Olá, <strong>{user?.username}</strong>. Produtos adicionados aqui são persistidos no armazenamento local.</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Sair da conta</button>
      </div>

      {message && <FeedbackMessage type={message.type} message={message.text} />}

      <div className="admin-layout">
        <div className="admin-form-card">
          {editingProduct ? (
            <>
              <h3 className="admin-subtitle">Editar produto</h3>
              <button
                className="cancel-edit-btn"
                onClick={() => setEditingProduct(null)}
              >
                ← Cancelar edição
              </button>
              <ProductForm
                key={editingProduct.id}
                initialData={editingProduct}
                onSubmit={handleUpdate}
                submitLabel="Salvar alterações"
              />
            </>
          ) : (
            <>
              <h3 className="admin-subtitle">Novo produto</h3>
              <ProductForm onSubmit={handleAdd} submitLabel="Cadastrar produto" />
            </>
          )}
        </div>

        <div className="admin-list-area">
          <h3 className="admin-subtitle">
            Produtos cadastrados por você{' '}
            <span className="admin-count">({customProducts.length})</span>
          </h3>

          {customProducts.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum produto cadastrado ainda.</p>
              <p>Use o formulário ao lado para adicionar o primeiro.</p>
            </div>
          ) : (
            <div className="admin-product-list">
              {customProducts.map((product) => (
                <div key={product.id} className="admin-product-item">
                  <img
                    src={product.image || 'https://via.placeholder.com/60'}
                    alt={product.title || product.name}
                    className="admin-product-thumb"
                  />
                  <div className="admin-product-info">
                    <strong>{product.title || product.name}</strong>
                    <span className="admin-product-category">{product.category}</span>
                    <span className="admin-product-price">
                      {typeof product.price === 'number'
                        ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
                        : product.price}
                    </span>
                  </div>
                  <div className="admin-product-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setEditingProduct(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
