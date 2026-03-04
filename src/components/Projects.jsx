import { useState } from 'react'
import { useApi } from '../hooks/useApi'

const FILTERS = [
  { value: 'all',           label: 'All Projects'        },
  { value: 'software',      label: 'Software Development' },
  { value: 'cybersecurity', label: 'Cybersecurity'        },
  { value: 'fullstack',     label: 'Full Stack'           },
]

const CAT_COLOR = {
  software:      { bg: 'rgba(90,122,153,0.12)', text: 'var(--slate)',    border: 'rgba(90,122,153,0.3)'  },
  cybersecurity: { bg: 'rgba(192,57,43,0.1)',   text: '#c0392b',         border: 'rgba(192,57,43,0.3)'   },
  fullstack:     { bg: 'rgba(201,168,76,0.1)',   text: 'var(--gold-dim)', border: 'rgba(201,168,76,0.3)'  },
  other:         { bg: 'rgba(90,122,153,0.08)',  text: 'var(--text-mid)', border: 'rgba(90,122,153,0.2)'  },
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const cat   = CAT_COLOR[project.category] || CAT_COLOR.other
  const delay = (index % 3) * 0.1

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:  'var(--white)',
        border:      `1px solid ${hovered ? 'var(--gold)' : 'var(--ivory-dim)'}`,
        borderTop:   `3px solid ${hovered ? 'var(--gold)' : 'var(--ivory-dim)'}`,
        padding:     '32px',
        display:     'flex',
        flexDirection: 'column',
        gap:         '16px',
        transition:  'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform:   hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:   hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        animation:   `fadeUp 0.6s ${delay}s both`,
        cursor:      'default',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding:       '4px 10px',
          background:    cat.bg,
          color:         cat.text,
          border:        `1px solid ${cat.border}`,
          fontWeight:    500,
        }}>
          {project.category_display}
        </span>
        {project.is_featured && (
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.08em',
            color:         'var(--gold-dim)',
            textTransform: 'uppercase',
            display:       'flex',
            alignItems:    'center',
            gap:           '4px',
          }}>
            ★ Featured
          </span>
        )}
      </div>

      {/* Project image */}
      {project.image_url && (
        <div style={{
          height:     '180px',
          overflow:   'hidden',
          background: 'var(--ivory-dim)',
          margin:     '0 -32px',
        }}>
          <img
            src={project.image_url}
            alt={project.title}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s',
              transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontFamily:  'var(--font-serif)',
        fontSize:    '1.3rem',
        fontWeight:  500,
        color:       'var(--navy)',
        lineHeight:  1.3,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize:   '0.88rem',
        color:      'var(--text-mid)',
        lineHeight: 1.75,
        flexGrow:   1,
        fontWeight: 300,
      }}>
        {project.description.length > 130
          ? project.description.slice(0, 130) + '…'
          : project.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech_stack_list.map(t => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--ivory-dim)' }} />

      {/* Links */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--text-mid)',
              textDecoration: 'none',
              transition:    'color 0.2s',
              display:       'flex',
              alignItems:    'center',
              gap:           '5px',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--navy)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-mid)'}
          >
            GitHub ↗
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         'var(--gold-dim)',
              textDecoration: 'none',
              transition:    'color 0.2s',
              display:       'flex',
              alignItems:    'center',
              gap:           '5px',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = 'var(--gold-dim)'}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const { data, loading } = useApi('/projects/')
  const [active, setActive] = useState('all')

  const filtered = data
    ? (active === 'all' ? data : data.filter(p => p.category === active))
    : []

  return (
    <section id="projects" style={{ background: 'var(--ivory)', padding: '120px 0' }}>
      <div className="container">
        <p className="eyebrow">Portfolio</p>
        <h2 className="heading-lg" style={{ color: 'var(--navy)', marginBottom: '8px' }}>
          Selected{' '}
          <span style={{ color: 'var(--gold-dim)' }}>Work</span>
        </h2>
        <div className="divider" />

        {/* Filter bar */}
        <div style={{
          display:       'flex',
          gap:           '2px',
          marginBottom:  '48px',
          background:    'var(--ivory-dim)',
          padding:       '2px',
          width:         'fit-content',
        }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                padding:       '10px 22px',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background:    active === f.value ? 'var(--navy)' : 'transparent',
                color:         active === f.value ? 'var(--gold)' : 'var(--text-mid)',
                border:        'none',
                cursor:        'pointer',
                transition:    'all 0.25s',
                fontWeight:    active === f.value ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {loading ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap:                 '24px',
          }}>
            {[1,2,3].map(i => (
              <div key={i} className="skeleton" style={{ height: '340px' }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap:                 '24px',
          }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign:  'center',
            padding:    '80px 0',
            color:      'var(--text-light)',
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.85rem',
          }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
