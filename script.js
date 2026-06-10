// Science & Tech Voices — site interactions

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Highlight the current page in the navigation
  const current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  // Scroll-reveal animation for cards and sections
  const revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add("in"));
  }
});
