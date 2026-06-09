import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = 3001
const JWT_SECRET = 'techstore_ra3_secret'
const uploadsDir = path.join(__dirname, 'uploads')
const dbPath = path.join(__dirname, 'db.json')

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify({ users: [], products: [] }, null, 2)
  )
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
const adminExists = db.users.some(
  (user) => user.email === 'admin@techstore.com'
)

if (!adminExists) {
  const adminHash = bcrypt.hashSync('admin123', 10)
  db.users.push({
    id: 1,
    name: 'Admin TechStore',
    email: 'admin@techstore.com',
    password: adminHash,
    role: 'admin',
  })
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  )
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado.' })
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito ao administrador.' })
  }
  next()
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .toLowerCase()
    cb(null, `${Date.now()}-${base}${ext}`)
  },
})

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Apenas imagens são permitidas.'))
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha nome, email e senha.' })
  }

  const db = readDb()
  const exists = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )

  if (exists) {
    return res.status(409).json({ message: 'E-mail já cadastrado.' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    role: 'user',
  }

  db.users.push(user)
  writeDb(db)

  const token = generateToken(user)

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const db = readDb()

  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' })
  }

  const ok = await bcrypt.compare(password, user.password)

  if (!ok) {
    return res.status(401).json({ message: 'Credenciais inválidas.' })
  }

  const token = generateToken(user)

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

app.get('/api/auth/me', auth, (req, res) => {
  res.json(req.user)
})

app.get('/api/products', (_req, res) => {
  const db = readDb()
  res.json(db.products)
})

app.post('/api/products', auth, adminOnly, upload.single('image'), (req, res) => {
  const { title, name, price, category, description, imageUrl } = req.body

  if (!title && !name) {
    return res.status(400).json({ message: 'Nome do produto é obrigatório.' })
  }

  const db = readDb()

  const product = {
    id: Date.now(),
    title: title || name,
    name: name || title,
    price: Number(price),
    category,
    description,
    image: req.file
      ? `http://localhost:${PORT}/uploads/${req.file.filename}`
      : imageUrl || '',
    createdAt: new Date().toISOString(),
    createdBy: req.user.id,
  }

  db.products.unshift(product)
  writeDb(db)

  res.status(201).json(product)
})

app.delete('/api/products/:id', auth, adminOnly, (req, res) => {
  const db = readDb()
  const product = db.products.find((p) => String(p.id) === String(req.params.id))

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado.' })
  }

  if (product.image && product.image.includes('/uploads/')) {
    const filename = product.image.split('/uploads/')[1]
    const filepath = path.join(uploadsDir, filename)
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
  }

  db.products = db.products.filter((p) => String(p.id) !== String(req.params.id))
  writeDb(db)

  res.json({ message: 'Produto excluído com sucesso.' })
})

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'Erro no upload: ' + err.message })
  }

  if (err.message) {
    return res.status(400).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Erro interno do servidor.' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})