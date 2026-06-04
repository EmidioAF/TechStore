import { useState } from 'react'

const empty = {
  title: '',
  price: '',
  category: '',
  image: '',
  description: '',
}

export default function ProductForm({ onSubmit, initialData, submitLabel = 'Cadastrar produto' }) {
  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title || initialData.name || '',
          price: initialData.price || '',
          category: initialData.category || '',
          image: typeof initialData.image === 'string' ? initialData.image : '',
          description: initialData.description || '',
        }
      : empty
  )
  const [imagePreview, setImagePreview] = useState(
    initialData?.image && !initialData.image.startsWith('data:') ? initialData.image : ''
  )
  const [imageData, setImageData] = useState(
    initialData?.image?.startsWith('data:') ? initialData.image : ''
  )
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleImageFile(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'O arquivo deve ser uma imagem.' }))
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result
      setImageData(base64)
      setImagePreview(base64)
      setForm((prev) => ({ ...prev, image: base64 }))
      setErrors((prev) => ({ ...prev, image: undefined }))
    }
    reader.readAsDataURL(file)
  }

  function removeImage() {
    setImageData('')
    setImagePreview('')
    setForm((prev) => ({ ...prev, image: '' }))
  }

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Nome obrigatório.'
    if (!form.price || Number(form.price) <= 0) e.price = 'Informe um preço válido (maior que 0).'
    if (!form.category.trim()) e.category = 'Categoria obrigatória.'
    if (!form.image.trim()) e.image = 'Adicione uma imagem (URL ou upload).'
    if (!form.description.trim()) e.description = 'Descrição obrigatória.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      price: Number(form.price),
      name: form.title,
    })
    if (!initialData) {
      setForm(empty)
      setImagePreview('')
      setImageData('')
      setErrors({})
    }
  }

  const previewSrc = imageData || imagePreview

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="pf-title">Nome do produto</label>
        <input
          id="pf-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: Mouse Gamer Logitech G502"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pf-price">Preço (R$)</label>
        <input
          id="pf-price"
          name="price"
          type="number"
          step="0.01"
          min="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Ex: 299.90"
        />
        {errors.price && <span className="form-error">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pf-category">Categoria</label>
        <input
          id="pf-category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          placeholder="Ex: Periféricos"
        />
        {errors.category && <span className="form-error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Imagem do produto</label>
        <div className="image-input-row">
          <input
            name="image-url"
            type="text"
            value={imageData ? '' : form.image}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, image: e.target.value }))
              setImageData('')
              setImagePreview(e.target.value)
            }}
            placeholder="Cole a URL da imagem..."
            disabled={!!imageData}
          />
          <span className="sep">ou</span>
          <label className="upload-btn">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {previewSrc && (
          <div className="image-preview-row">
            <img src={previewSrc} alt="Prévia" className="image-thumb" />
            <button type="button" className="remove-image-btn" onClick={removeImage}>
              ✕ Remover
            </button>
          </div>
        )}
        {errors.image && <span className="form-error">{errors.image}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pf-description">Descrição</label>
        <textarea
          id="pf-description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          placeholder="Descreva o produto..."
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <button type="submit" className="primary-button">{submitLabel}</button>
    </form>
  )
}
