import ProductList from '../components/ProductList'
import FeedbackMessage from '../components/FeedbackMessage'
import { useProductsContext } from '../context/ProductsContext'

export default function Home() {
  const { products, loading, error } = useProductsContext()
  const featuredProducts = products.slice(0, 3)

  return (
    <>
      <section className="hero-section">
        <div>
          <p className="section-label">TechStore</p>
          <h2>Bem-vindo à TechStore</h2>
          <p>
            Sua loja virtual de tecnologia com catálogo integrado ao backend,
            autenticação de usuários, área administrativa e cadastro de produtos.
          </p>
        </div>

        <div className="hero-card">
          <h3>O que oferecemos?</h3>
          <p>Produtos de tecnologia para montar e melhorar seu setup.</p>
          <ul>
            <li>Periféricos</li>
            <li>Monitores</li>
            <li>Acessórios</li>
            <li>Áudio</li>
          </ul>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-header">
          <p className="section-label">Produtos em destaque</p>
          <h2>Confira alguns itens do catálogo</h2>
          <p>
            Os produtos abaixo são carregados diretamente da API da aplicação.
          </p>
        </div>

        {loading && (
          <FeedbackMessage type="info" message="Carregando produtos..." />
        )}

        {error && (
          <FeedbackMessage type="error" message="Erro ao carregar produtos." />
        )}

        {!loading && !error && featuredProducts.length === 0 && (
          <FeedbackMessage
            type="warning"
            message="Nenhum produto cadastrado ainda."
          />
        )}

        {!loading && !error && featuredProducts.length > 0 && (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </>
  )
}