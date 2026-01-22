/* Typing Effect */
const roles=[
  "Ethical Hacker",
  "Founder of Vampire Squad",
  "Cyber Security Consultant",
  "Writer"
];
let r=0,c=0,del=false;
const sub=document.querySelector(".subtitle");

(function type(){
  const t=roles[r];
  sub.textContent=del?t.slice(0,c--):t.slice(0,c++);
  if(!del&&c>t.length+6)del=true;
  if(del&&c===0){del=false;r=(r+1)%roles.length}
  setTimeout(type,del?40:80);
})();

/* Reveal */
const secs=document.querySelectorAll(".section");
const rev=()=>secs.forEach(s=>{
  if(s.getBoundingClientRect().top<innerHeight-120)s.classList.add("show");
});
window.addEventListener("scroll",rev);rev();

/* Terminal */
const btn=document.getElementById("toggle-terminal");
const box=document.getElementById("terminal-box");
const txt=document.getElementById("terminal-text");

if(btn){
  const lines=[
    "> Initializing Vampire Terminal...",
    "> Identity confirmed: Muhammad Shourov",
    "> Role: Ethical Hacker",
    "> Status: Active",
    "> Access granted.",
    "",
    "vampire@shourov:~$"
  ];

  btn.onclick=()=>{
    if(box.style.display==="block"){
      box.style.display="none";
      btn.textContent="Open Terminal";
      return;
    }
    box.style.display="block";
    btn.textContent="Close Terminal";
    txt.textContent="";
    let i=0;
    (function t(){
      if(i<lines.length){
        txt.textContent+=lines[i++]+"\n";
        setTimeout(t,350);
      }
    })();
  };
}
