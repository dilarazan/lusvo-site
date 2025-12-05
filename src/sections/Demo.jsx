// src/sections/Demo.jsx
import { useState } from "react";
import Section from "../components/Section";

export default function Demo() {
  const [agree, setAgree] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!agree) return;
    alert("Talebinizi aldık. En kısa sürede dönüş yapacağız.");
    e.currentTarget.reset();
    setAgree(false);
  }

  return (
<Section id="demo" className="pt-16 md:pt-20 bg-transparent">
      <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start" data-reveal-parent>
        {/* SOL: metin */}
        <div data-reveal="up">
          <h2 className="text-[28px] md:text-[26px] font-extrabold leading-tight tracking-tight">
            20 dakikalık keşif, kısa bir demo
            <br className="hidden md:block" />
            ve net adımlarla ilerleme.
          </h2>

          <p className="mt-4 text-white/70 text-lg max-w-2xl">
            Görüşmede hedef ve kapsamı toplar; risk, zaman ve maliyeti şeffaf
            bir planla sunarız. Siz sadece karara odaklanın.
          </p>

          {/* 2 kolon – hizaları eşit */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-[15px] text-white/85">
            {[
              "Net zaman çizelgesi ve teslim adımları",
              "KVKK uyumlu süreç ve yetki sınırları",
              "Hızlı devreye alma / kısa geri dönüş",
              "Düzenli ilerleme notları ve rapor",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                <span className="bullet-text">{t}</span>
              </li>
            ))}
          </ul>

          {/* küçük süreç pill'leri */}
          <div className="mt-8 flex flex-wrap gap-3 text-[13px]">
            {["Ön görüşme", "Kapsam & plan", "Canlı demo", "Teklif"].map((p) => (
              <span
                key={p}
                className="px-3 py-2 rounded-full text-white/90 bg-white/10 border border-white/15 shadow-[0_8px_18px_-14px_rgba(0,0,0,.6)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* SAĞ: form – sade kart */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[rgba(12,15,19,.6)] border border-white/10 shadow-[0_24px_70px_-48px_rgba(0,0,0,.7),inset_0_0_0_1px_rgba(255,255,255,.02)] p-4 sm:p-5 md:p-6"
          data-reveal="up"
        >
          <div className="grid md:grid-cols-2 gap-3 md:gap-3.5">
            {/* Ad Soyad */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm text-white/70">Ad Soyad</label>
              <input
                id="name"
                name="name"
                required
                placeholder="Adınız Soyadınız"
                autoComplete="name"
                className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5 text-[15px] outline-none focus:border-cyan-400/40 placeholder:text-white/35"
              />
            </div>

            {/* E-posta */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-white/70">E-posta</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ornek@firma.com"
                className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5 text-[15px] outline-none focus:border-cyan-400/40 placeholder:text-white/35"
              />
            </div>

            {/* Telefon (zorunlu) */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="phone" className="text-sm text-white/70">
                Telefon <span className="text-white/50">(zorunlu)</span>
              </label>
              <input
                id="phone"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+90 ..."
                className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5 text-[15px] outline-none focus:border-cyan-400/40 placeholder:text-white/35"
              />
            </div>

            {/* Mesaj */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="msg" className="text-sm text-white/70">İhtiyacınız</label>
              <textarea
                id="msg"
                name="message"
                required
                placeholder="Kısaca süreç, hedef ve beklentilerinizi yazın…"
                className="rounded-xl bg-[#0c1016] border border-white/10 px-3.5 py-3 text-[15px] leading-snug outline-none focus:border-cyan-400/40 placeholder:text-white/35 resize-none h-28 md:h-32"
              />
            </div>
          </div>

          {/* Onay */}
          <div className="mt-3.5 flex items-start gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/25 bg-transparent text-cyan-400 focus:ring-cyan-400/40"
              required
            />
            <label htmlFor="agree" className="text-[14px] leading-relaxed text-white/75 cursor-pointer">
              İletişime geçilmesini ve verilerimin yalnızca randevu/teklif amacıyla
              kullanılmasını onaylıyorum.
            </label>
          </div>

          {/* CTA */}
          <div className="mt-4.5 flex items-center gap-4">
            <button
              type="submit"
              disabled={!agree}
              className={`px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-300 text-[#0b0d12] shadow-[0_12px_32px_-12px_rgba(245,158,11,.45)] hover:shadow-[0_18px_44px_-16px_rgba(245,158,11,.55)] transition ${!agree ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Gönder
            </button>

            <p className="text-[12px] text-white/55">
              Verileriniz yalnızca randevu amaçlı kullanılır; üçüncü kişilerle paylaşmayız.
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
