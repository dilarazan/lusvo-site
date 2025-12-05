// src/sections/Process.jsx
import { useState, useEffect, useRef } from "react";
import Section from "../components/Section";
import ParallaxSection from "../components/ParallaxSection";
const steps = [
  {
    title: "Kısa keşif",
    subtitle: "Hedef ve beklenti",
    text:
      "İhtiyacınızı netleştirir, ölçülebilir hedefleri birlikte belirleriz. Böylece sürecin yönü en baştan doğru şekillenir.",
  },
  {
    title: "Taslak çözüm",
    subtitle: "Akış & entegrasyon",
    text:
      "Hangi sistemlerle bağlantı kurulacağını ve iş akışlarının nasıl ilerleyeceğini görsel bir taslak üzerinden paylaşırız.",
  },
  {
    title: "Kurulum",
    subtitle: "Güvenli devreye alma",
    text:
      "Erişim yetkileri tanımlanır, versiyonlama sistemi devreye alınır ve test süreciyle güvenli geçiş sağlanır.",
  },
  {
    title: "Pilot",
    subtitle: "Gerçek veri ile deneme",
    text:
      "Küçük bir grupta canlı test yapılır. Geri bildirimlerle sistem ince ayar alır ve performans değerlendirilir.",
  },
  {
    title: "Canlı + takip",
    subtitle: "Sürdürme & iyileştirme",
    text:
      "Raporlama, izleme ve bakım döngüleriyle sistem daima güncel tutulur. Otomasyon sürekli öğrenir ve gelişir.",
  },
];

export default function Process() {
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);
  const cardRef = useRef(null);

  // Otomatik geçiş (4 sn) — hover’da durur
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      setStep((p) => (p + 1) % steps.length);
    }, 4000);
  };
  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Manuel ileri
  const handleNext = () => {
    setStep((p) => (p + 1) % steps.length);
  };

  return (
  <ParallaxSection speed={-0.2}>
    <Section id="process" className="relative isolate pt-20 pb-16 bg-transparent">
      {/* Başlık */}
      <div className="mb-10 md:mb-16 ml-0 md:ml-[48%]">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Demo’dan sonra süreç nasıl ilerliyor?
        </h2>
        <p className="text-white/70 mt-3 max-w-[550px]">
          Adımlar net; iletişim sıkı. Sizden zaman alan işleri biz yönetirken süreç akıcı ilerler.
        </p>
      </div>

      {/* Kart (spiralin sağına hizalı) */}
      <div
  ref={cardRef}
  onClick={handleNext}
  onMouseEnter={stopAuto}
  onMouseLeave={startAuto}
  className="relative ml-0 md:ml-[48%] w-full max-w-[700px] p-6 md:p-10 rounded-3xl border border-[#5FB4FF44]
                   bg-gradient-to-br from-[#0a0f16]/85 to-[#05080c]/80 backdrop-blur-xl
                   shadow-[0_0_40px_rgba(95,180,255,0.25)]
                   transition-all duration-700 text-left cursor-pointer select-none
                   hover:shadow-[0_0_55px_rgba(95,180,255,0.4)]"
        role="button"
        aria-label="Bir sonraki adıma geç"
      >
        {/* Soft aura */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl
                        bg-[radial-gradient(circle_at_30%_20%,rgba(95,180,255,0.12),transparent_70%)]" />

        {/* İçerik (animasyon her değişimde tetiklensin diye key kullanıyoruz) */}
        <div key={step} className="relative z-10 animate-fadeSlide">
          <h3 className="text-2xl font-bold text-white">{steps[step].title}</h3>
          <p className="text-white/80 text-[15px] font-medium mb-3">{steps[step].subtitle}</p>
          <p className="text-white/70 leading-relaxed">{steps[step].text}</p>
        </div>

        {/* Altta küçük ilerleme çubuğu (ince, profesyonel) */}
        <div className="mt-6 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <span
            key={`bar-${step}`}
            className="block h-full bg-gradient-to-r from-cyan-400/70 to-sky-300/70 animate-progress"
          />
        </div>
      </div>

      {/* Spiral parıltı (çok hafif) */}
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-[#5FB4FF0A] to-transparent blur-[120px] pointer-events-none" />

      {/* Animasyonlar */}
      <style jsx>{`
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(14px) scale(.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeSlide { animation: fadeSlide .7s cubic-bezier(.22,.61,.36,1); }

        @keyframes progress {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0%); }
        }
        .animate-progress {
          width: 100%;
          transform: translateX(-100%);
          animation: progress 4s linear forwards;
        }
      `}</style>
    </Section>
  </ParallaxSection>
  );
}
