// src/sections/RightCircuitReplicaBlack.jsx
// Referanstaki sağdan-sola devre: siyah arka plan, glow + nokta ışıkları.

export default function RightCircuitReplicaBlack({ className = "" }) {
  return (
    <div className={["relative h-full w-full", className].join(" ")} aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Mavi hat rengi */}
          <linearGradient id="wire" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#8ad0ff" stopOpacity=".95" />
            <stop offset="100%" stopColor="#2a8cff" stopOpacity=".85" />
          </linearGradient>

          {/* Yumuşak glow */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Nokta parıltısı */}
          <radialGradient id="dot" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#a5dcff" />
            <stop offset="55%" stopColor="#7cc2ff" stopOpacity=".6" />
            <stop offset="100%" stopColor="#7cc2ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* SİYAH ARKA PLAN */}
        <rect width="1000" height="700" fill="#000" />

        {/* SAĞ OMURGA (kademeli) */}
        <g stroke="url(#wire)" fill="none" strokeLinecap="round" filter="url(#glow)">
          <path d="
            M 920 30
            V 185  H 882  V 250  H 920  V 330
            H 870  V 400  H 920  V 495
            H 862  V 565  H 920  V 670
          " strokeWidth="13" opacity=".46"/>
          <path d="
            M 892 52
            V 198  H 868  V 238  H 892  V 320
            H 864   V 382  H 892  V 470
            H 858   V 540  H 892  V 650
          " strokeWidth="10" opacity=".36"/>
          <path d="
            M 866 76
            V 218  H 848  V 232  H 866  V 308
            H 846   V 360  H 866  V 448
            H 842   V 520  H 866  V 628
          " strokeWidth="8.5" opacity=".30"/>
        </g>

        {/* YATAY ANA HATLAR (sağdan sola + kavis) */}
        <g stroke="url(#wire)" fill="none" strokeLinecap="round" filter="url(#glow)">
          <path d="M 920 110 H 808 Q 760 110 760 150 H 600" strokeWidth="9"  opacity=".34"/>
          <path d="M 920 150 H 830 Q 785 150 785 188 H 630"  strokeWidth="9"  opacity=".30"/>
          <path d="M 920 190 H 820 Q 780 190 770 220 H 620"  strokeWidth="8"  opacity=".28"/>

          <path d="M 920 270 H 800 Q 730 270 690 310 H 520" strokeWidth="9.5" opacity=".35"/>
          <path d="M 900 310 H 760 Q 730 310 708 330 H 640" strokeWidth="8" opacity=".29"/>

          <path d="M 920 390 H 780 Q 730 390 708 410 H 520" strokeWidth="9" opacity=".32"/>
          <path d="M 890 430 H 790 Q 750 430 728 450 H 600"  strokeWidth="8" opacity=".28"/>

          <path d="M 920 510 H 800 Q 750 510 720 540 H 520" strokeWidth="9" opacity=".31"/>
          <path d="M 900 550 H 790 Q 750 550 728 570 H 600"  strokeWidth="8" opacity=".27"/>

          <path d="M 920 620 H 800 Q 750 620 720 650 H 520" strokeWidth="9" opacity=".31"/>
          <path d="M 900 660 H 790 Q 750 660 728 680 H 600"  strokeWidth="8" opacity=".27"/>
        </g>

        {/* KISA L-DALLARI */}
        <g stroke="url(#wire)" strokeWidth="7" opacity=".22" filter="url(#glow)" strokeLinecap="round" fill="none">
          <path d="M 840 188 H 772 m 42 0 v 36 h -38"/>
          <path d="M 812 220 H 748"/>
          <path d="M 780 310 H 708 m 36 0 v 28 h -32"/>
          <path d="M 760 410 H 708"/>
          <path d="M 792 540 H 708 m 34 0 v 26 h -30"/>
          <path d="M 782 660 H 708"/>
        </g>

        {/* DÜĞÜM IŞIKLARI */}
        {[
          [600,150],[630,188],[620,220],
          [520,310],[640,330],
          [520,410],[600,450],
          [520,540],[600,570],
          [520,650],[600,680],
          [708,310],[748,390],[800,510],
          [830,150],[808,110],[820,190]
        ].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="3.2" fill="#9fd8ff" opacity=".95"/>
            <circle cx={x} cy={y} r="10" fill="url(#dot)" opacity=".48">
              <animate attributeName="r" values="7;12;7" dur={`${4+(i%5)*0.6}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".48;.2;.48" dur={`${4+(i%5)*0.6}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
