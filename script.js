/* ====== SETTINGS: change this to your real GitHub username ====== */
const GITHUB_USERNAME = "yourusername";

/* ---------- Helpers ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/* ---------- Update GitHub link in contact section ---------- */
const ghLink = document.getElementById("github-link");
ghLink.href = `https://github.com/${GITHUB_USERNAME}`;
ghLink.textContent = `github.com/${GITHUB_USERNAME}`;

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ---------- OWN FEATURE: light / dark theme switch ---------- */
const themeToggle = document.getElementById("theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.innerHTML = theme === "dark" ? "&#9728;" : "&#9790;";
  try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("theme") || "light"; } catch (e) { /* ignore */ }
applyTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Projects from JSON ---------- */
async function loadProjects() {
  const list = document.getElementById("project-list");
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("HTTP " + response.status);
    const projects = await response.json();

    list.innerHTML = "";
    projects.forEach(p => {
      const card = el("article", "card project-card");

      const img = document.createElement("img");
      img.src = "images/" + p.screenshot;
      img.alt = "Screenshot of " + p.title;
      img.loading = "lazy";
      img.onerror = () => {
        img.onerror = null;  // placeholder if the screenshot file is missing
        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">' +
          '<rect width="100%" height="100%" fill="#cfeff2"/>' +
          '<text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#0b6e7a" ' +
          'text-anchor="middle">Screenshot coming soon</text></svg>');
      };

      const body = el("div", "project-body");
      body.appendChild(el("h3", "", p.title));
      body.appendChild(el("p", "", p.description));

      const tags = el("ul", "tags");
      p.technologies.forEach(t => tags.appendChild(el("li", "", t)));
      body.appendChild(tags);

      body.appendChild(el("p", "project-role", "Role: " + p.role));

      const link = el("a", "btn", p.linkLabel || "View project");
      link.href = p.link;
      link.target = "_blank";
      link.rel = "noopener";
      body.appendChild(link);

      card.append(img, body);
      list.appendChild(card);
    });
  } catch (error) {
    console.warn("Projects could not be loaded:", error);
    list.innerHTML = "";
    list.appendChild(el("p", "message error-msg",
      "Sorry, the projects could not be loaded right now. Please try again later."));
  }
}

/* ---------- Latest GitHub repositories ---------- */
async function loadRepos() {
  const list = document.getElementById("repo-list");
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const repos = await response.json();

    list.innerHTML = "";
    if (repos.length === 0) {
      list.appendChild(el("li", "message", "No public repositories yet."));
      return;
    }
    repos.forEach(r => {
      const li = el("li");
      const a = el("a", "", r.name);
      a.href = r.html_url;
      a.target = "_blank";
      a.rel = "noopener";
      li.append(a, el("span", "lang", r.language || "No language listed"));
      list.appendChild(li);
    });
  } catch (error) {
    console.warn("GitHub data unavailable:", error);
    list.innerHTML = "";
    list.appendChild(el("li", "message error-msg",
      "GitHub repositories are unavailable right now. Please try again later."));
  }
}

/* ---------- Contact form validation ---------- */
const form = document.getElementById("contact-form");
const statusBox = document.getElementById("form-status");

function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", event => {
  event.preventDefault();
  statusBox.textContent = "";

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (!name) { setError("name", "Please enter your name."); valid = false; }
  else setError("name", "");

  if (!email) { setError("email", "Please enter your email."); valid = false; }
  else if (!emailPattern.test(email)) { setError("email", "Please enter a valid email address."); valid = false; }
  else setError("email", "");

  if (!message) { setError("message", "Please write a message."); valid = false; }
  else setError("message", "");

  if (!valid) return;

  // A static site has no back end, so the message is not actually sent.
  statusBox.textContent = `Thank you, ${name}! Your message has been received.`;
  form.reset();
});

/* ---------- Typing effect for the tagline ---------- */
(function typeTagline() {
  const tagline = document.getElementById("tagline");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const text = tagline.dataset.text;
  let i = 0;
  tagline.textContent = "";
  tagline.classList.add("typing");
  const timer = setInterval(() => {
    tagline.textContent = text.slice(0, ++i);
    if (i >= text.length) { clearInterval(timer); tagline.classList.remove("typing"); }
  }, 45);
})();

/* ---------- Start ---------- */
loadProjects();
loadRepos();
