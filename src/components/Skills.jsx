// src/components/Skills.jsx
import { useApi } from '../hooks/useApi'

export default function Skills() {
  const { data, loading } = useApi('/skills/')

  return (
    <section id="skills" className="section" style={{background:'var(--bg2)'}}>
      <div className="container">
        <p className="section-label">// tech stack</p>
        <h2 className="section-title">Skills & Tools</h2>
        <div className="section-line" />

        {loading ? (
          <p style={{fontFamily:'var(--font-mono)', color:'var(--accent)'}}>
            Loading<span className="blink">_</span>
          </p>
        ) : data ? (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px'}}>
            {Object.entries(data.grouped).map(([category, skills]) => (
              <div key={category} style={{
                background:'var(--bg)', border:'1px solid var(--border)',
                padding:'28px',
              }}>
                <h3 style={{
                  fontFamily:'var(--font-mono)', color:'var(--accent2)',
                  fontSize:'0.8rem', letterSpacing:'0.15em', marginBottom:'24px',
                  textTransform:'uppercase',
                }}>
                  {category}
                </h3>
                <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                  {skills.map(skill => (
                    <div key={skill.id}>
                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        marginBottom:'6px',
                      }}>
                        <span style={{fontSize:'0.9rem', color:'var(--text)'}}>{skill.name}</span>
                        <span style={{
                          fontFamily:'var(--font-mono)', color:'var(--accent)',
                          fontSize:'0.75rem',
                        }}>{skill.proficiency}%</span>
                      </div>
                      <div style={{
                        height:'3px', background:'var(--border)',
                        borderRadius:'2px', overflow:'hidden',
                      }}>
                        <div style={{
                          height:'100%', width:`${skill.proficiency}%`,
                          background:`linear-gradient(90deg, var(--accent), var(--accent2))`,
                          borderRadius:'2px',
                          transition:'width 1s ease',
                          boxShadow:'var(--glow)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}