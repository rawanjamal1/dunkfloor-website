import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    let newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.gender) newErrors.gender = 'Please select your gender'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="container">
        <section className="hero-box" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Message Sent! 🏀</h2>
          <p>Thank you for reaching out. We'll get back to you soon.</p>
          <br />
          <button onClick={() => { setSuccess(false); setForm({ firstName: '', lastName: '', email: '', gender: '', message: '' }) }}>
            Send Another Message
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="contact-layout">

        <div className="contact-info-panel">
          <div className="contact-hero">
            <div className="contact-overlay">
              <h2>Get In Touch</h2>
              <p>Have a question or want to collaborate? Reach out to the DunkFloor team.</p>
            </div>
          </div>

          <div className="contact-info-card">
            <h3>Contact Info</h3>
            <p>We'd love to hear from you.</p>
            <ul className="contact-points">
              <li>📍 Lebanon — From Bakhoun to Beirut</li>
              <li>📧 dunkfloor@gmail.com</li>
              <li>📱 +961 XX XXX XXX</li>
              <li>🕐 Mon – Fri, 9am – 6pm</li>
            </ul>
            <div className="contact-extra">
              <p>Follow us on social media</p>
              <p>@DunkFloor</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p style={{ color: 'red', marginTop: '4px' }}>{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p style={{ color: 'red', marginTop: '4px' }}>{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: 'red', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="gender-group">
                <label className={`gender-option ${form.gender === 'male' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={handleChange}
                  />
                  ♂ Male
                </label>
                <label className={`gender-option ${form.gender === 'female' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={handleChange}
                  />
                  ♀ Female
                </label>
              </div>
              {errors.gender && <p style={{ color: 'red', marginTop: '4px' }}>{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <p style={{ color: 'red', marginTop: '4px' }}>{errors.message}</p>}
            </div>

            <div className="form-buttons">
              <button type="submit">Send Message</button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact