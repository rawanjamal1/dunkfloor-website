import { useState } from 'react'

function Donate() {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

 function handleExpiry(value) {
  // allow backspace to work naturally
  const raw = value.replace(/\D/g, '').slice(0, 4)

  if (raw.length === 0) {
    setForm({ ...form, expiry: '' })
    return
  }

  let month = raw.slice(0, 2)
  let year = raw.slice(2)

  // auto-prepend 0 if first digit > 1 (e.g. 7 → 07)
  if (raw.length === 1 && parseInt(raw) > 1) {
    month = '0' + raw
    setForm({ ...form, expiry: month + '/' })
    return
  }

  // fix invalid months
  if (month.length === 2) {
    const m = parseInt(month)
    if (m < 1) month = '01'
    if (m > 12) month = '12'
  }

  // only add slash when there are more than 2 digits
  let formatted = month
  if (raw.length > 2) {
    formatted = month + '/' + year
  }

  setForm({ ...form, expiry: formatted })
}

  function handleNumberOnly(field, value, maxLength) {
    const val = value.replace(/\D/g, '').slice(0, maxLength)
    setForm({ ...form, [field]: val })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    let newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.cardNumber || form.cardNumber.length !== 16)
      newErrors.cardNumber = 'Card number must be 16 digits'
    if (!form.expiry || form.expiry.length !== 5)
      newErrors.expiry = 'Enter a valid expiry date'
    else {
      const [m, y] = form.expiry.split('/')
      const month = parseInt(m)
      const year = parseInt('20' + y)
      const now = new Date()
      if (month < 1 || month > 12) newErrors.expiry = 'Invalid month'
      else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
        newErrors.expiry = 'Card is expired'
    }
    if (!form.cvv || form.cvv.length !== 3)
      newErrors.cvv = 'CVV must be 3 digits'
    if (!form.amount || parseInt(form.amount) <= 0)
      newErrors.amount = 'Please enter a valid amount'
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

  return (
    <div className="container">
      <section className="page-title-box">
        <h2>Support DunkFloor</h2>
        <p>Help us grow Lebanese street basketball. Every donation counts.</p>
      </section>

      <section className="hero-box">
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>🏀 Thank you for your donation!</h3>
            <p>Your support means everything to the DunkFloor team.</p>
            <button onClick={() => { setSuccess(false); setForm({ name: '', cardNumber: '', expiry: '', cvv: '', amount: '' }) }}>
              Donate Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            <label>Cardholder Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Full name on card"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red', marginTop: '4px' }}>{errors.name}</p>}

            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              value={form.cardNumber}
              onChange={(e) => handleNumberOnly('cardNumber', e.target.value, 16)}
            />
            {errors.cardNumber && <p style={{ color: 'red', marginTop: '4px' }}>{errors.cardNumber}</p>}

            <label>Expiry Date (MM/YY):</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              value={form.expiry}
              onChange={(e) => handleExpiry(e.target.value)}
            />
            {errors.expiry && <p style={{ color: 'red', marginTop: '4px' }}>{errors.expiry}</p>}

            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              maxLength="3"
              value={form.cvv}
              onChange={(e) => handleNumberOnly('cvv', e.target.value, 3)}
            />
            {errors.cvv && <p style={{ color: 'red', marginTop: '4px' }}>{errors.cvv}</p>}

            <label>Donation Amount ($):</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter amount in $"
              value={form.amount}
              onChange={(e) => handleNumberOnly('amount', e.target.value, 10)}
            />
            {errors.amount && <p style={{ color: 'red', marginTop: '4px' }}>{errors.amount}</p>}

            <button type="submit">Donate Now</button>

          </form>
        )}
      </section>
    </div>
  )
}

export default Donate