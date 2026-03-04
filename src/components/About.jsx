import { useApi } from '../hooks/useApi'

const INFO_ROWS = (data) => [
  { label: 'Full Name',      value: data.name },
  { label: 'University',     value: 'Co-operative University of Kenya' },
  { label: 'Programme',      value: 'Bachelor of Business Information Technology' },
  { label: 'Specialisation', value: 'Software Development & Cybersecurity' },
  { label: 'Location',       value: data.location },
  { label: 'Email',          value: data.email },
  { label: 'Status',         value: 'Available for Internships & Projects' },
]

export default function About() {
  const { data, loading } = useApi('/about/')

  return (
    <section id="about" className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="eyebrow">About Me</p>
          <h2 className="heading-lg" style={{ color: 'var(--navy)', marginBottom: '8px' }}>
            Bridging Technology<br />
            <span style={{ color: 'var(--gold-dim)' }}>& Security Excellence</span>
          </h2>
          <div className="divider" />

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1,2,3].map(i => (
                <div key={i} className="skeleton" style={{ height: '20px', width: i === 3 ? '60%' : '100%' }} />
              ))}
            </div>
          ) : data ? (
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap:                 '64px',
              alignItems:          'start',
            }}>
              {/* LEFT — Bio & CV */}
              <div>
                <p style={{
                  fontSize:   '1.05rem',
                  lineHeight: 1.9,
                  color:      'var(--text-mid)',
                  fontWeight: 300,
                  marginBottom: '36px',
                }}>
                  {data.bio}
                </p>

                {/* Highlights */}
                <div style={{
                  display:             'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap:                 '20px',
                  marginBottom:        '40px',
                }}>
                  {[
                    { icon: '⚙', title: 'Backend',      desc: 'Django REST, PostgreSQL, Python' },
                    { icon: '🖥', title: 'Frontend',     desc: 'React, JavaScript, Modern CSS' },
                    { icon: '🔒', title: 'Security',     desc: 'Network security, Penetration testing' },
                    { icon: '☁', title: 'Deployment',   desc: 'Heroku, Git, CI/CD pipelines' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} style={{
                      padding:      '20px',
                      background:   'var(--white)',
                      border:       '1px solid var(--ivory-dim)',
                      borderTop:    '2px solid var(--gold)',
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{icon}</div>
                      <div style={{
                        fontFamily:  'var(--font-sans)',
                        fontWeight:  600,
                        fontSize:    '0.85rem',
                        color:       'var(--navy)',
                        marginBottom: '4px',
                      }}>{title}</div>
                      <div style={{
                        fontSize:  '0.78rem',
                        color:     'var(--text-light)',
                        lineHeight: 1.5,
                      }}>{desc}</div>
                    </div>
                  ))}
                </div>

                {data.cv_url && (
                  <a
                    href={data.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ width: 'fit-content' }}
                  >
                    <span>Download Full CV</span>
                    <span>↓</span>
                  </a>
                )}
              </div>

              {/* RIGHT — Info table */}
              <div>
                <div style={{
                  border:       '1px solid var(--ivory-dim)',
                  background:   'var(--white)',
                  overflow:     'hidden',
                }}>
                  <div style={{
                    background:    'var(--navy)',
                    padding:       '16px 24px',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color:         'var(--gold)',
                  }}>
                    Profile Information
                  </div>
                  {INFO_ROWS(data).map(({ label, value }, i) => (
                    <div
                      key={label}
                      style={{
                        display:        'flex',
                        gap:            '16px',
                        padding:        '16px 24px',
                        borderBottom:   i < INFO_ROWS(data).length - 1 ? '1px solid var(--ivory-dim)' : 'none',
                        background:     i % 2 === 0 ? 'var(--white)' : 'rgba(247,244,239,0.5)',
                      }}
                    >
                      <span style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.68rem',
                        color:         'var(--text-light)',
                        letterSpacing: '0.06em',
                        minWidth:      '110px',
                        paddingTop:    '2px',
                        flexShrink:    0,
                        textTransform: 'uppercase',
                      }}>{label}</span>
                      <span style={{
                        fontSize:   '0.88rem',
                        color:      label === 'Status' ? 'var(--gold-dim)' : 'var(--text)',
                        fontWeight: label === 'Status' ? 600 : 400,
                        lineHeight: 1.5,
                      }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div style={{
                  display:    'flex',
                  gap:        '12px',
                  marginTop:  '20px',
                  flexWrap:   'wrap',
                }}>
                  {[
                    { label: 'GitHub',   url: data.github   },
                    { label: 'LinkedIn', url: data.linkedin  },
                  ].filter(s => s.url).map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.7rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding:       '10px 20px',
                        border:        '1px solid var(--ivory-dim)',
                        color:         'var(--text-mid)',
                        textDecoration: 'none',
                        transition:    'all 0.2s',
                        background:    'var(--white)',
                      }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = 'var(--gold)'
                        e.target.style.color       = 'var(--gold-dim)'
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = 'var(--ivory-dim)'
                        e.target.style.color       = 'var(--text-mid)'
                      }}
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)' }}>Profile not available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
