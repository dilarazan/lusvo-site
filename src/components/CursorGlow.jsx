import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-50 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5FB4FF] opacity-0 blur-[100px] transition-opacity duration-300 hover:opacity-[0.15]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}