export default function LogoNew({ size = 32, withText = true }) {
  return (
    <div className="flex items-center gap-2">
      {/* Logomark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        aria-label="LUSAI logo"
      >
        {/* arka kapsül */}
        <rect x="1.5" y="1.5" width="25" height="25" rx="8"
          fill="url(#g1)" stroke="rgba(255,255,255,.12)"/>
        {/* L şekli */}
        <path d="M9 7v12a2 2 0 0 0 2 2h8"
          stroke="white" strokeOpacity=".92" strokeWidth="2.2" strokeLinecap="round"/>
        {/* AI kıvılcımı */}
        <circle cx="20.5" cy="8.5" r="1.8" fill="url(#g2)"/>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="28" y2="28">
            <stop offset="0" stopColor="#1a1f27"/>
            <stop offset=".6" stopColor="#0d1016"/>
            <stop offset="1" stopColor="#0b0d12"/>
          </linearGradient>
          <linearGradient id="g2" x1="19" y1="7" x2="22" y2="10">
            <stop offset="0" stopColor="#F59E0B"/>
            <stop offset="1" stopColor="#FDBA74"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark */}
      {withText && (
        <span className="select-none font-extrabold tracking-tight"
              style={{ fontFamily: '"Sora", ui-sans-serif', letterSpacing: '-0.01em' }}>
          LUSAI
        </span>
      )}
    </div>
  );
}
