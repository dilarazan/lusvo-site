// FULL-BLEED AI otomasyon görseli
// - yumuşak spiral dağılım, spline bağlantılar
// - fade'li grid, aurora, parçacık akışı
// - benzersiz "neb-*" id'leri (çakışma yok)

export default function AIOperatorNebula({
  className = "",
  density = 28,
  seed = 12,
}) {
  const vbW = 2400, vbH = 1200;
  const cx = vbW / 2, cy = vbH / 2;

  // RNG
  let s = seed >>> 0;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;

  // Spiral + jitter (merkez yoğun, dışa açılan)
  const PHI = (Math.sqrt(5) - 1) / 2;
  const pts = Array.from({ length: density }).map((_, i) => {
    const t = i + 1, ang = 2 * Math.PI * (t * PHI), r = Math.sqrt(t / density);
    const sx = 0.96, sy = 0.68;
    const jx = (rnd() - 0.5) * 0.05, jy = (rnd() - 0.5) * 0.05;
    const x = cx + (sx * r + jx) * (vbW * 0.40) * Math.cos(ang);
    const y = cy + (sy * r + jy) * (vbH * 0.44) * Math.sin(ang);
    return [x, y];
  });

  // Spline bundle (köşesiz)
  const bundle = ([x1,y1],[x2,y2], k = 0.6) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const cx1 = mx * (1 - k) + cx * k, cy1 = my * (1 - k) + cy * k;
    return `M${x1} ${y1} C ${cx1} ${cy1}, ${cx1} ${cy1}, ${x2} ${y2}`;
  };

  // Sembol id seçici (iconIds yerine)
  const names = ["gear","flow-ic","api","db","webhook","clock","bolt","loop","play","nodes"];
  const sym = (i) => `neb-${names[i % names.length]}`;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="neb-hex" width="32" height="28" patternUnits="userSpaceOnUse">
          <path d="M8 0H24L32 14 24 28H8L0 14Z"
            fill="none" stroke="rgba(255,255,255,.03)" strokeWidth="1"/>
        </pattern>

        <radialGradient id="neb-fadeGrad" cx="50%" cy="50%" r="82%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="75%" stopColor="#fff"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <mask id="neb-fadeMask" maskUnits="userSpaceOnUse">
          <rect x="-200%" y="-200%" width="500%" height="500%" fill="url(#neb-fadeGrad)"/>
        </mask>

        <radialGradient id="neb-aur" cx="50%" cy="46%" r="76%">
          <stop offset="0%"   stopColor="rgba(255,255,255,.16)"/>
          <stop offset="50%"  stopColor="rgba(255,255,255,.08)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>

        <linearGradient id="neb-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,.10)"/>
          <stop offset="50%" stopColor="rgba(255,255,255,.62)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,.10)"/>
          <animateTransform attributeName="gradientTransform" type="translate"
            from="-0.9 0" to="0.9 0" dur="7s" repeatCount="indefinite"/>
        </linearGradient>
        <linearGradient id="neb-dash" x1="0" y1="0" x2="1" y2="0">
          <stop offset="40%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%" stopColor="rgba(255,255,255,.95)"/>
          <stop offset="60%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* --- ikon sembolleri (beyin yok) --- */}
        <symbol id="neb-gear" viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" fill="#fff"/><path d="M12 2.5v3M12 18.5v3M3.5 12h3M17.5 12h3M5.2 5.2l2.2 2.2M16.6 16.6l2.2 2.2M18.8 5.2l-2.2 2.2M7.4 16.6l-2.2 2.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></symbol>
        <symbol id="neb-flow-ic" viewBox="0 0 24 24"><path d="M3 6h8a4 4 0 0 1 4 4v4a4 4 0 0 0 4 4h2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="3" cy="6" r="2" fill="#fff"/><circle cx="21" cy="18" r="2" fill="#fff"/></symbol>
        <symbol id="neb-api" viewBox="0 0 24 24"><path d="M7 6l-4 4 4 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="5" width="4" height="14" rx="1" fill="#fff"/><path d="M17 6l4 4-4 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></symbol>
        <symbol id="neb-db" viewBox="0 0 24 24"><ellipse cx="12" cy="5.5" rx="8" ry="3.5" fill="none" stroke="#fff" strokeWidth="2"/><path d="M4 5.5v13c0 1.9 16 1.9 16 0v-13" fill="none" stroke="#fff" strokeWidth="2"/></symbol>
        <symbol id="neb-webhook" viewBox="0 0 24 24"><path d="M6 17a3 3 0 1 1 2.6-4.5l2.8-4.8A3 3 0 1 1 15 6l-3.1 5.3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="18" r="3" fill="#fff"/></symbol>
        <symbol id="neb-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="2"/><path d="M12 7v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></symbol>
        <symbol id="neb-bolt" viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#fff"/></symbol>
        <symbol id="neb-loop" viewBox="0 0 24 24"><path d="M3 12a6 6 0 0 1 6-6h10M15 18a6 6 0 0 1-6 6H3" transform="translate(0,-6)" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M17 4l2 2-2 2M7 20l-2-2 2-2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></symbol>
        <symbol id="neb-play" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="2"/><polygon points="10,8 18,12 10,16" fill="#fff"/></symbol>
        <symbol id="neb-nodes" viewBox="0 0 24 24"><circle cx="5" cy="5" r="3" fill="#fff"/><circle cx="19" cy="5" r="3" fill="#fff"/><circle cx="5" cy="19" r="3" fill="#fff"/><circle cx="19" cy="19" r="3" fill="#fff"/><path d="M8 5h8M5 8v8M19 8v8M8 19h8" stroke="#fff" strokeWidth="2"/></symbol>

        <filter id="neb-blurS"><feGaussianBlur stdDeviation="2.6"/></filter>
        <filter id="neb-blurM"><feGaussianBlur stdDeviation="12"/></filter>
        <filter id="neb-noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0 .03 0"/></feComponentTransfer></filter>
      </defs>

      {/* MASK uygulanmış arka plan */}
      <g mask="url(#neb-fadeMask)">
        <rect x="-200%" y="-200%" width="500%" height="500%" fill="url(#neb-hex)" />
        <g filter="url(#neb-blurM)" opacity=".42">
          <circle cx={cx - 700} cy={cy - 260} r="420" fill="url(#neb-aur)"/>
          <circle cx={cx + 760} cy={cy + 340} r="520" fill="url(#neb-aur)"/>
        </g>
        <rect x="-200%" y="-200%" width="500%" height="500%" filter="url(#neb-noise)" opacity=".26"/>
      </g>

      {/* Ribbon akışları */}
      <g fill="none" stroke="url(#neb-flow)" strokeLinecap="round" opacity=".95">
        <path d={`M-320 ${cy-170} C ${cx-1100} ${cy-360}, ${cx+980} ${cy-240}, ${vbW+340} ${cy-200}`} strokeWidth="3"/>
        <path d={`M-300 ${cy-40}  C ${cx-860}  ${cy-60},  ${cx+780} ${cy+40},  ${vbW+320} ${cy+20}`}  strokeWidth="2.2"/>
        <path d={`M-280 ${cy+90}  C ${cx-720}  ${cy+260}, ${cx+940} ${cy+240}, ${vbW+300} ${cy+180}`} strokeWidth="1.8"/>
      </g>
      <path d={`M-320 ${cy-170} C ${cx-1100} ${cy-360}, ${cx+980} ${cy-240}, ${vbW+340} ${cy-200}`}
        fill="none" stroke="url(#neb-dash)" strokeWidth="2" strokeLinecap="round"
        strokeDasharray="360" strokeDashoffset="360">
        <animate attributeName="stroke-dashoffset" from="360" to="0" dur="3.8s" repeatCount="indefinite"/>
      </path>

      {/* Merkez halkalar */}
      <g transform={`translate(${cx} ${cy})`}>
        <circle r="220" fill="url(#neb-aur)" opacity=".32"/>
        <ellipse rx="340" ry="180" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2"/>
        <ellipse rx="250" ry="130" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.6"/>
        <circle r="3" fill="#fff">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Spline bağlantılar */}
      <g stroke="rgba(255,255,255,.38)" strokeWidth="2" fill="none"
         strokeLinecap="round" strokeLinejoin="round" filter="url(#neb-blurS)">
        {pts.slice(0, pts.length - 1).map((p, i) => (
          <path key={i} d={bundle(p, pts[i + 1], 0.6)} />
        ))}
      </g>

      {/* Parçacık akışı */}
      <g opacity=".9">
        {[
          `M-300 ${cy-40} C ${cx-860} ${cy-60}, ${cx+780} ${cy+40}, ${vbW+320} ${cy+20}`,
          `M-280 ${cy+90} C ${cx-720} ${cy+260}, ${cx+940} ${cy+240}, ${vbW+300} ${cy+180}`,
        ].map((d,i)=>(
          <g key={i}>
            <circle r="3" fill="#fff"><animateMotion dur={`${3+i}s`} repeatCount="indefinite" path={d}/></circle>
            <circle r="14" fill="url(#neb-aur)" opacity=".35" filter="url(#neb-blurS)">
              <animateMotion dur={`${3+i}s`} repeatCount="indefinite" path={d}/>
            </circle>
          </g>
        ))}
      </g>

      {/* İkon katmanları (arka-orta-ön) */}
      {(() => {
        const back  = pts.slice(0, Math.floor(density*0.33));
        const mid   = pts.slice(Math.floor(density*0.33), Math.floor(density*0.75));
        const front = pts.slice(Math.floor(density*0.75));
        return (
          <>
            <g opacity=".55">
              {back.map(([x,y],i)=> {
                const id = sym(i), sz=26;
                return <g key={`b${i}`} transform={`translate(${x} ${y})`}>
                  <use href={`#${id}`} width={sz} height={sz} x={-sz/2} y={-sz/2}/>
                  <circle r={sz} fill="url(#neb-aur)" opacity=".16"/>
                </g>;
              })}
            </g>
            <g opacity=".85">
              {mid.map(([x,y],i)=> {
                const id = sym(i), sz=32;
                return <g key={`m${i}`} transform={`translate(${x} ${y})`}>
                  <use href={`#${id}`} width={sz} height={sz} x={-sz/2} y={-sz/2}/>
                  <circle r={sz*1.1} fill="url(#neb-aur)" opacity=".20"/>
                </g>;
              })}
            </g>
            <g>
              {front.map(([x,y],i)=> {
                const id = sym(i), sz=38;
                return <g key={`f${i}`} transform={`translate(${x} ${y})`}>
                  <use href={`#${id}`} width={sz} height={sz} x={-sz/2} y={-sz/2}/>
                  <circle r={sz*1.2} fill="url(#neb-aur)" opacity=".26"/>
                </g>;
              })}
            </g>
          </>
        );
      })()}
    </svg>
  );
}
