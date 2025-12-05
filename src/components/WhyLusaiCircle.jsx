import {
  Shield,
  Clock,
  BarChart3,
  Users,
  Cpu,
  Network,
  Database,
  Zap,
} from "lucide-react";

export default function WhyLusaiCircle() {
  const items = [
    { icon: <Shield size={26} />, title: "Güvenilir Altyapı", color: "#3BA5FF" },
    { icon: <Clock size={26} />, title: "Kesintisiz Çalışma", color: "#4ADE80" },
    { icon: <BarChart3 size={26} />, title: "Şeffaf İlerleme", color: "#FACC15" },
    { icon: <Users size={26} />, title: "Uzman Ekip", color: "#FB7185" },
    { icon: <Cpu size={26} />, title: "AI Otomasyon", color: "#A78BFA" },
    { icon: <Network size={26} />, title: "API Entegrasyon", color: "#2DD4BF" },
    { icon: <Database size={26} />, title: "Veri Güvenliği", color: "#F97316" },
    { icon: <Zap size={26} />, title: "Yüksek Performans", color: "#22D3EE" },
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[100vh] bg-[#070A10] overflow-hidden">
      {/* --- Arka plan glow --- */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1e2633] via-[#0b0d12] to-[#070A10] opacity-80 animate-pulse" />

      {/* --- Dönen halka animasyonu --- */}
      <div className="absolute w-[640px] h-[640px] rounded-full border border-white/10 animate-spin-slow" />

      {/* --- Merkezde AI çekirdeği --- */}
      <div className="relative flex flex-col items-center text-center z-20">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#4F9DDE] to-[#0b3d74] flex items-center justify-center shadow-[0_0_40px_rgba(79,157,222,0.5)]">
          <div className="text-white font-extrabold text-3xl tracking-wide">
            ai
          </div>
        </div>
       
      </div>

      {/* --- Dıştaki 8 modül --- */}
      {items.map((item, i) => {
        const angle = (360 / items.length) * i - 90;
        const radius = 300;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center text-center transition-all duration-500 hover:scale-110 z-10"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              color: item.color,
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 border border-white/10 transition-all duration-500 hover:shadow-[0_0_20px] hover:bg-white/20"
              style={{
                boxShadow: `0 0 18px ${item.color}55`,
              }}
            >
              {item.icon}
            </div>
            <div className="text-white mt-2 text-[13px] font-semibold opacity-90 whitespace-nowrap">
              {item.title}
            </div>
          </div>
        );
      })}
    </section>
  );
}
