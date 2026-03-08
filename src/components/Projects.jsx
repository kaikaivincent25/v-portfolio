import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import './Projects.css'

const FILTERS = [
  { value: 'all',           label: 'All Projects'         },
  { value: 'software',      label: 'Software Development' },
  { value: 'cybersecurity', label: 'Cybersecurity'        },
  { value: 'fullstack',     label: 'Full Stack'           },
]

const CAT_CLASS = {
  software:      'project-card__category--software',
  cybersecurity: 'project-card__category--cybersecurity',
  fullstack:     'project-card__category--fullstack',
  other:         'project-card__category--other',
}

function ProjectCard({ project, index }) {
  const catClass = CAT_CLASS[project.category] || CAT_CLASS.other
  const animDelay = `${(index % 3) * 0.1}s`

  return (
    <article
      className="project-card"
      style={{ animationDelay: animDelay, animationFillMode: 'both', animation: `fadeUp 0.6s ${animDelay} both` }}
    >
      <div className="project-card__header">
        <span className={`project-card__category ${catClass}`}>
          {project.category_display}
        </span>
        {project.is_featured && (
          <span className="project-card__featured">★ Featured</span>
        )}
      </div>

      {project.image_url && (
        <div className="project-card__image-wrap">
          <img
            src={project.image_url}
            alt={project.title}
            className="project-card__image"
          />
        </div>
      )}

      <h3 className="project-card__title">{project.title}</h3>

      <p className="project-card__desc">
        {project.description.length > 130
          ? project.description.slice(0, 130) + '…'
          : project.description}
      </p>

      <div className="project-card__chips">
        {project.tech_stack_list.map(t => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="project-card__divider" />

      <div className="project-card__links">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="project-card__link project-card__link--github"
          >
            GitHub ↗
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="project-card__link project-card__link--live"
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
    <section id="projects" className="projects">
      <div className="container">
        <p className="eyebrow">Portfolio</p>
        <h2 className="heading-lg">
          Selected <span className="accent-dark">Work</span>
        </h2>
        <div className="divider" />

        <div className="projects__filters">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`projects__filter-btn ${
                active === f.value
                  ? 'projects__filter-btn--active'
                  : 'projects__filter-btn--inactive'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects__skeleton-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="projects__skeleton-card skeleton" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="projects__grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="projects__empty">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
