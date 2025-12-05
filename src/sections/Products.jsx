import Section from "../components/Section";
import { PRODUCTS } from "../data/site";

export default function Products() {
  return (
    <Section id="products">
      <h2 className="section-title">Ürün Paketleri</h2>
      <p className="section-sub">Hazır paketleri doğrudan devreye alın veya özelleştirelim.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">{p.title}</div>
            <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
              {p.points.map((pt, idx) => (<li key={idx}>{pt}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
