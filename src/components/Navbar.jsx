// src/components/Navbar.jsx
import { useState, useEffect } from 'react'

const links = ['About','Skills','Projects','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: '20px 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'all 0.3s',
    background: scrolled ? 'rgba(5,8,16,0.95)' : 'transparent',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
  }

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <a href="#hero" style={{fontFamily:'var(--font-mono)', color:'var(--accent)',
        fontSize:'1.1rem', textDecoration:'none', letterSpacing:'0.1em'}}>
        VK<span className="blink" style={{color:'var(--accent)'}}>_</span>
      </a>

      {/* Desktop links */}
      <div style={{display:'flex', gap:'36px'}}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily:'var(--font-mono)', fontSize:'0.8rem',
            color:'var(--text-dim)', textDecoration:'none',
            letterSpacing:'0.1em', transition:'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--accent)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
            <span style={{color:'var(--accent)'}}>0{links.indexOf(l)+1}.</span> {l}
          </a>
        ))}
      </div>
    </nav>
  )
}