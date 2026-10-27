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
