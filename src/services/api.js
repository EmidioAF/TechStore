const API_URL = 'http://localhost:3001/api'

export async function request(path, options = {}) {
  const token = localStorage.getItem('techstore_token')
  const headers = { ...(options.headers || {}) }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição.')
  }

  return data
}