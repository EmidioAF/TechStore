import { useRef, useState } from 'react'
import FeedbackMessage from './FeedbackMessage'

const initialState = {
  title: '',
  price: '',
  category: '',
  description: '',
  image: '',
}

export default function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialState)
  const [imageMode, setImageMode] = useState('url')
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'image' && imageMode === 'url') {
      setPreview(value)
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]

    if (!file) {
      setPreview('')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Selecione apenas arquivos de imagem.')
      e.target.value = ''
      setPreview('')
      return
    }

    setError('')
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.price || !formData.category) {
      setError('Preencha título, preço e categoria.')
      return
    }

    if (imageMode === 'upload' && !fileInputRef.current?.files?.[0]) {
      setError('Selecione uma imagem para upload.')
      return
    }

    try {
      setLoading(true)

      const form = new FormData()
      form.append('title', formData.title)
      form.append('name', formData.title)
      form.append('price', Number(formData.price))
      form.append('category', formData.category)
      form.append('description', formData.description)

      if (imageMode === 'upload' && fileInputRef.current?.files?.[0]) {
        form.append('image', fileInputRef.current.files[0])
      }

      if (imageMode === 'url') {
        form.append('imageUrl', formData.image)
      }

      await onSubmit(form)

      setFormData(initialState)
      setPreview('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar produto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-wrapper">
      <div className="section-header">
        <p className="section-label">Novo produto</p>
        <h2>Cadastrar produto</h2>
      </div>

      {error && <FeedbackMessage type="error" message={error} />}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Nome do produto</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Mouse Gamer Logitech"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ex: 199.90"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Periféricos">Periféricos</option>
            <option value="Áudio">Áudio</option>
            <option value="Monitores">Monitores</option>
            <option value="Acessórios">Acessórios</option>
          </select>
        </div>

        <div className="form-group">
          <label>Forma da imagem</label>
          <div className="image-mode-tabs">
            <button
              type="button"
              className={`image-tab ${imageMode === 'url' ? 'active' : ''}`}
              onClick={() => {
                setImageMode('url')
                setPreview(formData.image || '')
                setError('')
              }}
            >
              URL
            </button>

            <button
              type="button"
              className={`image-tab ${imageMode === 'upload' ? 'active' : ''}`}
              onClick={() => {
                setImageMode('upload')
                setPreview('')
                setError('')
              }}
            >
              Upload
            </button>
          </div>
        </div>

        {imageMode === 'url' ? (
          <div className="form-group">
            <label htmlFor="image">URL da imagem</label>
            <input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="file">Upload da imagem</label>
            <div className="upload-area">
              <input
                ref={fileInputRef}
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="upload-input"
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="upload-label">
                Clique para selecionar uma imagem
              </label>
            </div>
          </div>
        )}

        {preview && (
          <img
            src={preview}
            alt="Pré-visualização"
            className="image-preview"
            onError={() => setPreview('')}
          />
        )}

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva o produto..."
          />
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar produto'}
        </button>
      </form>
    </div>
  )
}