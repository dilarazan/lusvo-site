// src/components/Section.jsx
/**
 * Genel bölüm kabı
 * - withGrid=true iken üstte çok hafif bir radial highlight verir.
 * - container: max 1280px, responsive yatay padding.
 */
export default function Section({ id, className = "", withGrid = false, children }) {
  return (
    <section
      id={id}
      className={[
        "py-20 md:py-28",                                  // dikey ritim
        withGrid ? "bg-[radial-gradient(1000px_500px_at_50%_-20%,rgba(255,255,255,.04),transparent_60%)]" : "",
        className,
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}
