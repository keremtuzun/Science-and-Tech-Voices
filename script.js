/* Science & Tech Voices, site behaviour.
   Everything here degrades safely: with JS off the pages still read and the
   contact form still shows its email fallback. */
(function () {
  "use strict";

  var LANG = (document.documentElement.lang || "en").slice(0, 2) === "tr" ? "tr" : "en";

  var T = {
    en: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      summaryTitle: "Please fix the following before sending:",
      nameShort: "Tell us your name, at least 2 characters.",
      emailEmpty: "We need an email address to reply to.",
      emailBad: "That does not look like an email address. Check for a typo.",
      msgShort: "Please write at least 20 characters so we know what you need.",
      msgEmpty: "The message is empty.",
      counter: function (n, max) { return n + " / " + max; },
      mailSubject: function (topic) { return "[Science & Tech Voices] " + topic; },
      mailIntro: function (name, email) {
        return "From: " + name + "\nReply to: " + email + "\n\n";
      }
    },
    tr: {
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      summaryTitle: "Göndermeden önce şunları düzeltin:",
      nameShort: "Adınızı yazın, en az 2 karakter.",
      emailEmpty: "Size dönebilmemiz için bir e-posta adresi gerekiyor.",
      emailBad: "Bu bir e-posta adresine benzemiyor. Yazım hatası olabilir.",
      msgShort: "Ne istediğinizi anlayabilmemiz için en az 20 karakter yazın.",
      msgEmpty: "Mesaj alanı boş.",
      counter: function (n, max) { return n + " / " + max; },
      mailSubject: function (topic) { return "[Science & Tech Voices] " + topic; },
      mailIntro: function (name, email) {
        return "Gönderen: " + name + "\nYanıt adresi: " + email + "\n\n";
      }
    }
  }[LANG];

  var CONTACT_EMAIL = "scitechvoices@gmail.com";
  var CONSENT_KEY = "stv-consent";

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { /* private mode, or storage disabled */ }
    return null;
  }

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------- mobile menu */
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primary-nav");

    if (toggle && nav) {
      var setOpen = function (open) {
        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? T.closeMenu : T.openMenu);
      };
      setOpen(false);

      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });

      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") setOpen(false);
      });

      document.addEventListener("click", function (e) {
        if (nav.classList.contains("open") &&
            !nav.contains(e.target) && e.target !== toggle) {
          setOpen(false);
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) {
          setOpen(false);
          toggle.focus();
        }
      });

      // a resize back to desktop should not leave the menu in an open state
      window.addEventListener("resize", function () {
        if (window.innerWidth > 720) setOpen(false);
      });
    }

    /* ------------------------------------------------------- language swap */
    var langButton = document.getElementById("langButton");
    if (langButton) {
      langButton.addEventListener("click", function () {
        // pages with no translated twin declare where the toggle should land
        var override = langButton.getAttribute("data-lang-href");
        if (override) {
          window.location.href = override;
          return;
        }
        var file = window.location.pathname.split("/").pop() || "index.html";
        if (file.indexOf(".html") === -1) file = "index.html";
        window.location.href = file.indexOf("-tr.html") !== -1
          ? file.replace("-tr.html", ".html")   // Turkish back to the default
          : file.replace(".html", "-tr.html");
      });
    }

    /* ---------------------------------------------------- image load state */
    var shimmering = document.querySelectorAll(
      ".card img, .post-cover, .person img, .video-thumb");
    Array.prototype.forEach.call(shimmering, function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("is-loaded");
      } else {
        img.addEventListener("load", function () { img.classList.add("is-loaded"); });
        img.addEventListener("error", function () { img.classList.add("is-loaded"); });
      }
    });

    /* --------------------------------------------------------- consent bar */
    var banner = document.getElementById("cookieBanner");
    if (banner) {
      var choice = store(CONSENT_KEY);
      if (choice !== "granted" && choice !== "denied") {
        banner.hidden = false;
        document.body.classList.add("has-banner");
      }
      Array.prototype.forEach.call(
        banner.querySelectorAll("[data-consent]"), function (btn) {
          btn.addEventListener("click", function () {
            store(CONSENT_KEY, btn.getAttribute("data-consent"));
            banner.hidden = true;
            document.body.classList.remove("has-banner");
            // a decline takes effect from the next page view, when the
            // analytics script is no longer added to the head at all
          });
        });
    }

    /* ------------------------------------------------------- contact form */
    var form = document.getElementById("contactForm");
    if (!form) return;

    var summary = document.getElementById("formSummary");
    var submit = form.querySelector(".submit");
    var counter = form.querySelector("[data-counter]");
    var message = form.querySelector("#message");

    if (counter && message) {
      var max = message.getAttribute("maxlength") || 2000;
      var paint = function () { counter.textContent = T.counter(message.value.length, max); };
      message.addEventListener("input", paint);
      paint();
    }

    function fieldOf(input) { return input.closest(".field"); }

    function clearError(input) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      var err = field.querySelector(".error");
      if (err) { err.hidden = true; err.textContent = ""; }
    }

    function showError(input, text) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      var err = field.querySelector(".error");
      if (err) { err.textContent = text; err.hidden = false; }
    }

    // validate a field again as soon as the visitor fixes it
    Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (input) {
      input.addEventListener("input", function () {
        if (fieldOf(input) && fieldOf(input).classList.contains("has-error")) {
          var problem = checkOne(input);
          if (!problem) clearError(input);
        }
      });
    });

    function checkOne(input) {
      var v = (input.value || "").trim();
      if (input.id === "name") return v.length < 2 ? T.nameShort : null;
      if (input.id === "email") {
        if (!v) return T.emailEmpty;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : T.emailBad;
      }
      if (input.id === "message") {
        if (!v) return T.msgEmpty;
        return v.length < 20 ? T.msgShort : null;
      }
      return null;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // a bot that fills every field trips this, a person never sees it
      var hp = form.querySelector("#website");
      if (hp && hp.value) {
        window.location.href = form.getAttribute("data-thanks");
        return;
      }

      var problems = [];
      ["name", "email", "message"].forEach(function (id) {
        var input = form.querySelector("#" + id);
        if (!input) return;
        clearError(input);
        var problem = checkOne(input);
        if (problem) {
          showError(input, problem);
          problems.push({ id: id, text: problem });
        }
      });

      if (problems.length) {
        if (summary) {
          summary.innerHTML = "<p>" + T.summaryTitle + "</p><ul>" +
            problems.map(function (p) {
              return '<li><a href="#' + p.id + '">' + p.text + "</a></li>";
            }).join("") + "</ul>";
          summary.hidden = false;
          summary.focus();
          summary.scrollIntoView({ block: "center" });
        } else {
          form.querySelector("#" + problems[0].id).focus();
        }
        return;
      }

      if (summary) { summary.hidden = true; summary.innerHTML = ""; }

      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var topicEl = form.querySelector("#topic");
      var topic = topicEl ? topicEl.value : "Message";
      var body = T.mailIntro(name, email) + form.querySelector("#message").value.trim();

      if (submit) {
        submit.classList.add("is-loading");
        submit.disabled = true;
        var loadingLabel = submit.getAttribute("data-loading-label");
        var label = submit.querySelector(".btn-label");
        if (label && loadingLabel) label.textContent = loadingLabel;
      }

      var href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(T.mailSubject(topic)) +
        "&body=" + encodeURIComponent(body);

      window.location.href = href;
      window.setTimeout(function () {
        window.location.href = form.getAttribute("data-thanks");
      }, 1200);
    });
  });
})();
