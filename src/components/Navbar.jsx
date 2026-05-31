import { useState } from "react";
const LINKS = ["Home", "About", "Services", "Contact", "Donate"];
function Navbar({ page, setPage }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = (link) => {
        setPage(link);
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <nav className="navbar">
            <span className="nav-logo">DF</span>
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
                <span /><span /><span />
            </button>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                {LINKS.map(link => (
                    <button key={link} className={page === link ? "active" : ""} onClick={() => navigate(link)}>
                        {link}
                    </button>
                ))}

            </div>
        </nav>
    );
}
export default Navbar;