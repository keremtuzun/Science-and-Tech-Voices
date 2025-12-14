// Modal system for labs
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  const labCards = document.querySelectorAll(".lab-card");

  // Detect current language
const currentPage = window.location.pathname;
const langButton = document.getElementById("langButton");

if (langButton) {
  langButton.addEventListener("click", () => {
    if (currentPage.includes("-en")) {
      // Switch to Turkish
      window.location.href = currentPage.replace("-en", "");
    } else {
      // Switch to English
      const enPage = currentPage.replace(".html", "-en.html");
      window.location.href = enPage;
    }
  });
}


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

// Mobile navbar toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".navlinks");

  if(toggle){
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});



