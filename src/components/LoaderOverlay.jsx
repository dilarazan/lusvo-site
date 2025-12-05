import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Görseller / fontlar ilk boyandıktan sonra 250ms bekleyip kaldır
    const tick = () => setTimeout(() => setDone(true), 250);
    if (document.readyState === "complete") tick();
    else window.addEventListener("load", tick, { once: true });
    return () => window.removeEventListener("load", tick);
  }, []);

  return (
    <div className={`page-loader ${done ? "is-done" : ""}`} aria-hidden />
  );
}
