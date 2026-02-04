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

function typeText() {
  const role = roles[roleIndex];

  if (charIndex <= role.text.length) {
    subtitleText.textContent = role.text.slice(0, charIndex++);
    setTimeout(typeText, 90);
  } else {
    setTimeout(switchRole, 1800);
  }
}

function switchRole() {
  subtitleText.style.opacity = "0";

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;

    iconWrapper.className = `role-icon ${roles[roleIndex].cls}`;
    iconWrapper.innerHTML = `<i class="fa-solid ${roles[roleIndex].icon}"></i>`;

    subtitleText.textContent = "";
    subtitleText.style.opacity = "1";

    typeText();
  }, 450);
}

iconWrapper.className = `role-icon ${roles[0].cls}`;
iconWrapper.innerHTML = `<i class="fa-solid ${roles[0].icon}"></i>`;
subtitleText.style.transition = "opacity .4s ease";

typeText();

/* ================= GITHUB PROJECTS (AUTO LOAD + FEATURED + HIDE CONTROL) ================= */

const grid = document.getElementById("tools-grid");
const status = document.getElementById("tools-status");

const featuredRepos = ["webtrix","quicktools","toolzen"];

const hideRepos = [
  "muhammad_shourov",
  "vampire-blog",
  "mybot",
  "paid_approval",
  "railwaybot",
  "myquizapp",
  "quiz-master-infinity",
  "muhammad-shourov"
];

fetch("https://api.github.com/users/vampiresquad/repos")
.then(res => res.json())
.then(repos => {

  const list = repos
    .filter(r => !r.fork)
    .filter(r => !featuredRepos.includes(r.name.toLowerCase()))
    .filter(r => !hideRepos.includes(r.name.toLowerCase()))
    .sort((a,b)=>b.stargazers_count-a.stargazers_count)
    .slice(0,6);

  if(!list.length){
    status.textContent="Projects are temporarily unavailable.";
    return;
  }

  list.forEach(repo=>{
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML=`
      <h3>${repo.name}</h3>
      <p>${repo.description||"No description provided."}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;

    grid.appendChild(card);
  });

})
.catch(()=>{status.textContent="Projects are temporarily unavailable.";});

/* ================= TERMINAL (ULTRA ENGINE) ================= */

const btn=document.getElementById("toggle-terminal");
const box=document.getElementById("terminal-box");
const txt=document.getElementById("terminal-text");

if(btn){

const lines=[
{t:"> Boot sequence initiated...",c:"#22d3ee",s:80},
{t:"> Synchronizing system clock...",c:"#22d3ee",s:80},
{t:"> Stabilizing memory sectors...",c:"#22d3ee",s:90},
{t:"> Loading silent execution modules...",c:"#22d3ee",s:90},

{t:"> Establishing encrypted environment...",c:"#06b6d4",s:100},
{t:"> Cipher layer engaged [AES-256]",c:"#06b6d4",s:110},

{t:"> Accessing identity vault...",c:"#22c55e",s:110},
{t:"> Identity Confirmed: Muhammad Shourov",c:"#22c55e",s:130},
{t:"> Alias: Vampire",c:"#22c55e",s:130},

{t:"> Loading Professional Matrix...",c:"#38bdf8",s:110},
{t:"> Role: Ethical Hacker",c:"#38bdf8",s:120},
{t:"> Cyber Security Specialist",c:"#38bdf8",s:120},

{t:"> Psychological Profile Loaded...",c:"#a78bfa",s:130},
{t:"> Silence over noise",c:"#a78bfa",s:140},
{t:"> Discipline over chaos",c:"#a78bfa",s:140},

{t:"> Ethical Core Loaded...",c:"#facc15",s:130},
{t:"> Knowledge without ethics is destruction.",c:"#facc15",s:150},

{t:'> "Silence is not emptiness."',c:"#e879f9",s:160},
{t:'> "Silence is preparation."',c:"#e879f9",s:160},

{t:"vampire@shourov:~$",c:"#22d3ee",s:140}
];

let opened=false;

/* Cursor */
const cursor=document.createElement("span");
cursor.textContent="█";
cursor.style.marginLeft="4px";

let blink=true;
setInterval(()=>{
cursor.style.opacity=blink?"1":"0";
blink=!blink;
},500);

btn.onclick=()=>{

box.classList.toggle("active");

btn.textContent=box.classList.contains("active")
?"Close Terminal"
:"Open Terminal";

if(opened)return;
opened=true;

txt.innerHTML="";
let lineIndex=0;

function typeLine(){

if(lineIndex>=lines.length){
txt.appendChild(cursor);
return;
}

const line=lines[lineIndex];
const lineEl=document.createElement("div");
lineEl.style.color=line.c;
txt.appendChild(lineEl);

let char=0;

function typeChar(){
if(char<line.t.length){
lineEl.textContent+=line.t[char++];
box.scrollTop=box.scrollHeight;
setTimeout(typeChar,line.s);
}else{
lineIndex++;
setTimeout(typeLine,120);
}
}

typeChar();
}

typeLine();

};

}

/* ================= CINEMATIC SCROLL REVEAL ================= */

const sections=document.querySelectorAll(".section");

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
setTimeout(()=>{
entry.target.classList.add("visible");
},280);
observer.unobserve(entry.target);
}
});
},{threshold:0.1});

sections.forEach(section=>observer.observe(section));
document.querySelector(".hero")?.classList.add("visible");
