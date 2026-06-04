// RA3 — Persistência real via localStorage
// Simula um backend: produtos adicionados pelo admin sobrevivem ao reload

const CUSTOM_KEY = 'techstore_custom_products'

export function saveCustomProducts(products) {
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(products))
  } catch (err) {
    console.error('[storageService] Erro ao salvar:', err)
  }
}

export function loadCustomProducts() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function clearCustomProducts() {
  localStorage.removeItem(CUSTOM_KEY)
}
