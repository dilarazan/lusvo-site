// src/components/HeroAIViz.jsx
export default function HeroAIViz({ width = 720, className = "" }) {
  const h = (width * 520) / 720;
  return (
    <svg
      viewBox="0 0 720 520"
      width={width}
      height={h}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="g-orb" cx="50%" cy="40%" r="60%">
          <stop offset="0%"  stopColor="rgba(255,255,255,.22)" />
          <stop offset="45%" stopColor="rgba(255,255,255,.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        <linearGradient id="g-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,.05)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.05)" />
        </linearGradient>

        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* arka plan yumuşak orb */}
      <g transform="translate(470 260)">
        <circle r="150" fill="url(#g-orb)" filter="url(#soft)" />
      </g>

      {/* dönen halka */}
      <g transform="translate(470 260)">
        <circle r="92" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.6" />
        <circle r="92" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="2" strokeDasharray="12 14">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="28s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* üç orbital çizgi */}
      <g fill="none" stroke="url(#g-line)" strokeWidth="2">
        <path d="M80 210 Q 360 90 640 170" opacity=".45" />
        <path d="M70 280 Q 360 240 650 300" opacity=".32" />
        <path d="M120 340 Q 370 320 660 340" opacity=".22" />
      </g>

      {/* düğümler */}
      <g>
        {[
          [150,190],[360,260],[625,300],[610,170],[210,340]
        ].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="white" />
            <circle cx={x} cy={y} r="24" fill="white" opacity=".05">
              <animate attributeName="r" values="18;26;18" dur={`${2.2 + i*0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values=".10;.18;.10" dur={`${2.2 + i*0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* kayan highlight */}
      <path
        d="M80 210 Q 360 90 640 170"
        fill="none"
        stroke="rgba(255,255,255,.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="280"
        strokeDashoffset="280"
      >
        <animate attributeName="stroke-dashoffset" from="280" to="0" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
