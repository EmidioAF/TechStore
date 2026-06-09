import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getAllProducts,
  getAllCategories,
  createProduct,
  removeProduct,
} from '../services/productService'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadData() {
    try {
      setLoading(true)
      setError(false)

      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ])

      setProducts(productsData)
      setCategories(categoriesData)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function addProduct(formData) {
    const created = await createProduct(formData)
    setProducts((prev) => [created, ...prev])

    if (created.category && !categories.includes(created.category)) {
      setCategories((prev) => [...prev, created.category])
    }
  }

  async function deleteProduct(id) {
    await removeProduct(id)
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)))
  }

  function getProductById(id) {
    return products.find((p) => String(p.id) === String(id))
  }

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      addProduct,
      deleteProduct,
      getProductById,
      reload: loadData,
    }),
    [products, categories, loading, error]
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(ProductsContext)
}