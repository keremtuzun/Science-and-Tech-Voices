// Language switching button
document.addEventListener("DOMContentLoaded", () => {
  const langButton = document.getElementById("langButton");

  if (langButton) {
    langButton.addEventListener("click", () => {
      let path = window.location.pathname;

      // Handle root and directory paths
      if (path === "/" || path === "") path = "/index.html";
      if (path.endsWith("/")) path = path + "index.html";

      const parts = path.split("/");
      const filename = parts[parts.length - 1];
      const dir = parts.slice(0, -1).join("/") + "/";

      let target;
      if (filename.includes("-en.")) {
        target = filename.replace("-en.", ".");
      } else {
        target = filename.replace(".", "-en.");
      }

      window.location.href = dir + target;
    });
  }

  // Lab card modal system
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
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal-close")
      ) {
        m.classList.remove("active");
      }
    });
  });
});

// Mobile navbar toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".navlinks");
  if (toggle) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
});
