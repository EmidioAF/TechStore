export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="filter-group">
      <label htmlFor="category" className="filter-label">
        Categoria
      </label>
      <select
        id="category"
        className="filter-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="all">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}