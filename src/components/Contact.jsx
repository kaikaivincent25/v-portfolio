// src/components/Contact.jsx
import { useState } from 'react'
import { postContact } from '../hooks/useApi'

const inputStyle = {
  width:'100%', padding:'14px 16px',
  background:'var(--bg)', border:'1px solid var(--border)',
  color:'var(--text)', fontFamily:'var(--font-mono)',
  fontSize:'0.9rem', outline:'none',
  transition:'border-color 0.2s',
}

export default function Contact() {
  const [form, setForm]       = useState({name:'', email:'', mobile_number:'', message:''})
  const [status, setStatus]   = useState(null)   // 'loading' | 'success' | 'error'
  const [errors, setErrors]   = useState({})

  const handle = e => setForm({...form, [e.target.name]: e.target.value})

  const submit = async e => {
    e.preventDefault()
    setStatus('loading'); setErrors({})
    try {
      const res = await postContact(form)
      if (res.success) {
        setStatus('success')
        setForm({name:'', email:'', mobile_number:'', message:''})
      }
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" style={{background:'var(--bg2)'}}>
      <div className="container">
        <p className="section-label">// get in touch</p>
        <h2 className="section-title">Contact Me</h2>
        <div className="section-line" />

        <div style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'60px', alignItems:'start'}}>
          {/* Left panel */}
          <div>
            <div style={{
              background:'var(--bg)', border:'1px solid var(--border)',
              padding:'28px', marginBottom:'24px',
              fontFamily:'var(--font-mono)', fontSize:'0.82rem',
              color:'var(--text-dim)', lineHeight:2,
            }}>
              <div style={{color:'var(--accent)', marginBottom:'16px'}}>
                vincent@portfolio:~$ contact --info
              </div>
              <div>📍 Nairobi, Kenya</div>
              <div>🎓 CUK — BBIT Student</div>
              <div>💼 Open to internships & collabs</div>
              <div>⚡ Response time: &lt; 24hrs</div>
            </div>
            <p style={{color:'var(--text-dim)', lineHeight:1.8, fontSize:'0.9rem'}}>
              Have a project idea, opportunity, or just want to say hi?
              Fill in the form and I'll get back to you via your email.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            {[
              {name:'name',          label:'Your Name',     type:'text',  placeholder:'John Doe'},
              {name:'email',         label:'Email Address', type:'email', placeholder:'john@example.com'},
              {name:'mobile_number', label:'Mobile Number', type:'tel',   placeholder:'+254 7XX XXX XXX'},
            ].map(field => (
              <div key={field.name}>
                <label style={{
                  display:'block', fontFamily:'var(--font-mono)',
                  fontSize:'0.75rem', color:'var(--accent)',
                  letterSpacing:'0.1em', marginBottom:'8px',
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handle}
                  placeholder={field.placeholder}
                  required
                  style={{
                    ...inputStyle,
                    borderColor: errors[field.name] ? 'var(--accent3)' : 'var(--border)',
                  }}
                  onFocus={e  => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e   => e.target.style.borderColor = errors[e.target.name] ? 'var(--accent3)' : 'var(--border)'}
                />
                {errors[field.name] && (
                  <p style={{color:'var(--accent3)', fontSize:'0.75rem',
                    fontFamily:'var(--font-mono)', marginTop:'4px'}}>
                    ✕ {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label style={{
                display:'block', fontFamily:'var(--font-mono)',
                fontSize:'0.75rem', color:'var(--accent)',
                letterSpacing:'0.1em', marginBottom:'8px',
              }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                placeholder="Tell me about your project or opportunity…"
                required rows={5}
                style={{
                  ...inputStyle, resize:'vertical',
                  borderColor: errors.message ? 'var(--accent3)' : 'var(--border)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = errors.message ? 'var(--accent3)' : 'var(--border)'}
              />
              {errors.message && (
                <p style={{color:'var(--accent3)', fontSize:'0.75rem',
                  fontFamily:'var(--font-mono)', marginTop:'4px'}}>
                  ✕ {errors.message}
                </p>
              )}
            </div>

            <button type="submit" disabled={status === 'loading'} style={{
              padding:'16px 40px', background:'var(--accent)',
              color:'var(--bg)', fontFamily:'var(--font-mono)',
              fontSize:'0.85rem', fontWeight:700, border:'none',
              letterSpacing:'0.1em', transition:'all 0.2s',
              boxShadow:'var(--glow)', opacity: status==='loading' ? 0.6 : 1,
            }}>
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <div style={{
                padding:'16px', border:'1px solid var(--accent)',
                fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:'0.85rem',
              }}>
                ✓ Message sent! Vincent will reply to your email shortly.
              </div>
            )}
            {status === 'error' && !Object.keys(errors).length && (
              <div style={{
                padding:'16px', border:'1px solid var(--accent3)',
                fontFamily:'var(--font-mono)', color:'var(--accent3)', fontSize:'0.85rem',
              }}>
                ✕ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}