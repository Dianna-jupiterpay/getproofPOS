function Hero({ loaded }) {
  useEffect(() => {
    const canvas = document.getElementById("hero-liquid");
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();

    function noise(x, y, t) {
      return (
        Math.sin(x * 1.1 + t * 0.4) *
          Math.cos(y * 0.9 + t * 0.3) *
          0.5 +
        Math.sin(x * 0.4 + y * 0.6 + t * 0.25) *
          0.3 +
        Math.cos(x * 0.7 - y * 0.5 + t * 0.18) *
          Math.sin(x * 0.3 + t * 0.12) *
          0.2
      );
    }

    function lerp(a, b, t) {
      return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
      ];
    }

    const colors = [
      [2,   8,  23],    // near-black base
      [10,  20,  55],   // deep navy
      [20,  51, 140],   // indigo-navy
      [47,  90, 200],   // bright indigo-blue
      [60,  80, 180],   // periwinkle accent
      [20,  81, 168],   // sol-left blue
      [0,  140, 180],   // teal anchor
      [8,   30,  70],   // dark fade
      [2,    8,  23],   // base
    ];

    let t = 0;
    let rafId;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;

      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const nx = (x / W) * 3;
          const ny = (y / H) * 2;

          const warp  = noise(nx, ny, t);
          const warp2 = noise(nx * 1.5, ny * 1.2, t * 0.7);

          let v =
            (Math.sin(nx * 2.2 + warp  * 2.3 + t * 0.3) * 0.5 + 0.5) * 0.6 +
            (Math.cos(ny * 2.5 + warp2 * 2.0 - t * 0.2) * 0.5 + 0.5) * 0.4;

          v = Math.max(0, Math.min(1, v));

          const ci  = v * (colors.length - 1);
          const c0  = Math.floor(ci);
          const c1  = Math.min(colors.length - 1, c0 + 1);
          const c   = lerp(colors[c0], colors[c1], ci - c0);

          const idx = (y * W + x) * 4;
          data[idx]     = c[0];
          data[idx + 1] = c[1];
          data[idx + 2] = c[2];
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Vignette
      const grad = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.9);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      t += 0.0015;
      rafId = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero">
      <canvas id="hero-liquid" className="hero__liquid" />
      <div className="hero__grain" />
      <div className="hero__atmosphere" />
      <div className="hero__bottom-fade" />

      <div className={`hero__content${loaded ? " hero__content--loaded" : ""}`}>
        <p className={`hero__eyebrow${loaded ? " hero__eyebrow--loaded" : ""}`}>
          <span className="hero__eyebrow-dot" />
          Proof POS <i>For Liquor Store Owners</i>
        </p>

        <h1 className="hero__headline">
          <span className="wm">
            <span
              className={`wm-inner${loaded ? " loaded" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              LiquorPOS® <br />
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
          LiquorPOS® recently announced EOL in less than a year,
          affecting your support and limiting your growth, now is
          the time to move.
        </p>

        <a href="#contact-form" className="btn btn--primary">
          Contact us
        </a>
      </div>
    </section>
  );
}