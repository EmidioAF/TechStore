export default function About() {
  return (
    <section className="about-page section-spacing">
      <div className="section-header">
        <span className="section-label">Sobre a TechStore</span>
        <h2>Conheça nossa história</h2>
      </div>

      <div className="about-grid">
        <article className="info-card">
          <h3>Quem somos</h3>
          <p>
            A TechStore é um projeto acadêmico desenvolvido na PUC-PR para demonstrar
            conceitos de desenvolvimento web moderno com React. Simulamos uma vitrine
            real de produtos de tecnologia, evoluindo a cada entrega.
          </p>
        </article>

        <article className="info-card">
          <h3>Nossos valores</h3>
          <p>
            Qualidade, inovação e experiência do usuário são os pilares que guiam
            cada decisão técnica e de design tomada no projeto.
          </p>
        </article>

        <article className="info-card">
          <h3>Tecnologias</h3>
          <p>
            React 18 · React Router v6 · Vite · Context API · localStorage
            (persistência) · JWT simulado (autenticação) · Upload base64.
          </p>
        </article>
      </div>
    </section>
  )
}
