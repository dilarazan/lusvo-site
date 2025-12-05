// src/sections/DemoSection.jsx
import Section from "../components/Section";
import DemoForm from "@/components/DemoForm";

export default function DemoSection() {
  return (
    <Section id="demo" className="pt-16 md:pt-20">
      <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
        {/* SOL: metin */}
        <div>
          <h2 className="text-[32px] md:text-[44px] font-extrabold leading-tight tracking-tight">
            20 dakikalık keşifle ihtiyacı netleştirip,
            <br className="hidden md:block" />
            kısa bir demo ve net adımlarla ilerleyelim.
          </h2>

          <p className="mt-4 text-white/70 text-lg max-w-2xl">
            Görüşmede hedef ve kapsamı topluyor; risk, zaman ve maliyeti
            şeffaf bir planla açıklıyoruz. Siz sadece karara odaklanın.
          </p>

          {/* 2 kolon madde listesi */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-[15px] text-white/85">
            {[
              "Net zaman çizelgesi ve teslim adımları",
              "KVKK uyumlu süreç ve yetki sınırları",
              "Hızlı devreye alma / kısa geri dönüş",
              "Düzenli ilerleme notları ve rapor",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* küçük süreç pill'leri */}
          <div className="mt-8 flex flex-wrap gap-3 text-[13px]">
            {["Ön görüşme", "Kapsam & plan", "Canlı demo", "Teklif"].map((p) => (
              <span
                key={p}
                className="px-3 py-2 rounded-full text-white/90
                           bg-white/10 border border-white/15
                           shadow-[0_10px_22px_-18px_rgba(0,0,0,.8)]
                           backdrop-blur-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* SAĞ: form (DemoForm içinde alanlar + küçültülmüş “İhtiyacınız” textarea) */}
        <DemoForm />
      </div>
    </Section>
  );
}
