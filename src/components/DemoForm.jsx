// src/components/DemoForm.jsx
import { useState } from "react";

export default function DemoForm() {
  const [agree, setAgree] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!agree) return;
    alert("Talebinizi aldık. En kısa sürede dönüş yapacağız.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[rgba(12,15,19,.6)] border border-white/10
                 shadow-[0_30px_80px_-50px_rgba(0,0,0,.8),inset_0_0_0_1px_rgba(255,255,255,.02)]
                 backdrop-blur-sm p-4 sm:p-5 md:p-6"
    >
      <div className="grid md:grid-cols-2 gap-3">
        {/* Ad Soyad */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-white/70">Ad Soyad</label>
          <input
            id="name" name="name" required placeholder="Adınız Soyadınız"
            className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5
                       text-[15px] outline-none focus:border-cyan-400/40
                       placeholder:text-white/35"
          />
        </div>

        {/* E-posta */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-white/70">E-posta</label>
          <input
            id="email" name="email" type="email" required placeholder="ornek@firma.com"
            className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5
                       text-[15px] outline-none focus:border-cyan-400/40
                       placeholder:text-white/35"
          />
        </div>

        {/* Telefon */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="phone" className="text-sm text-white/70">
            Telefon <span className="text-white/50">(zorunlu)</span>
          </label>
          <input
            id="phone" name="phone" required placeholder="+90 ..."
            className="h-11 rounded-xl bg-[#0c1016] border border-white/10 px-3.5
                       text-[15px] outline-none focus:border-cyan-400/40
                       placeholder:text-white/35"
          />
        </div>

        {/* İhtiyacınız — daha küçük ve alçak */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="need" className="text-sm text-white/70">İhtiyacınız</label>
          <textarea
            id="need" name="need" required
            placeholder="Kısaca süreç, hedef ve beklentilerinizi yazın..."
            className="
              w-full rounded-xl border border-white/10 bg-[#0c1016] text-white/90
              placeholder:text-white/40 focus:outline-none focus:border-cyan-400/40
              px-3.5 py-3
              h-28 md:h-32           /* yükseklik ↓  */
              leading-snug text-[15px]
              resize-none            /* kullanıcı büyütüp taşırmasın */
            "
          />
        </div>
      </div>

      {/* Onay */}
      <div className="mt-4 flex items-start gap-3">
        <input
          id="agree" type="checkbox" checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/25 bg-transparent
                     text-cyan-400 focus:ring-cyan-400/40"
          required
        />
        <label htmlFor="agree" className="text-[13px] leading-relaxed text-white/75">
          İletişime geçilmesini ve verilerimin yalnızca randevu/teklif amacıyla kullanılmasını onaylıyorum.
        </label>
      </div>

      {/* CTA */}
      <div className="mt-5 flex items-center gap-4">
        <button
          type="submit" disabled={!agree}
          className={`px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-300
                      text-[#0b0d12] shadow-[0_10px_26px_-10px_rgba(245,158,11,.55)]
                      hover:shadow-[0_16px_40px_-14px_rgba(245,158,11,.65)]
                      transition ${!agree ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Gönder
        </button>

        <p className="text-[12px] text-white/50">
          Verileriniz yalnızca randevu amaçlı kullanılır; üçüncü kişilerle paylaşmayız.
        </p>
      </div>
    </form>
  );
}
