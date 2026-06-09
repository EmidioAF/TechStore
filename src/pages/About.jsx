/**
 * Página de informações sobre a empresa TechStore.
 * Responsabilidades:
 * - Apresenta a história e valores da empresa
 * - Exibe objetivos do projeto acadêmico
 * - Fornece contexto sobre o propósito da aplicação
 * 
 * Estrutura:
 * - Seção com cards de informações (grid layout)
 * - Cada card contém um aspecto diferente da empresa
 */

export default function About() {
  return (
    <section className="about-page section-spacing">
      {/* Header da página - título e subtítulo */}
      <div className="section-header">
        <p className="section-label">Sobre a TechStore</p>
        <h2>Conheça a nossa história</h2>
      </div>

      {/* Grid de informações: 3 cards com informações sobre a empresa */}
      <div className="about-grid">
        
        {/* Card 1: Identificação - Quem somos */}
        <article className="info-card">
          <h3>Quem somos?</h3>
          <p>
            A TechStore é um projeto acadêmico criado para demonstrar os fundamentos do desenvolvimento web com React. 
            Nosso objetivo é construir uma vitrine simples de produtos de tecnologia, evoluindo gradualmente para um e-commerce mais completo.
          </p>
        </article>

        {/* Card 2: Valores - Princípios da empresa */}
        <article className="info-card">
          <h3>Nossos valores</h3>
          <p>
            Compromisso com a qualidade, inovação contínua e satisfação do cliente são os pilares que orientam nossa atuação.
          </p>
        </article>

        {/* Card 3: Objetivo - Propósito do projeto */}
        <article className="info-card">
          <h3>Nosso objetivo</h3>
          <p>
            Criar uma plataforma de e-commerce acadêmica simples, que sirva como base para aprendizado e evolução nas próximas entregas do projeto.
          </p>
        </article>
      </div>
    </section>
  )
}