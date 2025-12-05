import { useEffect } from "react";

// 🔹 Bileşenler
import Navbar from "./components/Navbar";
import GlobalSpace from "./components/GlobalSpace";
import LoaderOverlay from "./components/LoaderOverlay";
import RevealOnScroll from "./components/RevealOnScroll";
import Footer from "./components/Footer";

// 🔹 Bölümler
import HeroShowcase from "./sections/HeroShowcase";
import HeroDiagram from "./sections/HeroDiagram"; // LUSAI'den çıkan AI diyagramı
import Benefits from "./sections/Benefits";
import Process from "./sections/Process";
import TechMarquee from "./sections/TechMarquee";

function PageLoaderDone() {
  useEffect(() => {
    const el = document.getElementById("page-loader");
    if (el) requestAnimationFrame(() => el.classList.add("is-done"));
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      {/* =======================================================
          ARKA PLAN ve ÜST KOMPONENTLER
      ======================================================= */}
      <GlobalSpace />
      <Navbar />
      <PageLoaderDone />
      <LoaderOverlay />
      <RevealOnScroll />

      {/* =======================================================
          ANA İÇERİK
      ======================================================= */}
      <main className="relative overflow-hidden">
        {/* HERO (Logo + Neural bağlantı + AI Diyagram) */}
        <section className="relative">
          <HeroShowcase />
          <HeroDiagram /> {/* LUSAI logosundan çıkan bağlantısız AI diyagramı */}
        </section>

        {/* ÖZELLİKLER */}
        <Benefits />

        {/* SÜREÇ */}
        <Process />

        {/* TEKNOLOJİ MARKALARI */}
        <TechMarquee />
      </main>

      {/* =======================================================
          ALT BİLGİ
      ======================================================= */}
      <Footer />
    </>
  );
}
