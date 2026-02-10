// ------------------------
// LOAD CONTENT FROM JSON
// ------------------------
fetch("./content.json")
  .then(res => res.json())
  .then(data => {
    // Profile photo
    const profilePhoto = document.getElementById("profile-photo");
    if (profilePhoto) profilePhoto.src = data.profilePhoto;

    // Last updated
    const lastUpdated = document.getElementById("last-updated");
    if (lastUpdated) lastUpdated.textContent = data.lastUpdated;

    // Visitor count
    const visitorCount = document.getElementById("visitor-count");
    if (visitorCount) visitorCount.textContent = data.visitorCount;

    // Intro note with line breaks
    const introNote = document.getElementById("intro-note");
    if (introNote && data.introNote) {
      // Replace \n with <br>, also wrap lines starting with * or _ in <em>
      let formatted = data.introNote
        .split("\n")
        .map(line => {
          if (/^\*|_/.test(line.trim())) {
            return `<em>${line.replace(/^\*|_/, "")}</em>`;
          }
          return line;
        })
        .join("<br>");
      introNote.innerHTML = formatted;
    }

    // Navigation buttons
    const nav = document.getElementById("nav-buttons");
    if (nav && Array.isArray(data.navigation)) {
      nav.innerHTML = ""; // clear old
      data.navigation.forEach(item => {
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.label;
        nav.appendChild(a);
      });
    }
  })
  .catch(err => console.error("Failed to load content.json:", err));


// ------------------------
// FILL DIVIDERS / DOTS
// ------------------------
function fillLine(el) {
  const char = el.dataset.char || "-"; // default char
  const width = el.offsetWidth;

  // approximate width of monospace char in px
  const charWidth = parseInt(getComputedStyle(el).fontSize) * 0.55 || 8;
  const count = Math.floor(width / charWidth);

  el.textContent = char.repeat(count);
}

function updateLines() {
  document.querySelectorAll(".divider, .dots").forEach(fillLine);
}

window.addEventListener("resize", updateLines);
window.addEventListener("load", updateLines);

updateLines();


// ------------------------
// OPTIONAL: INIT STARS
// ------------------------
function initStars() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  const STAR_COUNT = 200;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.01
      });
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// Uncomment to enable stars
initStars();
