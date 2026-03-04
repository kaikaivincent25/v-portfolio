// src/components/Hero.jsx
import { useApi } from '../hooks/useApi'
import { useEffect, useState } from 'react'

const roles = [
  'Software Developer',
  'Cybersecurity Enthusiast',
  'BBIT Student @ CUK',
  'Full Stack Builder',
  'API Architect',
]

export default function Hero() {
  const { data } = useApi('/about/')
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setRoleIdx(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIdx])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glowing orbs */}
      <div style={{
        position:'absolute', top:'20%', right:'10%',
        width:'400px', height:'400px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,255,157,0.06) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />
      <div style={{
        position:'absolute', bottom:'20%', left:'5%',
        width:'300px', height:'300px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,170,255,0.05) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      <div className="container" style={{position:'relative', zIndex:1}}>
        {/* Terminal greeting */}
        <div style={{
          fontFamily:'var(--font-mono)', color:'var(--accent)',
          fontSize:'0.85rem', marginBottom:'24px', opacity:0.8,
          animation:'fadeUp 0.5s ease forwards',
        }}>
          <span style={{color:'var(--text-dim)'}}>~/portfolio</span>
          <span style={{color:'var(--accent)'}}> $ </span>
          whoami
        </div>

        <h1 style={{
          fontSize:'clamp(3rem, 8vw, 6rem)',
          fontWeight:800, lineHeight:1.0,
          marginBottom:'16px',
          animation:'fadeUp 0.6s 0.1s ease both',
        }}>
          Vincent<br />
          <span style={{
            WebkitTextStroke:'1px var(--accent)',
            color:'transparent',
          }}>Kaikai</span>
        </h1>

        {/* Typewriter role */}
        <div style={{
          fontFamily:'var(--font-mono)', fontSize:'clamp(1rem, 2.5vw, 1.4rem)',
          color:'var(--accent2)', marginBottom:'32px', height:'2em',
          animation:'fadeUp 0.6s 0.2s ease both',
        }}>
          <span style={{color:'var(--text-dim)'}}>&gt; </span>
          {displayed}
          <span className="blink">|</span>
        </div>

        {/* Bio snippet */}
        {data && (
          <p style={{
            maxWidth:'540px', color:'var(--text-dim)',
            lineHeight:1.8, marginBottom:'48px', fontSize:'1rem',
            animation:'fadeUp 0.6s 0.3s ease both',
          }}>
            {data.bio?.slice(0, 180)}{data.bio?.length > 180 ? '…' : ''}
          </p>
        )}

        {/* CTA Buttons */}
        <div style={{
          display:'flex', gap:'16px', flexWrap:'wrap',
          animation:'fadeUp 0.6s 0.4s ease both',
        }}>
          <a href="#projects" style={{
            padding:'14px 32px', background:'var(--accent)',
            color:'var(--bg)', fontFamily:'var(--font-mono)',
            fontSize:'0.85rem', textDecoration:'none',
            fontWeight:700, letterSpacing:'0.1em',
            transition:'all 0.2s', boxShadow:'var(--glow)',
          }}
          onMouseEnter={e=>{e.target.style.background='transparent';e.target.style.color='var(--accent)';e.target.style.outline='1px solid var(--accent)'}}
          onMouseLeave={e=>{e.target.style.background='var(--accent)';e.target.style.color='var(--bg)';e.target.style.outline='none'}}>
            View Projects
          </a>

          {data?.cv_url && (
            <a href={data.cv_url} target="_blank" rel="noreferrer" style={{
              padding:'14px 32px', background:'transparent',
              color:'var(--accent)', fontFamily:'var(--font-mono)',
              fontSize:'0.85rem', textDecoration:'none',
              border:'1px solid var(--accent)', letterSpacing:'0.1em',
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{e.target.style.background='var(--accent)';e.target.style.color='var(--bg)'}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--accent)'}}>
              ↓ Download CV
            </a>
          )}

          <a href="#contact" style={{
            padding:'14px 32px', background:'transparent',
            color:'var(--text-dim)', fontFamily:'var(--font-mono)',
            fontSize:'0.85rem', textDecoration:'none',
            border:'1px solid var(--border)', letterSpacing:'0.1em',
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.target.style.borderColor='var(--accent2)';e.target.style.color='var(--accent2)'}}
          onMouseLeave={e=>{e.target.style.borderColor='var(--border)';e.target.style.color='var(--text-dim)'}}>
            Contact Me
          </a>
        </div>

        {/* Social links */}
        {data && (
          <div style={{
            display:'flex', gap:'20px', marginTop:'56px',
            animation:'fadeUp 0.6s 0.5s ease both',
          }}>
            {[
              {label:'GitHub', url:data.github},
              {label:'LinkedIn', url:data.linkedin},
            ].filter(s=>s.url).map(s=>(
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                style={{
                  fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                  color:'var(--text-dim)', textDecoration:'none',
                  letterSpacing:'0.1em', transition:'color 0.2s',
                }}
                onMouseEnter={e=>e.target.style.color='var(--accent)'}
                onMouseLeave={e=>e.target.style.color='var(--text-dim)'}>
                [{s.label}]
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:'40px', left:'50%',
        transform:'translateX(-50%)', textAlign:'center',
        fontFamily:'var(--font-mono)', fontSize:'0.7rem',
        color:'var(--text-dim)', animation:'fadeUp 1s 0.8s both',
      }}>
        <div style={{
          width:'1px', height:'50px', background:'linear-gradient(var(--accent), transparent)',
          margin:'0 auto 8px',
        }} />
        scroll
      </div>
    </section>
  )
}