import { useState } from 'react'
import FeedbackMessage from './FeedbackMessage'

const initialFormData = {
  title: '',
  price: '',
  category: '',
  image: '',
  description: '',
}

export default function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'O nome do produto é obrigatório.'
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Informe um preço válido maior que zero.'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'A categoria é obrigatória.'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Informe a URL da imagem.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      setSuccessMessage('')
      return
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      name: formData.title,
    })

    setFormData(initialFormData)
    setErrors({})
    setSuccessMessage('Produto enviado com sucesso.')
  }

  return (
    <div className="form-wrapper">
      <h3 className="admin-subtitle">Novo produto</h3>

      {successMessage && (
        <FeedbackMessage type="success" message={successMessage} />
      )}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Nome do produto</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">URL da imagem</label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <span className="form-error">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        <button type="submit" className="primary-button">
          Cadastrar produto
        </button>
      </form>
    </div>
  )
}