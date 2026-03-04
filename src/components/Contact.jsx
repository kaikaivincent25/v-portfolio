import { useState } from 'react'
import { postContact } from '../hooks/useApi'

const FIELD_META = [
  { name: 'name',          label: 'Full Name',     type: 'text',  placeholder: 'e.g. Jane Doe',              half: true  },
  { name: 'email',         label: 'Email Address', type: 'email', placeholder: 'jane@example.com',           half: true  },
  { name: 'mobile_number', label: 'Mobile Number', type: 'tel',   placeholder: '+254 7XX XXX XXX',           half: false },
  { name: 'message',       label: 'Your Message',  type: 'area',  placeholder: 'Tell me about your project, opportunity, or enquiry…', half: false },
]

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', mobile_number: '', message: '' })
  const [status, setStatus] = useState(null)   // null | 'loading' | 'success' | 'error'
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

  const inputBase = (hasError) => ({
    width:         '100%',
    padding:       '14px 16px',
    background:    'rgba(247,244,239,0.05)',
    border:        `1px solid ${hasError ? '#e74c3c' : 'rgba(247,244,239,0.12)'}`,
    borderBottom:  `2px solid ${hasError ? '#e74c3c' : 'rgba(201,168,76,0.3)'}`,
    color:         'var(--ivory)',
    fontFamily:    'var(--font-sans)',
    fontSize:      '0.92rem',
    fontWeight:    300,
    outline:       'none',
    transition:    'all 0.25s',
    borderRadius:  0,
  })

  return (
    <section id="contact" style={{
      background: 'var(--navy-mid)',
      padding:    '120px 0',
    }}>
      <div className="container">
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap:                 '80px',
          alignItems:          'start',
        }}>
          {/* LEFT — Info panel */}
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: '8px' }}>
              Let's Work<br />
              <span style={{ color: 'var(--gold)' }}>Together</span>
            </h2>
            <div className="divider" />

            <p style={{
              color:      'rgba(247,244,239,0.55)',
              lineHeight: 1.9,
              fontSize:   '0.95rem',
              fontWeight: 300,
              marginBottom: '44px',
            }}>
              Whether you have a project in mind, an internship opportunity,
              or simply want to connect — I'd love to hear from you.
              Fill out the form and I'll respond to your email within 24 hours.
            </p>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { icon: '📍', label: 'Location',     value: 'Nairobi, Kenya'             },
                { icon: '⏱',  label: 'Response Time', value: 'Within 24 hours'            },
                { icon: '💼', label: 'Available For',  value: 'Internships · Projects · Collabs' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{
                  display:     'flex',
                  gap:         '16px',
                  alignItems:  'flex-start',
                  padding:     '20px',
                  background:  'rgba(247,244,239,0.03)',
                  border:      '1px solid rgba(247,244,239,0.06)',
                }}>
                  <span style={{ fontSize: '1rem', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      color:         'var(--gold)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom:  '4px',
                    }}>{label}</div>
                    <div style={{
                      fontSize:  '0.88rem',
                      color:     'rgba(247,244,239,0.7)',
                      fontWeight: 300,
                    }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={{
            background: 'rgba(247,244,239,0.03)',
            border:     '1px solid rgba(247,244,239,0.08)',
            padding:    '48px',
          }}>
            <h3 style={{
              fontFamily:    'var(--font-serif)',
              fontSize:      '1.4rem',
              fontWeight:    400,
              color:         'var(--white)',
              marginBottom:  '32px',
              paddingBottom: '20px',
              borderBottom:  '1px solid rgba(247,244,239,0.08)',
            }}>
              Send a Message
            </h3>

            <form onSubmit={submit}>
              {/* Name + Email row */}
              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '20px',
                marginBottom:        '20px',
              }}>
                {FIELD_META.filter(f => f.half).map(field => (
                  <div key={field.name}>
                    <label style={{
                      display:       'block',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'rgba(247,244,239,0.4)',
                      marginBottom:  '8px',
                    }}>
                      {field.label} <span style={{ color: 'var(--gold)' }}>*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      style={inputBase(!!errors[field.name])}
                      onFocus={e  => { e.target.style.borderBottomColor = 'var(--gold)'; e.target.style.background = 'rgba(247,244,239,0.07)' }}
                      onBlur={e   => { e.target.style.borderBottomColor = errors[field.name] ? '#e74c3c' : 'rgba(201,168,76,0.3)'; e.target.style.background = 'rgba(247,244,239,0.05)' }}
                    />
                    {errors[field.name] && (
                      <p style={{ color: '#e74c3c', fontSize: '0.72rem', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Full-width fields */}
              {FIELD_META.filter(f => !f.half).map(field => (
                <div key={field.name} style={{ marginBottom: '20px' }}>
                  <label style={{
                    display:       'block',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.68rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'rgba(247,244,239,0.4)',
                    marginBottom:  '8px',
                  }}>
                    {field.label} <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  {field.type === 'area' ? (
                    <textarea
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      rows={5}
                      style={{ ...inputBase(!!errors[field.name]), resize: 'vertical' }}
                      onFocus={e  => { e.target.style.borderBottomColor = 'var(--gold)'; e.target.style.background = 'rgba(247,244,239,0.07)' }}
                      onBlur={e   => { e.target.style.borderBottomColor = errors[field.name] ? '#e74c3c' : 'rgba(201,168,76,0.3)'; e.target.style.background = 'rgba(247,244,239,0.05)' }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handle}
                      placeholder={field.placeholder}
                      required
                      style={inputBase(!!errors[field.name])}
                      onFocus={e  => { e.target.style.borderBottomColor = 'var(--gold)'; e.target.style.background = 'rgba(247,244,239,0.07)' }}
                      onBlur={e   => { e.target.style.borderBottomColor = errors[field.name] ? '#e74c3c' : 'rgba(201,168,76,0.3)'; e.target.style.background = 'rgba(247,244,239,0.05)' }}
                    />
                  )}
                  {errors[field.name] && (
                    <p style={{ color: '#e74c3c', fontSize: '0.72rem', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width:         '100%',
                  padding:       '16px 40px',
                  background:    status === 'loading' ? 'var(--gold-dim)' : 'var(--gold)',
                  color:         'var(--navy)',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.78rem',
                  fontWeight:    600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border:        'none',
                  cursor:        status === 'loading' ? 'not-allowed' : 'pointer',
                  transition:    'all 0.3s',
                  marginTop:     '8px',
                }}
                onMouseEnter={e => { if (status !== 'loading') e.target.style.background = 'var(--gold-light)' }}
                onMouseLeave={e => { if (status !== 'loading') e.target.style.background = 'var(--gold)' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send Message →'}
              </button>

              {/* Status messages */}
              {status === 'success' && (
                <div style={{
                  marginTop:  '20px',
                  padding:    '16px 20px',
                  background: 'rgba(39,174,96,0.1)',
                  border:     '1px solid rgba(39,174,96,0.3)',
                  display:    'flex',
                  gap:        '10px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: '#27ae60', fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <div style={{ color: '#27ae60', fontWeight: 600, fontSize: '0.88rem', marginBottom: '2px' }}>
                      Message sent successfully
                    </div>
                    <div style={{ color: 'rgba(247,244,239,0.5)', fontSize: '0.8rem' }}>
                      Vincent will reply to your email within 24 hours.
                    </div>
                  </div>
                </div>
              )}
              {status === 'error' && !Object.keys(errors).length && (
                <div style={{
                  marginTop:  '20px',
                  padding:    '16px 20px',
                  background: 'rgba(192,57,43,0.1)',
                  border:     '1px solid rgba(192,57,43,0.3)',
                  color:      '#e74c3c',
                  fontSize:   '0.85rem',
                }}>
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
