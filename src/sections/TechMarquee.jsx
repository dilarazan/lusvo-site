// src/sections/TechMarquee.jsx
import { useEffect, useRef, useState } from "react";

export default function TechMarquee() {
  const BASE = import.meta.env.BASE_URL || "/";

  const logos = [
    { src: `${BASE}logos/openai-white.png`,      alt: "OpenAI",   white: false },
    { src: `${BASE}logos/supabase-original.png`, alt: "supabase", white: true  },
    { src: `${BASE}logos/n8n.png`,               alt: "n8n",      white: false },
  ];

  const beltRef  = useRef(null);
  const stripRef = useRef(null);
  const rafRef   = useRef(null);
  const wRef     = useRef(0);
  const xRef     = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);

  const SPEED = 42; // px/s

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const imgs = Array.from(strip.querySelectorAll("img"));
    let loaded = 0;

    const done = () => {
      loaded++;
      if (loaded === imgs.length) {
        setIsLoaded(true);
        wRef.current = strip.offsetWidth;
        let last = performance.now();
        const tick = (now) => {
          const dt = (now - last) / 1000;
          last = now;
          xRef.current = (xRef.current + SPEED * dt) % wRef.current;
          if (beltRef.current) {
            beltRef.current.style.transform = `translate3d(${-xRef.current}px,0,0)`;
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    imgs.forEach((img) =>
      img.complete ? done() : img.addEventListener("load", done, { once: true })
    );
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pause = () => cancelAnimationFrame(rafRef.current);
  const resume = () => {
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      xRef.current = (xRef.current + SPEED * dt) % wRef.current;
      if (beltRef.current) {
        beltRef.current.style.transform = `translate3d(${-xRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const Strip = ({ hidden = false }) => (
    <div className="tmc-strip" aria-hidden={hidden} ref={!hidden ? stripRef : undefined}>
      {logos.map(({ src, alt, white }, i) => (
        <img
          key={`${hidden ? "b" : "a"}-${i}`}
          src={src}
          alt={alt}
          className={`tmc-logo ${white ? "tmc-white" : ""}`}
          loading={hidden ? "lazy" : "eager"}
          decoding="async"
          draggable="false"
        />
      ))}
      <span className="tmc-spacer" aria-hidden />
    </div>
  );

  return (
    <section className="tmc-wrap" data-reveal-parent>
      <div className="tmc-container" data-reveal="up">
        <h3 className="tmc-title">Kullandığımız Teknolojiler</h3>

        <div 
          className={`tmc-viewport transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onMouseEnter={pause} 
          onMouseLeave={resume}
        >
          <div className="tmc-edge tmc-edge--left"  aria-hidden />
          <div className="tmc-edge tmc-edge--right" aria-hidden />

          {/* A–B–A: her zaman arkası dolu */}
          <div ref={beltRef} className="tmc-belt" role="list">
            <Strip />
            <Strip hidden />
            <Strip hidden />
          </div>
        </div>
      </div>
    </section>
  );
}