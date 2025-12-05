// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
      brand: "LUSAI",
      header: { tr: "Türkçe", en: "English" },
      hero: {
        kicker: "Yapay Zekâ Ajansı",
        title: "Akıllı otomasyonla işleri hızlandırın",
        lead:
          "Süreçlerinizi analiz ediyor, uçtan uca otomasyon hatları kuruyor ve sistemlerinizi güvenli şekilde birbirine bağlıyoruz.",
        cta: "Demo Al",
        f1: "Süreç keşfi & otomasyon tasarımı",
        f2: "CRM / ERP / API entegrasyonları",
        f3: "Onay akışları ve bildirim otomasyonu",
        f4: "Raporlama, izleme ve hata yakalama",
      },
      tech: { title: "Kullandığımız Teknolojiler" },
      benefits: {
        b1t: "Hızlı Entegrasyon",
        b1d:
          "Mevcut altyapınıza minimum değişiklikle bağlanır, iş akışlarınıza uygun otomasyonları hızla devreye alırız.",
        b2t: "Daha Az Bekleme",
        b2d:
          "Otomatik tetiklemeler ve akıllı yönlendirme ile müşteri bekleme süreleri kısalır, ekip verimi artar.",
        b3t: "Ölçülebilir Kazanç",
        b3d:
          "İş gücü tasarrufu, daha yüksek dönüşüm ve net görünürlük: KPI’lar düzenli raporlarla izlenir.",
      },
      footer: { rights: "© {{year}} LUSAI — Tüm hakları saklıdır." }
    },
  },
  en: {
    translation: {
      brand: "LUSAI",
      header: { tr: "Turkish", en: "English" },
      hero: {
        kicker: "AI Agency",
        title: "Accelerate work with smart automation",
        lead:
          "We analyze your processes, build end-to-end automation pipelines, and connect your systems securely.",
        cta: "Request Demo",
        f1: "Process discovery & automation design",
        f2: "CRM / ERP / API integrations",
        f3: "Approval flows & notification automation",
        f4: "Reporting, monitoring & error capture",
      },
      tech: { title: "Technologies We Use" },
      benefits: {
        b1t: "Fast Integration",
        b1d:
          "Connect to your stack with minimal changes and deploy automations aligned with your workflows.",
        b2t: "Less Waiting",
        b2d:
          "Automatic triggers and smart routing reduce wait times and boost team efficiency.",
        b3t: "Measurable Impact",
        b3d:
          "Labor savings, higher conversion, and clear visibility: KPIs tracked with regular reports.",
      },
      footer: { rights: "© {{year}} LUSAI — All rights reserved." }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:
      (typeof window !== "undefined" &&
        window.localStorage &&
        window.localStorage.getItem("lang")) ||
      "tr",
    fallbackLng: "tr",
    interpolation: { escapeValue: false },
  });

export default i18n;
