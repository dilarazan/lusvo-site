import Section from "../components/Section";
import { CASES } from "../data/site";
import { motion } from "framer-motion";
import { stagger, item } from "../lib/motion";

const MotionDiv = motion.div;
const MotionArticle = motion.article;

export default function Cases() {
  return (
    <Section id="cases" withGrid>
      <h2 className="section-title">Vaka Çalışmaları</h2>
      <p className="section-sub">Farklı sektörlerde ölçülebilir etki. Aşağıdaki örnekler kurulumdan sonraki ilk 4–8 hafta sonuçlarıdır.</p>

      <MotionDiv className="mt-12 grid md:grid-cols-2 gap-6" {...stagger(0.08, 0.06)}>
        {CASES.map((c, i) => (
          <MotionArticle key={i} {...item} className="card card-hover">
            <div className="relative overflow-hidden rounded-2xl mb-4 border border-white/10">
              <div
                className="h-40 w-full"
                style={{
                  background:
                    "radial-gradient(600px circle at 60% 40%, rgba(99,102,241,.25), transparent 45%), linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                }}
              />
            </div>

            <header className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <span className="shrink-0 rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/30 px-2 py-1 text-xs font-semibold">
                {c.result}
              </span>
            </header>

            <p className="mt-2 text-white/70">{c.desc}</p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 py-2">
                <div className="text-sm font-semibold">TTV</div>
                <div className="text-[11px] text-white/60">≤ 10 gün</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 py-2">
                <div className="text-sm font-semibold">ROI</div>
                <div className="text-[11px] text-white/60">4–6 hafta</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 py-2">
                <div className="text-sm font-semibold">SLA</div>
                <div className="text-[11px] text-white/60">99.5%</div>
              </div>
            </div>
          </MotionArticle>
        ))}
      </MotionDiv>
    </Section>
  );
}
