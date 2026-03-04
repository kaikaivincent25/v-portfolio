import { useApi } from '../hooks/useApi'
import { useEffect, useRef, useState } from 'react'

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
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        marginBottom:   '8px',
        alignItems:     'baseline',
      }}>
        <span style={{
          fontSize:   '0.9rem',
          color:      'var(--ivory)',
          fontWeight: 400,
        }}>{skill.name}</span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.72rem',
          color:         'var(--gold)',
          letterSpacing: '0.04em',
        }}>{skill.proficiency}%</span>
      </div>
      <div style={{
        height:       '2px',
        background:   'rgba(247,244,239,0.08)',
        overflow:     'hidden',
        position:     'relative',
      }}>
        <div style={{
          position:   'absolute',
          top:        0, left: 0, bottom: 0,
          width:      animated ? `${skill.proficiency}%` : '0%',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          boxShadow:  '0 0 8px rgba(201,168,76,0.4)',
        }} />
      </div>
    </div>
  )
}

const CATEGORY_ICON = {
  'Backend Development':  '⚙',
  'Frontend Development': '🖥',
  'Cybersecurity':        '🔒',
  'Database':             '🗄',
  'Tools & DevOps':       '🔧',
}

export default function Skills() {
  const { data, loading } = useApi('/skills/')

  return (
    <section id="skills" style={{
      background: 'var(--navy)',
      padding:    '120px 0',
    }}>
      <div className="container">
        <p className="eyebrow">Technical Proficiency</p>
        <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '8px' }}>
          Skills &{' '}
          <span style={{ color: 'var(--gold)' }}>Expertise</span>
        </h2>
        <div className="divider" />

        {loading ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap:                 '2px',
          }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                height:     '200px',
                background: 'rgba(247,244,239,0.04)',
              }} />
            ))}
          </div>
        ) : data ? (
          <>
            {/* Category cards */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap:                 '1px',
              background:         'rgba(247,244,239,0.06)',
              border:             '1px solid rgba(247,244,239,0.06)',
            }}>
              {Object.entries(data.grouped).map(([category, skills]) => (
                <div key={category} style={{
                  background: 'var(--navy)',
                  padding:    '36px',
                  borderRight: '1px solid rgba(247,244,239,0.06)',
                }}>
                  {/* Category header */}
                  <div style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           '12px',
                    marginBottom:  '28px',
                    paddingBottom: '20px',
                    borderBottom:  '1px solid rgba(201,168,76,0.2)',
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>
                      {CATEGORY_ICON[category] || '◆'}
                    </span>
                    <h3 style={{
                      fontFamily:    'var(--font-sans)',
                      fontSize:      '0.82rem',
                      fontWeight:    600,
                      color:         'var(--ivory)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      {category}
                    </h3>
                  </div>

                  {/* Skill bars */}
                  {skills.map(skill => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom stats row */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              marginTop:           '2px',
              background:         'rgba(201,168,76,0.08)',
              border:             '1px solid rgba(201,168,76,0.15)',
              borderTop:          'none',
            }}>
              {[
                { num: data.skills?.length || 0, label: 'Technical Skills' },
                { num: '3+',  label: 'Years Studying CS'     },
                { num: '5+',  label: 'Projects Completed'    },
                { num: '2',   label: 'Core Specialisations'  },
              ].map(({ num, label }, i) => (
                <div key={label} style={{
                  padding:     '28px',
                  textAlign:   'center',
                  borderRight: i < 3 ? '1px solid rgba(201,168,76,0.15)' : 'none',
                }}>
                  <div style={{
                    fontFamily:    'var(--font-serif)',
                    fontSize:      '2.5rem',
                    fontWeight:    400,
                    color:         'var(--gold)',
                    lineHeight:    1,
                    marginBottom:  '8px',
                  }}>{num}</div>
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.68rem',
                    color:         'rgba(247,244,239,0.4)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
