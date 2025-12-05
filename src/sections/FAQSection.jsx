// src/sections/FAQSection.jsx
import { useState, memo } from "react";
import Section from "../components/Section";

const ToggleIcon = memo(function ToggleIcon({ open }) {
  return (
    <span className={`inline-grid place-items-center h-6 w-6 rounded-full ring-1 ring-white/15
                 ${open ? "bg-white text-[#0b0d12]" : "bg-white/8 text-white/90 hover:bg-white/12"}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        {open ? (
          <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <>
            <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  );
});

const Item = memo(function Item({ q, a, open, onToggle }) {
  return (
    <article
      className="faq-card relative rounded-2xl border bg-white/[0.035] border-white/10 transition-all duration-300 will-change-transform"
      data-reveal="up"
    >
      <button
        className="w-full text-left p-5 md:p-6 flex items-start gap-3"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg md:text-xl font-extrabold tracking-tight">{q}</h3>
            <ToggleIcon open={open} />
          </div>

          <div
            className="overflow-hidden transition-[grid-template-rows] duration-300 grid"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="min-h-0">
              <p className="mt-3 text-white/75 leading-relaxed">{a}</p>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
});

export default function FAQSection() {
  const [openLeft, setOpenLeft] = useState(-1);
  const [openRight, setOpenRight] = useState(-1);

  const faqs = [
    {
      q: "Tam olarak hangi problemi çözüyoruz?",
      a: (
        <>
          Tekrarlayan işleri otomatikleştirip sistemlerin birbirini güvenle
          beslemesini sağlıyoruz. Böylece operasyonel yük azalır, ekipleriniz
          daha değerli işlere odaklanır ve süreçleriniz ölçülebilir bir düzen
          içinde yürür.
        </>
      ),
    },
    {
      q: "Başlangıç ve planlama yaklaşımınız nedir?",
      a: (
        <>
          Kısa bir keşifle hedefi netleştirir, anlaşılır bir plan ve yol
          haritası sunarız. Karar noktaları ve sorumluluklar en baştan
          tariflenir; siz onay verir, biz hayata geçiririz. Süreç net ve
          sürprizsiz ilerler.
        </>
      ),
    },
    {
      q: "İletişim ve raporlama nasıl yönetilir?",
      a: (
        <>
          Düzenli durum paylaşımları, net özetler ve gerektiğinde canlı
          görüşmelerle ilerleriz. Alınan aksiyon, bir sonraki adım ve olası
          riskler açık bir dille aktarılır; siz her an nerede olunduğunu
          bilirsiniz.
        </>
      ),
    },
    {
      q: "Güvenlik ve gizlilik konusunda yaklaşımınız?",
      a: (
        <>
          Gerekenden fazlasını görmeyiz, erişimi yalnızca amaca sınırlarız ve her
          adım izlenebilir. KVKK ve kurum politikalarına uyum esastır; erişimler
          kayıt altındadır, değişiklikler onaylı ve şeffaf yürütülür.
        </>
      ),
    },
    {
      q: "Bütçe ve değer yaklaşımınız nedir?",
      a: (
        <>
          Zaman ve insan kaynağını verimli kılan, görünür değeri yüksek işleri
          öncelemeyi hedefleriz. Kapsama uygun, sade ve anlaşılır maliyet
          yapısı sunarız.
        </>
      ),
    },
    {
      q: "Devam eden destek seçenekleri var mı?",
      a: (
        <>
          Evet. İzleme, iyileştirme ve küçük güncellemeler için düzenli bakım
          ve esnek destek modelleri sağlarız.
        </>
      ),
    },
  ];

  const left = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 === 1);

  return (
    <Section id="faq" className="pt-16 md:pt-20" >
      <div className="mb-6 md:mb-8" data-reveal-parent>
        <h2 className="text-[28px] md:text-[32px] font-extrabold tracking-tight" data-reveal="up">
          Sıkça Sorulan Sorular
        </h2>
      </div>

      {/* İki ayrı sütun */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start" data-reveal-parent>
        <div className="flex-1 flex flex-col gap-4 md:gap-5">
          {left.map((f, idx) => (
            <Item
              key={`L${idx}`}
              q={f.q}
              a={f.a}
              open={openLeft === idx}
              onToggle={() => setOpenLeft(openLeft === idx ? -1 : idx)}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-4 md:gap-5">
          {right.map((f, idx) => (
            <Item
              key={`R${idx}`}
              q={f.q}
              a={f.a}
              open={openRight === idx}
              onToggle={() => setOpenRight(openRight === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
