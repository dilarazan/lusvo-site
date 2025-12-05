// src/sections/HeroShowcase.jsx
import React, { useEffect, useRef } from "react";

/* =======================================================
   SOL SPIRAL — Fade-out ile zarif şekilde sonlanır
======================================================= */
function LeftRibbon() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    let raf;
    let t = 0;

    const DPR = () => window.devicePixelRatio || 1;

    const fit = () => {
      const r = DPR();
      const p = c.parentElement;
      if (!p) return;
      const w = p.clientWidth;
      const h = p.clientHeight;
      c.width = w * r;
      c.height = h * r;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };

    fit();
    window.addEventListener("resize", fit);

    const draw = () => {
      t += 0.008;
      const W = c.width / DPR();
      const H = c.height / DPR();
      const leftW = W * 0.48;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, leftW, H);

      const centerX = leftW * 0.62;
      const amp = leftW * 0.28;
      const curve = 0.0023;
      const lines = 22;
      const skew = 0.9;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < lines; i++) {
        const offset = (i / (lines - 1) - 0.5) * amp * 0.9;
        const phase = i * 0.18;
        ctx.beginPath();

        for (let y = 0; y <= H; y += 4) {
          const fade = 1 - Math.max(0, (y - H * 0.65) / (H * 0.35));
          const sway = Math.sin(y * curve + t * 2 + phase) * (amp * 0.36);
          const x = centerX + sway + offset;
          const xx = x + (y - H / 2) * 0.02 * skew;

          if (y === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
          ctx.globalAlpha = fade;
        }

        ctx.globalAlpha = 1;
        ctx.strokeStyle = `rgba(127,194,255,${0.58 - (i / lines) * 0.48})`;
        ctx.lineWidth = 1.6 - (i / lines) * 0.9;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(95,180,255,.6)";
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      const fadeGradient = ctx.createLinearGradient(0, H * 0.7, 0, H);
      fadeGradient.addColorStop(0, "rgba(0,0,0,0)");
      fadeGradient.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = fadeGradient;
      ctx.fillRect(0, H * 0.7, W, H * 0.3);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-y-0 left-0 w-[48%] h-full z-10"
    />
  );
}

/* =======================================================
   NEURAL BAĞLANTI ÇİZGİLERİ — Logonun sağ üstünde, çapraz
======================================================= */
function NeuralLinks() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h, raf;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const points = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(95,180,255,0.6)";

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(95,180,255,${0.22 - dist / 900})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95,180,255,0.7)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute pointer-events-none opacity-75 z-20"
      style={{
        right: "5%",
        top: "5%",
        width: "36vw",
        height: "42vh",
        transform: "rotate(15deg)",
      }}
    />
  );
}

/* =======================================================
   ORTA LOGO (senin mevcut LUSAI işaretlemen)
======================================================= */
function CenterLogo() {
  return (
    <div className="absolute inset-0 z-[3] flex items-center justify-center">
      {/* SAĞ itme biraz azaltıldı; gap küçültüldü */}
      <div className="flex items-center translate-x-[clamp(20px,8vw,160px)] select-none text-white">
        {/* Sol etiket BLOĞU: yeri sabit kalsın */}
        <div className="hidden sm:flex flex-col items-end leading-tight mr-2">
          <span className="tracking-[0.32em] text-[12px] sm:text-[13px] opacity-75 uppercase">
            ARTIFICIAL
          </span>
          <span className="tracking-[0.32em] text-[12px] sm:text-[13px] opacity-75 uppercase">
            INTELLIGENCE
          </span>
        </div>

        {/* LUSAI — etikete “yapışık” */}
        <a href="/" className="group pointer-events-auto">
          <div
            className="
              lusai-pro text-white leading-none
              text-[64px] sm:text-[78px] md:text-[92px]
              -ml-1 sm:-ml-2 md:-ml-3   /* etikete doğru yaklaştırma */
            "
          >
            <span className="lus-lus">
              <span className="ch k-L">L</span>
              <span className="ch k-U">U</span>
              <span className="ch s k-S">S</span>
            </span>
            <span className="ch ai k-A">A</span>
            <span className="ch ai k-nudge-up">I</span>
          </div>
        </a>
      </div>
    </div>
  );
}



/* =======================================================
   HERO — Default export (App.jsx import default)
======================================================= */
export default function HeroShowcase() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] bg-transparent overflow-hidden"
    >
      {/* Sol spiral (solda, arkada) */}

      {/* Logo (önde) */}
      <CenterLogo />

      {/* Neural bağlantı (sağ üstte, çapraz) */}
      <NeuralLinks />
    </section>
  );
}
