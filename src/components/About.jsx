// src/components/About.jsx
import { useApi } from '../hooks/useApi'

export default function About() {
  const { data, loading } = useApi('/about/')

  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">// about me</p>
        <h2 className="section-title">Who is Vincent?</h2>
        <div className="section-line" />

        {loading ? (
          <p style={{fontFamily:'var(--font-mono)', color:'var(--accent)'}}>
            Loading<span className="blink">_</span>
          </p>
        ) : data ? (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'start'}}>
            {/* Left — Bio */}
            <div>
              <div style={{
                background:'var(--bg2)', border:'1px solid var(--border)',
                padding:'32px', marginBottom:'24px',
              }}>
                <div style={{
                  fontFamily:'var(--font-mono)', color:'var(--accent)',
                  fontSize:'0.75rem', marginBottom:'20px', opacity:0.7,
                }}>
                  vincent@cuk:~$ cat bio.txt
                </div>
                <p style={{lineHeight:1.9, color:'var(--text-dim)', fontSize:'0.95rem'}}>
                  {data.bio}
                </p>
              </div>

              {data.cv_url && (
                <a href={data.cv_url} target="_blank" rel="noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  padding:'12px 28px', border:'1px solid var(--accent)',
                  color:'var(--accent)', fontFamily:'var(--font-mono)',
                  fontSize:'0.8rem', textDecoration:'none', letterSpacing:'0.1em',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e=>{e.target.style.background='var(--accent)';e.target.style.color='var(--bg)'}}
                onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--accent)'}}>
                  ↓ Download CV
                </a>
              )}
            </div>

            {/* Right — Info grid */}
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              {[
                {label:'Name',      value: data.name},
                {label:'University',value:'Co-operative University of Kenya'},
                {label:'Program',   value:'BBIT'},
                {label:'Location',  value: data.location},
                {label:'Email',     value: data.email},
                {label:'Focus',     value:'Software Dev + Cybersecurity'},
              ].map(({label, value}) => (
                <div key={label} style={{
                  display:'flex', gap:'16px',
                  borderBottom:'1px solid var(--border)', paddingBottom:'16px',
                }}>
                  <span style={{
                    fontFamily:'var(--font-mono)', color:'var(--accent)',
                    fontSize:'0.75rem', minWidth:'110px', opacity:0.8,
                  }}>{label}:</span>
                  <span style={{color:'var(--text)', fontSize:'0.9rem'}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{color:'var(--accent3)'}}>Could not load profile.</p>
        )}
      </div>
    </section>
  )
}