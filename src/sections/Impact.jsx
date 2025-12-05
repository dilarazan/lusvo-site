import { motion as fm } from "framer-motion";
import Section from "../components/Section";
import { ArrowUp, DollarSign } from "lucide-react";

const MArticle = fm.article;

export default function Impact(){
  return (
    <Section id="impact" className="pt-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Verimlilik */}
        <MArticle
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-10% 0px" }}
          transition={{ duration:.55, ease:[0.22,1,0.36,1] }}
          className="rounded-[28px] border border-white/10 bg-[#121418] overflow-hidden shadow-[0_20px_60px_-22px_rgba(0,0,0,.55)]"
        >
          <div className="p-6 grid-bg relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-7">
              <div className="icon-bubble"><ArrowUp className="h-6 w-6" /></div>
            </div>
            <div className="h-24" />
          </div>
          <div className="bg-[#1b1f26] border-t border-white/10 rounded-t-[24px] p-6">
            <div className="stat">+ %25</div>
            <div className="mt-1 text-2xl font-semibold">Verimlilik Artışı</div>
            <p className="mt-3 text-white/70">
              Yapay zekâ destekli otomasyon kullanan işletmeler verimliliğini en az %25 artırdığını bildirdi.
            </p>
            <div className="mt-6 text-xs text-white/50 text-center">Kaynak</div>
          </div>
        </MArticle>

        {/* Maliyet */}
        <MArticle
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-10% 0px" }}
          transition={{ duration:.55, ease:[0.22,1,0.36,1], delay:.05 }}
          className="rounded-[28px] border border-white/10 bg-[#121418] overflow-hidden shadow-[0_20px_60px_-22px_rgba(0,0,0,.55)]"
        >
          <div className="p-6 grid-bg relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-7">
              <div className="icon-bubble"><DollarSign className="h-6 w-6" /></div>
            </div>
            <div className="h-24" />
          </div>
          <div className="bg-[#1b1f26] border-t border-white/10 rounded-t-[24px] p-6">
            <div className="stat">+ %25</div>
            <div className="mt-1 text-2xl font-semibold">Maliyet Tasarrufu</div>
            <p className="mt-3 text-white/70">
              Yapay zekâ destekli otomasyon kullanan işletmeler maliyetlerini en az %25–50 düşürdüğünü bildirdi.
            </p>
            <div className="mt-6 text-xs text-white/50 text-center">Kaynak</div>
          </div>
        </MArticle>
      </div>
    </Section>
  );
}
