import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAllProducts, getAllCategories } from '../services/productService'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true)
        setError(false)

        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ])

        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  function addProduct(newProduct) {
    const normalizedProduct = {
      ...newProduct,
      id: Date.now(),
      title: newProduct.title || newProduct.name,
      name: newProduct.name || newProduct.title,
      description: newProduct.description || 'Produto sem descrição.',
    }

    setProducts((prevProducts) => [normalizedProduct, ...prevProducts])

    if (
      normalizedProduct.category &&
      !categories.includes(normalizedProduct.category)
    ) {
      setCategories((prevCategories) => [
        ...prevCategories,
        normalizedProduct.category,
      ])
    }
  }

  function getProductById(productId) {
    return products.find((product) => String(product.id) === String(productId))
  }

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      addProduct,
      getProductById,
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