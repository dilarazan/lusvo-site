// src/sections/TechStack.jsx
// Basit gri logolar — rozet yok, tek satır düzen.
// İkonlar güvenli SVG bileşenleridir; hata durumunda metin fallback kalır.
import React from "react";

/* ====== SVG ICONS (güvenli) ====== */
function OpenAIIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M11.6 1.8c2.2 0 4 .9 5.2 2.6 1.5.2 2.7 1 3.5 2.3.8 1.3 1 2.7.5 4.2.9 1.6.9 3.3.1 4.9-.8 1.6-2.1 2.6-3.8 3-1 .9-2.2 1.4-3.6 1.4-1.2 0-2.3-.4-3.3-1.1-1.6.3-3 .1-4.4-.7-1.4-.8-2.2-2-2.6-3.5C1.8 13.1 1.5 12 1.8 11c.3-1 .8-1.9 1.6-2.7.2-1.6 1-2.9 2.4-3.8C7.1 3.6 8.6 3.3 10 3.6c.4-.8.9-1.4 1.6-1.8Z"
        stroke="currentColor"
        strokeWidth={1.6}
        opacity={0.6}
      />
      <circle cx="12" cy="12" r="3.6" fill="currentColor" opacity={0.55} />
    </svg>
  );
}

function SupabaseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 2h12l-7.5 9H18L6 22V2Z" fill="currentColor" opacity={0.7} />
    </svg>
  );
}

function NodesIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth={2} />
      <circle cx="16" cy="12" r="2.2" stroke="currentColor" strokeWidth={2} />
      <circle cx="26" cy="12" r="2.2" stroke="currentColor" strokeWidth={2} />
      <path d="M8 12h6M18 12h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function ElevenLabsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 28 24" className={className} fill="none" aria-hidden>
      <rect x="2" y="3" width="8" height="18" rx="2" stroke="currentColor" strokeWidth={2} />
      <rect x="12" y="7" width="6" height="14" rx="2" stroke="currentColor" strokeWidth={2} opacity={0.75} />
      <rect x="20" y="10" width="6" height="11" rx="2" stroke="currentColor" strokeWidth={2} opacity={0.55} />
    </svg>
  );
}

/* ====== SECTION ====== */
export default function TechStack() {
  const items = [
    { name: "OpenAI", Icon: OpenAIIcon },
    { name: "supabase", Icon: SupabaseIcon },
    { name: "Integrations", Icon: NodesIcon },
    { name: "ElevenLabs", Icon: ElevenLabsIcon },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container-g">
        <h3 className="text-center text-white/70 text-lg md:text-xl font-semibold">
          Kullandığımız Teknolojiler
        </h3>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-24 gap-y-10 opacity-70">
          {items.map(({ name, Icon }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-white/60 hover:text-white/90 transition"
              title={name}
            >
              {/* SVG render başarısız olursa metin fallback */}
              <span className="inline-flex items-center justify-center">
                {typeof Icon === "function" ? (
                  <Icon className="h-8 md:h-9 w-auto" />
                ) : (
                  <span className="h-8 md:h-9 w-8 md:w-9 bg-white/20 rounded" />
                )}
              </span>
              <span className="text-2xl md:text-[28px] font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
