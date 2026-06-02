import { useNavigate } from "react-router-dom";
import IMG from "../images";
import Counter from "../components/Counter";
import { useReveal } from "../hooks";

function Home() {
  const navigate = useNavigate();
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();

  const cards = [
    { icon: "🏀", title: "About Us",  desc: "Learn the story behind DunkFloor and our identity.", path: "/about" },
    { icon: "📍", title: "Services",  desc: "View our features — players, courts, and community.", path: "/services" },
    { icon: "✉️", title: "Contact",   desc: "Reach out and connect with the DunkFloor platform.", path: "/contact" },
  ];

  return (
    <div className="page-enter">
      <section className="hero-image-box" style={{ backgroundImage: `url(${IMG.b1})` }}>
        <div className="hero-overlay">
          <h2>Welcome to DunkFloor</h2>
          <p>Lebanese street basketball — highlighting the culture of La3ibe and Mal3ab across Lebanon.</p>
        </div>
      </section>

      <div ref={r1} className="reveal stats-bar">
        <Counter target={150} label="La3ibe" />
        <Counter target={30}  label="Mal3ab" />
        <Counter target={6}   label="Regions" />
        <Counter target={500} label="Community" />
      </div>

      <div ref={r2} className="reveal section-title">
        <h2>Explore DunkFloor</h2>
        <p>Discover players, courts, and community across Lebanon</p>
      </div>

      <div ref={r3} className="reveal cards-grid">
        {cards.map(c => (
          <div key={c.title} className="card" onClick={() => navigate(c.path)}>
            <div className="card-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;