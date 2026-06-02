import { useState } from "react";
import IMG from "../images";
import { useReveal } from "../hooks";

const REGIONS   = ["Bakhoun", "El Mina", "Beirut", "Akkar", "Keserwan", "Zahle"];
const INTERESTS = ["La3ibe", "Mal3ab", "Updates"];
const INIT = { fullName: "", email: "", region: "Bakhoun", gender: "", interests: [], message: "" };

function validate(f) {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Full name is required";
  if (!f.email.trim()) e.email = "Email is required";
  else if (!/^[^@]+@[^@]+\.[^@]+$/.test(f.email)) e.email = "Enter a valid email";
  if (!f.gender) e.gender = "Please select a gender";
  if (!f.message.trim()) e.message = "Message cannot be empty";
  return e;
}

function Contact() {
  const [form, setForm]         = useState(INIT);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const r1 = useReveal(), r2 = useReveal();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const toggleInterest = v =>
    setForm(p => ({
      ...p,
      interests: p.interests.includes(v)
        ? p.interests.filter(i => i !== v)
        : [...p.interests, v]
    }));

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleReset = () => { setForm(INIT); setErrors({}); setSubmitted(false); };

  return (
    <div className="page-enter">
      <div className="section-title">
        <h2>Contact DunkFloor</h2>
        <p>Reach out to share feedback or connect with the community.</p>
      </div>
      <section className="contact-layout">
        <div ref={r1} className="reveal contact-info-panel">
          <div className="contact-hero" style={{ backgroundImage: `url(${IMG.b6})` }}>
            <div className="contact-overlay">
              <h2>Let's Talk</h2>
              <p>DunkFloor is built for La3ibe, Mal3ab, and the culture around the game.</p>
            </div>
          </div>
          <div className="contact-info-card">
            <h3>Why Contact Us?</h3>
            <p>Send your message, ask about the platform, or share ideas about Lebanese street basketball.</p>
            <ul className="contact-points">
              {["Ask a question","Share feedback","Suggest a Mal3ab","Connect with the platform"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <div className="contact-extra"><p>Built for La3ibe</p><p>Powered by Mal3ab</p></div>
          </div>
        </div>

        <div ref={r2} className="reveal form-section">
          <h3>Send Us Your Information</h3>
          {submitted && <div className="success-banner">✅ Message sent! We'll get back to you soon.</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter your full name"
                value={form.fullName} onChange={handleChange}
                className={errors.fullName ? "input-error" : ""} />
              {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email"
                value={form.email} onChange={handleChange}
                className={errors.email ? "input-error" : ""} />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Region</label>
              <select name="region" value={form.region} onChange={handleChange}>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="option-row">
                {["Male","Female"].map(g => (
                  <label key={g} className="option-item">
                    <input type="radio" name="gender" value={g}
                      checked={form.gender === g} onChange={handleChange} /> {g}
                  </label>
                ))}
              </div>
              {errors.gender && <span className="error-msg">{errors.gender}</span>}
            </div>
            <div className="form-group">
              <label>Interested In</label>
              <div className="option-row">
                {INTERESTS.map(i => (
                  <label key={i} className="option-item">
                    <input type="checkbox" checked={form.interests.includes(i)}
                      onChange={() => toggleInterest(i)} /> {i}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Write your message..."
                value={form.message} onChange={handleChange}
                className={errors.message ? "input-error" : ""}
                maxLength={500} />
              <div className="char-count">{form.message.length} / 500</div>
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn btn-reset" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;