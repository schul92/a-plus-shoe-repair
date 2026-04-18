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
  const beforeWrap = fig.querySelector(".ba__before-wrap");
  const handle = fig.querySelector(".ba__handle");
  if (!range || !beforeWrap || !handle) return;

  const apply = (val) => {
    const v = Math.max(0, Math.min(100, parseFloat(val)));
    beforeWrap.style.width = v + "%";
    handle.style.left = v + "%";
  };
  apply(range.value);
  range.addEventListener("input", (e) => apply(e.target.value));
});
