import { useState, useEffect, useRef } from "react";
import "./style.css";

/* ─── SVG COMPONENTS ─── */
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
        <BottleSVG stroke="#1b2d5b" width={22} />
        <span className="nav__logo-text">proof</span>
      </a>
      <div className="nav__links">
        <a href="#problem" className="nav__link">The Problem</a>
        <a href="#solution" className="nav__link">Solution</a>
        <a href="#contact-form" className="nav__cta">Get Free Plan</a>
      </div>
    </nav>
  );
}

/* ─── HERO FORM ─── */
function HeroForm({ loaded }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    storeName: "",
    email: "",
    preferredContact: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const SHEET_URL = "https://script.google.com/a/macros/jupiter-pay.com/s/AKfycbxkkyuI9S78ARLBDRMrR-8LTPBJq0IW0kw-wuYbP21DbPy8y3Yw16XUhX_On0_dWJ8Gqw/exec";

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.storeName || !form.email || !form.preferredContact) {
      alert("Please fill in all required fields.");
      return;
    }

    setSending(true);
    setError(false);

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`form-panel${loaded ? " form-panel--loaded" : ""}`}>
      <div className="form-panel__header">
        <p className="form-panel__tagline">Free Transition Plan</p>
        <h2 className="form-panel__title">
          Get your plan<br /><em>today.</em>
        </h2>
      </div>

      {submitted ? (
        <div className="form-panel__success">
          <div className="form-panel__success-icon">✅</div>
          <h3>You're All Set!</h3>
          <p>A POS specialist will reach out within one business day via your preferred method.</p>
        </div>
      ) : (
        <div className="form-panel__body">

          <div className="field-row">
            <div className="field">
              <label className="field__label">First Name</label>
              <input
                className="field__input"
                type="text"
                placeholder="Jane"
                value={form.firstName}
                onChange={update("firstName")}
              />
            </div>
            <div className="field">
              <label className="field__label">Last Name</label>
              <input
                className="field__input"
                type="text"
                placeholder="Smith"
                value={form.lastName}
                onChange={update("lastName")}
              />
            </div>
          </div>

          <div className="field">
            <label className="field__label">Store Name</label>
            <input
              className="field__input"
              type="text"
              placeholder="Main Street Liquors"
              value={form.storeName}
              onChange={update("storeName")}
            />
          </div>

          <div className="field">
            <label className="field__label">Email Address</label>
            <input
              className="field__input"
              type="email"
              placeholder="you@yourstore.com"
              value={form.email}
              onChange={update("email")}
            />
          </div>

          <div className="field">
            <label className="field__label">Preferred Contact Method</label>
            <select
              className="field__input field__input--select"
              value={form.preferredContact}
              onChange={update("preferredContact")}
            >
              <option value="" disabled>Select one…</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Text Message">Text Message</option>
              <option value="Email">Email</option>
              <option value="Any">Any — whatever's fastest</option>
            </select>
          </div>

          <div className="field">
            <label className="field__label">Notes <span style={{ opacity: 0.5 }}>(optional)</span></label>
            <textarea
              className="field__input field__input--textarea"
              placeholder="Anything we should know about your current setup…"
              rows={3}
              value={form.notes}
              onChange={update("notes")}
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.8rem", textAlign: "center" }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            className={`form-panel__submit${sending ? " form-panel__submit--sending" : ""}`}
            onClick={handleSubmit}
            disabled={sending}
          >
            {sending ? "Sending…" : "Get My Free Transition Plan →"}
          </button>
          <p className="form-panel__note">No commitment. No pressure. Just clarity.</p>
        </div>
      )}
    </div>
  );
}

/* ─── HERO ─── */
function Hero({ loaded }) {
  return (
    <section className="hero">
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

        <p className={`hero__sub${loaded ? " hero__sub--loaded" : ""}`}>
          If your current POS is losing support or limiting your growth, now is the time to move. We help liquor stores switch systems with zero downtime and no data loss.
        </p>

        <a href="#contact-form" className="btn btn--primary">
          Check If You Qualify →
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

  const mockRows = [
    ["Inventory records", "✓ 14,832 items"],
    ["Customer data", "✓ Preserved"],
    ["Register terminals", "✓ Unlimited"],
    ["Downtime during switch", "✓ 0 minutes"],
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

          <div ref={mockRef} className={`mockup scale-up${mockVis ? " vis" : ""}`}>
            <div className="mockup__top">
              <span className="mockup__status-label">System Status</span>
              <span className="mockup__live">
                <span className="live-dot" />
                Live
              </span>
            </div>
            <div className="mockup__title">Migration Complete</div>
            <div className="mockup__sub">Store transitioned — zero downtime</div>
            <div className="mockup__rows">
              {mockRows.map(([label, val], i) => (
                <div key={i} className="mockup__row">
                  <span>{label}</span>
                  <span className="mockup__row-val">{val}</span>
                </div>
              ))}
            </div>
            <span className="mockup__badge">Ready to Expand</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST ─── */
function Trust() {
  const [headRef, headVis] = useReveal();
  const [subRef, subVis] = useReveal();

  const stats = [
    { n: "0",    l: "Minutes downtime in managed migrations" },
    { n: "48h",  l: "Average time from sign-off to full go-live" },
    { n: "100%", l: "Of stores kept their full inventory data" },
    { n: "∞",    l: "Registers and locations you can add" },
  ];

  return (
    <section id="trust" className="section section--navy">
      <div className="container">
        <div className="trust__grid">
          <div className="trust__copy">
            <h2 ref={headRef} className={`trust__headline rev${headVis ? " vis" : ""}`}>
              Trusted by operators<br />making the <em>smart</em> move.
            </h2>
            <p ref={subRef} className={`trust__sub rev${subVis ? " vis" : ""}`}>
              Already working with liquor store owners across the country. When your current system leaves you behind, we make sure the next chapter is better.
            </p>
          </div>

          <div className="trust__stats">
            {stats.map((s, i) => {
              const [ref, vis] = useReveal();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`stat-card rev${vis ? " vis" : ""}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="stat-card__num">{s.n}</div>
                  <div className="stat-card__label">{s.l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── LOGO SECTION ─── */
function LogoSection() {
  const [ref, vis] = useReveal();
  return (
    <section className="section section--muted">
      <div className="container container--centered">
        <div ref={ref} className={`logo-showcase rev${vis ? " vis" : ""}`}>
          <div className="logo-showcase__badge">
            <BottleSVG stroke="white" width={36} />
            <span className="logo-showcase__wordmark">proof</span>
          </div>
          <p className="logo-showcase__desc">
            The only POS built specifically for liquor stores that won't leave you behind.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ─── */
function CTASection() {
  const [urgRef, urgVis] = useReveal();
  const [hRef, hVis] = useReveal();
  const [pRef, pVis] = useReveal();
  const [btnRef, btnVis] = useReveal();

  return (
    <section id="cta" className="section section--light">
      <div className="container container--narrow container--centered">
        <span ref={urgRef} className={`urgency-badge rev${urgVis ? " vis" : ""}`}>
          Support changes are impacting stores now
        </span>
        <h2 ref={hRef} className={`cta__headline rev${hVis ? " vis" : ""}`}>
          Don't wait<br />until it's <em>too late.</em>
        </h2>
        <p ref={pRef} className={`cta__sub rev${pVis ? " vis" : ""}`}>
          Get a free transition plan and see how easy it is to move to a supported system. You don't have to wait until support ends to have a plan.
        </p>
        <div ref={btnRef} className={`rev${btnVis ? " vis" : ""}`}>
          <a href="#contact-form" className="btn btn--primary">
            Get My Free Transition Plan →
          </a>
          <p className="cta__friction">No commitment. No pressure. Just clarity.</p>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM SECTION ─── */
function ContactFormSection() {
  return (
    <section id="contact-form" className="section section--navy section--form">
      <div className="container container--narrow">
        <HeroForm loaded={true} />
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
      <Trust />
      <LogoSection />
      <CTASection />
      <ContactFormSection />
      <Footer />
    </>
  );
}