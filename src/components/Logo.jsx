export default function Logo({ as = "a", href = "#", className = "" }) {
  const Comp = as;
  return (
    <Comp
      href={href}
      aria-label="LUSAI"
      className={`relative inline-flex items-center font-black tracking-tight text-2xl md:text-3xl group ${className}`}
    >
<span className="select-none">LUSAI</span>
      <span className="text-white/60 select-none">.ai</span>

      {/* hover sheen */}
      <i
        aria-hidden
        className="logo-sheen"
      />
      {/* underline */}
      <i
        aria-hidden
        className="logo-underline"
      />
    </Comp>
  );
}
