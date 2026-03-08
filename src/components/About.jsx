import { useApi } from '../hooks/useApi'
import './About.css'

const getInfoRows = (data) => [
  { label: 'Full Name',      value: data.name },
  { label: 'University',     value: 'Co-operative University of Kenya' },
  { label: 'Programme',      value: 'Bachelor of Business Information Technology' },
  { label: 'Specialisation', value: 'Software Development & Cybersecurity' },
  { label: 'Location',       value: data.location },
  { label: 'Email',          value: data.email },
  { label: 'Status',         value: 'Available for Internships & Projects' },
]

const HIGHLIGHTS = [
  { icon: '⚙', title: 'Backend',     desc: 'Django REST, PostgreSQL, Python'      },
  { icon: '🖥', title: 'Frontend',    desc: 'React, JavaScript, Modern CSS'        },
  { icon: '🔒', title: 'Security',    desc: 'Network security, Penetration testing' },
  { icon: '☁', title: 'Deployment',  desc: 'Heroku, Git, CI/CD pipelines'         },
]

export default function About() {
  const { data, loading } = useApi('/about/')

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__inner">
          <p className="eyebrow">About Me</p>
          <h2 className="heading-lg">
            Bridging Technology<br />
            <span className="accent-dark">& Security Excellence</span>
          </h2>
          <div className="divider" />

          {loading ? (
            <div className="about__skeleton-wrap">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: '20px', width: i === 3 ? '60%' : '100%' }}
                />
              ))}
            </div>
          ) : data ? (
            <div className="about__grid">

              {/* Left — Bio */}
              <div>
                <p className="about__bio">{data.bio}</p>

                <div className="about__highlights">
                  {HIGHLIGHTS.map(({ icon, title, desc }) => (
                    <div key={title} className="about__highlight-card">
                      <div className="about__highlight-icon">{icon}</div>
                      <div className="about__highlight-title">{title}</div>
                      <div className="about__highlight-desc">{desc}</div>
                    </div>
                  ))}
                </div>

                {data.cv_url && (
                  <a
                    href={data.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <span>Download Full CV</span>
                    <span>↓</span>
                  </a>
                )}
              </div>

              {/* Right — Info table */}
              <div>
                <div className="about__table">
                  <div className="about__table-header">Profile Information</div>
                  {getInfoRows(data).map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`about__table-row ${i % 2 === 0 ? 'about__table-row--even' : 'about__table-row--odd'}`}
                    >
                      <span className="about__table-label">{label}</span>
                      <span className={`about__table-value ${label === 'Status' ? 'about__table-value--status' : ''}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="about__socials">
                  {[
                    { label: 'GitHub',   url: data.github   },
                    { label: 'LinkedIn', url: data.linkedin },
                  ].filter(s => s.url).map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="about__social-btn"
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
