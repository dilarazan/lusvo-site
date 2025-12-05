import { useEffect, useRef } from "react";

export default function ParallaxSection({ children, speed = 0.5, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Element görünür alanda mı?
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (scrolled - elementTop + windowHeight) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // İlk çalıştır
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}