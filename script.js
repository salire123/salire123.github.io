// ===== Mobile Navbar Toggle =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    }
  });
});

// ===== Smooth Scrolling Active Link Highlight =====
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-menu li");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    const anchor = li.querySelector("a");
    if (anchor && anchor.getAttribute("href") === `#${current}`) {
      li.classList.add("active");
    }
  });
});

// ===== Contact Form Submission (mailto) =====
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById("name").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const message = encodeURIComponent(document.getElementById("message").value);

  const subject = `New message from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;

  window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
});

// ===== Dark/Light Mode Toggle =====
const themeToggleBtn = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Initialize theme on page load
function initTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️";
  } else if (storedTheme === "light") {
    document.body.classList.remove("dark-mode");
    themeToggleBtn.textContent = "🌙";
  } else if (prefersDarkScheme.matches) {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggleBtn.textContent = "🌙";
  }
}

initTheme();

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
