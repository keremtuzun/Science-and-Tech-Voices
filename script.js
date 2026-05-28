document.addEventListener("DOMContentLoaded", () => {
  const langButton = document.getElementById("langButton");
  if (langButton) {
    langButton.addEventListener("click", () => {
      const target = langButton.dataset.target;
      if (target) window.location.href = target;
    });
  }

  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".navlinks");
  if (toggle && nav) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && e.target !== toggle) {
        nav.classList.remove("open");
      }
    });
  }

  const modals = document.querySelectorAll(".modal");
  const labCards = document.querySelectorAll(".lab-card");
  labCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const modal = document.getElementById(`lab-modal-${i + 1}`);
      if (modal) modal.classList.add("active");
    });
  });
  modals.forEach(m => {
    m.addEventListener("click", e => {
      if (e.target.classList.contains("modal") || e.target.classList.contains("modal-close")) {
        m.classList.remove("active");
      }
    });
  });
});
