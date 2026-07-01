// Edit these two values to personalize the entire website.
const SITE_CONFIG = {
  teacherName: "Mohamed",
  whatsappNumber: "212704192622",
};

document.querySelectorAll("[data-teacher-name]").forEach((element) => {
  element.textContent = SITE_CONFIG.teacherName;
});

const whatsappMessage = encodeURIComponent(
  `Hello ${SITE_CONFIG.teacherName}, I would like to book a free English level check.`,
);

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;
});

document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
  mobileMenu.hidden = !willOpen;
  document.body.classList.toggle("menu-open", willOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 16);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.closest(".faq-item");
    const answer = currentItem.querySelector(".faq-answer");
    const isOpen = currentItem.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("open");
      item.querySelector("button").setAttribute("aria-expanded", "false");
      item.querySelector(".faq-answer").hidden = true;
    });

    if (!isOpen) {
      currentItem.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      answer.hidden = false;
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    `Hello ${SITE_CONFIG.teacherName}, I would like to book a free English level check.`,
    "",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Level: ${data.get("level")}`,
    `Goal: ${data.get("goal")}`,
    `Message: ${data.get("message") || "—"}`,
  ].join("\n");

  window.open(
    `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
});
