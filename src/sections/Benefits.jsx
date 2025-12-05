import { useEffect, useRef } from "react";
import Section from "../components/Section";
import ParallaxSection from "../components/ParallaxSection";
/* ====== İkonlar (aynı) ====== */
const IShield = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IClock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IReport = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8.5 15.5V10M12 15.5V9M15.5 15.5v-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IHandshake = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M7 12l3 3a3 3 0 004 0l3-3M3.5 12.5l3.5 3.5M20.5 12.5L17 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M7.5 10.5l2.2-2.2a3.5 3.5 0 014.9 0l1.9 1.9" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);

/* ====== Kart (ince ölçüler) ====== */
function Card({ icon: IconComp, title, text, delayVar }) {
  return (
    <article
      className={`
        group relative h-full overflow-hidden rounded-2xl
        border border-white/5 bg-[#070b11]/75 backdrop-blur
        shadow-[0_0_0_1px_rgba(95,180,255,0.04)]
        transition-all duration-400
        hover:border-[#5FB4FF40] hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]
        reveal-item   /* 👈 animasyon sınıfı */
      `}
      style={{ "--d": delayVar }}
    >
      {/* İç vinyet + neon çizgi */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(95,180,255,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5FB4FF40] to-transparent" />

      <div className="relative z-10 p-5 md:p-7 xl:p-8 flex flex-col gap-3 min-h-[200px] md:min-h-[230px]">
        <div className="h-10 w-10 grid place-items-center rounded-xl border border-[#5FB4FF33] bg-[#5FB4FF14] shadow-[0_0_18px_rgba(95,180,255,0.16)]">
          {IconComp ? <IconComp className="h-[18px] w-[18px] text-[#8fd1ff]" /> : null}
        </div>

        <h3 className="text-white text-[16px] md:text-[18px] font-semibold tracking-[0.005em] leading-snug">
          {title}
        </h3>
        <p className="text-white/70 text-[14px] md:text-[14.5px] leading-[1.6]">
          {text}
        </p>
      </div>

      <div className="absolute left-4 right-4 -bottom-px h-px bg-gradient-to-r from-transparent via-[#5FB4FF66] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}

/* ====== Bölüm ====== */
export default function Benefits() {
  const wrapRef = useRef(null);

  // Scroll'da profesyonel reveal (stagger’lı)
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(".reveal-item"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target); // bir kez animasyon
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
  <ParallaxSection speed={-0.15}>
    <Section
      id="benefits"
      className="relative isolate py-16 md:py-20"
      style={{
        paddingLeft: "clamp(20px, 34vw, 560px)", // spiral güven alanı
        paddingRight: "clamp(20px, 6vw, 64px)",
      }}
    >
      <div ref={wrapRef} className="relative z-10 mx-auto w-full max-w-[1320px]">
        <div className="grid gap-4 md:gap-6 lg:gap-7 grid-cols-1 md:grid-cols-2">
          <Card
            icon={IShield}
            title="Kurumsal güvenlik altyapısı"
            text="Verileriniz gelişmiş güvenlik protokolleriyle korunur. Kurumsal düzeyde güvenlik ve istikrar sağlanır."
            delayVar="0ms"
          />
          <Card
            icon={IHandshake}
            title="Uzman AI ekip desteği"
            text="Deneyimli ekibimizle projelerinizin her adımında yanınızdayız. Planlama, uygulama ve analiz süreçleri sorunsuz ilerler."
            delayVar="120ms"
          />
          <Card
            icon={IReport}
            title="Şeffaf analiz & ilerleme"
            text="Tüm süreçler ölçülebilir; sonuçlar anlık raporlarla paylaşılır. Her adım net ve izlenebilirdir."
            delayVar="240ms"
          />
          <Card
            icon={IClock}
            title="Akıcı, kesintisiz sistemler"
            text="Her süreç optimize edilmiştir; yoğunlukta bile otomasyonlar kesintisiz işler. Hız, performans ve denge bir aradadır."
            delayVar="360ms"
          />
        </div>
      </div>

      {/* Reveal animasyon stilleri (stagger: --d) */}
      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(14px) scale(0.985);
          transition:
            opacity 520ms cubic-bezier(.22,.61,.36,1) var(--d,0ms),
            transform 520ms cubic-bezier(.22,.61,.36,1) var(--d,0ms),
            box-shadow 300ms ease, border-color 300ms ease;
          will-change: opacity, transform;
        }
        .reveal-item.reveal-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </Section>
  </ParallaxSection>
  );
}
