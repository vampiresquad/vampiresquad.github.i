/* ================= SUBTITLE TYPING + ICON ANIMATION (CLS FREE) ================= */

const roles = [
  {
    text: "Ethical Hacker",
    icon: "fa-skull",
    cls: "icon-hacker"
  },
  {
    text: "Founder of Vampire Squad",
    icon: "fa-droplet",
    cls: "icon-cyber"
  },
  {
    text: "Cyber Security Consultant",
    icon: "fa-shield-halved",
    cls: "icon-cyber"
  },
  {
    text: "Writer",
    icon: "fa-pen-nib",
    cls: "icon-writer"
  }
];

const subtitle = document.querySelector(".subtitle");
const subtitleText = document.getElementById("subtitle-text");
const iconWrapper = document.querySelector(".role-icon");

let roleIndex = 0;
let charIndex = 0;

/* typing only – NO delete (CLS safe) */
function typeText() {
  const role = roles[roleIndex];

  if (charIndex <= role.text.length) {
    subtitleText.textContent = role.text.slice(0, charIndex++);
    setTimeout(typeText, 90);
  } else {
    // pause after full typing
    setTimeout(switchRole, 1800);
  }
}

function switchRole() {
  // fade-out (visual only, no layout change)
  subtitleText.style.opacity = "0";

  setTimeout(() => {
    // move to next role
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;

    // update icon safely
    iconWrapper.className = `role-icon ${roles[roleIndex].cls}`;
    iconWrapper.innerHTML = `<i class="fa-solid ${roles[roleIndex].icon}"></i>`;

    // reset text + fade-in
    subtitleText.textContent = "";
    subtitleText.style.opacity = "1";

    typeText();
  }, 450);
}

/* initial state */
iconWrapper.className = `role-icon ${roles[0].cls}`;
iconWrapper.innerHTML = `<i class="fa-solid ${roles[0].icon}"></i>`;
subtitleText.style.transition = "opacity .4s ease";

/* start typing */
typeText();

/* ================= GITHUB PROJECTS ================= */

const grid = document.getElementById("tools-grid");
const status = document.getElementById("tools-status");

fetch("https://api.github.com/users/vampiresquad/repos")
  .then(res => res.json())
  .then(repos => {
    const list = repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    if (!list.length) {
      status.textContent = "Projects are temporarily unavailable.";
      return;
    }

    list.forEach(repo => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      grid.appendChild(card);
    });
  })
  .catch(() => {
    status.textContent = "Projects are temporarily unavailable.";
  });

/* ================= TERMINAL ================= */

const btn = document.getElementById("toggle-terminal");
const box = document.getElementById("terminal-box");
const txt = document.getElementById("terminal-text");

if (btn) {
  const lines = [
    "> Initializing secure environment...",
    "> Identity verified.",
    "> Role: Ethical Hacker",
    "> Principle: Responsibility before curiosity",
    "> Status: Active",
    "",
    "vampire@shourov:~$"
  ];

  let opened = false;

  btn.onclick = () => {
    box.classList.toggle("active");
    btn.textContent = box.classList.contains("active")
      ? "Close Terminal"
      : "Open Terminal";

    if (opened) return;
    opened = true;

    txt.textContent = "";
    let i = 0;

    (function typeTerminal() {
      if (i < lines.length) {
        txt.textContent += lines[i++] + "\n";
        setTimeout(typeTerminal, 350);
      }
    })();
  };
}

/* ================= CINEMATIC SCROLL REVEAL ================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 280); // cinematic pause
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));

/* Hero shows instantly */
document.querySelector(".hero")?.classList.add("visible");
