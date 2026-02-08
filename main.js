fetch("./content.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("profile-photo").src = data.profilePhoto;
    document.getElementById("intro-note").textContent = data.introNote;
    document.getElementById("last-updated").textContent = data.lastUpdated;
    document.getElementById("visitor-count").textContent = data.visitorCount;

    const nav = document.getElementById("nav-buttons");
    data.navigation.forEach(item => {
      const a = document.createElement("a");
      a.href = item.link;
      a.textContent = item.label;
      nav.appendChild(a);
    });
  });

function fillLine(el) {
  const char = el.dataset.char;
  const width = el.offsetWidth;

  // approx width of monospace char
  const charWidth = 8;
  const count = Math.floor(width / charWidth);

  el.textContent = char.repeat(count);
}

function updateLines() {
  document
    .querySelectorAll(".divider, .dots")
    .forEach(fillLine);
}

window.addEventListener("resize", updateLines);
window.addEventListener("load", updateLines);
