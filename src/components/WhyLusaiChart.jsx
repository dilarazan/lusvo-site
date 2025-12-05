import {
  Shield,
  Cpu,
  Database,
  Network,
  BarChart3,
  Zap,
} from "lucide-react";

export default function WhyLusai() {
  const items = [
    {
      icon: <Shield size={26} />,
      title: "Güvenilir Altyapı",
      desc: "Kurumsal ölçekte veri koruması ve yüksek güvenlik.",
      color: "#3BA5FF",
      pos: { top: "10%", left: "15%" },
    },
    {
      icon: <Cpu size={26} />,
      title: "AI Otomasyon",
      desc: "Yapay zekayla güçlendirilmiş akıllı iş akışları.",
      color: "#A78BFA",
      pos: { top: "20%", right: "10%" },
    },
    {
      icon: <Database size={26} />,
      title: "Veri Güvenliği",
      desc: "Verileriniz her katmanda şifrelenir ve korunur.",
      color: "#F97316",
      pos: { bottom: "18%", left: "10%" },
    },
    {
      icon: <Network size={26} />,
      title: "Entegrasyon",
      desc: "Sistemlerinizi kolayca bağlayın, entegre çalışın.",
      color: "#2DD4BF",
      pos: { bottom: "25%", right: "12%" },
    },
    {
      icon: <BarChart3 size={26} />,
      title: "Şeffaf Analitik",
      desc: "Performansınızı ölçün, sonuçları görün.",
      color: "#FACC15",
      pos: { top: "45%", left: "5%" },
    },
    {
      icon: <Zap size={26} />,
      title: "Yüksek Performans",
      desc: "Her an hızlı, kararlı ve ölçeklenebilir çözümler.",
      color: "#22D3EE",
      pos: { bottom: "35%", right: "4%" },
    },
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[100vh] bg-[#070A10] overflow-hidden">
      {/* === Arka plan devre dokusu === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#102033_0%,_#060A11_70%,_#020409_100%)]" />
      <div className="absolute inset-0 bg-[url('/public/circuit-bg.png')] bg-cover bg-center opacity-20" />

      {/* === Parlayan merkez çekirdek === */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#4F9DDE] to-[#0b3d74] flex items-center justify-center shadow-[0_0_55px_rgba(79,157,222,0.6)] border border-[#4F9DDE]/30">
          <div className="text-white font-extrabold text-3xl tracking-wide drop-shadow-[0_0_12px_rgba(79,157,222,0.8)]">
            LUSAI
          </div>
        </div>
        <p className="text-white/60 mt-6 max-w-[300px] text-sm leading-relaxed">
          İşler kesintisiz aksın; görünür, ölçülebilir ve güvenli bir yapı ile.
        </p>
      </div>

      {/* === Çevresel modüller === */}
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center text-center transition-all duration-500 hover:scale-110 z-10"
          style={{ ...item.pos, color: item.color }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/10 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:shadow-[0_0_35px_rgba(79,157,222,0.4)]"
            style={{
              boxShadow: `0 0 22px ${item.color}55`,
            }}
          >
            {item.icon}
          </div>
          <h3 className="text-white mt-3 text-[13px] font-semibold">{item.title}</h3>
          <p className="text-white/60 text-xs mt-1 w-[160px] leading-snug">
            {item.desc}
          </p>
        </div>
      ))}

      {/* === Hafif merkezden dışa glow === */}
      <div className="absolute w-[700px] h-[700px] rounded-full border border-[#4F9DDE]/20 opacity-40 blur-[1px]" />
    </section>
  );
}
