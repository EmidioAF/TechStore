import { useEffect, useMemo, useState } from 'react'
import { getAllProducts, getAllCategories } from '../services/productService'

export function useProducts() {
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(false)

        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ])

        setAllProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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

  return {
    products,
    categories,
    search,
    selectedCategory,
    sortBy,
    loading,
    error,
    setSearch,
    setSelectedCategory,
    setSortBy,
  }
}