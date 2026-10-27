/* ===== Menu mobile ===== */
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");
const navLinks = document.querySelectorAll(".nav-link");

function setMenu(open) {
  navToggle.classList.toggle("active", open);
  navList.classList.toggle("active", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}
navToggle.addEventListener("click", () =>
  setMenu(!navList.classList.contains("active")),
);
navLinks.forEach((link) =>
  link.addEventListener("click", () => setMenu(false)),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* ===== Header saat scroll ===== */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===== Tandai menu aktif sesuai section ===== */
const sections = document.querySelectorAll("main section[id]");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + entry.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
sections.forEach((s) => spy.observe(s));

/* ===== Form kontak: buka aplikasi email dengan pesan terisi ===== */
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  const subject = encodeURIComponent("Pesan dari portofolio: " + name.value);
  const body = encodeURIComponent(
    message.value + "\n\nNama: " + name.value + "\nEmail: " + email.value,
  );
  window.location.href =
    "mailto:evandwinat@gmail.com?subject=" + subject + "&body=" + body;
  status.textContent =
    "Aplikasi email Anda akan terbuka. Tekan kirim di sana untuk menyelesaikan.";
  form.reset();
});

/* ===== Scroll Reveal Animasi ===== */
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Animasi progress bar skill saat muncul
      const progressBar = entry.target.querySelector(".skill-progress-bar");
      if (progressBar) {
        const width = progressBar.getAttribute("data-width");
        progressBar.style.width = width;
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

/* ===== Typing Effect Hero ===== */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  element.style.maxWidth = "none";
  element.style.borderRight = "3px solid var(--sky)";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = "none";
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    const text = typingElement.getAttribute("data-text");
    setTimeout(() => typeWriter(typingElement, text), 800);
  }
});
