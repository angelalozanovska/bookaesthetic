fetch("content.json")
  .then(res => res.json())
  .then(data => {
    // Header
    document.getElementById("site-title").textContent = data.site.title;
    document.getElementById("site-tagline").textContent = data.site.tagline;
    document.getElementById("welcome-text").textContent = data.site.welcome;

    // Blocks
    const blocksContainer = document.getElementById("blocks");
    data.blocks.forEach(block => {
      const div = document.createElement("div");
      div.className = "block";
      div.innerHTML = `
        <h3>${block.title}</h3>
        <p>${block.subtitle}</p>
        <a href="${block.link}">${block.linkText}</a>
      `;
      blocksContainer.appendChild(div);
    });

    // Featured
    document.getElementById("featured-title").textContent = data.featured.title;
    document.getElementById("featured-content").innerHTML = `
      <strong>Book:</strong> ${data.featured.book}<br>
      <strong>Music:</strong> ${data.featured.music}<br>
      <strong>Drink:</strong> ${data.featured.drink}
    `;

    // Footer
    document.getElementById("footer-status").textContent =
      "status: " + data.footer.status;

    const email = document.getElementById("email-link");
    email.textContent = data.footer.email;
    email.href = "mailto:" + data.footer.email;
  });
