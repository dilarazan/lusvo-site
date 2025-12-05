import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Scroll 100px’i geçince görünür
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      aria-label="Site navigation"
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0",
        "bg-[#0b0d12]/90 border-b border-white/10 backdrop-blur-md"
      ].join(" ")}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-[72px] md:h-[76px] flex items-center justify-start">
          <a href="/" aria-label="LUSAI" className="inline-flex">
            <div className="lusai-pro">
              <span className="lus-lus">
                <span className="ch k-L">L</span>
                <span className="ch k-U">U</span>
                <span className="ch s k-S">S</span>
              </span>
              <span className="ch ai k-A">A</span>
              <span className="ch ai k-nudge-up">I</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
