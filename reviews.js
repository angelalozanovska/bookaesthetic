fetch("./reviews.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("reviews-container");

    data.categories.forEach(category => {
      const section = document.createElement("div");
      section.className = "category";

      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = category.title;
      section.appendChild(title);

      category.books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";

        bookDiv.innerHTML = `
          <span class="book-title">
            • ${book.title} —
            <a href="./review.html?id=${book.id}">прочитај осврт</a>
          </span>
        `;

        section.appendChild(bookDiv);
      });

      container.appendChild(section);
    });
  });
