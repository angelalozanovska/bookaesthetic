// get the book id from URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

fetch("./reviews.json")
  .then(res => res.json())
  .then(data => {
    let foundBook = null;

    // loop through categories
    for (const category of data.categories) {
      const book = category.books.find(b => b.id === bookId);
      if (book) {
        foundBook = { ...book, category: category.title };
        break;
      }
    }

    if (!foundBook) {
      // if no book found
      document.body.innerHTML = "<p style='text-align:center; margin-top:50px;'>Книгата не постои.</p>";
      return;
    }

    // fill the page
    document.getElementById("book-title").textContent = `${foundBook.title} — ${foundBook.author}`;
    document.getElementById("book-category").textContent = `(${foundBook.category})`;
    document.getElementById("book-cover").src = foundBook.cover;
    document.getElementById("book-personal").textContent = foundBook.personal;
    const reviewEl = document.getElementById("book-review");

    fetch(`./${bookId}.txt`)
    .then(res => {
        if (!res.ok) throw new Error("Review not found");
        return res.text();
    })
    .then(text => {
        reviewEl.innerHTML = text.replace(/\n/g, "<br>");
    })
    .catch(err => {
        reviewEl.textContent = "Нема рецензија за оваа книга.";
        console.error(err);
    });

  });

