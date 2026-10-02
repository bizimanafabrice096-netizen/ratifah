const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 30);
  backTop.classList.toggle("show", y > 500);
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height ? (y / height) * 100 : 0}%`;
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const savedTheme = localStorage.getItem("fabrice-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("fabrice-theme", theme);
  themeToggle.textContent = theme === "light" ? "☀" : "☾";
});
themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
