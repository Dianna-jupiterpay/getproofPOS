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
