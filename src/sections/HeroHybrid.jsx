// src/sections/HeroHybrid.jsx
import { useEffect, useRef } from "react";
import RightCircuitReplicaBlack from "./RightCircuitReplicaBlack.jsx";

const COLORS = {
  bgTop: "#000000",
  bgBottom: "#000000",
};


export default function HeroHybrid() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* SOL: CANVAS tabanlı animasyon */}
      <LeftRibbon />

      {/* Ortadaki yumuşak geçiş (sol → sağ) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-[38%] w-[10%] z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      </div>

      {/* SAĞ: KODLA ÇİZİLEN devre paneli (siyah zemin) */}
      <div className="absolute inset-y-0 right-0 w-[60%] min-w-[760px] z-0">
        <RightCircuitReplicaBlack />
        {/* Kenar vinyetleri — istersen kaldırabilirsin */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/30 to-transparent" />
      </div>

      {/* Üstten yumuşak ışık */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_38%,black,transparent)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
      </div>
    </div>
  );
}

/* ---------------- Left: animated ribbon + mesh (Canvas) ---------------- */
function LeftRibbon() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let raf, t = 0;

    const dpr = () => window.devicePixelRatio || 1;
    const resize = () => {
      const r = dpr();
      const p = c.parentElement;
      const w = p.clientWidth;
      const h = p.clientHeight;
      c.width = w * r;
      c.height = h * r;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.008; // premium yavaşlık
      const W = c.width / dpr();
      const H = c.height / dpr();

      // Sol blok genişliği
      const leftW = W * 0.46;

      // Sol blok: siyah zemin
      ctx.fillStyle = COLORS.bgTop;
      ctx.fillRect(0, 0, leftW, H);

      // Sol kenar vinyet (derinlik için)
      const vign = ctx.createLinearGradient(0, 0, leftW * 0.4, 0);
      vign.addColorStop(0, "rgba(0,0,0,.45)");
      vign.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, leftW * 0.4, H);

      // Şerit parametreleri
      const pivotX = leftW * 0.30;
      const centerX = leftW * 0.34;
      const amp = leftW * 0.30;
      const curve = 0.0026;
      const lines = 26;
      const skew = 0.95;

      // Nefes gibi mikro dönüş
      const rot = Math.sin(t * 0.22) * 0.02; // ~±1.1°
      ctx.save();
      ctx.translate(pivotX, H / 2);
      ctx.rotate(rot);
      ctx.translate(-pivotX, -H / 2);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Dikey kaburgalar
      for (let i = 0; i < lines; i++) {
        const offset = (i / (lines - 1) - 0.5) * amp * 0.85;
        const phase = i * 0.18;
        ctx.beginPath();
        for (let y = 0; y <= H; y += 4) {
          const sway = Math.sin(y * curve + t * 2 + phase) * (amp * 0.34);
          const x = centerX + sway + offset;
          const xx = x + (y - H / 2) * 0.02 * skew;
          if (y === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = `rgba(127,194,255,${0.6 - (i / lines) * 0.5})`;
        ctx.lineWidth = 1.5 - (i / lines) * 0.9;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(95,180,255,.55)";
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Çapraz mesh — set 1
      const diagCount = 16;
      for (let i = 0; i < diagCount; i++) {
        const phase = i * 0.32;
        const yStart = -H * 0.12 + i * (H / (diagCount - 2));
        ctx.beginPath();
        for (let s = 0; s <= 1; s += 1 / 220) {
          const y = yStart + s * H * 1.24;
          const sway = Math.sin(y * curve + t * 2.1 + phase) * (amp * 0.34);
          const x = centerX + sway - s * 80;
          const xx = x + (y - H / 2) * 0.02 * skew;
          if (s === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = "rgba(89,168,255,.40)";
        ctx.lineWidth = 1.05;
        ctx.stroke();
      }

      // Çapraz mesh — set 2 (ters)
      for (let i = 0; i < diagCount; i++) {
        const phase = i * 0.30;
        const yStart = H * 1.12 - i * (H / (diagCount - 2));
        ctx.beginPath();
        for (let s = 0; s <= 1; s += 1 / 220) {
          const y = yStart - s * H * 1.24;
          const sway = Math.sin(y * curve + t * 2.0 + phase) * (amp * 0.34);
          const x = centerX + sway + s * 80;
          const xx = x + (y - H / 2) * 0.02 * skew;
          if (s === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        ctx.strokeStyle = "rgba(89,168,255,.40)";
        ctx.lineWidth = 1.05;
        ctx.stroke();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-y-0 left-0 w-[46%] h-full z-0 [max-width:none]"
      aria-hidden="true"
    />
  );
}
