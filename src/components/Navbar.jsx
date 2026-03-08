import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['about', 'skills', 'projects', 'contact']
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
    <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
      <a href="#hero" className="navbar__logo">
        V<span className="dot">.</span>Kaikai
      </a>

      <div className="navbar__spacer" />

      <div className="navbar__links">
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace('#', '')
          return (
            <a
              key={label}
              href={href}
              className={`navbar__link ${active === id ? 'active' : ''}`}
            >
              {label}
              {active === id && <span className="navbar__link-indicator" />}
            </a>
          )
        })}
        <a href="#contact" className="navbar__cta">Hire Me</a>
      </div>
    </nav>
  )
}
