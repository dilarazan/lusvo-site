// src/components/AIStarfieldBeams.jsx
// Yıldızlı arka plan + iki yönlü soft beam (id prefix: sfb-)

export default function AIStarfieldBeams({
  className = "",
  seed = 123,
  density = 2.72,        // yıldız sayısı
  starOpacity = 1.28,   // yıldız max opaklığı
  starSize = 2.18,      // yıldız boyutu ölçeği (1.0 = önceki)
  speed = 0.42,
  // metin kolonunda kısma (tam gizlemez; yumuşak dim uygular)
  dimSafeArea = { x: 0, width: 1280, feather: 220, strength: 0.38 },
}) {
  const vbW = 3800, vbH = 1500;
  const t = (s) => `${(s / Math.max(0.001, speed)).toFixed(2)}s`;

  // RNG
  let s = seed >>> 0;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;

  // yıldız katmanları
  const counts = [
    Math.round(200 * density),
    Math.round(120 * density),
    Math.round(45  * density),
  ];
  const layers = counts.map((n, li) =>
    Array.from({ length: n }).map(() => {
      const x = (rnd() * vbW) | 0;
      const y = (rnd() * vbH) | 0;
      const base = li === 0 ? 0.65 : li === 1 ? 0.95 : 1.25;
      const r = (base + rnd() * (li === 2 ? 0.7 : 0.45)) * starSize;
      const dur = 3.5 + rnd() * 3.5;
      const delay = rnd() * dur; // negatif begin bazı tarayıcılarda sorun çıkarabilir
      const drift = 10 + rnd() * (li === 0 ? 18 : li === 1 ? 14 : 10);
      return { x, y, r, dur, delay, drift };
    })
  );

  // safe area (dim)
  const SA_X = dimSafeArea?.x ?? 0;
  const SA_W = Math.max(0, dimSafeArea?.width ?? 1200);
  const SA_F = Math.max(0, dimSafeArea?.feather ?? 200);
  const SA_S = Math.min(1, Math.max(0, dimSafeArea?.strength ?? 0.38));

  // iki beam yolu
  const downPath = `M ${vbW * 0.18} -400 C ${vbW * 0.24} ${vbH * 0.15}, ${vbW * 0.30} ${vbH * 0.45}, ${vbW * 0.36} ${vbH + 400}`;
  const upPath   = `M ${vbW * 0.82} ${vbH + 400} C ${vbW * 0.76} ${vbH * 0.75}, ${vbW * 0.70} ${vbH * 0.45}, ${vbW * 0.64} -400`;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* yıldız glow */}
        <radialGradient id="sfb-star" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="55%" stopColor={`rgba(255,255,255,${starOpacity})`} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* metin kolonunda dim maskesi */}
        <linearGradient id="sfb-dim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="black" stopOpacity={SA_S} />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>

        {/* Beam stroke + spec + geniş glow */}
        <linearGradient id="sfb-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
          <stop offset="30%"  stopColor="rgba(255,255,255,.14)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,.34)" />
          <stop offset="70%"  stopColor="rgba(255,255,255,.14)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-0.25 0"
            to="0.25 0"
            dur={t(18)}
            repeatCount="indefinite"
          />
        </linearGradient>

        <linearGradient id="sfb-spec" x1="0" y1="0" x2="1" y2="0">
          <stop offset="48%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.65)" />
          <stop offset="52%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <radialGradient id="sfb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="rgba(255,255,255,.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        <filter id="sfb-soft"><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="sfb-soft2"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <rect width={vbW} height={vbH} fill="var(--page-bg, #0a0c10)" />

      {/* dim maskesi */}
      <mask id="sfb-mask">
        <rect x="-10000" y="-10000" width="20000" height="20000" fill="white" />
        <rect
          x={SA_X}
          y="-10000"
          width={Math.max(0, SA_W - SA_F)}
          height="20000"
          fill="black"
          fillOpacity={SA_S}
        />
        <rect
          x={SA_X + Math.max(0, SA_W - SA_F)}
          y="-10000"
          width={SA_F}
          height="20000"
          fill="url(#sfb-dim)"
        />
      </mask>

      <g mask="url(#sfb-mask)">
        {/* yıldız katmanları */}
        {[0, 1, 2].map((li) => (
          <g key={li} opacity={li === 0 ? 0.9 : li === 1 ? 0.85 : 0.78}>
            {layers[li].map((st, i) => (
              <g key={i} transform={`translate(${st.x} ${st.y})`}>
                <circle r={st.r} fill="url(#sfb-star)">
                  <animate
                    attributeName="opacity"
                    values={li === 2 ? "0.22;0.9;0.22" : li === 1 ? "0.28;1;0.28" : "0.35;1;0.35"}
                    dur={t(st.dur + li)}
                    begin={t(st.delay)}
                    repeatCount="indefinite"
                  />
                </circle>
                {/* hafif yatay drift */}
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`${st.x} ${st.y}; ${st.x + st.drift} ${st.y}`}
                  dur={t(70 + li * 15 + st.drift)}
                  repeatCount="indefinite"
                />
              </g>
            ))}
          </g>
        ))}

        {/* === BEAMS === */}
        {[{ d: downPath, dir: 1 }, { d: upPath, dir: -1 }].map((b, i) => (
          <g key={i} opacity={i === 0 ? 0.55 : 0.85}>
            {/* geniş blur glow */}
            <path
              d={b.d}
              stroke="#fff"
              strokeOpacity={i === 0 ? 0.03 : 0.06}
              strokeWidth={12}
              fill="none"
              strokeLinecap="round"
              filter="url(#sfb-soft2)"
            />
            {/* ana stroke */}
            <path
              d={b.d}
              stroke="url(#sfb-beam)"
              strokeWidth={i === 0 ? 1.8 : 2.2}
              fill="none"
              strokeLinecap="round"
            />
            {/* spec çizgi (akış) */}
            <path
              d={b.d}
              stroke="url(#sfb-spec)"
              strokeWidth={i === 0 ? 0.85 : 1}
              fill="none"
              strokeLinecap="round"
              strokeDasharray="140 1100"
            >
              <animate
                attributeName="stroke-dashoffset"
                values={b.dir === 1 ? "0;-1100" : "0;1100"}
                dur={t(18 + i * 2)}
                repeatCount="indefinite"
              />
            </path>
            {/* akış noktaları */}
            {Array.from({ length: 4 }).map((_, k) => (
              <g key={k} opacity={i === 0 ? 0.7 : 0.85}>
                <circle r="2" fill="#fff">
                  <animateMotion
                    dur={t(9 + k + i * 1.5)}
                    repeatCount="indefinite"
                    rotate="auto"
                    path={b.d}
                  />
                </circle>
                <circle
                  r="10"
                  fill="url(#sfb-glow)"
                  opacity={i === 0 ? 0.16 : 0.22}
                  filter="url(#sfb-soft)"
                >
                  <animateMotion
                    dur={t(9 + k + i * 1.5)}
                    repeatCount="indefinite"
                    rotate="auto"
                    path={b.d}
                  />
                </circle>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
