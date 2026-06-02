import { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" },
  { label: "Donate",   path: "/donate" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <span className="nav-logo">DF</span>
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="menu"
      >
        <span /><span /><span />
      </button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {LINKS.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;