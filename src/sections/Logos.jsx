import Section from "../components/Section";
const logos = ["Acme","Zen","Nova","Cube","Flux","Echo","Volt","Polar"]
  .map(n => ({ name: n, src:`https://dummyimage.com/110x32/ffffff/000000&text=${encodeURIComponent(n)}` }));

export default function Logos(){
  return (
    <Section className="pt-10" withGrid>
      <p className="text-white/60 text-sm text-center">Bize güvenen ekiplerden bazıları</p>
      <div className="mt-6 overflow-hidden">
        <div className="flex items-center gap-12 animate-[marquee_24s_linear_infinite] will-change-transform">
          {logos.concat(logos).map((l, i) => (
            <img key={i} src={l.src} alt={l.name} className="h-6 w-auto opacity-80" />
          ))}
        </div>
      </div>
      <div className="divider mt-10" />
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </Section>
  );
}
