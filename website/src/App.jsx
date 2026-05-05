import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    setLoaded(true);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    animate();

    return () => document.removeEventListener("mousemove", move);
  }, []);

  const handleSubmit = () => {
    setFormSent(true);
  };

  return (
    <div className={`${loaded ? "loaded" : ""} ${hover ? "hover" : ""}`}>
      {/* Cursor */}
      <div className="cur" ref={dotRef}>
        <div className="cur-dot"></div>
      </div>
      <div className="cur" ref={ringRef}>
        <div className="cur-ring"></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">For Liquor Store Owners</p>

          <h1 className="hero-headline">
            POS Support <br />
            <em>Ending?</em> <br />
            Don't Get Left <br />
            Behind.
          </h1>

          <p className="hero-sub">
            If your current system is limiting growth or phasing out support,
            now is the time to plan your next move.
          </p>
        </div>

        <div className="hero-right">
          {!formSent ? (
            <div className="form-panel">
              <h2 className="form-title">Get your plan today</h2>
              <input className="field-input" placeholder="Store Name" />
              <input className="field-input" placeholder="Name" />
              <input className="field-input" placeholder="Email" />
              <button className="form-submit" onClick={handleSubmit}>
                Get My Plan
              </button>
            </div>
          ) : (
            <div className="form-success">
              <h3>You're All Set!</h3>
              <p>We’ll reach out shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <h2>Many store owners face this</h2>
        <div className="prob-grid">
          <div className="prob-card">No expansion</div>
          <div className="prob-card">Support ending</div>
          <div className="prob-card">Legacy systems</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Don't wait until it's too late</h2>
        <button className="cta-btn">Get Started</button>
      </section>
    </div>
  );
}
