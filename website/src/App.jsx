import { useState, useEffect, useRef } from "react";
import "./style.css";
import Contact from "./Contact.jsx";
import Countdown from "./Countdown.jsx";
import cancel from "./assets/cancel.png";
import warning from "./assets/warning.png";
import block from "./assets/block.png";
import "./problem.css";
import FinalLogo from "./assets/Final.svg";

const CancelIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const ProofLogo = ({ color = "#002c65", width = 140 }) => (
  <svg
    viewBox="0 0 1100 220"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width, height: "auto" }}
  >
    {/* Bottle */}
    <g transform="translate(0,10)">
      <path
        d="M38 8v38c0 5-2 10-5 14l-7 8c-2 2-3 5-3 8v113c0 4 3 7 7 7h40c4 0 7-3 7-7V76c0-3-1-6-3-8l-7-8c-3-4-5-9-5-14V8"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <line
        x1="34"
        y1="8"
        x2="66"
        y2="8"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>

    {/* proof text */}
    <text
      x="115"
      y="155"
      fontFamily="Inter, Helvetica, Arial, sans-serif"
      fontSize="145"
      fontWeight="700"
      fill={color}
      letterSpacing="-6"
    >
      proof
    </text>
  </svg>
);


const WarningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8820a" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const BlockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1b2d5b" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);


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
     
             <img
          src={FinalLogo}
          alt="Proof"
          className="nav__logo-img"
        />
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
      {/* Animated Mesh Background */}
      <div className="hero__bg">
        <div className="hero__mesh" />
      </div>

      <div className={`hero__content${loaded ? " hero__content--loaded" : ""}`}>
        <p className={`hero__eyebrow${loaded ? " hero__eyebrow--loaded" : ""}`}>
          <span className="hero__eyebrow-dot" />
          For Liquor Store Owners
        </p>

        <h1 className="hero__headline">
          <span className="wm">
            <span
              className={`wm-inner${loaded ? " loaded" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              LiquorPOS<sup className="reg" style={{ fontSize: '0.7em', fontWeight: 8 }}>®</sup> <br />
              End of Life is Coming.  
            </span>
          </span>

          <br />

          <span className="wm">
            <span
              className={`wm-inner${loaded ? " loaded" : ""}`}
              style={{ transitionDelay: "0.36s" }}
            >
              <em>Switch before it does.</em>
            </span>
          </span>
        </h1>

        <Countdown />

        <p className={`hero__sub${loaded ? " hero__sub--loaded" : ""}`}>
          If your current POS is losing support or limiting your growth,
          now is the time to move. We help liquor stores switch systems
          with zero downtime and no data loss.
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

// Problem.jsx
function Problem() {
  const [secRef, secVis] = useReveal();
 
  const cards = [
    {
      icon: <img src={cancel} alt="" width={28} height={28} />,
      title: "No new registers or locations",
      desc: (
  <>
    LiquorPOS
    <sup className="reg reg--desc">®</sup>
    {" "}ceased selling new licenses effective May 1st, 2026.
    Every opportunity to grow is now blocked by your own software.
  </>
),
    },
    {
      icon: <img src={warning} alt="" width={28} height={28} />,
      title: "Support is winding down",
    desc: (
  <>
    LiquorPOS
    <sup className="reg reg--desc">®</sup>
    {" "}support ends May 1st, 2027 — leaving you with no way
    to troubleshoot issues or keep your business running.
  </>
),    },
    {
      icon: <img src={block} alt="" width={28} height={28} />,
      title: "No upgrade path",
      desc: "End of life means no new features, no security patches, and no future. You're frozen in place.",
    },
  ];
 
  return (
    <section id="problem" className="section section--light">
      <div className="section-frame">
      <div className="container">
        <div
          ref={secRef}
          className={`prob-block rev${secVis ? " vis" : ""}`}
        >
          {/* Header */}
          <div className="prob-block__header">
            <p className="section__label">The Situation</p>
            <h2 className="prob-block__headline">
              Many LiquorPOS<sup className="reg" style={{ fontSize: '0.6em' }}>®</sup>  users<br />are facing this right now.
            </h2>
          </div>
 
          {/* Bordered grid */}
          <div className="prob-grid">
            {cards.map((c, i) => (
              <div key={i} className="prob-text-cell">
                <div className="prob-icon-box">{c.icon}</div>
                <h3 className="prob-text-cell__title">{c.title}</h3>
                <p className="prob-text-cell__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}


function Solution() {
  const [secRef, secVis] = useReveal();
 
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 17V7l8-4 8 4v10l-8 4-8-4z" /><path d="M12 3v18M4 7l8 4 8-4" />
        </svg>
      ),
      title: "Seamless migration",
      desc: "We map your existing setup and handle the switch end-to-end. Your staff keeps working throughout.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      ),
      title: "All data preserved",
      desc: "Every product, price, and sale history transfers over. Nothing gets lost in translation.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Scale on your terms",
      desc: "Add registers, locations, and features whenever you're ready — not when your software allows.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 17z" />
        </svg>
      ),
      title: "Real support team",
      desc: "Not a chatbot. Not a ticket queue. Real people who understand liquor store operations.",
    },
  ];
 
  return (
    <section id="solution" className="section section--alt">
      <div className="container">
        <div
          ref={secRef}
          className={`sol-block rev${secVis ? " vis" : ""}`}
        >
          <div className="sol-block__inner">
            {/* Left panel */}
            <div className="sol-left">
              <div>
                <p className="section__label">The Solution</p>
                <h2 className="sol-left__headline">
                  Why leading stores<br />choose Proof
                </h2>
                <p className="sol-left__sub">
                  We built a migration path built specifically for LiquorPOS<sup className="reg">®</sup> users —
                  zero downtime, all your data intact, and a team that actually picks up the phone.
                </p>
              </div>

            </div>
 
            {/* Right 2×2 card grid */}
            <div className="sol-cards">
              {features.map((f, i) => (
                <div key={i} className="sol-card">
                  <div className="sol-card__icon">{f.icon}</div>
                  <h3 className="sol-card__title">{f.title}</h3>
                  <p className="sol-card__desc">{f.desc}</p>
                </div>
              ))}
            </div>
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