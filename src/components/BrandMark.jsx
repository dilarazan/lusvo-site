import { useEffect, useRef, useState } from "react";

/**
 * LUSSAI wordmark (pro)
 * - İkinci "S" ters (mirror)
 * - "AI" daha soluk
 * - Hover'da: iki "S" üzerinde premium "sheen" + yumuşak glow
 * - Idle’da animasyon yok (yalnız hover sırasında çalışır)
 */
export default function BrandMark({ size = 150, className = "" }) {
  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const [active, setActive] = useState(false);

  // Hover sırasında mouse-glow'u yumuşak takip ettir
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let tx = 0.5, ty = 0.5;  // target %
    let cx = 0.5, cy = 0.5;  // current %
    const lerp = 0.08;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      ty = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      if (!rafRef.current) step();
    };

    const step = () => {
      cx += (tx - cx) * lerp;
      cy += (ty - cy) * lerp;
      el.style.setProperty("--mx", `${(cx * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(1)}%`);
      rafRef.current = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002)
        ? requestAnimationFrame(step)
        : 0;
    };

    if (active) {
      el.addEventListener("mousemove", onMove);
    }
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [active]);

  const fs = Math.round(size * 0.24); // font-size

  return (
    <div
      ref={wrapRef}
      className={[
        "bm-logo relative inline-flex select-none items-center",
        active ? "bm--active" : "",
        className,
      ].join(" ")}
      style={{
        width: size,
        height: fs * 1.05,
        ["--mx"]: "50%",
        ["--my"]: "50%",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      aria-label="LUSSAI"
    >
      {/* Glow (sadece hover’da görünür) */}
      <span aria-hidden className="bm-glow" />

      {/* Wordmark */}
      <span
        className="bm-word"
        style={{
          fontSize: `${fs}px`,
          lineHeight: 1,
        }}
      >
        {/* L U S S A I */}
        <span className="bm-ch">L</span>
        <span className="bm-ch">U</span>

        {/* 1. S (parıltılı) */}
        <span className="bm-ch bm-s">S</span>

        {/* 2. S — ters */}
        <span className="bm-ch bm-s bm-s--flip">S</span>

        {/* AI — daha soluk */}
        <span className="bm-ch bm-ai">A</span>
        <span className="bm-ch bm-ai">I</span>
      </span>

      {/* Amber underline */}
      <span aria-hidden className="bm-line" />
    </div>
  );
}
