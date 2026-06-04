// RA3 — Autenticação com token JWT simulado (header.payload.signature em base64)
// Em produção: substituir por chamada real a um backend com JWT

const ADMIN = { username: 'admin', password: 'admin123' }
const TOKEN_KEY = 'techstore_auth_token'
const SECRET = 'techstore-ra3-secret'

function b64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}

function b64decode(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))))
  } catch {
    return null
  }
}

function createToken(payload) {
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64(JSON.stringify({ ...payload, exp: Date.now() + 3600000 }))
  const sig = b64(`${header}.${body}.${SECRET}`)
  return `${header}.${body}.${sig}`
}

export function login(username, password) {
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = createToken({ username, role: 'admin' })
    localStorage.setItem(TOKEN_KEY, token)
    return { success: true, token }
  }
  return { success: false, error: 'Usuário ou senha inválidos.' }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const payload = b64decode(parts[1])
  if (!payload) return false
  return payload.exp > Date.now()
}

export function getUser() {
  const token = getToken()
  if (!token) return null
  const parts = token.split('.')
  return parts.length === 3 ? b64decode(parts[1]) : null
}
