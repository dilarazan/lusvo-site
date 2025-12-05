export const NAV = [
  { label: "Çözümler", href: "#solutions" },
  { label: "Ürünler", href: "#products" },
  { label: "Süreç", href: "#process" },
  { label: "Vaka Çalışmaları", href: "#cases" },
  { label: "SSS", href: "#faq" },
];

export const HERO = {
  eyebrow: "AI & Otomasyon",
  title: "LUSVO ile bir sistem kurun.",
  subtitle:
    "Yapay zekâyı iş süreçlerinize entegre ederek sürdürülebilir, tekrarlanabilir büyüme sağlayın.",
  ctaPrimary: { label: "Demo Al", href: "#cta" },
  ctaSecondary: { label: "Çözümleri Gör", href: "#solutions" },
  stats: [
    { value: "70%+", label: "Manuel iş azalması" },
    { value: "3-6x", label: "Deney hızı" },
    { value: "24/7", label: "Self-serve akış" },
  ],
};

export const SOLUTIONS = [
  { icon: "Bot", title: "Müşteri İletişim Otomasyonu", desc: "WhatsApp/Instagram/Email tek akış." },
  { icon: "Workflow", title: "İç Süreç Otomasyonu", desc: "Onay, faturalama, rapor, bildirim." },
  { icon: "Sparkles", title: "AI Ajanları", desc: "Veri okur, karar verir, aksiyon alır." },
];

export const PRODUCTS = [
  { title: "Leads → CRM → Randevu", points: ["Lead yakalama", "AI nitelendirme", "Takvim daveti"] },
  { title: "Otomatik Raporlama", points: ["Veri çekme", "AI özet", "PDF/Email"] },
  { title: "Review Otomasyonu", points: ["Tetikleyici", "Mesaj şablonları", "Olumsuz yönetimi"] },
];

export const PROCESS = [
  { step: "1", title: "Keşif", desc: "Hedefler, veri, KPI’lar" },
  { step: "2", title: "Tasarım", desc: "Akış ve entegrasyonlar" },
  { step: "3", title: "Kurulum", desc: "Botlar ve webhooklar" },
  { step: "4", title: "Test", desc: "Pilot ve eğitim" },
  { step: "5", title: "Canlı", desc: "İzleme ve iyileştirme" },
];

export const CASES = [
  { title: "E-ticaret: Sepet Kurtarma", result: "+%22 dönüşüm", desc: "Zamanlama + stok entegrasyonu" },
  { title: "Hizmet: Lead Otomasyonu", result: "2.1x görüşme", desc: "WhatsApp oto-yanıt + CRM" },
];

export const FAQS = [
  { q: "Hangi araçlar?", a: "n8n, Zapier, özel Node.js servisler, OpenAI vb." },
  { q: "Entegrasyon?", a: "CRM, ERP, Helpdesk, e-ticaret, DB hepsi bağlanır." },
  { q: "Güvenlik?", a: "Veri minimizasyonu, erişim sınırı, NDA, uyumluluk." },
];

export const FOOTER = {
  brand: "LUSVO",
  copy: "© " + new Date().getFullYear() + " Tüm hakları saklıdır.",
};
