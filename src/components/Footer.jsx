// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="py-3 md:py-4">
        <div className="mx-auto max-w-[1180px] px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            {/* Marka — daha da sola çekildi, spiralden uzak */}
            <div className="ml-[clamp(0px,1vw,24px)] -translate-x-[96px] md:-translate-x-[120px] lg:-translate-x-[160px]">
              <a
                href="/"
                aria-label="LUSAI"
                className="inline-flex items-center gap-3"
              >
                <div className="lusai-pro text-white scale-[0.86]">
                  <span className="lus-lus">
                    <span className="ch k-L">L</span>
                    <span className="ch k-U">U</span>
                    <span className="ch s k-S">S</span>
                  </span>
                  <span className="ch ai k-A">A</span>
                  <span className="ch ai k-nudge-up">I</span>
                </div>
              </a>

              <p className="mt-1 text-[12px] leading-none text-white/65">
                © 2025 LUSAI. Tüm hakları saklıdır.
              </p>
            </div>

            {/* Sağ: İletişim & linkler */}
            <div className="flex flex-col md:items-end gap-2">
              <div className="flex flex-wrap items-center gap-2 text-[13px]">
                <span className="text-white/80 font-medium">Bize Ulaşın</span>

                <a
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/85 transition"
                  href="https://instagram.com/lusai.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/85 transition"
                  href="https://www.linkedin.com/company/lusai"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4.5 9.5h4v10h-4zM6.5 4.5a2 2 0 110 4 2 2 0 010-4zm6 5h3a4 4 0 014 4v6h-4v-5c0-1.2-1-2.2-2.2-2.2H13v7.2h-4V9.5h3.5z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/85 transition"
                  href="mailto:contact@lusai.io"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>E-posta</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-[12px] text-white/60">
                <a className="hover:text-white/90 transition" href="#privacy">Gizlilik</a>
                <a className="hover:text-white/90 transition" href="#cookies">Çerezler</a>
                <a className="hover:text-white/90 transition" href="#terms">Koşullar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
