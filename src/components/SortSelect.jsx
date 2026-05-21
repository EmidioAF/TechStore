export default function SortSelect({ value, onChange }) {
  return (
    <div className="filter-group">
      <label htmlFor="sort" className="filter-label">
        Ordenar por
      </label>
      <select
        id="sort"
        className="filter-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="default">Padrão</option>
        <option value="title-asc">Nome A-Z</option>
        <option value="title-desc">Nome Z-A</option>
        <option value="price-asc">Menor preço</option>
        <option value="price-desc">Maior preço</option>
      </select>
    </div>
  )
}