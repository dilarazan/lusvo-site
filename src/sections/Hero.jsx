// src/sections/Hero.jsx
import Section from "../components/Section";
import { useEffect, useRef } from "react";

/* =============== SOL: CANVAS tabanlı animasyonlu ribbon/mesh =============== */
function LeftRibbon() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let raf, t = 0;

    const dpr = () => window.devicePixelRatio || 1;
    const resize = () => {
      const r = dpr();
      const parent = c.parentElement;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      c.width = w * r; c.height = h * r;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };
    const onResize = () => resize();
    resize();
    window.addEventListener("resize", onResize);

    const draw = () => {
      t += 0.008; // yavaş & premium
      const W = c.width / dpr(), H = c.height / dpr();

      // Sol blok genişliği
      const leftW = W * 0.48;

      // Arka plan (sol blok)
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0a0f16");
      bg.addColorStop(1, "#0b1622");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, leftW, H);

      // Ribbon parametreleri
      const centerX = leftW * 0.62;
      const amp = leftW * 0.28;
      const curve = 0.0023;
      const lines = 22;
      const skew = 0.9;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Dikey kaburgalar
      for (let i = 0; i < lines; i++) {
        const offset = (i / (lines - 1) - 0.5) * amp * 0.9;
        const phase = i * 0.18;
        ctx.beginPath();
        for (let y = 0; y <= H; y += 4) {
          const sway = Math.sin(y * curve + t * 2 + phase) * (amp * 0.36);
          const x = centerX + sway + offset;
          const xx = x + (y - H / 2) * 0.02 * skew;
          if (y === 0) ctx.moveTo(xx, y); else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = `rgba(127,194,255,${0.58 - (i/lines)*0.48})`;
        ctx.lineWidth = 1.6 - (i/lines)*0.9;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(95,180,255,.6)";
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Çapraz mesh – set 1
      const diagCount = 14;
      for (let i = 0; i < diagCount; i++) {
        const phase = i * 0.3;
        const yStart = -H * 0.15 + i * (H / (diagCount - 2));
        ctx.beginPath();
        for (let s = 0; s <= 1; s += 1 / 220) {
          const y = yStart + s * H * 1.3;
          const sway = Math.sin(y * curve + t * 2.2 + phase) * (amp * 0.36);
          const x = centerX + sway - (s * 90);
          const xx = x + (y - H/2) * 0.02 * skew;
          if (s === 0) ctx.moveTo(xx, y); else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = "rgba(89,168,255,.42)";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // Çapraz mesh – set 2 (ters)
      for (let i = 0; i < diagCount; i++) {
        const phase = i * 0.28;
        const yStart = H * 1.15 - i * (H / (diagCount - 2));
        ctx.beginPath();
        for (let s = 0; s <= 1; s += 1 / 220) {
          const y = yStart - s * H * 1.3;
          const sway = Math.sin(y * curve + t * 2.0 + phase) * (amp * 0.36);
          const x = centerX + sway + (s * 90);
          const xx = x + (y - H/2) * 0.02 * skew;
          if (s === 0) ctx.moveTo(xx, y); else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = "rgba(89,168,255,.42)";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-y-0 left-0 w-[48%] h-full z-0 [max-width:none]"
      aria-hidden="true"
    />
  );
}

/* =============== SAĞ: Kırpılmış devre şeridi görseli + gölgeler =============== */
function RightCircuitStrip({
  src = "public/circuit-right-strip.png", // public klasörüne koy
}) {
  return (
    <div className="absolute inset-y-0 right-0 w-[42%] min-w-[360px] z-0" aria-hidden="true">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover object-right"
        draggable={false}
        loading="eager"
        fetchpriority="high"
      />
      {/* Kenar/merkez gölgeleri */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/28 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent via-black/24 to-black/40" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
    </div>
  );
}

/* ================================ HERO ================================ */
export default function Hero() {
  return (
    <Section
      id="hero"
      className="
        relative isolate min-h-[100svh]
overflow-hidden bg-transparent
      "
    >
      {/* Sol: kodla animasyon */}
      <LeftRibbon />

      {/* Orta geçiş (sol->sağ yumuşatma) */}
      <div className="pointer-events-none absolute inset-y-0 left-[40%] w-[8%] z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-transparent to-transparent" />
      </div>

      {/* Sağ: kırpılmış görsel panel */}
      <RightCircuitStrip />

      {/* Üst yumuşak ışık */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_38%,black,transparent)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
      </div>
            {/* ==================== Ortadaki içerik ==================== */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex items-center gap-6">
          {/* Navbar'daki logo birebir kopyası */}
<div
  className="
    lusai-pro hero-center
    transform transition-all duration-[1600ms] ease-out
    hover:translate-x-6 hover:scale-[2.1]
    scale-[1.8]
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

          {/* Yazı */}
          <h1 className="tracking-[0.35em] text-sm md:text-base font-light text-white/80 uppercase select-none">
            Artificial Intelligence
          </h1>
        </div>
      </div>

    </Section>
  );
}
