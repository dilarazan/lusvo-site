import React, { useEffect, useRef } from "react";

export default function AiHexCoreScene({ className = "" }) {
  const ref = useRef(null);

  // İstersen otomasyon/AI olaylarıyla çarpıştır:
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const flash = () => {
      el.classList.add("hc-flash");
      clearTimeout(flash._t);
      flash._t = setTimeout(() => el.classList.remove("hc-flash"), 380);
    };
    const onStep  = () => flash();
    const onToken = () => flash();

    window.addEventListener("automation:step", onStep);
    window.addEventListener("ai:token", onToken);
    return () => {
      window.removeEventListener("automation:step", onStep);
      window.removeEventListener("ai:token", onToken);
    };
  }, []);

  return (
    <figure
      ref={ref}
      aria-hidden="true"
      className={[
        "hc-wrap relative isolate",
        "w-full h-[52svh] min-h-[420px] max-h-[640px] mx-auto rounded-2xl",
        className,
      ].join(" ")}
    >
      <div className="hc-base" />
      <div className="hc-hex">
        <div className="hc-rim" />
        <div className="hc-core" />
      </div>
    </figure>
  );
}
