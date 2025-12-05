import { useEffect } from "react";

/** .reveal-item öğelerini görünür oldukça .reveal-in ile açar (stagger: --d) */
export default function useReveal(rootRef, opts = {}) {
  useEffect(() => {
    const root = rootRef?.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(".reveal-item"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12, ...opts }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, opts]);
}
