import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            V<span className="footer__logo-dot">.</span>Kaikai
          </div>

          <div className="footer__copy">
            Built with Django REST Framework · React · PostgreSQL
            <br />
            <span className="footer__copy-dim">
              © {year} Vincent Kaikai · Nairobi, Kenya 🇰🇪
            </span>
          </div>

          <nav className="footer__links">
            {['About', 'Skills', 'Projects', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer__link">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
