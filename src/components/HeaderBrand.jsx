// src/components/HeaderBrand.jsx
export default function HeaderBrand({ className = "" }) {
  const letters = ["L", "U", "S", "A", "I"];

  return (
    <a
      href="#hero"
      aria-label="LUSAI - Anasayfa"
      className={`group inline-block select-none ${className}`}
    >
      <span
        className="
          hdr-word inline-flex items-end gap-[0.06em]
          font-extrabold leading-none tracking-[0.22em]
          text-white
          text-[32px] md:text-[38px] lg:text-[42px]
        "
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            className="hdr-char"
            style={{ "--d": `${i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
      </span>
    </a>
  );
}
