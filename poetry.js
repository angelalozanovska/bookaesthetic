fetch("./poetry.json")
  .then(res => res.json())
  .then(data => {

    const myContainer = document.getElementById("my-words-container");
    const borrowedContainer = document.getElementById("borrowed-words-container");

    function renderPoems(poems, container) {

      poems.forEach(poem => {
        const poemDiv = document.createElement("div");
        poemDiv.className = "book";

        poemDiv.innerHTML = `
          <span class="book-title">
            • ${poem.title} —
            <a class="read-link" href="./poem.html?id=${poem.id}">прочитај</a>
          </span>
        `;

        container.appendChild(poemDiv);
      });

    }

    renderPoems(data.myWords, myContainer);
    renderPoems(data.borrowedWords, borrowedContainer);

  });
