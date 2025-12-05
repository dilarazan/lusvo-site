// src/sections/HeroVisual.jsx
export default function HeroVisual() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#070c12]">
      {/* Tam ekran görsel (yazısız) */}
      <img
        src="/ai-hero.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
