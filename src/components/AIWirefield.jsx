// Siyah zemin üstünde, yapay zekâ hissi veren gelişmiş "wirefield"
// - Köşesiz spline hatlar (5 adet)
// - Yumuşak başlangıç + safe area mask (metin alanında çizgi yok)
// - Paket/pulse'lar (küçük veri paketleri)
// - Attention penceresi (tarayıcı ışık bandı)
// - Mikro ripple'lar (nöral ateşleme hissi)
// Hepsi tek renk (beyaz tonları). Benzersiz id prefix: wf-adv

export default function AIWirefield({
  className = "",
  seed = 17,
  safeArea = { x: 0, width: 1380, feather: 280, strength: 1 },
  intensity = 1, // 0.6-1.4 arası tavsiye
  speed = 1,     // 0.8-1.4 arası tavsiye
}) {
  const vbW = 3600, vbH = 1400;
  const cx = vbW / 2, cy = vbH / 2;

  // rng
  let s = seed >>> 0;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;

  // spline yollar (5 hat, geniş yayılım)
  const lanes = Array.from({ length: 5 }).map((_, i) => {
    const y = cy + (i - 2) * 170 + (rnd() - 0.5) * 28;
    const wob = () => (rnd() - 0.5) * 320;
    const x0 = -1200, x1 = cx - 1200 + wob();
    const x2 = cx + 1200 + wob(), x3 = vbW + 1200;
    return { d: `M${x0} ${y} C ${x1} ${y + wob()}, ${x2} ${y + wob()}, ${x3} ${y}` };
  });

  // safe props
  const SA_X = safeArea.x ?? 0;
  const SA_W = Math.max(0, safeArea.width ?? 1200);
  const SA_F = Math.max(0, safeArea.feather ?? 240);
  const SA_S = Math.min(1, Math.max(0, safeArea.strength ?? 1));

  // hız yardımcıları
  const t = (sec) => `${(sec / speed).toFixed(2)}s`;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* stroke: uçlarda güçlü fade, merkezde düşük kontrast */}
        <linearGradient id="wf-adv-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)"/>
          <stop offset="22%"  stopColor={`rgba(255,255,255,${0.12*intensity})`}/>
          <stop offset="50%"  stopColor={`rgba(255,255,255,${0.42*intensity})`}/>
          <stop offset="78%"  stopColor={`rgba(255,255,255,${0.12*intensity})`}/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          <animateTransform attributeName="gradientTransform" type="translate"
            from="-0.28 0" to="0.28 0" dur={t(16)} repeatCount="indefinite"/>
        </linearGradient>

        {/* kısa highlight vuruşu */}
        <linearGradient id="wf-adv-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="46%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%" stopColor={`rgba(255,255,255,${0.55*intensity})`}/>
          <stop offset="54%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* attention bandı */}
        <linearGradient id="wf-adv-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%" stopColor={`rgba(255,255,255,${0.28*intensity})`}/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* safe area feather (mask) */}
        <linearGradient id="wf-adv-safeFeather" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="black" stopOpacity={SA_S}/>
          <stop offset="100%" stopColor="white" stopOpacity="1"/>
        </linearGradient>

        {/* kıvılcım / ripple */}
        <radialGradient id="wf-adv-spark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="60%" stopColor={`rgba(255,255,255,${0.34*intensity})`}/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <filter id="wf-adv-soft"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>

      {/* tek ton zemin */}
      <rect width={vbW} height={vbH} fill="var(--page-bg, #0a0c10)"/>

      {/* mask: sol global soft-start + metin alanı full hide + feather */}
      <mask id="wf-adv-mask">
        <rect x="-10000" y="-10000" width="20000" height="20000" fill="white"/>
        {/* sol global soft start */}
        <linearGradient id="wf-adv-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="black" stopOpacity=".35"/>
          <stop offset="18%" stopColor="black" stopOpacity=".15"/>
          <stop offset="35%" stopColor="white" stopOpacity="1"/>
        </linearGradient>
        <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#wf-adv-left)"/>
        {/* safe area */}
        <rect x={SA_X} y="-10000" width={Math.max(0, SA_W - SA_F)} height="20000"
              fill="black" fillOpacity={SA_S}/>
        <rect x={SA_X + Math.max(0, SA_W - SA_F)} y="-10000" width={SA_F} height="20000"
              fill="url(#wf-adv-safeFeather)"/>
      </mask>

      {/* === ana grup (mask uygulanmış) === */}
      <g mask="url(#wf-adv-mask)">
        {/* 1) temel hatlar */}
        <g fill="none" stroke="url(#wf-adv-stroke)" strokeLinecap="round" opacity=".98">
          <animate attributeName="opacity" from="0" to=".98" dur={t(1.1)} begin="0.1s" fill="freeze"/>
          {lanes.map(({ d }, i) => (
            <path key={`l-${i}`} d={d} strokeWidth={[2,1.6,1.3,1.6,1.3][i]} />
          ))}
          {/* akış vuruşu */}
          {lanes.map(({ d }, i) => (
            <path key={`sh-${i}`} d={d} stroke="url(#wf-adv-sheen)"
              strokeWidth={[1,0.95,0.9,0.95,0.9][i]} strokeDasharray="120 1000">
              <animate attributeName="stroke-dashoffset" values="0;-1000"
                       dur={t(16 + (i % 3) * 2)} repeatCount="indefinite"/>
            </path>
          ))}
        </g>

        {/* 2) veri paketleri (küçük noktalar + halo) */}
        {lanes.map(({ d }, i) => (
          <g key={`p-${i}`} opacity=".75">
            {Array.from({ length: 3 }).map((_, k) => (
              <g key={k}>
                <circle r="2" fill="#fff">
                  <animateMotion dur={t(10 + i + k * 2)} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" path={d}/>
                </circle>
                <circle r="10" fill="url(#wf-adv-spark)" opacity=".22" filter="url(#wf-adv-soft)">
                  <animateMotion dur={t(10 + i + k * 2)} repeatCount="indefinite" path={d}/>
                </circle>
              </g>
            ))}
          </g>
        ))}

        {/* 3) attention bandı (yatay, yavaşça gezen yumuşak ışık) */}
        <g opacity=".6">
          {[-200, 40, 280].map((dy, idx) => (
            <path key={`band-${idx}`}
              d={`M-1600 ${cy+dy} C ${cx-1200} ${cy+dy-120}, ${cx+1200} ${cy+dy+120}, ${vbW+1600} ${cy+dy}`}
              stroke="url(#wf-adv-band)" strokeWidth="34" fill="none" strokeLinecap="round">
              <animate attributeName="stroke-width" values="34;40;34" dur={t(14+idx*2)} repeatCount="indefinite"/>
            </path>
          ))}
        </g>

        {/* 4) mikro ripple'lar (nöral ateşleme) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const rx = cx + (rnd()-0.5) * (vbW*0.7);
          const ry = cy + (rnd()-0.5) * (vbH*0.5);
          const d1 = 22 + rnd()*10, d2 = d1*5.2;
          return (
            <g key={`rip-${i}`} opacity=".35" filter="url(#wf-adv-soft)">
              <circle cx={rx} cy={ry} r={d1} fill="url(#wf-adv-spark)">
                <animate attributeName="r" values={`${d1};${d2};${d1}`} dur={t(8+ i*1.2)} repeatCount="indefinite"/>
                <animate attributeName="opacity" values=".28;.02;.28" dur={t(8+ i*1.2)} repeatCount="indefinite"/>
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
