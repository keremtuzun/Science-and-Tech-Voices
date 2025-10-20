// Modal system for labs
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const labCards = document.querySelectorAll(".lab-card");

  labCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const modal = document.getElementById(`lab-modal-${i+1}`);
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
