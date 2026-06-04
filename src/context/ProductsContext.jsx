import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAllProducts, getAllCategories } from '../services/productService'
import { loadCustomProducts, saveCustomProducts } from '../services/storageService'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [baseProducts, setBaseProducts] = useState([])
  const [customProducts, setCustomProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Combina produtos base (dados originais) + produtos persistidos pelo admin
  const products = useMemo(
    () => [...customProducts, ...baseProducts],
    [customProducts, baseProducts]
  )

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(false)
        const [prods, cats] = await Promise.all([getAllProducts(), getAllCategories()])
        setBaseProducts(prods)
        setCategories(cats)
        // RA3: carrega produtos persistidos no localStorage
        setCustomProducts(loadCustomProducts())
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function addProduct(newProduct) {
    const normalized = {
      ...newProduct,
      id: `custom-${Date.now()}`,
      title: newProduct.title || newProduct.name,
      name: newProduct.name || newProduct.title,
      description: newProduct.description || 'Produto sem descrição.',
    }
    const updated = [normalized, ...customProducts]
    setCustomProducts(updated)
    saveCustomProducts(updated) // RA3: persiste
    if (normalized.category && !categories.includes(normalized.category)) {
      setCategories((prev) => [...prev, normalized.category])
    }
  }

  function removeProduct(productId) {
    const updated = customProducts.filter((p) => String(p.id) !== String(productId))
    setCustomProducts(updated)
    saveCustomProducts(updated) // RA3: persiste
  }

  function updateProduct(productId, updatedData) {
    const updated = customProducts.map((p) =>
      String(p.id) === String(productId)
        ? {
            ...p,
            ...updatedData,
            title: updatedData.title || updatedData.name,
            name: updatedData.name || updatedData.title,
          }
        : p
    )
    setCustomProducts(updated)
    saveCustomProducts(updated) // RA3: persiste
  }

  function getProductById(productId) {
    return products.find((p) => String(p.id) === String(productId))
  }

  const value = useMemo(
    () => ({
      products,
      customProducts,
      categories,
      loading,
      error,
      addProduct,
      removeProduct,
      updateProduct,
      getProductById,
    }),
    [products, customProducts, categories, loading, error]
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
