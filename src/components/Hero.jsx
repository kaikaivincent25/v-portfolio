import { useApi } from '../hooks/useApi'
import { useState, useEffect } from 'react'
import './Hero.css'

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
    <section id="hero" className="hero">
      <div className="hero__bg-glow" />
      <div className="hero__bg-grid" />

      <div className="container">
        <div className="hero__inner">

          {/* LEFT: Text */}
          <div>
            <div className="hero__eyebrow fade-up">
              <span className="hero__eyebrow-line" />
              <span className="hero__eyebrow-text">
                BBIT Student · Co-operative University of Kenya
              </span>
            </div>

            <h1 className="hero__name fade-up-1">
              Vincent<br />
              <span className="hero__name-accent">Kaikai</span>
            </h1>

            <div className="hero__typewriter fade-up-2">
              {displayed}
              <span className="hero__cursor" />
            </div>

            {data?.bio && (
              <p className="hero__bio fade-up-3">
                {data.bio.slice(0, 200)}{data.bio.length > 200 ? '…' : ''}
              </p>
            )}

            <div className="hero__ctas fade-up-4">
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <span>→</span>
              </a>
              {data?.cv_url && (
                <a href={data.cv_url} target="_blank" rel="noreferrer" className="btn-ghost">
                  Download CV ↓
                </a>
              )}
            </div>

            {data && (
              <div className="hero__socials fade-up-5">
                {[
                  { label: 'GitHub',   url: data.github },
                  { label: 'LinkedIn', url: data.linkedin },
                  { label: 'Email',    url: data.email ? `mailto:${data.email}` : null },
                ].filter(s => s.url).map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.label !== 'Email' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="hero__social-link"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Profile photo */}
          <div className="hero__photo-wrapper fade-up-3">
            <div className="hero__photo-frame-offset" />

            <div className="hero__photo-box">
              {data?.profile_picture_url ? (
                <>
                  <img
                    src={data.profile_picture_url}
                    alt={`${data?.name} — Portfolio`}
                    className="hero__photo-img"
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hero__photo-placeholder" style={{ display: 'none' }}>
                    <div className="hero__photo-placeholder-avatar">VK</div>
                    <p className="hero__photo-placeholder-text">
                      Upload photo in<br />Django Admin → About
                    </p>
                  </div>
                </>
              ) : (
                <div className="hero__photo-placeholder">
                  <div className="hero__photo-placeholder-avatar">VK</div>
                  <p className="hero__photo-placeholder-text">
                    Upload photo in<br />Django Admin → About
                  </p>
                </div>
              )}
              <div className="hero__photo-strip" />
            </div>

            <div className="hero__badge">
              <div className="hero__badge-title">CUK</div>
              <div className="hero__badge-sub">BBIT · Nairobi</div>
            </div>
          </div>

        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  )
}
