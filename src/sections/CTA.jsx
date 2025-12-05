import Section from "../components/Section";

export default function CTA() {
  return (
    <Section id="cta" className="py-10">
      <div className="rounded-3xl border border-white/10 bg-white/[.06] backdrop-blur-xl px-6 py-8 md:px-10 md:py-10
                      flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-wide text-white/60">Demo / Keşif</p>
          <h3 className="text-2xl md:text-3xl font-extrabold mt-1 leading-tight">
            20 dakikalık keşif ile ihtiyacınızı netleştirelim, canlı demo gösterelim.
          </h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-white/75">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Şeffaf plan & zaman çizelgesi</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> KVKK hassasiyetli yaklaşım</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> 3–10 iş gününde devreye alma</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Düzenli rapor & takip</li>
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("Talebiniz alındı. En kısa sürede dönüş yapacağız."); e.currentTarget.reset(); }}
          className="w-full md:w-[520px] space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input required name="name" placeholder="Ad Soyad"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
            <input required type="email" name="email" placeholder="E-posta"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          <input name="phone" placeholder="Telefon (opsiyonel)"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
          <textarea name="message" rows={4} placeholder="Kısaca ihtiyacınız…"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
          <label className="flex items-start gap-2 text-sm text-white/70">
            <input type="checkbox" required className="mt-1" />
            Keşif için iletişime geçilmesini ve bilgilerimin bu amaçla kullanılmasını onaylıyorum.
          </label>

          <div className="flex items-center gap-3">
            {/* Gelişmiş hover animasyonlu CTA */}
            <button type="submit" className="btn-cta">
              <span className="btn-cta__label">Demo Al</span>
              <span className="btn-cta__sheen" aria-hidden />
            </button>
          </div>

          <p className="text-xs text-white/60">Verileriniz yalnızca randevu amaçlı kullanılır; üçüncü kişilerle paylaşmayız.</p>
        </form>
      </div>
    </Section>
  );
}
