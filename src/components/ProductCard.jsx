/**
 * Componente individual que exibe um produto.

 * - Recebe dados de um produto via props
 * - Renderiza imagem, nome, categoria, preço e botão de ação
 * - Mantem estilo consistente de apresentação
 * 
 * Props:
 * - name: String - Nome do produto
 * - price: String - Preço formatado (ex: "R$ 359,90")
 * - category: String - Categoria do produto (ex: "Periféricos")
 * - image: String - URL da imagem do produto
 * 
 * Conceitos utilizados:
 * - Desestruturação de props no parâmetro da função
 * - Renderização condicional de dados
 * - Interpolação de strings com template literals
 * - Atributo alt para acessibilidade de imagens
 */

export default function ProductCard({ name, price, category, image }) {
  return (
    <article className="product-card">
      {/* Imagem do produto */}
      {/* Alt text é importante para acessibilidade e SEO */}
      <img src={image} alt={name} className="product-image" />
      
      {/* Informações do produto */}
      <div className="product-info">
        {/* Categoria do produto (ex: "Periféricos", "Monitores") */}
        <span className="product-category">{category}</span>
        
        {/* Nome/Título do produto */}
        <h3>{name}</h3>
        
        {/* Preço formatado (já vem formatado do arquivo de dados) */}
        <p className="product-price">{price}</p>
        
        {/* Botão de chamada para ação - pode ser expandido com funcionalidade futura */}
        <button className="primary-button">Ver detalhes</button>
      </div>
    </article>
  )
}