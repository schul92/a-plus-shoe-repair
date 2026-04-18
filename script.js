const header = document.getElementById("siteHeader");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- hero slideshow ---------- */
(() => {
  const root = document.getElementById("heroSlides");
  if (!root) return;
  const slides = Array.from(root.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  const caption = document.getElementById("heroCaption");
  if (slides.length < 2) return;

  let idx = 0;
  let timer = null;
  const INTERVAL = 6500;

  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = (next) => {
    next = ((next % slides.length) + slides.length) % slides.length;
    if (next === idx) return;
    slides[idx].classList.remove("is-active");
    dots[idx] && dots[idx].classList.remove("is-active");
    idx = next;
    slides[idx].classList.add("is-active");
    dots[idx] && dots[idx].classList.add("is-active");
    if (caption) caption.innerHTML = slides[idx].dataset.caption || "";
  };

  const tick = () => go(idx + 1);
  const start = () => {
    stop();
    if (reduceMotion) return;
    timer = window.setInterval(tick, INTERVAL);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  // initial caption
  if (caption) caption.innerHTML = slides[0].dataset.caption || "";

  dots.forEach((d) =>
    d.addEventListener("click", () => {
      go(parseInt(d.dataset.slide, 10));
      start();
    })
  );

  root.parentElement.addEventListener("mouseenter", stop);
  root.parentElement.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();

/* ---------- before / after sliders ---------- */
document.querySelectorAll("[data-ba]").forEach((fig) => {
  const range = fig.querySelector(".ba__range");
  const before = fig.querySelector(".ba__before");
  const handle = fig.querySelector(".ba__handle");
  if (!range || !before || !handle) return;

  let touched = false;

  const apply = (val) => {
    const v = Math.max(0, Math.min(100, parseFloat(val)));
    const inset = 100 - v;
    before.style.clipPath = `inset(0 ${inset}% 0 0)`;
    before.style.webkitClipPath = `inset(0 ${inset}% 0 0)`;
    handle.style.left = v + "%";
    range.value = v;
  };

  apply(range.value);

  const markTouched = () => {
    if (touched) return;
    touched = true;
    fig.classList.add("is-touched");
  };

  range.addEventListener("input", (e) => {
    apply(e.target.value);
    markTouched();
  });
  range.addEventListener("pointerdown", markTouched);

  // Gentle auto-demo when scrolled into view: 12 → 88 → 50
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting || touched || fig.dataset.demoed) return;
        fig.dataset.demoed = "1";
        const seq = [
          { v: 88, delay: 450, dur: 1100 },
          { v: 22, delay: 0, dur: 1100 },
          { v: 50, delay: 0, dur: 900 },
        ];
        let start = 12;
        const runStep = (i) => {
          if (i >= seq.length || touched) return;
          const step = seq[i];
          setTimeout(() => {
            const from = start;
            const to = step.v;
            const t0 = performance.now();
            const frame = (now) => {
              if (touched) return;
              const t = Math.min(1, (now - t0) / step.dur);
              const ease = 0.5 - Math.cos(t * Math.PI) / 2;
              apply(from + (to - from) * ease);
              if (t < 1) requestAnimationFrame(frame);
              else { start = to; runStep(i + 1); }
            };
            requestAnimationFrame(frame);
          }, step.delay);
        };
        runStep(0);
      });
    },
    { threshold: 0.4 }
  );
  io.observe(fig);
});
