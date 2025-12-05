import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={[
        "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full",
        "bg-gradient-to-br from-[#5FB4FF] to-[#3B9AFF]",
        "border border-white/20 shadow-lg shadow-[#5FB4FF]/25",
        "flex items-center justify-center",
        "transition-all duration-500 ease-out",
        "hover:scale-110 hover:shadow-xl hover:shadow-[#5FB4FF]/40",
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      ].join(" ")}
      aria-label="Yukarı çık"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}