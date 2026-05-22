import { useState, useEffect } from 'react'

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

function Home() {
  const players = useCounter(120)
  const courts = useCounter(45)
  const cities = useCounter(12)
  const matches = useCounter(300)

  return (
    <div className="container">

      <section className="hero-image-box">
        <div className="hero-overlay">
          <h2>Welcome to DunkFloor</h2>
          <p>
            DunkFloor is a Lebanese street basketball platform that highlights
            the culture of La3ibe and Mal3ab across Lebanon.
          </p>
          <p>
            Built with React — connecting players, courts, and the community.
          </p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>{players}+</h3>
          <p>Players</p>
        </div>
        <div className="stat-card">
          <h3>{courts}+</h3>
          <p>Courts</p>
        </div>
        <div className="stat-card">
          <h3>{cities}+</h3>
          <p>Cities</p>
        </div>
        <div className="stat-card">
          <h3>{matches}+</h3>
          <p>Matches</p>
        </div>
      </section>

      <section className="home-content">
        <div className="card">
          <h3>About Us</h3>
          <p>Learn more about the idea behind DunkFloor and our identity.</p>
        </div>
        <div className="card">
          <h3>Services</h3>
          <p>View our featured basketball activities and categories.</p>
        </div>
        <div className="card">
          <h3>Contact</h3>
          <p>Send us your information using the contact form.</p>
        </div>
      </section>

    </div>
  )
}

export default Home