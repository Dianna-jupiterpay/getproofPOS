import { useState, useEffect, useRef } from "react";
import "./style.css";
import Contact from "./Contact.jsx";
import Countdown from "./Countdown.jsx";
const BottleSVG = ({ stroke = "#1b2d5b", width = 22 }) => (
  <svg
    viewBox="0 0 48 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width, height: "auto" }}
  >
    <path
      d="M18 0h12v8c0 0 8 6 8 18v60c0 4-2 6-6 6H16c-4 0-6-2-6-6V26C10 14 18 8 18 8V0z"
      stroke={stroke}
      strokeWidth="3.5"
      fill="none"
    />
    <rect x="17" y="0" width="14" height="2" fill={stroke} rx="1" />
  </svg>
);
/* ─── REVEAL HOOK ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── NAV ─── */
function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`nav${stuck ? " nav--stuck" : ""}`}>
      <a href="#" className="nav__logo">
        <BottleSVG stroke={stuck ? "#1b2d5b" : "#ffffff"} width={22} />
        <span className="nav__logo-text">proof</span>
      </a>

      <div className="nav__links">
        <a href="#problem" className="nav__link">The Problem</a>
        <a href="#solution" className="nav__link">Solution</a>
        <a href="#contact-form" className="nav__cta">Contact Us</a>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero({ loaded }) {
  return (
    <section className="hero">

      {/* Liquid gradient background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

  <div
    style={{
      position: "absolute",
      inset: 0,
background: `
  radial-gradient(at 15% 25%, #1b4f8a 0%, transparent 50%),
  radial-gradient(at 85% 15%, #2f80ed 0%, transparent 50%),
  radial-gradient(at 75% 75%, #00a8cc 0%, transparent 55%),
  radial-gradient(at 25% 85%, #1451a8 0%, transparent 55%),
  radial-gradient(at 50% 50%, #091a33 0%, #050d1a 100%)
`,
      filter: "blur(60px)",
      transform: "scale(1.2)",
      animation: "meshMove 25s ease-in-out infinite alternate",
    }}
  />

</div>

      {/* Content */}
      <div className={`hero__content${loaded ? " hero__content--loaded" : ""}`}>
        <p className={`hero__eyebrow${loaded ? " hero__eyebrow--loaded" : ""}`}>
          <span className="hero__eyebrow-dot" />
          For Liquor Store Owners
        </p>

        <h1 className="hero__headline">
          <span className="wm">
            <span className={`wm-inner${loaded ? " loaded" : ""}`} style={{ transitionDelay: "0.2s" }}>
              POS Support Ending?
            </span>
          </span>
          <br />
          <span className="wm">
            <span className={`wm-inner${loaded ? " loaded" : ""}`} style={{ transitionDelay: "0.36s" }}>
              <em>Switch before it does.</em>
            </span>
          </span>
        </h1>

        <Countdown />

        <p className={`hero__sub${loaded ? " hero__sub--loaded" : ""}`}>
          If your current POS is losing support or limiting your growth, now is the time to move. We help liquor stores switch systems with zero downtime and no data loss.
        </p>

        <a href="#contact-form" className="btn btn--primary">
          Contact us
        </a>
      </div>
    </section>
  );
}
/* ─── TICKER ─── */
function Ticker() {
  const items = [
    "Zero Downtime Migration",
    "All Data Preserved",
    "Unlimited Registers",
    "Multiple Locations",
    "Real Support Team",
    "Workflows Intact",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker__item">
            <span className="ticker__text">{item}</span>
            <span className="ticker__sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const [labelRef, labelVis] = useReveal();
  const [headRef, headVis] = useReveal();

  const cards = [
    { icon: "🚫", title: "No new registers or locations", desc: "Your system won't allow expansion. Every opportunity to grow is blocked by your own software." },
    { icon: "⚠️", title: "Support is winding down", desc: "You've heard the rumors. Nobody's giving you a clear answer about what happens next." },
    { icon: "🔒", title: "No upgrade path", desc: "You're running on legacy tech with security risks, slow performance, and zero roadmap." },
  ];

  return (
    <section id="problem" className="section section--light">
      <div className="container">
        <p ref={labelRef} className={`section__label rev${labelVis ? " vis" : ""}`}>
          The Situation
        </p>
        <h2 ref={headRef} className={`section__headline rev${headVis ? " vis" : ""}`}>
          Many liquor store owners<br />are facing <em>this</em> right now.
        </h2>
        <div className="card-grid card-grid--3">
          {cards.map((c, i) => {
            const [ref, vis] = useReveal();
            return (
              <div
                key={i}
                ref={ref}
                className={`card rev${vis ? " vis" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="card__icon">{c.icon}</div>
                <h3 className="card__title">{c.title}</h3>
                <p className="card__desc">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTION ─── */
function Solution() {
  const [labelRef, labelVis] = useReveal();
  const [headRef, headVis] = useReveal();
  const [mockRef, mockVis] = useReveal();

  const features = [
    { n: "01", title: "Seamless transition from your current POS", desc: "We map your existing setup and handle the migration end-to-end. Your staff keeps working during the switch." },
    { n: "02", title: "Preserve your data, inventory & workflows", desc: "Every product, every price, every customer record. Nothing gets lost in translation." },
    { n: "03", title: "Add registers, locations & features anytime", desc: "Expand when you're ready — not when your software allows. Scale on your terms." },
    { n: "04", title: "Ongoing support from a real team", desc: "Not a chatbot. Not a ticket queue. Real people who understand liquor store operations." },
  ];

  return (
    <section id="solution" className="section section--alt">
      <div className="container">
        <p ref={labelRef} className={`section__label rev${labelVis ? " vis" : ""}`}>
          The Solution
        </p>
        <h2 ref={headRef} className={`section__headline rev${headVis ? " vis" : ""}`}>
          We built this<br />for stores <em>like yours.</em>
        </h2>

        <div className="solution__grid">
          <div className="solution__features">
            {features.map((f, i) => {
              const [ref, vis] = useReveal();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`feature-row slide-left${vis ? " vis" : ""}${i === 0 ? " feature-row--first" : ""}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="feature-row__num">{f.n}</span>
                  <div>
                    <h3 className="feature-row__title">{f.title}</h3>
                    <p className="feature-row__desc">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}


/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <BottleSVG stroke="rgba(255, 255, 255, 0.7)" width={18} />
        <span className="footer__logo-text">proof</span>
      </div>
      <span className="footer__copy">© 2026 Proof POS. All rights reserved.</span>
    </footer>
  );
}

/* ─── CURSOR ─── */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    const animRing = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.12;
      p.ry += (p.my - p.ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + "px";
        ringRef.current.style.top = p.ry + "px";
      }
      rafRef.current = requestAnimationFrame(animRing);
    };
    rafRef.current = requestAnimationFrame(animRing);

    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);
    document.querySelectorAll("a,button,input,select").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-el">
        <div className="cur-dot" />
      </div>
      <div ref={ringRef} className="cur-el">
        <div className={`cur-ring${isHover ? " cur-ring--hover" : ""}`} />
      </div>
    </>
  );
}

/* ─── APP ─── */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero loaded={loaded} />
      <Ticker />
      <Problem />
      <Solution />
      <Contact />
      <Footer />
    </>
  );
}