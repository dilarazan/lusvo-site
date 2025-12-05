export default function HeroVisual({ width = 720, className = "" }) {
  const h = (width * 420) / 720;

  return (
    <svg
      viewBox="0 0 720 420"
      width={width}
      height={h}
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* çizgiler için degrade */}
        <linearGradient id="lg-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,.12)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.12)" />
        </linearGradient>

        {/* parıltı vuruşu */}
        <linearGradient id="lg-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="45%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.95)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* yumuşak blur */}
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        {/* metin clip – sheen bu alan içinden geçsin */}
        <clipPath id="clip-word">
          <text
            x="50%" y="58%" textAnchor="middle"
            fontFamily="Inter, ui-sans-serif, system-ui, -apple-system"
            fontWeight="900" fontSize="114" letterSpacing=".03em"
          >
            LUS
          </text>
        </clipPath>
      </defs>

      {/* çok ince vignette */}
      <ellipse cx="360" cy="120" rx="460" ry="220" fill="rgba(255,255,255,.05)" opacity=".15" />

      {/* eliptik dairesel orbitler */}
      <g fill="none" stroke="url(#lg-line)">
        <path d="M60,170 A340,140 0 0 1 660,150" strokeWidth="2" strokeLinecap="round" />
        <path d="M60,230 A360,130 0 0 1 660,220" strokeWidth="1.6" strokeLinecap="round" opacity=".75" />
        <path d="M90,280 A380,140 0 0 1 660,290" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
      </g>

      {/* orbit üstünde kayan highlight */}
      <path
        d="M60,170 A340,140 0 0 1 660,150"
        fill="none"
        stroke="url(#lg-sheen)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="300"
        strokeDashoffset="300"
        filter="url(#soft)"
      >
        <animate attributeName="stroke-dashoffset" values="300;0;300" dur="3.4s" repeatCount="indefinite" />
      </path>

      {/* mikro partiküller */}
      <g fill="#fff" opacity=".9">
        <circle cx="140" cy="170" r="2.2" />
        <circle cx="360" cy="205" r="2.2" />
        <circle cx="640" cy="152" r="2.2" />
        <circle cx="118" cy="282" r="2" />
        <circle cx="654" cy="290" r="2" />
      </g>

      {/* === WORDMARK – harf oyunu === */}
      {/* L: dolgulu blok */}
      <text
        x="290" y="245"
        fontFamily="Inter, ui-sans-serif, system-ui,-apple-system"
        fontWeight="900" fontSize="114" textAnchor="end"
        fill="#fff" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"
      >L</text>

      {/* U: dış çizgi – içi boş, premium his */}
      <text
        x="360" y="245"
        fontFamily="Inter, ui-sans-serif, system-ui,-apple-system"
        fontWeight="900" fontSize="114" textAnchor="middle"
        fill="none" stroke="#fff" strokeWidth="6"
      >U</text>

      {/* S: yarı dolgulu + çevresinde dönen halka */}
      <g>
        <text
          x="430" y="245"
          fontFamily="Inter, ui-sans-serif, system-ui,-apple-system"
          fontWeight="900" fontSize="114" textAnchor="start"
          fill="#fff" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"
        >S</text>

        {/* S’nin çevresinde yörünge */}
        <g transform="translate(465 206)">
          <ellipse rx="76" ry="46" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"/>
          <circle r="3" fill="#fff">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>

      {/* wordmark üzerinde sheen */}
      <g clipPath="url(#clip-word)">
        <rect x="-260" y="168" width="260" height="120" fill="url(#lg-sheen)">
          <animate attributeName="x" from="-260" to="980" dur="3.8s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}
