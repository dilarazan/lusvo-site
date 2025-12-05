import { useState } from "react";
export default function FAQ({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-white/10">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i}>
            <button onClick={() => setOpen(on ? null : i)}
                    className="w-full py-4 flex items-center justify-between text-left">
              <span className="font-semibold">{it.q}</span>
              <span className="ml-3 text-white/60 text-xl">{on ? "–" : "+"}</span>
            </button>
            {on && <p className="pb-4 text-white/70 leading-relaxed">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
