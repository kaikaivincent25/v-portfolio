import { useApi } from '../hooks/useApi'
import { useState, useEffect } from 'react'

const ROLES = [
  'Software Developer',
  'Cybersecurity Specialist',
  'Full Stack Engineer',
  'API Architect',
]

export default function Hero() {
  const { data } = useApi('/about/')
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing,    setTyping]    = useState(true)

  useEffect(() => {
    const target = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIdx])

  return (
    <section
      id="hero"
      style={{
        minHeight:  '100vh',
        background: 'linear-gradient(150deg, var(--navy) 0%, #0a1628 55%, #162440 100%)',
        display:    'flex',
        alignItems: 'center',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Subtle geometric background */}
      <div style={{
        position:    'absolute',
        inset:       0,
        backgroundImage: `
          radial-gradient(ellipse 600px 600px at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 400px 400px at 10% 80%, rgba(90,122,153,0.1) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Fine grid lines */}
      <div style={{
        position: 'absolute',
        inset:    0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents:  'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display:       'grid',
          gridTemplateColumns: '1fr auto',
          gap:           '80px',
          alignItems:    'center',
        }}>
          {/* LEFT — Text */}
          <div>
            {/* Eyebrow */}
            <div className="fade-up" style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '12px',
              marginBottom:  '28px',
            }}>
              <span style={{
                display:       'block',
                width:         '36px',
                height:        '1px',
                background:    'var(--gold)',
              }} />
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'var(--gold)',
              }}>
                BBIT Student · Co-operative University of Kenya
              </span>
            </div>

            {/* Name */}
            <h1 className="fade-up-1" style={{
              fontFamily:    'var(--font-serif)',
              fontSize:      'clamp(3.5rem, 8vw, 6.5rem)',
              fontWeight:    300,
              lineHeight:    1.0,
              color:         'var(--white)',
              letterSpacing: '-0.02em',
              marginBottom:  '16px',
            }}>
              Vincent<br />
              <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Kaikai</span>
            </h1>

            {/* Typewriter role */}
            <div className="fade-up-2" style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'clamp(0.85rem, 1.8vw, 1.05rem)',
              color:         'rgba(247,244,239,0.55)',
              letterSpacing: '0.08em',
              marginBottom:  '36px',
              height:        '1.6em',
            }}>
              {displayed}
              <span style={{
                display:    'inline-block',
                width:      '2px',
                height:     '1em',
                background: 'var(--gold)',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation:  'pulse 1s infinite',
              }} />
            </div>

            {/* Bio */}
            {data?.bio && (
              <p className="fade-up-3" style={{
                maxWidth:    '520px',
                fontSize:    '1rem',
                lineHeight:  1.85,
                color:       'rgba(247,244,239,0.62)',
                marginBottom: '48px',
                fontWeight:   300,
              }}>
                {data.bio.slice(0, 200)}{data.bio.length > 200 ? '…' : ''}
              </p>
            )}

            {/* CTAs */}
            <div className="fade-up-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '56px' }}>
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <span style={{ fontSize: '1rem' }}>→</span>
              </a>
              {data?.cv_url && (
                <a href={data.cv_url} target="_blank" rel="noreferrer" className="btn-ghost">
                  Download CV ↓
                </a>
              )}
            </div>

            {/* Socials */}
            {data && (
              <div className="fade-up-5" style={{
                display:    'flex',
                gap:        '28px',
                alignItems: 'center',
              }}>
                {[
                  { label: 'GitHub',   url: data.github   },
                  { label: 'LinkedIn', url: data.linkedin  },
                  { label: 'Email',    url: data.email ? `mailto:${data.email}` : null },
                ].filter(s => s.url).map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.label !== 'Email' ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.72rem',
                      letterSpacing: '0.1em',
                      color:         'rgba(247,244,239,0.45)',
                      textDecoration: 'none',
                      transition:    'color 0.2s',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(247,244,239,0.45)'}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Profile Picture */}
          <div className="fade-up-3" style={{
            position:  'relative',
            flexShrink: 0,
          }}>
            {/* Gold frame offset */}
            <div style={{
              position:   'absolute',
              top:        '16px',
              left:       '16px',
              right:      '-16px',
              bottom:     '-16px',
              border:     '1px solid rgba(201,168,76,0.35)',
              zIndex:     0,
            }} />

            {/* Photo container */}
            <div style={{
              width:      '320px',
              height:     '400px',
              position:   'relative',
              zIndex:     1,
              overflow:   'hidden',
              flexShrink: 0,
            }}>
              {data?.profile_picture_url ? (
                <img
                  src={data.profile_picture_url}
                  alt={`${data.name} — Portfolio`}
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display:    'block',
                    filter:     'grayscale(15%)',
                  }}
                  onError={e => {
                    // Fallback if image URL fails
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}

              {/* Placeholder when no image */}
              <div style={{
                display:        data?.profile_picture_url ? 'none' : 'flex',
                width:          '100%',
                height:         '100%',
                alignItems:     'center',
                justifyContent: 'center',
                background:     'var(--navy-light)',
                flexDirection:  'column',
                gap:            '12px',
              }}>
                <div style={{
                  width:        '80px',
                  height:       '80px',
                  borderRadius: '50%',
                  background:   'rgba(201,168,76,0.15)',
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  fontSize:     '2rem',
                }}>
                  VK
                </div>
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.7rem',
                  color:         'rgba(247,244,239,0.35)',
                  letterSpacing: '0.1em',
                  textAlign:     'center',
                  padding:       '0 24px',
                }}>
                  Upload photo in<br />Django Admin → About
                </p>
              </div>

              {/* Gold overlay strip */}
              <div style={{
                position:   'absolute',
                bottom:     0,
                left:       0,
                right:      0,
                height:     '3px',
                background: 'var(--gold)',
              }} />
            </div>

            {/* Stats badge */}
            <div style={{
              position:    'absolute',
              bottom:      '-24px',
              left:        '-24px',
              background:  'var(--gold)',
              color:       'var(--navy)',
              padding:     '16px 20px',
              zIndex:      2,
            }}>
              <div style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      '2rem',
                fontWeight:    600,
                lineHeight:    1,
                marginBottom:  '2px',
              }}>CUK</div>
              <div style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>BBIT · Nairobi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:   'absolute',
        bottom:     '40px',
        left:       '50%',
        transform:  'translateX(-50%)',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:        '8px',
        animation:  'fadeIn 1s 1.2s both',
      }}>
        <div style={{
          width:      '1px',
          height:     '48px',
          background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)',
          animation:  'pulse 2s infinite',
        }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.2em',
          color:         'rgba(247,244,239,0.3)',
          textTransform: 'uppercase',
        }}>Scroll</span>
      </div>
    </section>
  )
}
