import { useState } from 'react'
import { postContact } from '../hooks/useApi'
import './Contact.css'

const HALF_FIELDS = [
  { name: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'e.g. Jane Doe'       },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com'    },
]
const FULL_FIELDS = [
  { name: 'mobile_number', label: 'Mobile Number', type: 'tel',  placeholder: '+254 7XX XXX XXX'                                    },
  { name: 'message',       label: 'Your Message',  type: 'area', placeholder: 'Tell me about your project, opportunity, or enquiry…' },
]

const INFO_CARDS = [
  { icon: '📍', label: 'Location',      value: 'Nairobi, Kenya'                  },
  { icon: '⏱',  label: 'Response Time', value: 'Within 24 hours'                 },
  { icon: '💼', label: 'Available For', value: 'Internships · Projects · Collabs' },
]

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', mobile_number: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('loading'); setErrors({})
    try {
      const res = await postContact(form)
      if (res.success) {
        setStatus('success')
        setForm({ name: '', email: '', mobile_number: '', message: '' })
      }
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      setStatus('error')
    }
  }

  const fieldClass = (name, base) =>
    `${base} ${errors[name] ? base + '--error' : ''}`

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__grid">

          {/* Left info panel */}
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '8px' }}>
              Let's Work<br />
              <span style={{ color: 'var(--gold)' }}>Together</span>
            </h2>
            <div className="divider" />

            <p className="contact__intro-text">
              Whether you have a project in mind, an internship opportunity,
              or simply want to connect — I'd love to hear from you.
              Fill out the form and I'll respond to your email within 24 hours.
            </p>

            <div className="contact__info-cards">
              {INFO_CARDS.map(({ icon, label, value }) => (
                <div key={label} className="contact__info-card">
                  <span className="contact__info-icon">{icon}</span>
                  <div>
                    <div className="contact__info-label">{label}</div>
                    <div className="contact__info-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="contact__form-panel">
            <h3 className="contact__form-title">Send a Message</h3>

            <form onSubmit={submit}>
              {/* Name + Email row */}
              <div className="contact__row">
                {HALF_FIELDS.map(field => (
                  <div key={field.name}>
                    <label className="contact__label">
                      {field.label} <span className="contact__required">*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      className={fieldClass(field.name, 'contact__input')}
                    />
                    {errors[field.name] && (
                      <p className="contact__error-msg">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Full-width fields */}
              {FULL_FIELDS.map(field => (
                <div key={field.name} className="contact__field">
                  <label className="contact__label">
                    {field.label} <span className="contact__required">*</span>
                  </label>
                  {field.type === 'area' ? (
                    <textarea
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      rows={5}
                      className={fieldClass(field.name, 'contact__textarea')}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      className={fieldClass(field.name, 'contact__input')}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="contact__error-msg">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="contact__submit"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message →'}
              </button>

              {status === 'success' && (
                <div className="contact__success">
                  <span className="contact__success-icon">✓</span>
                  <div>
                    <div className="contact__success-title">Message sent successfully</div>
                    <div className="contact__success-sub">
                      Vincent will reply to your email within 24 hours.
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && !Object.keys(errors).length && (
                <div className="contact__error-banner">
                  Something went wrong. Please try again or contact directly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
