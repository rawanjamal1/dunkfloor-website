import IMG from "../images";
import { useReveal } from "../hooks";

const SERVICES = [
  { img: IMG.b3, title: "La3ibe Directory",    desc: "Discover talented La3ibe from different regions. Track performance and explore rising talent." },
  { img: IMG.b4, title: "Mal3ab Locations",    desc: "Find real Mal3ab across Lebanon. From Bakhoun to Beirut, explore courts where the real game happens." },
  { img: IMG.b5, title: "Community & Updates", desc: "Stay updated with street basketball news, events, and community activity." },
];

const FEATURES = [
  ["Players",   "Profiles, ratings and stats for La3ibe"],
  ["Courts",    "Locations and details of Mal3ab across Lebanon"],
  ["Community", "News, updates and interaction"],
  ["Platform",  "Responsive navigation across all devices"],
];

function Services() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();

  return (
    <div className="page-enter">
      <div ref={r1} className="reveal section-title">
        <h2>What DunkFloor Offers</h2>
        <p>DunkFloor connects La3ibe and Mal3ab across Lebanon.</p>
      </div>
      <div ref={r2} className="reveal cards-grid">
        {SERVICES.map(s => (
          <div key={s.title} className="card">
            <img src={s.img} alt={s.title} className="service-img" />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <div ref={r3} className="reveal hero-box">
        <h2>Platform Features</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Feature</th><th>Description</th></tr></thead>
            <tbody>
              {FEATURES.map(([f, d]) => <tr key={f}><td>{f}</td><td>{d}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Services;