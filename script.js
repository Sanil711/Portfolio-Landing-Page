const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let cx = 0,
  cy = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = cx + "px";
  cursor.style.top = cy + "px";
});
(function loop() {
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(loop);
})();

document.querySelectorAll("a, button, .portfolio-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("expand");
    ring.classList.add("expand");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("expand");
    ring.classList.remove("expand");
  });
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

document.querySelectorAll(".filter-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});
