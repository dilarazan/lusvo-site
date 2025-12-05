import React from "react";

/**
 * AiNeuralAurora (PRO)
 * - Çizgisiz, kutusuz: ışık şeritleri + aurora + lens parlaması
 * - Arka planla kaynaşır; premium, teknolojik bir vibe verir
 */
export default function AiNeuralAurora({ className = "" }) {
  return (
    <figure
      aria-hidden="true"
      className={[
        "relative isolate w-full h-[52svh] min-h-[420px] max-h-[640px]",
        "overflow-visible select-none",
        className,
      ].join(" ")}
    >
      {/* ultra hafif yıldız tozu */}
      <div className="aurora-stars pointer-events-none" />

      {/* yumuşak aurora bulutu (conic + radial mix) */}
      <div className="aurora-field pointer-events-none" />

      {/* foton ışık şeritleri (mask + translateX) */}
      <div className="aurora-ribbon aurora-ribbon--a" />
      <div className="aurora-ribbon aurora-ribbon--b" />
      <div className="aurora-ribbon aurora-ribbon--c" />

      {/* nazik lens parlaması */}
      <div className="aurora-flare pointer-events-none" />

      {/* foton kıvılcımları (SVG; çok hafif) */}
      <svg className="aurora-sparks pointer-events-none" viewBox="0 0 600 420">
        <defs>
          <radialGradient id="spark" r="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".95" />
            <stop offset=".35" stopColor="#fff" stopOpacity=".35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(16)].map((_, i) => {
          // sabit ama doğal dağılım
          const x = (i * 37 * 19) % 600;
          const y = (i * 53 * 11) % 420;
          const r = 1.4 + ((i * 17) % 6) * 0.22;
          const d = 3 + (i % 5);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="url(#spark)"
              style={{
                animation: `sparkFloat ${5 + d}s ease-in-out ${i * 0.22}s infinite`,
                opacity: 0.35,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,.18))",
              }}
            />
          );
        })}
      </svg>

      {/* hafif film grain (derinlik için) */}
      <div className="aurora-noise pointer-events-none" />
    </figure>
  );
}
