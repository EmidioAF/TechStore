export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span>⚡ TechStore</span>
          <p>Sua loja de periféricos, monitores e acessórios gamer.</p>
        </div>
        <div className="footer-links">
          <p>© {new Date().getFullYear()} TechStore — Projeto Acadêmico PUC-PR</p>
        </div>
      </div>
    </footer>
  )
}
