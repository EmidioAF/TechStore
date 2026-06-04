import { useMemo, useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortSelect from '../components/SortSelect'
import ProductList from '../components/ProductList'
import FeedbackMessage from '../components/FeedbackMessage'

export default function Products() {
  const { products: all, categories, loading, error } = useProductsContext()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  const products = useMemo(() => {
    let list = [...all]
    if (search.trim()) {
      list = list.filter((p) => {
        const t = p.title || p.name || ''
        return t.toLowerCase().includes(search.toLowerCase())
      })
    }
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (sort === 'title-asc') list.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''))
    if (sort === 'title-desc') list.sort((a, b) => (b.title || b.name || '').localeCompare(a.title || a.name || ''))
    if (sort === 'price-asc') list.sort((a, b) => Number(a.price) - Number(b.price))
    if (sort === 'price-desc') list.sort((a, b) => Number(b.price) - Number(a.price))
    return list
  }, [all, search, category, sort])

  return (
    <section className="section-spacing">
      <div className="section-header">
        <span className="section-label">Catálogo</span>
        <h2>Todos os produtos</h2>
      </div>

      <div className="filters-panel">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {loading && <FeedbackMessage type="info" message="Carregando produtos..." />}
      {error && <FeedbackMessage type="error" message="Erro ao carregar produtos." />}
      {!loading && !error && products.length === 0 && (
        <FeedbackMessage type="warning" message="Nenhum produto encontrado com os filtros atuais." />
      )}
      {!loading && !error && products.length > 0 && <ProductList products={products} />}
    </section>
  )
}
