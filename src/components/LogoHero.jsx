// src/components/LogoHero.jsx
export default function LogoHero({ width = 640, className = "" }) {
  const h = (width * 280) / 640;

  return (
    <svg
      viewBox="0 0 640 280"
      width={width}
      height={h}
      className={className}
      aria-label="LUS wordmark hero"
    >
      <defs>
        {/* İnce parlama (sheen) */}
        <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Animasyon için maske */}
        <mask id="sheenMask">
          <rect width="100%" height="100%" fill="black" />
          {/* Harflerin maskesi: beyaz = görünür */}
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI"
            fontWeight="900"
            fontSize="160"
            letterSpacing="0.06em"
            fill="white"
          >
            LUS
          </text>
        </mask>
      </defs>

      {/* Ana wordmark (opak beyaz) */}
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI"
        fontWeight="900"
        fontSize="160"
        letterSpacing="0.06em"
        fill="#FFFFFF"
      >
        LUS
      </text>

      {/* İnce iç stroke (kontrast) */}
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI"
        fontWeight="900"
        fontSize="160"
        letterSpacing="0.06em"
        fill="none"
        stroke="rgba(255,255,255,.18)"
        strokeWidth="2"
      >
        LUS
      </text>

      {/* Hareketli “sheen” efekti (yalnızca harflerin içinde görünür) */}
      <g mask="url(#sheenMask)" opacity=".85">
        <rect x="-320" y="0" width="220" height="280" fill="url(#sheen)">
          <animate
            attributeName="x"
            from="-320"
            to="740"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}
