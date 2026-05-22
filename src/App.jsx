import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <h1>DunkFloor</h1>
          <p className="tagline">Where La3ibe own the Mal3ab</p>
          <p className="subtagline">From Bakhoun to Beirut</p>
        </header>

        <nav className="navbar">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
          <NavLink to="/donate" className={({ isActive }) => isActive ? 'active' : ''}>Donate</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>

        <footer>
          <p>&copy; 2026 DunkFloor</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App