import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Highlight active section
      const sections = ['about','skills','projects','contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position:   'fixed',
        top:        0,
        left:       0,
        right:      0,
        zIndex:     1000,
        height:     '72px',
        display:    'flex',
        alignItems: 'center',
        padding:    '0 48px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: scrolled ? 'rgba(247,244,239,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}>
        {/* Wordmark */}
        <a href="#hero" style={{
          fontFamily:    'var(--font-serif)',
          fontSize:      '1.5rem',
          fontWeight:    600,
          letterSpacing: '0.02em',
          color:         scrolled ? 'var(--navy)' : 'var(--white)',
          textDecoration: 'none',
          flexShrink:    0,
          transition:    'color 0.4s',
        }}>
          V<span style={{color: 'var(--gold)'}}>.</span>Kaikai
        </a>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {NAV_LINKS.map(({ label, href }) => {
            const id   = href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '0.82rem',
                  fontWeight:    500,
                  letterSpacing: '0.04em',
                  color: scrolled
                    ? (isActive ? 'var(--gold-dim)' : 'var(--text-mid)')
                    : (isActive ? 'var(--gold-light)' : 'rgba(247,244,239,0.75)'),
                  textDecoration: 'none',
                  position:       'relative',
                  paddingBottom:  '4px',
                  transition:     'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = scrolled
                  ? (isActive ? 'var(--gold-dim)' : 'var(--text-mid)')
                  : (isActive ? 'var(--gold-light)' : 'rgba(247,244,239,0.75)')}
              >
                {label}
                {isActive && (
                  <span style={{
                    position:   'absolute',
                    bottom:     0,
                    left:       0,
                    right:      0,
                    height:     '1px',
                    background: 'var(--gold)',
                  }} />
                )}
              </a>
            )
          })}

          <a
            href="#contact"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding:       '10px 24px',
              border:        '1px solid var(--gold)',
              color:         'var(--gold)',
              textDecoration: 'none',
              transition:    'all 0.3s',
              background:    'transparent',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--gold)'
              e.target.style.color      = 'var(--navy)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.color      = 'var(--gold)'
            }}
          >
            Hire Me
          </a>
        </div>
      </nav>
    </>
  )
}
