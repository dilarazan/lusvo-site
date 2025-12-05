// src/components/SmoothScroll.jsx
import { useEffect, useMemo } from "react";

export default function SmoothScroll({
  enabled = true,
  ease = 0.085,          // 0.06 daha yumuşak, 0.12 daha hızlı toparlar
  factor,                // 0.14–0.22 iyi
  step,                  // legacy
  keyboard = true,
} = {}) {
  const factorValue = useMemo(() => {
    if (typeof factor === "number") return factor;
    if (typeof step === "number")  return Math.max(0.06, Math.min(step / 600, 0.35));
    return 0.16; // bir tık sakin
  }, [factor, step]);

  useEffect(() => {
    // touch/trackpad yoğun cihazlarda kapat
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer:fine)").matches;
    if (!enabled || isReduced || !isFinePointer) return;

    const root = document.scrollingElement || document.documentElement;

    let raf = 0;
    let current = root.scrollTop;
    let target  = root.scrollTop;
    let animating = false;

    const clamp = () => {
      const max = Math.max(0, root.scrollHeight - root.clientHeight);
      if (target > max) target = max;
      if (target < 0)   target = 0;
    };

    const animate = () => {
      animating = true;
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) current = target;
      root.scrollTop = current;
      if (current !== target) raf = requestAnimationFrame(animate);
      else animating = false;
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return;                    // pinch-zoom
      if (Math.abs(e.deltaY) < 2) return;       // micro hareketlere dokunma
      e.preventDefault();
      target += e.deltaY * factorValue;
      clamp();
      if (!animating) raf = requestAnimationFrame(animate);
    };

    const onKey = (e) => {
      if (!keyboard) return;
      const page = Math.round(window.innerHeight * 0.25);
      let used = true;
      switch (e.code) {
        case "ArrowDown": target += Math.max(40, page * 0.2); break;
        case "ArrowUp":   target -= Math.max(40, page * 0.2); break;
        case "PageDown":
        case "Space":     target += page; break;
        case "PageUp":    target -= page; break;
        case "Home":      target = 0; break;
        case "End":       target = root.scrollHeight; break;
        default: used = false;
      }
      if (used) {
        e.preventDefault();
        clamp();
        if (!animating) raf = requestAnimationFrame(animate);
      }
    };

    const onResize = () => clamp();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, ease, factorValue, keyboard]);

  return null;
}
