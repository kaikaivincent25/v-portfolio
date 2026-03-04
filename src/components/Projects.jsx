// src/components/Projects.jsx
import { useState } from 'react'
import { useApi } from '../hooks/useApi'

const filters = ['All', 'software', 'cybersecurity', 'fullstack']

export default function Projects() {
  const { data, loading } = useApi('/projects/')
  const [active, setActive] = useState('All')

  const filtered = data
    ? (active === 'All' ? data : data.filter(p => p.category === active))
    : []

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">// my work</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />

        {/* Filter tabs */}
        <div style={{display:'flex', gap:'12px', marginBottom:'48px', flexWrap:'wrap'}}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              padding:'8px 20px', fontFamily:'var(--font-mono)',
              fontSize:'0.78rem', letterSpacing:'0.1em',
              background: active === f ? 'var(--accent)' : 'transparent',
              color:       active === f ? 'var(--bg)'    : 'var(--text-dim)',
              border:`1px solid ${active === f ? 'var(--accent)' : 'var(--border)'}`,
              transition:'all 0.2s', textTransform:'capitalize',
            }}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{fontFamily:'var(--font-mono)', color:'var(--accent)'}}>
            Loading<span className="blink">_</span>
          </p>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',
            gap:'24px',
          }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const catColor = {
    software: 'var(--accent)',
    cybersecurity: 'var(--accent3)',
    fullstack: 'var(--accent2)',
  }[project.category] || 'var(--accent)'

  return (
    <div style={{
      background:'var(--bg2)', border:'1px solid var(--border)',
      padding:'28px', display:'flex', flexDirection:'column', gap:'16px',
      transition:'border-color 0.2s, transform 0.2s',
      animation:`fadeUp 0.5s ${delay}s ease both`,
    }}
    onMouseEnter={e=>{
      e.currentTarget.style.borderColor=catColor
      e.currentTarget.style.transform='translateY(-4px)'
    }}
    onMouseLeave={e=>{
      e.currentTarget.style.borderColor='var(--border)'
      e.currentTarget.style.transform='translateY(0)'
    }}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <span style={{
          fontFamily:'var(--font-mono)', fontSize:'0.7rem',
          color:catColor, letterSpacing:'0.1em', textTransform:'uppercase',
          border:`1px solid ${catColor}`, padding:'3px 8px',
        }}>
          {project.category_display}
        </span>
        {project.is_featured && (
          <span style={{
            fontFamily:'var(--font-mono)', fontSize:'0.65rem',
            color:'var(--accent)', opacity:0.7,
          }}>★ featured</span>
        )}
      </div>

      <h3 style={{fontSize:'1.15rem', fontWeight:700, color:'var(--text)'}}>
        {project.title}
      </h3>

      <p style={{
        color:'var(--text-dim)', fontSize:'0.88rem',
        lineHeight:1.7, flexGrow:1,
      }}>
        {project.description.slice(0, 120)}…
      </p>

      {/* Tech stack chips */}
      <div style={{display:'flex', flexWrap:'wrap', gap:'8px'}}>
        {project.tech_stack_list.map(t => (
          <span key={t} style={{
            fontFamily:'var(--font-mono)', fontSize:'0.7rem',
            color:'var(--text-dim)', background:'var(--bg3)',
            padding:'3px 10px', border:'1px solid var(--border)',
          }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{display:'flex', gap:'16px', paddingTop:'8px', borderTop:'1px solid var(--border)'}}>
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" style={{
            fontFamily:'var(--font-mono)', fontSize:'0.75rem',
            color:'var(--accent)', textDecoration:'none', letterSpacing:'0.05em',
          }}>GitHub →</a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" style={{
            fontFamily:'var(--font-mono)', fontSize:'0.75rem',
            color:'var(--accent2)', textDecoration:'none', letterSpacing:'0.05em',
          }}>Live Demo →</a>
        )}
      </div>
    </div>
  )
}