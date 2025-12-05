import { useEffect } from "react";

// 🔹 Bileşenler
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import GlobalSpace from "./components/GlobalSpace";
import LoaderOverlay from "./components/LoaderOverlay";
import RevealOnScroll from "./components/RevealOnScroll";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// 🔹 Bölümler
import HeroShowcase from "./sections/HeroShowcase";
import HeroDiagram from "./sections/HeroDiagram";
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
          LOADER & ARKA PLAN
      ======================================================= */}
      <CursorGlow />
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
          <HeroDiagram />
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
      <BackToTop />
    </>
  );
}