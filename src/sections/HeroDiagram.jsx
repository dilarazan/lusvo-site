import React, { useEffect, useRef } from "react";

export default function HeroDiagram() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;
    const COLOR = "#5FB4FF";

    const resize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      draw(width, height);
    };

    const drawSoftRing = (x, y, r, alpha) => {
      // sadece sağ yarı için yumuşak fade-out gradienti
      const gradient = ctx.createLinearGradient(x, y - r, x, y + r);
      gradient.addColorStop(0, `rgba(95,180,255,${alpha * 0.5})`);
      gradient.addColorStop(0.4, `rgba(95,180,255,${alpha})`);
      gradient.addColorStop(1, `rgba(95,180,255,0)`);

      ctx.beginPath();
      ctx.arc(x, y, r, 1.5 * Math.PI, 0.5 * Math.PI); // sadece sağ yarı
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(95,180,255,${alpha * 0.8})`;
      ctx.stroke();
    };

    const draw = (W, H) => {
  ctx.clearRect(0, 0, W, H);

  // Mobilde daha merkezi hizalama
  const isMobile = W < 768;
  const cx = isMobile ? W * 0.5 : W * 0.58;
  const cy = H * 0.48;

      // 🔹 arka yumuşak ışık (AI arkasında)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 420);
      glow.addColorStop(0, "rgba(95,180,255,0.08)");
      glow.addColorStop(0.35, "rgba(95,180,255,0.04)");
      glow.addColorStop(1, "rgba(95,180,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // 🔹 yumuşak ve soluk halkalar
      drawSoftRing(cx, cy, 130, 0.06);
      drawSoftRing(cx, cy, 210, 0.04);
      drawSoftRing(cx, cy, 300, 0.025);
      drawSoftRing(cx, cy, 390, 0.018);

      // 🔹 AI’ye vuracak yumuşak beyaz ışıltı
      const highlight = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      highlight.addColorStop(0, "rgba(255,255,255,0.05)");
      highlight.addColorStop(1, "rgba(95,180,255,0)");
      ctx.fillStyle = highlight;
      ctx.fillRect(0, 0, W, H);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ backgroundColor: "transparent" }}
    />
  );
}
