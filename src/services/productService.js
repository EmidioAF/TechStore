import { request } from './api'

export async function getAllProducts() {
  return request('/products')
}

export async function getAllCategories() {
  const products = await getAllProducts()
  const unique = [...new Set(products.map((p) => p.category).filter(Boolean))]
  return unique
}

export async function createProduct(formData) {
  const token = localStorage.getItem('techstore_token')

  const response = await fetch('http://localhost:3001/api/products', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao criar produto.')
  }

  return data
}

export async function removeProduct(id) {
  return request(`/products/${id}`, { method: 'DELETE' })
}