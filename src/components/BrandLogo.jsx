// src/components/BrandLogo.jsx
// LUSAI – mouse'u takip eden YAVAŞ ışık, harfler büyümez/kaymaz.
import { useEffect, useRef } from "react";

export default function BrandLogo({ size = "text-[32px]", className = "" }) {
  const wrapRef = useRef(null);
  const slowPos = useRef({ x: 0.5, y: 0.5 }); // yavaşlanan poz
  const target = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef(0);

  // çok yavaş takip: her frame’de küçük bir adımla yaklaş (lerp)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      target.current.x = Math.max(0, Math.min(1, mx));
      target.current.y = Math.max(0, Math.min(1, my));
      el.classList.add("is-active");
    };
    const onLeave = () => el.classList.remove("is-active");

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    // çok yavaş animasyon döngüsü (küçük adım = 0.04)
    const tick = () => {
      slowPos.current.x += (target.current.x - slowPos.current.x) * 0.04;
      slowPos.current.y += (target.current.y - slowPos.current.y) * 0.04;
      el.style.setProperty("--mx", (slowPos.current.x * 100).toFixed(2) + "%");
      el.style.setProperty("--my", (slowPos.current.y * 100).toFixed(2) + "%");
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[
        "logo-lusai group select-none relative inline-block",
        className,
      ].join(" ")}
      // başlangıç konumu
      style={{ "--mx": "50%", "--my": "50%" }}
    >
      {/* Glow layer (yavaş hareket eden) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-12px] -z-[1] opacity-0 group-[.is-active]:opacity-90 transition-opacity duration-150"
        style={{
          background:
            "radial-gradient(160px 160px at var(--mx) var(--my), rgba(255,255,255,.36) 0%, rgba(255,255,255,.14) 34%, rgba(255,255,255,0) 62%)",
          filter: "blur(10px)",
          mixBlendMode: "screen",
        }}
      />

      {/* LUSAI kelimesi */}
      <span
        className={[
          "logo-lusai__word font-black tracking-[.02em] text-white",
          size,
        ].join(" ")}
      >
        {"LUSAI".split("").map((ch, i) => (
          <span
            key={i}
            className="hdr-char"
            style={{ "--d": `${i * 40}ms` }}
          >
            {ch}
          </span>
        ))}
      </span>
    </div>
  );
}
