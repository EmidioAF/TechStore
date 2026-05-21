export default function SearchBar({ value, onChange }) {
  return (
    <div className="filter-group">
      <label htmlFor="search" className="filter-label">
        Buscar produto
      </label>
      <input
        id="search"
        type="text"
        className="filter-input"
        placeholder="Digite o nome do produto"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}