import Section from "../components/Section";
import { ShieldCheck, Timer, Handshake, Headphones } from "lucide-react";

/** Benefits'teki kart yapısına tam uyum */
function GCard({ iconEl, title, text, delay = 0 }) {
  return (
    <article
      className="reveal flex flex-col h-full rounded-[28px] border border-white/10 bg-[#111418]/90 overflow-hidden
                 shadow-[0_26px_80px_-32px_rgba(0,0,0,.6)] transition
                 hover:-translate-y-1 hover:shadow-[0_40px_110px_-36px_rgba(34,211,238,.28)]
                 hover:border-cyan-400/20"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-48 p-6
                      bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]
                      bg-[length:26px_26px] bg-center">
        <div className="absolute left-1/2 -translate-x-1/2 top-6 h-20 w-20 rounded-full bg-white grid place-items-center
                        shadow-[0_18px_48px_-14px_rgba(255,255,255,.45)]">
          {iconEl}
        </div>
      </div>
      <div className="bg-[#181c23] border-t border-white/10 rounded-t-[24px] p-6 flex-1 flex flex-col">
        <h3 className="text-[22px] md:text-[26px] font-extrabold leading-snug">{title}</h3>
        <p className="mt-3 text-white/70 leading-relaxed">{text}</p>
      </div>
    </article>
  );
}

export default function Guarantee(){
  return (
    <Section id="whyus">
      <div className="text-center reveal" style={{ animationDelay: ".02s" }}>
        <h2 className="text-3xl md:text-4xl font-extrabold">Neden Biz?</h2>
        <p className="mt-2 text-white/70">Kurumsal güvence, şeffaf süreç ve sürdürülebilir iş ortaklığı.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GCard
          delay={0.06}
          iconEl={<Timer className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,.55)]" />}
          title="Hızlı Devreye Alma"
          text="Kapsama göre 3–10 iş gününde canlı. Yol haritası ve kilometre taşları baştan netleştirilir."
        />
        <GCard
          delay={0.12}
          iconEl={<ShieldCheck className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,.55)]" />}
          title="Kurumsal Güvence"
          text="Erişimler kayıtlı, kontroller izlenebilir. Denetim ve sözleşme gereksinimlerine uygun çalışma."
        />
        <GCard
          delay={0.18}
          iconEl={<Handshake className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,.55)]" />}
          title="Uzun Dönemli İş Ortaklığı"
          text="Uzun süreli sözleşmelerde net KPI’lar ve düzenli performans raporlarıyla sürdürülebilir değer."
        />
        <GCard
          delay={0.24}
          iconEl={<Headphones className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,.55)]" />}
          title="Proaktif Destek"
          text="7/24 izleme, önleyici bakım ve hızlı müdahale. Kritik senaryolar için hazır eskalasyon planları."
        />
      </div>
    </Section>
  );
}
