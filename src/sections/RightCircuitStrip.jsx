// src/sections/RightCircuitStrip.jsx
export default function RightCircuitStrip({
  className = "",
  src = "/circuit-right-strip.png",
}) {
  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Görsel — sağa sabit, tam yükseklik */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-right"
        draggable={false}
        loading="eager"
        fetchpriority="high"
      />

      {/* Kenar gölgeleri ve merkez karartması (ortaya yazı gelecekse) */}
      {/* sağ kenar vinyet */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/45 to-transparent" />
      {/* üst-alt karartma */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/28 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
      {/* soldan merkeze doğru koyulaştırma (metin için kontrast) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent via-black/24 to-black/40" />

      {/* İnce iç çizgi (çok soft) */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
    </div>
  );
}
