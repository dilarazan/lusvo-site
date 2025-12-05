export const fadeUp = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

export const stagger = (gap = 0.06, delay = 0) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  },
});

export const item = {
  variants: {
    hidden: { opacity: 0, y: 8 },
    show:   { opacity: 1, y: 0, transition: { duration: .45, ease: [0.22,1,0.36,1] } },
  },
};
