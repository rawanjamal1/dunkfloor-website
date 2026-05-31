import IMG from "../images";
import { useReveal } from "../hooks";

function About () {
    const r1 = useReveal(), r2=useReveal(), r3=useReveal();
    const cards = [
        { icon: "💡", title: "The Idea",    desc: "Across Lebanon, talented La3ibe and strong Mal3ab stay unseen. DunkFloor was created to give them visibility." },
    { icon: "🔥", title: "The Culture", desc: "Street basketball is not just a game. It's competition, respect, and identity built through real games." },
    { icon: "🎯", title: "The Goal",    desc: "Connect La3ibe, showcase Mal3ab, and build a real platform for Lebanese street basketball." },
    ];
    return (
        <div className="page-enter">
            <div ref={r1} className="reveal">
 <img src={IMG.b2} alt="Street Basketball" className="about-img" />
            </div>
<div ref={r2} className="reveal hero-box">
    <h2>Built From The Mal3ab</h2>
    <p>DunkFloor is a Lebanese street basketball platform created to represent the game - not the polished version. The one played on outdoor Mal3ab, in neighborhoods, under pressure, with pride.</p>

</div>
<div ref={r3} className="reveal cards-grid">
    {cards.map( c => (
        <div key={c.title} className="card">
            <div className="card-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            </div>
    ))}
    </div>
    </div>
    );
}
export default About;