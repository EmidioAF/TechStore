/**
 * AdminProducts - Área administrativa de produtos.
 * 
 * RA3: Rota protegida por autenticação. Exibe usuário logado,
 * permite cadastrar produtos com persistência e deletar itens criados.
 */

import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import FeedbackMessage from '../components/FeedbackMessage'
import { useProductsContext } from '../context/ProductsContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function AdminProducts() {
  const { products, addProduct, deleteProduct } = useProductsContext()
  const { user, logout } = useAuth()
  const [message, setMessage] = useState('')

  async function handleAddProduct(newProduct) {
    await addProduct(newProduct)
    setMessage('Produto cadastrado com sucesso no backend.')
  }

  // Filtra apenas os produtos criados pelo admin (têm campo createdAt)
  const adminProducts = products.filter(p => p.createdAt)
  const totalProducts = products.length

  return (
    <section className="section-spacing">
      <div className="admin-page-header">
        <div className="section-header">
          <p className="section-label">Área administrativa</p>
          <h2>Gestão de produtos</h2>
          <p>
            Produtos cadastrados são persistidos no backend e restaurados ao recarregar a página.
            Use o formulário ao lado para adicionar novos produtos e gerenciar os itens criados por você.
          </p>
        </div>

        {/* Info do usuário logado + botão logout */}
        <div className="admin-user-bar">
          <div className="admin-user-info">
            <span className="admin-user-avatar">{user?.name?.charAt(0)}</span>
            <div>
              <p className="admin-user-name">{user?.name}</p>
              <p className="admin-user-email">{user?.email}</p>
            </div>
            <span className="badge badge-admin">Admin</span>
          </div>
          <button className="logout-btn" onClick={logout}>Sair</button>
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="admin-stats">
        <div className="stat-card">
          <p className="stat-value">{totalProducts}</p>
          <p className="stat-label">Produtos no catálogo</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{adminProducts.length}</p>
          <p className="stat-label">Cadastrados nesta sessão</p>
        </div>
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

          <h3 className="admin-subtitle">
            Produtos cadastrados por você ({adminProducts.length})
          </h3>

          {adminProducts.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Nenhum produto cadastrado ainda. Use o formulário ao lado.</p>
          ) : (
            <div className="admin-products-list">
              {adminProducts.map(product => (
                <div key={product.id} className="admin-product-row">
                  <img
                    src={product.image}
                    alt={product.title || product.name}
                    className="admin-product-thumb"
                    onError={e => { e.target.src = 'https://placehold.co/60x60?text=Sem+Img' }}
                  />
                  <div className="admin-product-info">
                    <p className="admin-product-name">{product.title || product.name}</p>
                    <p className="admin-product-meta">
                      {product.category} • R$ {Number(product.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product.id)}
                    title="Excluir produto"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
