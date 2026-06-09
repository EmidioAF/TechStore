import { useMemo, useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortSelect from '../components/SortSelect'
import ProductList from '../components/ProductList'
import FeedbackMessage from '../components/FeedbackMessage'

export default function Products() {
  const { products: allProducts, categories, loading, error } = useProductsContext()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const products = useMemo(() => {
    let filteredProducts = [...allProducts]

    if (search.trim()) {
      filteredProducts = filteredProducts.filter((product) => {
        const productTitle = product.title || product.name || ''
        return productTitle.toLowerCase().includes(search.toLowerCase())
      })
    }

    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (sortBy === 'title-asc') {
      filteredProducts.sort((a, b) => {
        const titleA = a.title || a.name || ''
        const titleB = b.title || b.name || ''
        return titleA.localeCompare(titleB)
      })
    }

    if (sortBy === 'title-desc') {
      filteredProducts.sort((a, b) => {
        const titleA = a.title || a.name || ''
        const titleB = b.title || b.name || ''
        return titleB.localeCompare(titleA)
      })
    }

    if (sortBy === 'price-asc') {
      filteredProducts.sort((a, b) => Number(a.price) - Number(b.price))
    }

    if (sortBy === 'price-desc') {
      filteredProducts.sort((a, b) => Number(b.price) - Number(a.price))
    }

    return filteredProducts
  }, [allProducts, search, selectedCategory, sortBy])

  return (
    <section className="section-spacing">
      <div className="section-header">
        <p className="section-label">Catálogo interativo</p>
        <h2>Explore os produtos da TechStore</h2>
        <p>
          Nesta etapa do RA2, a página de produtos evolui com busca, filtros,
          ordenação e integração com serviço de dados.
        </p>
      </div>

      <div className="filters-panel">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {loading && <FeedbackMessage type="info" message="Carregando produtos..." />}
      {error && <FeedbackMessage type="error" message="Erro ao carregar os produtos." />}

      {!loading && !error && products.length === 0 && (
        <FeedbackMessage
          type="warning"
          message="Nenhum produto encontrado com os filtros atuais."
        />
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}
    </section>
  )
}