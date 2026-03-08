import { useApi } from '../hooks/useApi'
import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const CATEGORY_ICON = {
  'Backend Development':  '⚙',
  'Frontend Development': '🖥',
  'Cybersecurity':        '🔒',
  'Database':             '🗄',
  'Tools & DevOps':       '🔧',
}

const STATS = [
  { num: null,  label: 'Technical Skills'    },
  { num: '3+',  label: 'Years Studying CS'   },
  { num: '5+',  label: 'Projects Completed'  },
  { num: '2',   label: 'Core Specialisations'},
]

function SkillBar({ skill }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="skills__skill">
      <div className="skills__skill-meta">
        <span className="skills__skill-name">{skill.name}</span>
        <span className="skills__skill-pct">{skill.proficiency}%</span>
      </div>
      <div className="skills__bar-track">
        <div
          className="skills__bar-fill"
          style={{ width: animated ? `${skill.proficiency}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { data, loading } = useApi('/skills/')

  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="eyebrow">Technical Proficiency</p>
        <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '8px' }}>
          Skills & <span style={{ color: 'var(--gold)' }}>Expertise</span>
        </h2>
        <div className="divider" />

        {loading ? (
          <div className="skills__skeleton-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skills__skeleton-card skeleton" />
            ))}
          </div>
        ) : data ? (
          <>
            <div className="skills__grid">
              {Object.entries(data.grouped).map(([category, skills]) => (
                <div key={category} className="skills__category">
                  <div className="skills__category-header">
                    <span className="skills__category-icon">
                      {CATEGORY_ICON[category] || '◆'}
                    </span>
                    <h3 className="skills__category-title">{category}</h3>
                  </div>
                  {skills.map(skill => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              ))}
            </div>

            <div className="skills__stats">
              {STATS.map(({ num, label }, i) => (
                <div key={label} className="skills__stat">
                  <div className="skills__stat-num">
                    {num ?? (data.skills?.length || 0)}
                  </div>
                  <div className="skills__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
