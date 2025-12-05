// src/components/RevealOnScroll.jsx
import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    // hareket tercihine saygı
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach(n => n.classList.add("is-visible"));
      return;
    }

  const io = new IntersectionObserver((entries) => {
  requestAnimationFrame(() => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target); // tekrar tetikleme yok → daha az work
      }
    });
  });
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
