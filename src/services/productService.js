import { products as localProducts } from '../data/products'
import { categories as localCategories } from '../data/categories'

const USE_REMOTE_API = false

export async function getAllProducts() {
  if (!USE_REMOTE_API) {
    return Promise.resolve(localProducts)
  }

  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()

  return data.products.map((product) => ({
    id: product.id,
    title: product.title,
    name: product.title,
    price: product.price,
    category: product.category,
    image: product.thumbnail,
    description: product.description,
  }))
}

export async function getAllCategories() {
  if (!USE_REMOTE_API) {
    return Promise.resolve(localCategories)
  }

  const response = await fetch('https://dummyjson.com/products/category-list')
  const data = await response.json()

  return data
}