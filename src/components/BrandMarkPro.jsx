import { useRef, useState, useEffect } from "react";

export default function BrandMarkPro({ size = 150, className = "" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  // Hover efekti kontrolü
  useEffect(() => {
    if (!ref.current) return;
    if (active) {
      ref.current.classList.add("lusai--shine");
      const t = setTimeout(() => ref.current.classList.remove("lusai--shine"), 1600);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      className={`lusai-logo ${className}`}
      style={{ fontSize: size * 0.24 }}
    >
      <span className="lusai-text">
        <span className="ch">L</span>
        <span className="ch">U</span>
        <span className="ch s1">S</span>
        <span className="ch s2">S</span>
        <span className="ch ai">A</span>
        <span className="ch ai">I</span>
      </span>
    </div>
  );
}
