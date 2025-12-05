import Section from "../components/Section";
import { SOLUTIONS } from "../data/site";
import { Bot, Workflow, Sparkles } from "lucide-react";

const ICONS = { Bot, Workflow, Sparkles };

export default function Solutions() {
  return (
    <Section id="solutions" withGrid>
      <h2 className="section-title">Çözümler</h2>
      <p className="section-sub">Tekrarlayan işleri otomasyona, iletişimi akışlara, kararları ajanlara devredin.</p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {SOLUTIONS.map((s, i) => {
          const Ico = ICONS[s.icon] ?? Sparkles;
          return (
            <div key={i} className="card card-hover group relative overflow-hidden">
              <div className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition"
                   style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,.18), transparent 40%)" }} />
              <Ico className="mb-4 opacity-90" />
              <div className="text-xl font-semibold">{s.title}</div>
              <p className="text-white/70 mt-2">{s.desc}</p>
            </div>
          );
        })}
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        document.querySelectorAll('.group').forEach(g=>{
          g.addEventListener('pointermove',e=>{
            const r=g.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
            g.style.setProperty('--x', x+'px'); g.style.setProperty('--y', y+'px');
          })
        })
      `}}/>
    </Section>
  );
}
