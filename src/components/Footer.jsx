export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background:  'var(--navy)',
      borderTop:   '1px solid rgba(201,168,76,0.15)',
      padding:     '48px 0',
    }}>
      <div className="container">
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            '20px',
        }}>
          {/* Wordmark */}
          <div style={{
            fontFamily:    'var(--font-serif)',
            fontSize:      '1.4rem',
            fontWeight:    500,
            color:         'var(--white)',
            letterSpacing: '0.02em',
          }}>
            V<span style={{ color: 'var(--gold)' }}>.</span>Kaikai
          </div>

          {/* Centre note */}
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            color:         'rgba(247,244,239,0.3)',
            letterSpacing: '0.08em',
            textAlign:     'center',
          }}>
            Built with Django REST Framework · React · PostgreSQL
            <br />
            <span style={{ color: 'rgba(247,244,239,0.18)' }}>
              © {year} Vincent Kaikai · Nairobi, Kenya 🇰🇪
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {['About', 'Skills', 'Projects', 'Contact'].map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         'rgba(247,244,239,0.35)',
                  textDecoration: 'none',
                  transition:    'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(247,244,239,0.35)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
