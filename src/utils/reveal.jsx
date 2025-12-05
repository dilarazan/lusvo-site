export default function mountReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        // Bir kez çalışsın → titreşimi keser
        io.unobserve(e.target);
      }
    }
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10%",
  });

  els.forEach(el => io.observe(el));
}
