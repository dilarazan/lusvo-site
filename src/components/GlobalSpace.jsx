import { useEffect, useRef } from "react";

export default function GlobalSpace() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let raf, t = 0;

    const DPR = () => window.devicePixelRatio || 1;

    const fit = () => {
      const r = DPR();
      const W = window.innerWidth;

      const demoEl = document.getElementById("demo");
      const H = demoEl
        ? demoEl.offsetTop + demoEl.offsetHeight * 0.15
        : window.innerHeight * 1.3;

      c.width = W * r;
      c.height = H * r;
      c.style.width = `${W}px`;
      c.style.height = `${H}px`;
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };

    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("scroll", fit);

    const draw = () => {
      t += 0.008;

      const W = window.innerWidth;
      const demoEl = document.getElementById("demo");
      const H = demoEl
        ? demoEl.offsetTop + demoEl.offsetHeight * 0.15
        : window.innerHeight * 1.3;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const leftW = W * 0.48;
      const centerX = leftW * 0.62;
      const amp = leftW * 0.28;
      const curve = 0.0023;
      const lines = 22;
      const skew = 0.9;

      const fadeStart = H * 0.8; // fade’in başladığı yer
      const fadeEnd = H;         // spiral burada kaybolur

      for (let i = 0; i < lines; i++) {
        const offset = (i / (lines - 1) - 0.5) * amp * 0.9;
        const phase = i * 0.18;
        ctx.beginPath();

        for (let y = 0; y <= H; y += 4) {
          const sway = Math.sin(y * curve + t * 2 + phase) * (amp * 0.36);
          const x = centerX + sway + offset;
          const xx = x + (y - H / 2) * 0.02 * skew;

          const fadeFactor =
            y > fadeStart ? 1 - (y - fadeStart) / (fadeEnd - fadeStart) : 1;

          ctx.globalAlpha = fadeFactor;
          y === 0 ? ctx.moveTo(xx, y) : ctx.lineTo(xx, y);
        }

        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(127,194,255,${0.55 - (i / lines) * 0.45})`;
        ctx.lineWidth = 1.4 - (i / lines) * 0.8;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(95,180,255,.5)";
        ctx.stroke();
      }

      // 🔹 Mavi fade-out glow — demo hizasında biter
      const fadeY = H - 200;
      const grad = ctx.createLinearGradient(0, fadeY, 0, H);
      grad.addColorStop(0, "rgba(95,180,255,0.15)");
      grad.addColorStop(0.5, "rgba(95,180,255,0.05)");
      grad.addColorStop(1, "rgba(0,0,0,1)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, fadeY, W, H - fadeY);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("scroll", fit);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full pointer-events-none -z-10"
      style={{
        background: "#000",
        filter: "brightness(1.05) contrast(1.05)",
      }}
    />
  );
}
