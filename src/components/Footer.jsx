// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      borderTop:'1px solid var(--border)', padding:'40px 0',
      textAlign:'center', fontFamily:'var(--font-mono)',
      fontSize:'0.75rem', color:'var(--text-dim)',
    }}>
      <div className="container">
        <p>
          <span style={{color:'var(--accent)'}}>vincent_kaikai</span>
          {' '}·{' '}Built with Django REST + React
          {' '}·{' '}{new Date().getFullYear()}
        </p>
        <p style={{marginTop:'8px', opacity:0.5}}>
          Nairobi, Kenya 🇰🇪
        </p>
      </div>
    </footer>
  )
}