import { useState, useEffect, useRef } from "react";
import { useReveal } from "../hooks";

const AMOUNTS = [10, 25, 50, 100];
const METHODS = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"];

const GOALS = [
    { icon: "🏀", title: "Court Renovation", desc: "Renovate old Mal3ab across Lebanon so La3ibe have safe courts to play on.", target: 5000, raised: 3200 },
    { icon: "👟", title: "Gear for La3ibe", desc: "Provide shoes, jerseys, and equipment to players who can't afford them.", target: 2000, raised: 800 },
    { icon: "🏆", title: "Street Tournaments", desc: "Fund organized street basketball tournaments across different regions.", target: 3000, raised: 2100 },
    { icon: "📱", title: "Platform Development", desc: "Keep DunkFloor running and add new features for the community.", target: 1000, raised: 650 },
];

const INIT = { name: "", email: "", amount: "", custom: "", method: "", message: "" };

function validate(f) {
    const e = {};
    if (!f.name.trim()) e.name = "Name is required";
    if (!f.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.amount && !f.custom) e.amount = "Please select or enter an amount";
    if (!f.method) e.method = "Please select a payment method";
    return e;
}

/* ── Confetti ── */
function Confetti({ active }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const pieces = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            w: Math.random() * 10 + 6,
            h: Math.random() * 6 + 4,
            color: ["#ff6b35", "#ffffff", "#ffd700", "#ff4500", "#00c896"][Math.floor(Math.random() * 5)],
            speed: Math.random() * 4 + 2,
            angle: Math.random() * 360,
            spin: (Math.random() - 0.5) * 6,
        }));
        let frame;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate((p.angle * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
                p.y += p.speed;
                p.angle += p.spin;
                if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
            });
            frame = requestAnimationFrame(draw);
        };
        draw();
        const stop = setTimeout(() => cancelAnimationFrame(frame), 4000);
        return () => { cancelAnimationFrame(frame); clearTimeout(stop); };
    }, [active]);

    if (!active) return null;
    return (
        <canvas ref={canvasRef} style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 9999,
        }} />
    );
}

/* ── Animated Progress Bar ── */
function ProgressBar({ raised, target }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    const pct = Math.min(Math.round((raised / target) * 100), 100);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setWidth(pct); obs.disconnect(); }
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [pct]);

    return (
        <div ref={ref} style={{ marginTop: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--muted)", marginBottom: "6px" }}>
                <span style={{ color: "var(--orange)", fontWeight: "700" }}>${raised.toLocaleString()} raised</span>
                <span>Goal: ${target.toLocaleString()}</span>
            </div>
            <div style={{ background: "var(--border)", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
                <div style={{
                    height: "100%", borderRadius: "999px",
                    background: "linear-gradient(90deg, var(--orange), #ffd700)",
                    width: `${width}%`,
                    transition: "width 1.2s ease",
                    boxShadow: "0 0 10px rgba(255,107,53,0.5)",
                }} />
            </div>
            <div style={{ textAlign: "right", fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>{pct}% funded</div>
        </div>
    );
}

/* ── Running Total Counter ── */
function RunningTotal({ total }) {
    const [display, setDisplay] = useState(total - 500 < 0 ? 0 : total - 500);
    useEffect(() => {
        if (display >= total) return;
        const step = Math.ceil((total - display) / 60);
        const timer = setInterval(() => {
            setDisplay(p => { if (p + step >= total) { clearInterval(timer); return total; } return p + step; });
        }, 20);
        return () => clearInterval(timer);
    }, [total]);

    return (
        <div style={{
            background: "var(--surface2)", border: "1px solid var(--orange)",
            borderRadius: "var(--radius)", padding: "24px", textAlign: "center",
            marginBottom: "40px",
        }}>
            <p style={{ fontSize: "13px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>
                Total Raised by Community
            </p>
            <p style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,8vw,72px)",
                color: "var(--orange)", lineHeight: 1,
                textShadow: "0 0 30px rgba(255,107,53,0.4)",
            }}>
                ${display.toLocaleString()}
            </p>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "8px" }}>from the DunkFloor community 🏀</p>
        </div>
    );
}


function Donate() {
    const [form, setForm] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [totalRaised, setTotalRaised] = useState(6750);

    const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
    };

    const selectAmount = amt => {
        setForm(p => ({ ...p, amount: amt, custom: "" }));
        if (errors.amount) setErrors(p => ({ ...p, amount: "" }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const donated = parseInt(form.custom || form.amount) || 0;
        setTotalRaised(p => p + donated);
        setSubmitted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4500);
    };

    const handleReset = () => { setForm(INIT); setErrors({}); setSubmitted(false); };

    const finalAmount = form.custom || form.amount;

    return (
        <div className="page-enter">
            <Confetti active={showConfetti} />

            <section className="hero-box" style={{ marginBottom: "30px" }}>
                <h2>🏀 Support Lebanese Street Basketball</h2>
                <p>Your donation helps DunkFloor maintain courts, support La3ibe, and grow the street basketball culture across Lebanon. Every dollar makes a real difference on the Mal3ab.</p>
            </section>

            {/* ── Running Total ── */}
            <RunningTotal total={totalRaised} />


            <div ref={r1} className="reveal section-title">
                <h2>Where Your Money Goes</h2>
                <p>100% of donations go directly to supporting Lebanese street basketball</p>
            </div>

            <div ref={r2} className="reveal cards-grid" style={{ marginBottom: "50px" }}>
                {GOALS.map(g => (
                    <div key={g.title} className="card">
                        <div className="card-icon">{g.icon}</div>
                        <h3>{g.title}</h3>
                        <p>{g.desc}</p>
                        <ProgressBar raised={g.raised} target={g.target} />
                    </div>
                ))}
            </div>


            <div ref={r3} className="reveal form-section">
                <h3>💛 Make a Donation</h3>

                {submitted && (
                    <div className="success-banner">
                        🎉 Thank you! Your donation of <strong>${finalAmount}</strong> is supporting Lebanese street basketball!
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Enter your full name"
                            value={form.name} onChange={handleChange}
                            className={errors.name ? "input-error" : ""} />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter your email"
                            value={form.email} onChange={handleChange}
                            className={errors.email ? "input-error" : ""} />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Donation Amount (USD)</label>
                        <div className="option-row">
                            {AMOUNTS.map(amt => (
                                <label key={amt} className="option-item"
                                    style={{ borderColor: form.amount === amt ? "var(--orange)" : "" }}>
                                    <input type="radio" name="amount"
                                        checked={form.amount === amt}
                                        onChange={() => selectAmount(amt)} />
                                    ${amt}
                                </label>
                            ))}
                        </div>
                        <div style={{ marginTop: "12px" }}>
                            <input type="number" name="custom"
                                placeholder="Or enter custom amount ($)"
                                value={form.custom}
                                onChange={e => {
                                    setForm(p => ({ ...p, custom: e.target.value, amount: "" }));
                                    if (errors.amount) setErrors(p => ({ ...p, amount: "" }));
                                }}
                                min="1" />
                        </div>
                        {errors.amount && <span className="error-msg">{errors.amount}</span>}
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <div className="option-row">
                            {METHODS.map(m => (
                                <label key={m} className="option-item"
                                    style={{ borderColor: form.method === m ? "var(--orange)" : "" }}>
                                    <input type="radio" name="method"
                                        checked={form.method === m}
                                        onChange={() => {
                                            setForm(p => ({ ...p, method: m }));
                                            if (errors.method) setErrors(p => ({ ...p, method: "" }));
                                        }} />
                                    {m}
                                </label>
                            ))}
                        </div>
                        {errors.method && <span className="error-msg">{errors.method}</span>}
                    </div>

                    <div className="form-group">
                        <label>Message (optional)</label>
                        <textarea name="message" placeholder="Leave a message of support..."
                            value={form.message} onChange={handleChange} maxLength={300} />
                        <div className="char-count">{form.message.length} / 300</div>
                    </div>

                    {finalAmount && (
                        <div style={{
                            background: "var(--surface2)", border: "1px solid var(--orange)",
                            borderRadius: "10px", padding: "14px 18px", marginBottom: "18px",
                            color: "var(--text)", fontSize: "15px",
                        }}>
                            💛 You are donating{" "}
                            <strong style={{ color: "var(--orange)" }}>${finalAmount}</strong>
                            {form.method && <> via <strong style={{ color: "var(--orange)" }}>{form.method}</strong></>}
                        </div>
                    )}

                    <div className="form-buttons">
                        <button type="submit" className="btn">Donate Now 💛</button>
                        <button type="button" className="btn btn-reset" onClick={handleReset}>Reset</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Donate;