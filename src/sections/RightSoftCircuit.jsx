// src/sections/RightSoftCircuit.jsx
export default function RightSoftCircuit({ className = "" }) {
  return (
    <div className={["relative h-full w-full", className].join(" ")} aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* mavi ton (soluk) */}
          <linearGradient id="wire" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#5fb4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2b8fff" stopOpacity="0.18" />
          </linearGradient>

          {/* hafif glow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* arka degrade (sağ daha parlak, sola kararır) */}
          <linearGradient id="bgfade" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#0f2740" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#0b1828" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* mavi parıltı noktaları için nabız */}
          <radialGradient id="dotg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#7cc2ff" />
            <stop offset="60%" stopColor="#7cc2ff" stopOpacity=".35" />
            <stop offset="100%" stopColor="#7cc2ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sağdan sola kararan panel */}
        <rect x="0" y="0" width="1600" height="900" fill="url(#bgfade)" />

        {/* === ANA DEVRE HATLARI (sağdan sola) === */}
        {[
          { y: 140, bend: 220, down: 140 },
          { y: 240, bend: 220, down: 190 },
          { y: 360, bend: 200, down: 240 },
          { y: 500, bend: 200, down: 280 },
          { y: 640, bend: 220, down: 330 },
        ].map((L, i) => {
          const xR = 1520; // sağ kenar
          const xL = 260;  // sola uzanma
          const r = 84;    // kıvrım yarıçapı
          const d = `
            M ${xR} ${L.y}
            H ${xR - L.bend}
            Q ${xR - r} ${L.y} ${xR - r} ${L.y + r}
            V ${L.y + L.down - r}
            Q ${xR - r} ${L.y + L.down} ${xR - 2 * r} ${L.y + L.down}
            H ${xL}
          `;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="url(#wire)"
              strokeWidth="10"
              filter="url(#glow)"
              opacity="0.25"
              strokeLinecap="round"
            />
          );
        })}

        {/* kısa yatay mikro hatlar */}
        {Array.from({ length: 16 }).map((_, i) => {
          const y = 120 + i * 40;
          const x1 = 900 + ((i * 73) % 460);
          const len = 140 + (i % 4) * 40;
          return (
            <path
              key={`m${i}`}
              d={`M ${x1} ${y} H ${x1 - len}`}
              stroke="url(#wire)"
              strokeWidth="8"
              opacity="0.18"
              filter="url(#glow)"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}

        {/* via/düğme noktaları (nabız animasyonlu, soluk) */}
        {Array.from({ length: 42 }).map((_, i) => {
          const x = 980 + (i * 57) % 520;
          const y = 110 + (i * 113) % 720;
          const dur = 4 + (i % 7) * 0.6;
          const delay = (i % 9) * -0.4;
          return (
            <g key={`d${i}`} opacity=".65">
              <circle cx={x} cy={y} r="2.2" fill="#7cc2ff" opacity=".35" />
              <circle cx={x} cy={y} r="10">
                <animate attributeName="r" values="6;12;6" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} />
                <animate attributeName="opacity" values=".38;.12;.38" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} />
                <animate attributeName="fill" values="url(#dotg);url(#dotg);url(#dotg)" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* ek, çok yumuşak karartmalar (profesyonel/“silik” görünüm) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-l from-transparent to-black/35" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/24 to-transparent" />
    </div>
  );
}
